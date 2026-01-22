const mongoose = require('mongoose');

async function connectDB() {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  // Ensure database name is in the connection string
  // If not present, add 'custompcbuilder' as default database
  if (!uri.includes('/?') && !uri.match(/\/[^?]+(\?|$)/)) {
    // Add database name if not present
    uri = uri.replace(/\/\?/, '/custompcbuilder?');
    if (!uri.includes('?')) {
      uri = uri + '/custompcbuilder';
    }
  }

  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const dbName = connection.connection.name;
    const dbHost = connection.connection.host;
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${dbName}`);
    console.log(`🌐 Host: ${dbHost}`);
    console.log(`💾 All data will be saved to MongoDB Atlas cloud server`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Please check:');
    console.error('1. MongoDB Atlas connection string is correct');
    console.error('2. Your IP is whitelisted in MongoDB Atlas');
    console.error('3. Database user credentials are correct');
    process.exit(1);
  }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

module.exports = { connectDB };
