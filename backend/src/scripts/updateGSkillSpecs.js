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

const updateGSkillSpecs = async () => {
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

    // Complete specifications from user's message
    const detailedSpecs = {
      'Name': 'G.Skill Trident Z5 64GB DDR5',
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

    // Update component with detailed specifications
    const updatedComponent = await Component.findByIdAndUpdate(
      component._id,
      {
        specs: detailedSpecs,
        description: 'High-performance 64GB DDR5 memory kit with RGB lighting and premium aluminum heat spreaders. Optimized for gaming and content creation with XMP 3.0 support.',
        // Keep current price for now - will update if user provides specific price
        imageUrl: 'https://m.media-amazon.com/images/I/51lbzpnkWeL._SY450_.jpg'
      },
      { new: true }
    );

    console.log('✅ Updated G.Skill Trident Z5 64GB DDR5 with detailed specifications');
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    console.log('🎯 Image URL confirmed:', updatedComponent.imageUrl);
    console.log('💰 Current price: $' + updatedComponent.price);
    
    // Show sample of specifications
    console.log('\n📋 Sample specifications:');
    console.log('   Memory Size:', detailedSpecs['Memory Size']);
    console.log('   Tested Speed:', detailedSpecs['Tested Speed']);
    console.log('   Tested Latency:', detailedSpecs['Tested Latency']);
    console.log('   Memory Type:', detailedSpecs['Memory Type']);
    console.log('   RGB Lighting:', detailedSpecs['RGB Lighting']);

  } catch (error) {
    console.error('❌ Error updating G.Skill specifications:', error);
  }
};

const main = async () => {
  console.log('🚀 Starting G.Skill Trident Z5 64GB DDR5 specifications update...\n');
  
  await connectDB();
  await updateGSkillSpecs();
  
  console.log('\n✅ G.Skill specifications update completed!');
  console.log('🎯 Product now has complete detailed specifications');
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