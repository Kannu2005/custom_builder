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

const fixGSkillSocket = async () => {
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

    // Create clean specs object with Socket added
    const cleanSpecs = {
      'Name': 'G.Skill Trident Z5 64GB DDR5',
      'Socket': 'DIMM (288-pin DDR5)',
      'Memory Size': '64GB (2 x 32GB)',
      'Tested Latency': '36-36-36-76',
      'Tested Speed': '6000 MT/s',
      'Tested Voltage': '1.35V',
      'SPD Voltage': '1.1V',
      'Speed Rating': 'PC5-48000 (DDR5-6000)',
      'SPD Speed': '4800MHz',
      'SPD Latency': '40-40-40-77',
      'Performance Profile': 'XMP 3.0',
      'Package Memory Format': 'UDIMM',
      'Package Memory Pin': '288',
      'Weight': '0.15kg',
      'Heat Spreader': 'Aluminum',
      'Fan Included': 'No',
      'Memory Color': 'BLACK',
      'Memory Compatibility': 'Intel 600 Series, Intel 700 Series, Intel 800 Series, AMD AM5',
      'Memory Detail Compatibility': 'Intel 600/700/800 Series, AMD AM5',
      'Memory Type': 'DDR5',
      'Power Draw': 'Standard JEDEC',
      'RGB Lighting': 'Yes',
      'Warranty': 'Lifetime Limited',
      'Operating Temperature': '0°C to 85°C',
      'Kit Configuration': '2 x 32GB',
      'Rank': 'Dual Rank',
      'Error Correction': 'Non-ECC',
      'Buffered/Registered': 'Unbuffered',
      'CAS Latency': 'CL36',
      'Row Address Strobe': 'tRAS 76',
      'Row Precharge Time': 'tRP 36',
      'RAS to CAS Delay': 'tRCD 36',
      'Command Rate': '2T',
      'Intel XMP': '3.0 Ready',
      'AMD EXPO': 'Compatible',
      'JEDEC Standard': 'DDR5-4800',
      'Module Height': '44mm',
      'PCB Color': 'Black',
      'IC Brand': 'Samsung',
      'IC Grade': 'A-Die',
      'Overclocking Potential': 'High',
      'Gaming Performance': 'Excellent',
      'Content Creation': 'Professional Grade',
      'Multi-tasking': 'Superior',
      'Future Proof': 'DDR5 Standard',
      'Build Quality': 'Premium',
      'Brand Reputation': 'Industry Leading',
      'Customer Support': 'Excellent',
      'Availability': 'Worldwide',
      'Price Performance': 'Competitive',
      'Recommended Use': 'Gaming, Content Creation, Workstation',
      'Socket Compatibility': 'LGA1700, AM5',
      'Motherboard Support': 'Z690, Z790, B650, X670',
      'CPU Support': 'Intel 12th/13th/14th Gen, AMD Ryzen 7000 Series'
    };

    // Update component with clean specs
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          specs: cleanSpecs
        }
      }
    );

    console.log('✅ Updated G.Skill Trident Z5 64GB DDR5 with Socket specification');
    console.log('🔌 Socket added:', cleanSpecs['Socket']);
    console.log('📊 Total specifications:', Object.keys(cleanSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Memory Size:', verifyComponent.specs.get('Memory Size'));

  } catch (error) {
    console.error('❌ Error fixing G.Skill socket:', error);
  }
};

const main = async () => {
  console.log('🚀 Fixing Socket specification for G.Skill Trident Z5 64GB DDR5...\n');
  
  await connectDB();
  await fixGSkillSocket();
  
  console.log('\n✅ Socket specification fixed successfully!');
  console.log('🎯 G.Skill RAM now has proper Socket information');
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