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

const updateRTX4090NewImage = async () => {
  try {
    console.log('🔍 Finding all NVIDIA RTX 4090 components...');
    
    const components = await Component.find({
      $or: [
        { name: { $regex: 'RTX 4090', $options: 'i' } },
        { name: { $regex: 'NVIDIA.*4090', $options: 'i' } }
      ]
    });

    console.log(`📦 Found ${components.length} RTX 4090 components`);

    if (components.length === 0) {
      console.log('❌ No RTX 4090 components found!');
      return;
    }

    // New improved Amazon RTX 4090 image URL (user provided)
    const newImageUrl = 'https://m.media-amazon.com/images/I/514QPBuqGyL.jpg';
    
    let updatedCount = 0;

    for (const component of components) {
      console.log(`\n🔧 Updating: ${component.name}`);
      console.log(`   Current Image: ${component.imageUrl}`);
      console.log(`   Current Price: $${component.price}`);

      // Update with new improved image URL
      await Component.findByIdAndUpdate(component._id, {
        imageUrl: newImageUrl
      });

      console.log(`✅ Updated image URL to: ${newImageUrl}`);
      updatedCount++;
    }

    console.log(`\n🎉 Successfully updated ${updatedCount} RTX 4090 components with new improved image!`);
    
    // Verify the updates
    console.log('\n🔍 Verification:');
    const verifyComponents = await Component.find({
      $or: [
        { name: { $regex: 'RTX 4090', $options: 'i' } },
        { name: { $regex: 'NVIDIA.*4090', $options: 'i' } }
      ]
    });

    verifyComponents.forEach((comp, index) => {
      console.log(`   ${index + 1}. ${comp.name}`);
      console.log(`      Image: ${comp.imageUrl}`);
      console.log(`      Price: $${comp.price}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Error updating NVIDIA RTX 4090 image:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating NVIDIA RTX 4090 with new improved image...\n');
  console.log('🖼️ Replacing with better Amazon product image\n');
  
  await connectDB();
  await updateRTX4090NewImage();
  
  console.log('\n✅ RTX 4090 image update completed successfully!');
  console.log('🎯 RTX 4090 now has improved image quality');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();