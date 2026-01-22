const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');
const { sendVerificationEmail } = require('../utils/emailService');

const router = express.Router();

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email and password are required');
    }

    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      throw new Error('User already exists with this email');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Update profile (protected route)
router.put('/profile', protect, async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      res.status(400);
      throw new Error('Name is required');
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim() },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});

// Send email verification code
router.post('/send-email-verification', protect, async (req, res, next) => {
  try {
    console.log('\n📧 Email Verification Request Received');
    console.log('User:', req.user.email);
    const { newEmail } = req.body;
    console.log('New Email:', newEmail);

    if (!newEmail || !newEmail.trim()) {
      res.status(400);
      throw new Error('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail.trim())) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: newEmail.trim().toLowerCase() });
    if (existingUser && existingUser._id.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error('Email already in use');
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated Code:', verificationCode);

    // Set expiry to 10 minutes from now
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);

    // Save code and pending email
    await User.findByIdAndUpdate(req.user._id, {
      emailVerificationCode: verificationCode,
      emailVerificationCodeExpiry: expiry,
      pendingEmail: newEmail.trim().toLowerCase(),
    });

    // Send verification email
    try {
      const emailResult = await sendVerificationEmail(newEmail.trim(), verificationCode);
      if (emailResult.previewUrl) {
        console.log(`\n📧 Email Preview URL: ${emailResult.previewUrl}`);
        console.log(`Open this URL in browser to see the email`);
      }
      console.log(`\n✅ Verification code sent to: ${newEmail.trim()}`);
      console.log(`Code: ${verificationCode} (expires in 10 minutes)\n`);
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError.message);
      // Still return success but log the code for development
      console.log(`\n⚠️ Email sending failed. Using console fallback.`);
      console.log(`Email: ${newEmail.trim()}`);
      console.log(`Verification Code: ${verificationCode}`);
      console.log(`Code expires in 10 minutes\n`);
    }

    res.json({
      message: 'Verification code sent to your email',
      // Always return code for testing (remove in production)
      code: verificationCode,
      email: newEmail.trim(),
    });
  } catch (err) {
    next(err);
  }
});

// Send registration OTP
router.post('/send-registration-otp', async (req, res, next) => {
  try {
    console.log('\n📧 Registration OTP Request Received');
    const { email } = req.body;
    console.log('Email:', email);

    if (!email || !email.trim()) {
      res.status(400);
      throw new Error('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      res.status(400);
      throw new Error('Email already registered. Please use a different email or login.');
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);

    // Store OTP in memory/cache (in production, use Redis)
    // For now, we'll use a simple in-memory store
    global.registrationOTPs = global.registrationOTPs || {};
    global.registrationOTPs[email.trim().toLowerCase()] = {
      otp,
      expiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    };

    // Send OTP email
    try {
      const emailResult = await sendVerificationEmail(email.trim(), otp, 'registration');
      if (emailResult.previewUrl) {
        console.log(`\n📧 Email Preview URL: ${emailResult.previewUrl}`);
        console.log(`Open this URL in browser to see the email`);
      }
      console.log(`\n✅ Registration OTP sent to: ${email.trim()}`);
      console.log(`OTP: ${otp} (expires in 10 minutes)\n`);
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError.message);
      console.log(`\n⚠️ Email sending failed. Using console fallback.`);
      console.log(`Email: ${email.trim()}`);
      console.log(`Registration OTP: ${otp}`);
      console.log(`OTP expires in 10 minutes\n`);
    }

    res.json({
      message: 'OTP sent to your email',
      // Return OTP for testing (remove in production)
      otp,
      email: email.trim(),
    });
  } catch (err) {
    next(err);
  }
});

// Verify registration OTP
router.post('/verify-registration-otp', async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400);
      throw new Error('Email and OTP are required');
    }

    // Check OTP from memory store
    global.registrationOTPs = global.registrationOTPs || {};
    const storedOTP = global.registrationOTPs[email.trim().toLowerCase()];

    if (!storedOTP) {
      res.status(400);
      throw new Error('No OTP found for this email. Please request a new OTP.');
    }

    if (storedOTP.otp !== otp.trim()) {
      res.status(400);
      throw new Error('Invalid OTP');
    }

    if (new Date() > storedOTP.expiry) {
      // Clean up expired OTP
      delete global.registrationOTPs[email.trim().toLowerCase()];
      res.status(400);
      throw new Error('OTP has expired. Please request a new one.');
    }

    // OTP is valid, clean it up
    delete global.registrationOTPs[email.trim().toLowerCase()];

    res.json({
      message: 'Email verified successfully',
      verified: true,
    });
  } catch (err) {
    next(err);
  }
});

// Verify email code and update email
router.post('/verify-email-code', protect, async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code || !code.trim()) {
      res.status(400);
      throw new Error('Verification code is required');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Check if code exists and matches
    if (!user.emailVerificationCode || user.emailVerificationCode !== code.trim()) {
      res.status(400);
      throw new Error('Invalid verification code');
    }

    // Check if code has expired
    if (!user.emailVerificationCodeExpiry || new Date() > user.emailVerificationCodeExpiry) {
      res.status(400);
      throw new Error('Verification code has expired. Please request a new one.');
    }

    // Check if pending email exists
    if (!user.pendingEmail) {
      res.status(400);
      throw new Error('No pending email change request');
    }

    // Update email and clear verification data
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        email: user.pendingEmail,
        emailVerificationCode: null,
        emailVerificationCodeExpiry: null,
        pendingEmail: null,
      },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json({
      message: 'Email updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

