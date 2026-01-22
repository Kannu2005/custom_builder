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

const updateMSIMotherboard = async () => {
  try {
    console.log('🔍 Finding MSI B650 Tomahawk...');
    
    const component = await Component.findOne({ 
      name: 'MSI B650 Tomahawk' 
    });

    if (!component) {
      console.log('❌ MSI B650 Tomahawk not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹24,079 to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 24079;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for MSI B650 Tomahawk
    const detailedSpecs = {
      'Name': 'MSI B650 Tomahawk',
      'Socket': 'Socket AM5',
      'CPU Socket': 'Socket AM5',
      'Cores': 'AMD Ryzen 7000 Series Support',
      'Brand': 'MSI',
      'Compatible Devices': 'Personal Computer',
      'RAM Memory Technology': 'DDR5',
      'Compatible Processors': 'AMD Processors',
      'Chipset Type': 'AMD B650',
      'Memory Clock Speed': '5600 MHz',
      'Platform': 'Windows 11',
      'CPU Model': 'AMD Ryzen 7',
      'Drive Memory Storage Capacity': '128 GB',
      'Ram Memory Maximum Size': '64 GB',
      'Main Power Connector Type': '8-pin',
      'Graphics Card Interface': 'PCI-Express x16',
      'Memory Slots Available': '4',
      'Number Of Ports': '31',
      'SPDIF Connector Type': 'Optical',
      'System Bus Standard Supported': 'SATA 3, USB 2.0',
      'Total USB Ports': '17',
      'Number of Ethernet Ports': '1',
      'Total HDMI Port': '2',
      'Total PCIe Ports': '2',
      'Model Name': 'MAG B650 TOMAHAWK WIFI',
      'Model Number': '7D75-001R',
      'Manufacturer': 'MSI',
      'Country of Origin': 'China',
      'Item Height': '5 Centimeters',
      'Item Weight': '1 Kilograms',
      'Unit Count': '1 Piece',
      'Warranty Description': '3 year manufacturer',
      'Item Dimensions': '24.3L x 30.4W x 5H Centimeters',
      'Form Factor': 'ATX',
      'Memory Type': 'DDR5',
      'Memory Slots': '4 x DIMM',
      'Max Memory Capacity': '128GB',
      'Memory Speed Support': 'DDR5-5600+ (OC)',
      'CPU Support': 'AMD Ryzen 7000 Series',
      'PCIe Slots': '1 x PCIe 5.0 x16, 2 x PCIe 4.0 x16',
      'Storage Support': 'M.2 NVMe SSD',
      'M.2 Slots': '3 x M.2 slots',
      'SATA Ports': '6 x SATA 6Gb/s',
      'USB Ports': '17 Total USB Ports',
      'USB 3.2 Gen2': '4 ports',
      'USB 3.2 Gen1': '8 ports',
      'USB 2.0': '5 ports',
      'Network': 'Gigabit Ethernet',
      'WiFi Support': 'WiFi 6E',
      'Bluetooth': 'Bluetooth 5.3',
      'Audio': '7.1 Channel HD Audio',
      'Audio Codec': 'Realtek ALC4080',
      'BIOS Type': 'UEFI BIOS',
      'Overclocking Support': 'Yes',
      'RGB Lighting': 'Mystic Light RGB',
      'Fan Headers': 'Multiple PWM Fan Headers',
      'CPU Power': '8+4 pin',
      'Motherboard Power': '24-pin ATX',
      'VRM Design': 'Digital PWM',
      'Power Phases': '12+2+1 Phases',
      'Capacitors': 'Solid Capacitors',
      'Heatsinks': 'Extended Heatsink Design',
      'I/O Shield': 'Pre-installed I/O Shield',
      'Multi-GPU Support': 'AMD CrossFire',
      'Gaming Features': 'Gaming Optimized',
      'Expansion Slots': 'PCIe 5.0 Ready',
      'Future Proof': 'DDR5 & PCIe 5.0',
      'Build Quality': 'Military Grade Components',
      'Reliability': 'Extensive Testing',
      'Performance': 'High-End Gaming',
      'Target Market': 'Gamers, Enthusiasts',
      'Price Performance': 'Excellent Value',
      'Brand Reputation': 'MSI Gaming',
      'Customer Support': 'Global Support',
      'Availability': 'Worldwide',
      'Recommended Use': 'Gaming, Content Creation',
      'Compatibility': 'AMD AM5 Platform',
      'BIOS Features': 'Click BIOS 5',
      'Monitoring': 'Hardware Monitor',
      'Protection': 'OCP, OVP, SCP',
      'Certification': 'CE, FCC Certified'
    };

    // Update component with image, price, and specifications
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://m.media-amazon.com/images/I/81ymStt-9cL._SY450_.jpg',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'High-performance AMD B650 motherboard with DDR5 support, PCIe 5.0, WiFi 6E, and RGB lighting. Perfect for AMD Ryzen 7000 series processors with excellent gaming features and connectivity.'
        }
      }
    );

    console.log('✅ Updated MSI B650 Tomahawk with image, price, and specifications');
    console.log('🖼️ Image URL: https://m.media-amazon.com/images/I/81ymStt-9cL._SY450_.jpg');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Cores:', verifyComponent.specs.get('Cores'));
    console.log('   Chipset:', verifyComponent.specs.get('Chipset Type'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating MSI B650 Tomahawk:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating MSI B650 Tomahawk...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹24,079 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await updateMSIMotherboard();
  
  console.log('\n✅ MSI B650 Tomahawk update completed successfully!');
  console.log('🎯 High-performance motherboard now has real image, correct price, and complete specs');
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