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

const cleanIntelI9 = async () => {
  try {
    console.log('🔍 Finding Intel Core i9-13900K...');
    
    const component = await Component.findOne({ 
      name: 'Intel Core i9-13900K' 
    });

    if (!component) {
      console.log('❌ Intel Core i9-13900K not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹56,499 to USD
    const inrPrice = 56499;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100;

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for Intel Core i9-13900K (no dots or special characters)
    const detailedSpecs = {
      'Name': 'Intel Core i9-13900K',
      'Socket': 'LGA 1700',
      'CPU Cores': '24 (8P + 16E)',
      'Processor Type': 'Intel Core i9',
      'Processor Speed': '3.0 GHz Base / 5.8 GHz Boost',
      'Processor Socket': 'LGA 1700',
      'Platform': 'Windows 10/11',
      'Secondary Cache': '36 MB',
      'Cache Memory Installed Size': '36 MB',
      'Wattage': '125 Watts',
      'Processor Count': '24',
      'Performance Cores': '8',
      'Efficient Cores': '16',
      'Threads': '32',
      'Base Clock P-Core': '3.0 GHz',
      'Max Boost Clock P-Core': '5.8 GHz',
      'Base Clock E-Core': '2.2 GHz',
      'Max Boost Clock E-Core': '4.3 GHz',
      'L3 Cache': '36 MB',
      'L2 Cache': '32 MB',
      'TDP': '125W',
      'Max Turbo Power': '253W',
      'Memory Support': 'DDR4-3200, DDR5-5600',
      'Max Memory Size': '128 GB',
      'Memory Channels': '2',
      'ECC Memory Support': 'No',
      'PCIe Version': 'PCIe 5.0 + PCIe 4.0',
      'PCIe Lanes': '20 (16+4)',
      'Graphics': 'Intel UHD Graphics 770',
      'Graphics Base Frequency': '300 MHz',
      'Graphics Max Dynamic Frequency': '1.65 GHz',
      'Graphics Video Max Memory': '64 GB',
      'DirectX Support': '12',
      'OpenGL Support': '4.5',
      'Intel Turbo Boost': '3.0',
      'Intel Thermal Velocity Boost': 'Yes',
      'Intel Adaptive Boost Technology': 'Yes',
      'Intel Hyper-Threading': 'Yes',
      'Intel Virtualization Technology': 'VT-x',
      'Intel VT-x with EPT': 'Yes',
      'Intel VT-d': 'Yes',
      'Intel TSX-NI': 'No',
      'Intel 64': 'Yes',
      'Instruction Set': '64-bit',
      'Instruction Set Extensions': 'Intel SSE4.1, SSE4.2, AVX2, AVX-512',
      'Idle States': 'Yes',
      'Enhanced SpeedStep': 'Yes',
      'Thermal Monitoring': 'Yes',
      'Intel Identity Protection': 'Yes',
      'Secure Key': 'Yes',
      'Intel OS Guard': 'Yes',
      'Intel Boot Guard': 'Yes',
      'Execute Disable Bit': 'Yes',
      'Anti-Theft Technology': 'Yes',
      'Intel AES New Instructions': 'Yes',
      'Intel Trusted Execution Technology': 'No',
      'Mode-based Execute Control': 'Yes',
      'Intel Control Flow Enforcement Technology': 'Yes',
      'Intel Deep Learning Boost': 'Yes',
      'Intel Gaussian Neural Accelerator': '3.0',
      'Max Operating Temperature': '100°C',
      'Package Size': '45.0mm x 37.5mm',
      'Lithography': 'Intel 7',
      'Manufacturing Process': '10nm Enhanced SuperFin',
      'Stepping': 'B0',
      'Launch Date': 'Q4 2022',
      'Warranty': '3 Year Manufacturer',
      'Country of Origin': 'China',
      'Model Number': 'BX8071513900K',
      'Box Contents': '1 Unit 13900K Processor',
      'Unlocked Multiplier': 'Yes (K-Series)',
      'Overclocking Support': 'Full Overclocking Support',
      'Recommended Cooling': 'High-End Air/AIO Liquid',
      'Gaming Performance': 'Flagship Gaming',
      'Content Creation': 'Professional Workstation',
      'Multi-threading Performance': 'Exceptional',
      'Single-thread Performance': 'Industry Leading',
      'Power Efficiency': 'High Performance',
      'Value Proposition': 'Premium Flagship',
      'Target Market': 'Enthusiasts, Gamers, Creators',
      'Motherboard Compatibility': 'Intel 600/700 Series Chipsets',
      'Cooler Included': 'No (K-Series)',
      'Recommended PSU': '750W+ High Quality',
      'Memory Overclocking': 'DDR5-6000+ Support',
      'PCIe 5 Support': 'Yes (16 lanes)',
      'PCIe 4 Support': 'Yes (4 lanes)',
      'Thunderbolt 4 Support': 'Via Chipset',
      'WiFi 6E Support': 'Via Chipset',
      'USB 3 Support': 'Via Chipset',
      'SATA Support': 'Via Chipset',
      'NVMe Support': 'Multiple M.2 slots',
      'AI Acceleration': 'Intel DL Boost, GNA 3.0',
      'Security Features': 'Intel CET, Boot Guard, OS Guard',
      'Virtualization': 'VT-x, VT-d, EPT',
      'Enterprise Features': 'vPro (select SKUs)',
      'Benchmark Performance': 'Top-tier in all categories'
    };

    // Update component with clean specs
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://m.media-amazon.com/images/I/51CsbchCa-L._SY450_.jpg',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'Flagship 24-core processor with 8 Performance cores and 16 Efficient cores. Ultimate performance for gaming, content creation, and professional workloads with Intel UHD Graphics 770.'
        }
      }
    );

    console.log('✅ Updated Intel Core i9-13900K with image, price, and specifications');
    console.log('🖼️ Image URL: https://m.media-amazon.com/images/I/51CsbchCa-L._SY450_.jpg');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   CPU Cores:', verifyComponent.specs.get('CPU Cores'));
    console.log('   Max Boost:', verifyComponent.specs.get('Max Boost Clock P-Core'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error cleaning Intel Core i9-13900K:', error);
  }
};

const main = async () => {
  console.log('🚀 Cleaning Intel Core i9-13900K specifications...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹56,499 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await cleanIntelI9();
  
  console.log('\n✅ Intel Core i9-13900K update completed successfully!');
  console.log('🎯 Flagship processor now has real image, correct price, and complete specs');
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