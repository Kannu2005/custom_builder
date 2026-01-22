const crypto = require('crypto');
const QRCode = require('qrcode');

class PaymentGateway {
  constructor() {
    this.merchantId = process.env.PAYMENT_MERCHANT_ID || 'MERCHANT123';
    this.secretKey = process.env.PAYMENT_SECRET_KEY || 'secret_key_123';
    this.baseUrl = process.env.PAYMENT_GATEWAY_URL || 'https://api.razorpay.com/v1';
  }

  // Generate unique payment ID
  generatePaymentId() {
    return 'PAY_' + crypto.randomBytes(16).toString('hex').toUpperCase();
  }

  // Generate OTP for verification
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Generate UPI QR Code
  async generateUPIQRCode(paymentData) {
    const { amount, paymentId, merchantName = 'Custom PC Builder' } = paymentData;
    
    // UPI URL format
    const upiUrl = `upi://pay?pa=merchant@paytm&pn=${encodeURIComponent(merchantName)}&am=${amount}&tr=${paymentId}&tn=Payment for PC Build&cu=INR`;
    
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(upiUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      return {
        qrCode: qrCodeDataUrl,
        upiUrl: upiUrl,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      };
    } catch (error) {
      throw new Error('Failed to generate QR code');
    }
  }

  // Simulate payment gateway API call
  async initiatePayment(paymentData) {
    const { method, amount, currency = 'INR', orderId, userDetails } = paymentData;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const paymentId = this.generatePaymentId();
    
    const response = {
      paymentId,
      status: 'pending',
      amount,
      currency,
      method,
      gatewayOrderId: 'GW_' + crypto.randomBytes(8).toString('hex').toUpperCase(),
      timestamp: new Date().toISOString(),
    };

    // Method-specific handling
    switch (method) {
      case 'upi':
        const qrData = await this.generateUPIQRCode({ amount, paymentId });
        response.upiDetails = qrData;
        break;
        
      case 'card':
        response.requiresOTP = true;
        response.otpSentTo = userDetails.phone?.replace(/(\d{6})\d{4}(\d{2})/, '$1****$2');
        break;
        
      case 'netbanking':
        response.redirectUrl = `${this.baseUrl}/netbanking/redirect?payment_id=${paymentId}`;
        break;
        
      case 'wallet':
        response.requiresOTP = true;
        response.otpSentTo = userDetails.phone?.replace(/(\d{6})\d{4}(\d{2})/, '$1****$2');
        break;
    }
    
    return response;
  }

  // Verify OTP
  async verifyOTP(paymentId, otp, storedOtp) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (otp === storedOtp) {
      return {
        success: true,
        status: 'processing',
        message: 'OTP verified successfully'
      };
    } else {
      return {
        success: false,
        status: 'failed',
        message: 'Invalid OTP'
      };
    }
  }

  // Process payment (simulate actual payment processing)
  async processPayment(paymentId, method) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      return {
        status: 'success',
        gatewayTransactionId: 'TXN_' + crypto.randomBytes(12).toString('hex').toUpperCase(),
        timestamp: new Date().toISOString(),
        message: 'Payment completed successfully'
      };
    } else {
      return {
        status: 'failed',
        errorCode: 'PAYMENT_FAILED',
        message: 'Payment failed due to insufficient funds or network error',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Check payment status
  async checkPaymentStatus(paymentId) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo, randomly return status
    const statuses = ['pending', 'processing', 'success', 'failed'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      paymentId,
      status: randomStatus,
      timestamp: new Date().toISOString()
    };
  }

  // Initiate refund
  async initiateRefund(paymentId, amount, reason) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const refundId = 'REF_' + crypto.randomBytes(12).toString('hex').toUpperCase();
    
    return {
      refundId,
      status: 'processing',
      amount,
      reason,
      estimatedDays: '5-7 business days',
      timestamp: new Date().toISOString()
    };
  }

  // Validate webhook signature (for real payment gateways)
  validateWebhookSignature(payload, signature) {
    const expectedSignature = crypto
      .createHmac('sha256', this.secretKey)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }
}

module.exports = new PaymentGateway();