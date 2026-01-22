const express = require('express');
const Payment = require('../models/Payment');
const Order = require('../models/Order');
const paymentGateway = require('../services/paymentGateway');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all payment routes
router.use(protect);

// Initiate payment
router.post('/initiate', async (req, res, next) => {
  try {
    const { orderId, method, subMethod, cardDetails, upiDetails, emiDetails } = req.body;

    // Get order details
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check if payment already exists for this order
    const existingPayment = await Payment.findOne({ orderId, status: { $in: ['pending', 'processing', 'success'] } });
    if (existingPayment) {
      return res.status(400).json({ message: 'Payment already initiated for this order' });
    }

    const paymentId = paymentGateway.generatePaymentId();

    // Create payment record
    const paymentData = {
      orderId,
      userId: req.user._id,
      paymentId,
      amount: order.totalAmount,
      method,
      subMethod,
      status: 'pending',
    };

    // Add method-specific details
    if (method === 'card' && cardDetails) {
      paymentData.cardDetails = {
        last4: cardDetails.cardNumber?.slice(-4),
        cardType: cardDetails.cardType,
        bank: cardDetails.bank,
      };
    }

    if (method === 'upi' && upiDetails) {
      paymentData.upiDetails = {
        upiId: upiDetails.upiId,
        vpa: upiDetails.vpa,
      };
    }

    if (method === 'emi' && emiDetails) {
      paymentData.emiDetails = emiDetails;
    }

    const payment = await Payment.create(paymentData);

    // Initiate payment with gateway
    const gatewayResponse = await paymentGateway.initiatePayment({
      method,
      subMethod,
      amount: order.totalAmount,
      currency: 'INR',
      orderId,
      paymentId,
      userDetails: {
        phone: order.shippingAddress.phone,
        email: req.user.email,
      },
    });

    // Update payment with gateway response
    payment.gatewayResponse = gatewayResponse;
    payment.timeline.push({
      status: 'initiated',
      message: 'Payment initiated with gateway',
      gatewayResponse,
    });

    // Handle UPI QR code
    if (method === 'upi' && gatewayResponse.upiDetails) {
      payment.upiDetails = {
        ...payment.upiDetails,
        qrCode: gatewayResponse.upiDetails.qrCode,
        qrCodeExpiry: gatewayResponse.upiDetails.expiresAt,
      };
    }

    // Handle OTP requirement
    if (gatewayResponse.requiresOTP) {
      const otp = paymentGateway.generateOTP();
      payment.verificationOtp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        attempts: 0,
        verified: false,
      };
      
      // In real implementation, send OTP via SMS/email
      console.log(`OTP for payment ${paymentId}: ${otp}`);
    }

    await payment.save();

    // Update order payment status
    order.paymentStatus = 'pending';
    await order.save();

    res.json({
      success: true,
      payment: {
        paymentId: payment.paymentId,
        status: payment.status,
        method: payment.method,
        amount: payment.amount,
        requiresOTP: gatewayResponse.requiresOTP,
        otpSentTo: gatewayResponse.otpSentTo,
        upiDetails: payment.upiDetails,
        redirectUrl: gatewayResponse.redirectUrl,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { paymentId, otp } = req.body;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Check if user owns the payment
    if (payment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Check OTP expiry
    if (new Date() > payment.verificationOtp.expiresAt) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Check attempts
    if (payment.verificationOtp.attempts >= 3) {
      return res.status(400).json({ message: 'Maximum OTP attempts exceeded' });
    }

    // Increment attempts
    payment.verificationOtp.attempts += 1;

    // Verify OTP
    const verificationResult = await paymentGateway.verifyOTP(
      paymentId,
      otp,
      payment.verificationOtp.code
    );

    if (verificationResult.success) {
      payment.verificationOtp.verified = true;
      payment.status = 'processing';
      payment.timeline.push({
        status: 'otp_verified',
        message: 'OTP verified successfully',
      });

      await payment.save();

      // Process payment
      setTimeout(async () => {
        try {
          const processResult = await paymentGateway.processPayment(paymentId, payment.method);
          
          payment.status = processResult.status;
          payment.gatewayPaymentId = processResult.gatewayTransactionId;
          payment.timeline.push({
            status: processResult.status,
            message: processResult.message,
            gatewayResponse: processResult,
          });

          await payment.save();

          // Update order status
          const order = await Order.findById(payment.orderId);
          if (order) {
            order.paymentStatus = processResult.status === 'success' ? 'paid' : 'failed';
            if (processResult.status === 'success') {
              order.status = 'in_review';
              order.timeline.push({
                status: 'in_review',
                note: 'Payment completed, order under review',
              });
            }
            await order.save();
          }
        } catch (error) {
          console.error('Payment processing error:', error);
        }
      }, 3000); // Process after 3 seconds

      res.json({
        success: true,
        message: 'OTP verified successfully',
        status: 'processing',
      });
    } else {
      await payment.save();
      res.status(400).json({
        success: false,
        message: verificationResult.message,
        attemptsLeft: 3 - payment.verificationOtp.attempts,
      });
    }
  } catch (err) {
    next(err);
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res, next) => {
  try {
    const { paymentId } = req.body;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Check if user owns the payment
    if (payment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Generate new OTP
    const otp = paymentGateway.generateOTP();
    payment.verificationOtp = {
      code: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attempts: 0,
      verified: false,
    };

    await payment.save();

    // In real implementation, send OTP via SMS/email
    console.log(`New OTP for payment ${paymentId}: ${otp}`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      otpSentTo: payment.gatewayResponse?.otpSentTo,
    });
  } catch (err) {
    next(err);
  }
});

// Get payment status
router.get('/status/:paymentId', async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ paymentId }).populate('orderId');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Check if user owns the payment
    if (payment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      paymentId: payment.paymentId,
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      timeline: payment.timeline,
      upiDetails: payment.upiDetails,
      requiresOTP: payment.verificationOtp && !payment.verificationOtp.verified,
      otpExpired: payment.verificationOtp && new Date() > payment.verificationOtp.expiresAt,
    });
  } catch (err) {
    next(err);
  }
});

