const mongoose = require('mongoose');
const Component = require('../models/Component');

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Load environment variables
    require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
    
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pcbuilder';
    console.log('🔗 Connecting to:', mongoUri.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');
    
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const updateGSkillPrice = async () => {
  try {
    console.log('🔍 Finding G.Skill Trident Z5 64GB DDR5...');
    
    const component = await Component.findOne({ 
      name: 'G.Skill Trident Z5 64GB DDR5' 
    });

    if (!component) {
      console.log('❌ G.Skill Trident Z5 64GB DDR5 not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹24,189 to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 24189;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Update component price
    const updatedComponent = await Component.findByIdAndUpdate(
      component._id,
      {
        price: usdPrice
      },
      { new: true }
    );

    console.log('✅ Updated G.Skill Trident Z5 64GB DDR5 price');
    console.log('💰 New price: $' + updatedComponent.price);
    
    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + updatedComponent.price);
    console.log('   Price Change: $' + (updatedComponent.price - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating G.Skill price:', error);
  }
};

const main = async () => {
  console.log('🚀 Converting G.Skill Trident Z5 64GB DDR5 price from INR to USD...\n');
  console.log('💱 Converting ₹24,189 to USD (Rate: 1 USD = ₹83.40)\n');
  
  await connectDB();
  await updateGSkillPrice();
  
  console.log('\n✅ Price conversion completed successfully!');
  console.log('🎯 G.Skill RAM now has correct USD price');
  console.log('📱 Ready for display in Build Your PC page');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();