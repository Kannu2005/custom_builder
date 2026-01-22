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

const updateNVIDIARTX4060 = async () => {
  try {
    console.log('🔍 Finding NVIDIA RTX 4060...');
    
    const component = await Component.findOne({ 
      name: 'NVIDIA RTX 4060' 
    });

    if (!component) {
      console.log('❌ NVIDIA RTX 4060 not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹32,900 to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 32900;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for NVIDIA RTX 4060
    const detailedSpecs = {
      'Name': 'NVIDIA RTX 4060',
      'Socket': 'PCIe 4.0 x16',
      'Stream Processors': '3072',
      'Graphics Coprocessor': 'NVIDIA GeForce RTX 4060',
      'Brand': 'MSI',
      'Graphics RAM Size': '8GB',
      'GPU Clock Speed': '2595 MHz',
      'Video Output Interface': 'DisplayPort, HDMI',
      'Graphics Card Ram': '8GB',
      'Graphics Ram Type': 'GDDR6',
      'Compatible Devices': 'Desktop',
      'Maximum Display Resolution': '7680 x 4320',
      'Graphics Card Interface': 'PCI-Express x16',
      'Memory Clock Speed': '3500 MHz',
      'Item Dimensions': '24.7L x 13W Centimeters',
      'Brand Name': 'MSI',
      'Video Processor': 'NVIDIA',
      'Antenna Location': 'Gaming',
      'Box Contents': 'Graphic Card',
      'Model Name': 'RTX 4060 GAMING X 8G',
      'Graphics Description': 'Dedicated',
      'Manufacturer': 'MSI, Micro Star International',
      'Item Type Name': 'Gaming Graphic Card',
      'Item Height': '41 Millimeters',
      'Item Weight': '587 Grams',
      'Unit Count': '1 Count',
      'Warranty Description': '3 year warranty',
      'GPU Architecture': 'Ada Lovelace',
      'Manufacturing Process': '5nm TSMC',
      'CUDA Cores': '3072',
      'RT Cores': '24 (3rd Gen)',
      'Tensor Cores': '96 (4th Gen)',
      'Base Clock': '1830 MHz',
      'Boost Clock': '2595 MHz',
      'Memory Interface': '128-bit',
      'Memory Bandwidth': '272 GB/s',
      'Memory Type': 'GDDR6',
      'Memory Size': '8GB',
      'Memory Speed': '17 Gbps',
      'TGP': '115W',
      'Recommended PSU': '550W',
      'Power Connectors': '1x 8-pin',
      'Display Outputs': '3x DisplayPort 1.4a, 1x HDMI 2.1',
      'Max Digital Resolution': '7680x4320 @ 60Hz',
      'Multi-Monitor Support': '4 displays',
      'DirectX Support': 'DirectX 12 Ultimate',
      'OpenGL Support': 'OpenGL 4.6',
      'Vulkan Support': 'Vulkan 1.3',
      'Ray Tracing': 'Real-time Ray Tracing',
      'DLSS Support': 'DLSS 3',
      'AV1 Encoding': 'Dual AV1 Encoders',
      'AV1 Decoding': 'Yes',
      'NVENC': '2x H.264/H.265 Encoders',
      'NVDEC': '2x H.264/H.265/AV1 Decoders',
      'VR Ready': 'Yes',
      'G-SYNC Compatible': 'Yes',
      'NVIDIA Reflex': 'Yes',
      'NVIDIA Broadcast': 'Yes',
      'NVIDIA Studio': 'Yes',
      'Form Factor': 'Dual Slot',
      'Cooling Solution': 'MSI Twin Frozr 9',
      'Fan Configuration': 'Dual Fan',
      'RGB Lighting': 'MSI Mystic Light',
      'Backplate': 'Yes',
      'Zero RPM Mode': 'Yes',
      'Overclocking': 'MSI Afterburner Support',
      'Gaming Performance': '1080p High/Ultra Settings',
      'Content Creation': 'Streaming, Video Editing',
      'Target Market': 'Mainstream Gaming',
      'Competitive Gaming': 'Excellent',
      'Esports Performance': 'High FPS Gaming',
      'Power Efficiency': 'Excellent',
      'Thermal Design': 'Advanced Cooling',
      'Build Quality': 'Premium Components',
      'Brand Reputation': 'MSI Gaming',
      'Customer Support': 'Global Support',
      'Availability': 'Worldwide',
      'Price Performance': 'Excellent Value',
      'Recommended Use': '1080p/1440p Gaming',
      'Future Proof': 'DLSS 3, AV1 Support',
      'Software Bundle': 'MSI Center, Afterburner',
      'Monitoring': 'GPU-Z, MSI Afterburner',
      'Compatibility': 'PCIe 4.0 Ready',
      'Installation': 'Standard PCIe x16 Slot'
    };

    // Update component with image, price, and specifications
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://m.media-amazon.com/images/I/71togGpKdcL._SY450_.jpg',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'High-performance RTX 4060 graphics card with 8GB GDDR6 memory, DLSS 3 support, and real-time ray tracing. Perfect for 1080p/1440p gaming with excellent power efficiency and MSI Twin Frozr cooling.'
        }
      }
    );

    console.log('✅ Updated NVIDIA RTX 4060 with image, price, and specifications');
    console.log('🖼️ Image URL: https://m.media-amazon.com/images/I/71togGpKdcL._SY450_.jpg');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Stream Processors:', verifyComponent.specs.get('Stream Processors'));
    console.log('   Memory Size:', verifyComponent.specs.get('Memory Size'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating NVIDIA RTX 4060:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating NVIDIA RTX 4060...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹32,900 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await updateNVIDIARTX4060();
  
  console.log('\n✅ NVIDIA RTX 4060 update completed successfully!');
  console.log('🎯 High-performance GPU now has real image, correct price, and complete specs');
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