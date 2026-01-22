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

const updateNVIDIARTX4090 = async () => {
  try {
    console.log('🔍 Finding NVIDIA RTX 4090...');
    
    const component = await Component.findOne({ 
      name: 'NVIDIA RTX 4090' 
    });

    if (!component) {
      console.log('❌ NVIDIA RTX 4090 not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹175,000 (mid-range of ₹50,000 to ₹300,000) to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 175000; // Mid-range value
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price Range: ₹50,000 to ₹300,000');
    console.log('   INR Price Used: ₹' + inrPrice.toLocaleString() + ' (mid-range)');
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for NVIDIA RTX 4090
    const detailedSpecs = {
      'Name': 'NVIDIA RTX 4090',
      'Socket': 'PCIe 4.0 x16',
      'Stream Processors': '16384',
      'Graphics Coprocessor': 'NVIDIA GeForce RTX 4090',
      'Brand': 'GeForce',
      'Graphics RAM Size': '24 GB',
      'Video Output Interface': 'HDMI',
      'Graphics Processor Manufacturer': 'NVIDIA',
      'Graphics Card Ram': '24 GB',
      'Graphics Ram Type': 'GDDR6X',
      'Compatible Devices': 'Desktop',
      'Maximum Display Resolution': '8K (7680 x 4320) Pixels',
      'Graphics Card Interface': 'PCI-Express x16',
      'Memory Clock Speed': '2.23 GHz',
      'Number of Fans': '2',
      'Brand Name': 'GeForce',
      'Video Processor': 'NVIDIA',
      'Antenna Location': 'Gaming',
      'Model Name': 'GeForce RTX 4090',
      'Graphics Description': 'Dedicated',
      'Manufacturer': 'NVIDIA GeForce',
      'UPC': '812674025193, 753275505625',
      'Item Height': '0.1 Centimeters',
      'GPU Architecture': 'Ada Lovelace',
      'Manufacturing Process': '4nm TSMC',
      'Base Clock': '2230 MHz',
      'Boost Clock': '2520 MHz',
      'Memory Interface': '384-bit',
      'Memory Bandwidth': '1008 GB/s',
      'RT Cores': '128 (3rd Gen)',
      'Tensor Cores': '512 (4th Gen)',
      'CUDA Cores': '16384',
      'Shading Units': '16384',
      'Texture Mapping Units': '512',
      'Render Output Units': '176',
      'L2 Cache': '96 MB',
      'DirectX Support': '12 Ultimate',
      'OpenGL Support': '4.6',
      'Vulkan Support': '1.3',
      'Ray Tracing': 'Hardware Accelerated',
      'DLSS Support': 'DLSS 3 with Frame Generation',
      'NVENC Encoders': '2x AV1, 2x H.264, 2x H.265',
      'NVDEC Decoders': 'AV1, H.264, H.265, VP9',
      'Display Outputs': '3x DisplayPort 1.4a, 1x HDMI 2.1',
      'Multi-Monitor Support': 'Up to 4 displays',
      'VR Ready': 'Yes',
      'G-SYNC Compatible': 'Yes',
      'Power Consumption': '450W TGP',
      'Recommended PSU': '850W',
      'Power Connectors': '1x 16-pin (4x 8-pin adapter included)',
      'Cooling Solution': 'Dual Axial Flow Through',
      'Card Length': '304mm',
      'Card Width': '137mm',
      'Card Thickness': '3-slot (61mm)',
      'Weight': '2.2 kg',
      'PCIe Requirement': 'PCIe 4.0 x16',
      'SLI Support': 'No (NVLink discontinued)',
      'Gaming Performance': 'Flagship 4K Gaming',
      'Content Creation': 'Professional Workstation',
      'Streaming': 'AV1 Hardware Encoding',
      'AI Acceleration': 'CUDA, Tensor Cores',
      'Target Resolution': '4K Ultra, 8K Gaming',
      'Target Market': 'Enthusiasts, Professionals',
      'Competitive Performance': 'Fastest Consumer GPU',
      'Value Proposition': 'Ultimate Performance',
      'Availability': 'Limited Supply',
      'Launch Date': 'October 2022',
      'MSRP': '$1599 USD',
      'Warranty': 'Limited Warranty',
      'Driver Support': 'Game Ready Drivers',
      'Software Bundle': 'GeForce Experience',
      'Overclocking': 'GPU Boost 4.0',
      'Temperature Target': '83°C',
      'Idle Power': '23W',
      'Multi-GPU': 'Not Supported',
      'Compute Capability': '8.9',
      'CUDA Compute': 'Yes',
      'OpenCL Support': 'Yes',
      'Machine Learning': 'Optimized for AI/ML',
      'Professional Features': 'NVENC, NVDEC, CUDA',
      'Gaming Features': 'DLSS 3, Ray Tracing, Reflex',
      'Display Technology': 'HDR, Variable Rate Shading',
      'Future Proof': 'Next-Gen Gaming Ready'
    };

    // Update component with image, price, and specifications
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://www.amazon.in/NVIDIA-GeForce-Founders-Graphics-GDDR6X/dp/B0BJFRT43X',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'Flagship graphics card with 24GB GDDR6X memory, Ada Lovelace architecture, and DLSS 3 support. Ultimate performance for 4K gaming, content creation, and professional workloads with hardware-accelerated ray tracing.'
        }
      }
    );

    console.log('✅ Updated NVIDIA RTX 4090 with image, price, and specifications');
    console.log('🖼️ Image URL: https://www.amazon.in/NVIDIA-GeForce-Founders-Graphics-GDDR6X/dp/B0BJFRT43X');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Stream Processors:', verifyComponent.specs.get('Stream Processors'));
    console.log('   Memory:', verifyComponent.specs.get('Graphics RAM Size'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating NVIDIA RTX 4090:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating NVIDIA RTX 4090...\n');
  console.log('🖼️ Adding Amazon product link');
  console.log('💱 Converting ₹175,000 (mid-range) to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await updateNVIDIARTX4090();
  
  console.log('\n✅ NVIDIA RTX 4090 update completed successfully!');
  console.log('🎯 Flagship GPU now has product link, correct price, and complete specs');
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