// Cancel payment
router.post('/cancel/:paymentId', async (req, res, next) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Check if user owns the payment
    if (payment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Can only cancel pending or processing payments
    if (!['pending', 'processing'].includes(payment.status)) {
      return res.status(400).json({ message: 'Cannot cancel this payment' });
    }

    payment.status = 'cancelled';
    payment.timeline.push({
      status: 'cancelled',
      message: 'Payment cancelled by user',
    });

    await payment.save();

    // Update order
    const order = await Order.findById(payment.orderId);
    if (order) {
      order.paymentStatus = 'failed';
      await order.save();
    }

    res.json({
      success: true,
      message: 'Payment cancelled successfully',
    });
  } catch (err) {
    next(err);
  }
});

// Get user's payments
router.get('/my-payments', async (req, res, next) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('orderId')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (err) {
    next(err);
  }
});

// Webhook endpoint for payment gateway callbacks
router.post('/webhook', async (req, res, next) => {
  try {
    const signature = req.headers['x-payment-signature'];
    const payload = JSON.stringify(req.body);

    // Validate webhook signature
    if (!paymentGateway.validateWebhookSignature(payload, signature)) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const { paymentId, status, gatewayTransactionId } = req.body;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update payment status
    payment.status = status;
    payment.gatewayPaymentId = gatewayTransactionId;
    payment.timeline.push({
      status,
      message: `Webhook received: ${status}`,
      gatewayResponse: req.body,
    });

    await payment.save();

    // Update order
    const order = await Order.findById(payment.orderId);
    if (order) {
      order.paymentStatus = status === 'success' ? 'paid' : 'failed';
      if (status === 'success') {
        order.status = 'in_review';
        order.timeline.push({
          status: 'in_review',
          note: 'Payment completed via webhook, order under review',
        });
      }
      await order.save();
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;