const nodemailer = require('nodemailer');

// Create transporter - using Gmail SMTP (you can change this)
const createTransporter = async () => {
  // For Gmail, you need to use App Password or OAuth2
  // For development, you can use Ethereal Email (fake SMTP for testing)
  
  // Option 1: Gmail SMTP (requires App Password)
  if (process.env.EMAIL_SERVICE === 'gmail' && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password, not regular password
      },
    });
  }

  // Option 2: Generic SMTP
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Option 3: Ethereal Email (for testing - creates fake email account automatically)
  // This creates a test account on the fly for development
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('📧 Using Ethereal Email for testing');
    console.log('Test Account:', testAccount.user);
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    // Fallback: console log only (no actual email)
    console.log('⚠️ Email service not configured. Using console fallback.');
    return null;
  }
};

const sendVerificationEmail = async (email, code, type = 'profile') => {
  try {
    const transporter = await createTransporter();
    
    // If no transporter available, just log
    if (!transporter) {
      console.log(`\n📧 ${type === 'registration' ? 'Registration' : 'Email Verification'} Code (Email service not configured)`);
      console.log(`To: ${email}`);
      console.log(`Code: ${code}`);
      console.log(`Expires in: 10 minutes\n`);
      return { success: true, messageId: 'console-log' };
    }

    const isRegistration = type === 'registration';
    const subject = isRegistration 
      ? 'Registration Verification Code - Custom PC Builder'
      : 'Email Verification Code - Custom PC Builder';
    
    const title = isRegistration ? 'Welcome to Custom PC Builder!' : 'Email Verification';
    const message = isRegistration 
      ? 'Welcome! Please verify your email address to complete your registration and start building your dream PC.'
      : 'You have requested to change your email address. Please use the verification code below to complete the process.';

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'noreply@custompcbuilder.com',
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f9fafb;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🖥️ Custom PC Builder</h1>
          </div>
          <div style="background: rgba(15, 23, 42, 0.9); padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid rgba(148, 163, 184, 0.3);">
            <h2 style="color: #f9fafb; margin-top: 0; font-size: 24px;">${title}</h2>
            <p style="color: #d1d5db; line-height: 1.6; font-size: 16px;">
              ${message}
            </p>
            <div style="background: rgba(99, 102, 241, 0.1); border: 2px solid #6366f1; border-radius: 12px; padding: 25px; text-align: center; margin: 30px 0;">
              <p style="color: #6366f1; margin: 0 0 10px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Verification Code</p>
              <div style="font-size: 42px; font-weight: bold; color: #6366f1; letter-spacing: 8px; font-family: 'Courier New', monospace; margin: 10px 0;">
                ${code}
              </div>
            </div>
            ${isRegistration ? `
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h3 style="color: #10b981; margin: 0 0 10px 0; font-size: 18px;">🎉 What's Next?</h3>
                <p style="color: #d1d5db; margin: 0; line-height: 1.5;">
                  After verification, you'll be able to:
                </p>
                <ul style="color: #d1d5db; margin: 10px 0 0 20px; padding: 0;">
                  <li>🎮 Build gaming PCs</li>
                  <li>💼 Create workstations</li>
                  <li>🏠 Design home office setups</li>
                  <li>📋 Track your orders</li>
                </ul>
              </div>
            ` : ''}
            <p style="color: #9ca3af; font-size: 14px; margin-bottom: 0; text-align: center;">
              ⏰ This code will expire in 10 minutes<br>
              ${isRegistration ? "If you didn't create this account, please ignore this email." : "If you didn't request this change, please ignore this email."}
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 5px 0;">🔒 Secure • 🚀 Fast • 💯 Reliable</p>
            <p style="margin: 5px 0;">© ${new Date().getFullYear()} Custom PC Builder. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
        Custom PC Builder - ${isRegistration ? 'Registration' : 'Email'} Verification
        
        ${title}
        
        ${message}
        
        Your verification code is: ${code}
        
        This code will expire in 10 minutes.
        
        ${isRegistration ? "If you didn't create this account, please ignore this email." : "If you didn't request this change, please ignore this email."}
        
        © ${new Date().getFullYear()} Custom PC Builder
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
    // For Ethereal Email, log the preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log('\n📧 Email Preview URL (for testing):');
      console.log(previewUrl);
      console.log('You can open this URL in browser to see the email\n');
    }
    
    return { success: true, messageId: info.messageId, previewUrl };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email: ' + error.message);
  }
};

module.exports = {
  sendVerificationEmail,
};
