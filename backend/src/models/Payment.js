const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentId: {
      type: String,
      unique: true,
      required: true,
    },
    gatewayPaymentId: {
      type: String, // Payment gateway's transaction ID
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    method: {
      type: String,
      enum: ['upi', 'card', 'netbanking', 'wallet', 'emi', 'cash_on_delivery'],
      required: true,
    },
    subMethod: {
      type: String, // google_pay, phonepe, paytm, etc.
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'success', 'failed', 'cancelled', 'refunded'],
      default: 'pending',
    },
    gatewayResponse: {
      type: mongoose.Schema.Types.Mixed, // Store gateway response
    },
    upiDetails: {
      upiId: String,
      vpa: String,
      qrCode: String,
      qrCodeExpiry: Date,
    },
    cardDetails: {
      last4: String,
      cardType: String,
      bank: String,
    },
    emiDetails: {
      bank: String,
      tenure: Number,
      monthlyAmount: Number,
      totalAmount: Number,
      interestRate: Number,
    },
    verificationOtp: {
      code: String,
      expiresAt: Date,
      attempts: { type: Number, default: 0 },
      verified: { type: Boolean, default: false },
    },
    timeline: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        message: String,
        gatewayResponse: mongoose.Schema.Types.Mixed,
      },
    ],
    refundDetails: {
      refundId: String,
      amount: Number,
      reason: String,
      status: String,
      processedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ orderId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ paymentId: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);