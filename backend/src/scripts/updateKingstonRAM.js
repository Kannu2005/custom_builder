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

const updateKingstonRAM = async () => {
  try {
    console.log('🔍 Finding Kingston Fury Beast 16GB DDR4...');
    
    const component = await Component.findOne({ 
      name: 'Kingston Fury Beast 16GB DDR4' 
    });

    if (!component) {
      console.log('❌ Kingston Fury Beast 16GB DDR4 not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹17,379 to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 17379;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for Kingston Fury Beast 16GB DDR4
    const detailedSpecs = {
      'Name': 'Kingston Fury Beast 16GB DDR4',
      'Socket': 'DIMM (288-pin DDR4)',
      'Memory Size': '16GB (1 x 16GB)',
      'RAM Memory Technology': 'DDR4',
      'Memory Speed': '3200 MHz',
      'Compatible Devices': 'Desktop',
      'Product Features': 'High-performance',
      'Voltage': '1.35 Volts',
      'Column Address Strobe Latency': '16',
      'Form Factor': 'DIMM',
      'Processor Speed': '3200 MHz',
      'Number Of Pins': '288',
      'RAM Size': '16 GB',
      'Brand Name': 'Kingston',
      'Model Name': 'Fury',
      'Memory Type': 'DDR4',
      'Memory Configuration': '1 x 16GB',
      'Memory Rank': 'Single Rank',
      'CAS Latency': 'CL16',
      'Memory Timing': '16-18-18',
      'JEDEC Standard': 'DDR4-2400',
      'XMP Profile': 'XMP 2.0',
      'Operating Temperature': '0°C to 85°C',
      'Storage Temperature': '-55°C to 100°C',
      'Humidity': '5% to 95% RH',
      'Heat Spreader': 'Aluminum',
      'Heat Spreader Color': 'Black',
      'PCB Color': 'Black',
      'Module Height': '34.1mm',
      'Module Depth': '133.35mm',
      'Module Width': '6.62mm',
      'Weight': '36.05 Grams',
      'Warranty': 'Life Time Warranty',
      'Country of Origin': 'China',
      'Manufacturer': 'Kingston Technology Company Inc',
      'UPC': '740617319859',
      'ASIN': 'B097K3WV9J',
      'Item Type': 'Memory module',
      'Unit Count': '1 Count',
      'Memory Compatibility': 'Intel/AMD Desktop Platforms',
      'Motherboard Support': 'DDR4 Compatible Motherboards',
      'CPU Support': 'Intel/AMD DDR4 Processors',
      'Overclocking Support': 'Yes (XMP 2.0)',
      'Gaming Performance': 'Excellent',
      'Multi-tasking': 'Very Good',
      'Content Creation': 'Good',
      'Power Consumption': 'Low',
      'Reliability': 'High',
      'Brand Reputation': 'Trusted',
      'Value Proposition': 'Excellent',
      'Target Market': 'Gamers, Enthusiasts',
      'Installation': 'Plug and Play',
      'Compatibility Testing': 'Extensive',
      'Quality Assurance': 'Rigorous Testing',
      'Performance Profile': 'High-Speed Gaming',
      'Memory Standard': 'JEDEC Compliant',
      'Error Correction': 'Non-ECC',
      'Buffered/Registered': 'Unbuffered',
      'Memory Channels': 'Single Channel (1 module)',
      'Dual Channel Ready': 'Yes (with matching module)',
      'Intel XMP': '2.0 Ready',
      'AMD EXPO': 'Not Supported (DDR4)',
      'Future Proof': 'DDR4 Standard',
      'Build Quality': 'Premium',
      'Customer Support': 'Excellent',
      'Availability': 'Worldwide',
      'Price Performance': 'Outstanding',
      'Recommended Use': 'Gaming, General Computing',
      'Socket Compatibility': 'DDR4 DIMM Slots',
      'Platform Support': 'Intel LGA1151/1200/1700, AMD AM4',
      'Chipset Support': 'Intel 100/200/300/400/500/600/700 Series, AMD 300/400/500 Series'
    };

    // Update component with image, price, and specifications
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://m.media-amazon.com/images/I/61MYgWr+xWL._SY450_.jpg',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'High-performance 16GB DDR4 memory module with aggressive styling and reliable performance. Perfect for gaming and general computing with XMP 2.0 support for easy overclocking.'
        }
      }
    );

    console.log('✅ Updated Kingston Fury Beast 16GB DDR4 with image, price, and specifications');
    console.log('🖼️ Image URL: https://m.media-amazon.com/images/I/61MYgWr+xWL._SY450_.jpg');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Memory Size:', verifyComponent.specs.get('Memory Size'));
    console.log('   Memory Speed:', verifyComponent.specs.get('Memory Speed'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating Kingston Fury Beast 16GB DDR4:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating Kingston Fury Beast 16GB DDR4...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹17,379 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await updateKingstonRAM();
  
  console.log('\n✅ Kingston Fury Beast 16GB DDR4 update completed successfully!');
  console.log('🎯 High-performance RAM now has real image, correct price, and complete specs');
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