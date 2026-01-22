const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const forceCreateAdmin = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin if exists
    const existingAdmin = await User.findOne({ email: 'admin@pcbuilder.com' });
    if (existingAdmin) {
      console.log('🗑️ Removing existing admin user...');
      await User.deleteOne({ email: 'admin@pcbuilder.com' });
      console.log('✅ Existing admin removed');
    }

    // Create new admin user
    console.log('🔐 Creating new admin user...');
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    
    const admin = new User({
      name: 'Admin',
      email: 'admin@pcbuilder.com',
      passwordHash: hashedPassword,
      role: 'admin',
      emailVerificationCode: null,
      emailVerificationCodeExpiry: null,
      pendingEmail: null
    });

    await admin.save();
    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@pcbuilder.com');
    console.log('🔑 Password: Admin@123');
    console.log('👑 Role: admin');
    
    // Verify admin was created
    const verifyAdmin = await User.findOne({ email: 'admin@pcbuilder.com' });
    if (verifyAdmin && verifyAdmin.role === 'admin') {
      console.log('✅ Admin verification successful!');
      console.log('🆔 Admin ID:', verifyAdmin._id);
    } else {
      console.log('❌ Admin verification failed!');
    }
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    if (error.code === 11000) {
      console.log('📧 Email already exists. Trying to update existing user...');
      try {
        const hashedPassword = await bcrypt.hash('Admin@123', 12);
        await User.updateOne(
          { email: 'admin@pcbuilder.com' },
          { 
            role: 'admin',
            passwordHash: hashedPassword,
            name: 'Admin'
          }
        );
        console.log('✅ Existing user updated to admin!');
      } catch (updateError) {
        console.error('❌ Failed to update existing user:', updateError);
      }
    }
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

forceCreateAdmin();