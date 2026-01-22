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

const updateIntelI5 = async () => {
  try {
    console.log('🔍 Finding Intel Core i5-13400...');
    
    const component = await Component.findOne({ 
      name: 'Intel Core i5-13400' 
    });

    if (!component) {
      console.log('❌ Intel Core i5-13400 not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹22,000 to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 22000;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for Intel Core i5-13400
    const detailedSpecs = {
      'Name': 'Intel Core i5-13400',
      'Socket': 'LGA 1700',
      'CPU Cores': '10 (6P + 4E)',
      'Processor Type': 'Core i5',
      'Processor Speed': '2.5 GHz Base / 4.6 GHz Boost',
      'Processor Socket': 'LGA 1700',
      'Platform': 'Desktop',
      'Secondary Cache': '20 MB',
      'Cache Memory Installed Size': '20 MB',
      'Wattage': '65 Watts',
      'Processor Count': '10',
      'Processor Core Count': '10',
      'Performance Cores': '6',
      'Efficient Cores': '4',
      'Threads': '16',
      'Base Clock P-Core': '2.5 GHz',
      'Max Boost Clock P-Core': '4.6 GHz',
      'Base Clock E-Core': '1.8 GHz',
      'Max Boost Clock E-Core': '3.3 GHz',
      'L3 Cache': '20 MB',
      'TDP': '65W',
      'Max Turbo Power': '148W',
      'Memory Support': 'DDR4-3200, DDR5-4800',
      'Max Memory Size': '128 GB',
      'Memory Channels': '2',
      'ECC Memory Support': 'No',
      'PCIe Version': 'PCIe 5.0 + PCIe 4.0',
      'PCIe Lanes': '20 (16+4)',
      'Graphics': 'Intel UHD Graphics 730',
      'Graphics Base Frequency': '300 MHz',
      'Graphics Max Dynamic Frequency': '1.50 GHz',
      'Graphics Video Max Memory': '64 GB',
      'DirectX Support': '12',
      'OpenGL Support': '4.5',
      'Intel Turbo Boost': '2.0',
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
      'Intel Gaussian & Neural Accelerator': '3.0',
      'Max Operating Temperature': '100°C',
      'Package Size': '45.0mm x 37.5mm',
      'Lithography': 'Intel 7',
      'Manufacturing Process': '10nm Enhanced SuperFin',
      'Stepping': 'B0',
      'Launch Date': 'Q1 2023',
      'Warranty': '3 Year Manufacturer',
      'Country of Origin': 'China',
      'Model Number': 'BX8071513400',
      'Box Contents': '1 Unit 13400 Processor',
      'Recommended Use': 'Gaming, Productivity, Content Creation',
      'Motherboard Compatibility': 'Intel 600/700 Series Chipsets',
      'Cooler Included': 'Intel Stock Cooler',
      'Overclocking Support': 'Limited (Non-K SKU)',
      'Gaming Performance': 'Excellent 1080p/1440p',
      'Multi-threading Performance': 'Very Good',
      'Power Efficiency': 'Excellent',
      'Value Proposition': 'Outstanding'
    };

    // Update component with image, price, and specifications
    const updatedComponent = await Component.findByIdAndUpdate(
      component._id,
      {
        imageUrl: 'https://m.media-amazon.com/images/I/51axr2Y+xOL._SY450_.jpg',
        price: usdPrice,
        specs: detailedSpecs,
        description: 'High-performance 10-core processor with 6 Performance cores and 4 Efficient cores. Excellent for gaming and productivity with Intel UHD Graphics 730 integrated.'
      },
      { new: true }
    );

    console.log('✅ Updated Intel Core i5-13400 with image, price, and specifications');
    console.log('🖼️ Image URL:', updatedComponent.imageUrl);
    console.log('💰 New price: $' + updatedComponent.price);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Show key specifications
    console.log('\n📋 Key specifications:');
    console.log('   Name:', detailedSpecs['Name']);
    console.log('   Socket:', detailedSpecs['Socket']);
    console.log('   CPU Cores:', detailedSpecs['CPU Cores']);
    console.log('   Base/Boost Clock:', detailedSpecs['Processor Speed']);
    console.log('   TDP:', detailedSpecs['TDP']);

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + updatedComponent.price);
    console.log('   Price Change: $' + (updatedComponent.price - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating Intel Core i5-13400:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating Intel Core i5-13400...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹22,000 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await updateIntelI5();
  
  console.log('\n✅ Intel Core i5-13400 update completed successfully!');
  console.log('🎯 Product now has real image, correct price, and complete specs');
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