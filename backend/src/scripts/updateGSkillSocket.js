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

const updateGSkillSocket = async () => {
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
    console.log('🔍 Current specs keys:', Object.keys(component.specs || {}));

    // Add Socket to specifications
    const updatedSpecs = {
      ...component.specs,
      'Socket': 'DIMM (288-pin DDR5)'
    };

    // Update component with socket information
    const updatedComponent = await Component.findByIdAndUpdate(
      component._id,
      {
        specs: updatedSpecs
      },
      { new: true }
    );

    console.log('✅ Added Socket specification to G.Skill Trident Z5 64GB DDR5');
    console.log('🔌 Socket added:', updatedSpecs['Socket']);
    console.log('📊 Total specifications:', Object.keys(updatedSpecs).length);
    
    // Verify the socket was added
    console.log('\n🔍 Verification:');
    console.log('   Name:', updatedComponent.specs['Name']);
    console.log('   Socket:', updatedComponent.specs['Socket']);
    console.log('   Memory Size:', updatedComponent.specs['Memory Size']);

  } catch (error) {
    console.error('❌ Error updating G.Skill socket:', error);
  }
};

const main = async () => {
  console.log('🚀 Adding Socket specification to G.Skill Trident Z5 64GB DDR5...\n');
  
  await connectDB();
  await updateGSkillSocket();
  
  console.log('\n✅ Socket specification added successfully!');
  console.log('🎯 G.Skill RAM now has Socket information');
  console.log('📱 Ready for Name, Socket, Cores layout in Build page');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();