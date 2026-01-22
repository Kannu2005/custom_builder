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

const checkNVIDIARTX4090 = async () => {
  try {
    console.log('🔍 Searching for NVIDIA RTX 4090 components...');
    
    // Search for all components that might be RTX 4090
    const components = await Component.find({
      $or: [
        { name: { $regex: 'RTX 4090', $options: 'i' } },
        { name: { $regex: '4090', $options: 'i' } },
        { name: { $regex: 'NVIDIA.*4090', $options: 'i' } }
      ]
    });

    console.log(`📦 Found ${components.length} RTX 4090 related components:`);
    
    if (components.length === 0) {
      console.log('❌ No RTX 4090 components found in database!');
      
      // Let's check all GPU components
      console.log('\n🔍 Checking all GPU components...');
      const allGPUs = await Component.find({ category: 'GPU' });
      console.log(`📦 Found ${allGPUs.length} GPU components:`);
      
      allGPUs.forEach((gpu, index) => {
        console.log(`   ${index + 1}. ${gpu.name}`);
        console.log(`      Image: ${gpu.imageUrl || 'No image'}`);
        console.log(`      Price: $${gpu.price}`);
        console.log('');
      });
      
      return;
    }

    components.forEach((component, index) => {
      console.log(`\n${index + 1}. Component Details:`);
      console.log(`   Name: ${component.name}`);
      console.log(`   Category: ${component.category}`);
      console.log(`   Brand: ${component.brand}`);
      console.log(`   Model: ${component.model}`);
      console.log(`   Price: $${component.price}`);
      console.log(`   Stock: ${component.stock}`);
      console.log(`   Image URL: ${component.imageUrl || 'No image URL'}`);
      console.log(`   Description: ${component.description || 'No description'}`);
      
      if (component.specs && Object.keys(component.specs).length > 0) {
        console.log(`   Specifications: ${Object.keys(component.specs).length} specs available`);
        console.log(`   Sample specs: Name=${component.specs.get('Name')}, Socket=${component.specs.get('Socket')}`);
      } else {
        console.log(`   Specifications: No specs available`);
      }
    });

  } catch (error) {
    console.error('❌ Error checking NVIDIA RTX 4090:', error);
  }
};

const main = async () => {
  console.log('🚀 Checking NVIDIA RTX 4090 image issue...\n');
  
  await connectDB();
  await checkNVIDIARTX4090();
  
  console.log('\n✅ Check completed!');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();