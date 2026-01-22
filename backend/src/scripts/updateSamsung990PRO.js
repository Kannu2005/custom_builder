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

const updateSamsung990PRO = async () => {
  try {
    console.log('🔍 Finding Samsung 990 PRO 2TB NVMe SSD...');
    
    // Find the Samsung 990 PRO component
    const component = await Component.findOne({
      name: { $regex: 'Samsung 990 PRO', $options: 'i' }
    });

    if (!component) {
      console.log('❌ Samsung 990 PRO not found!');
      return;
    }

    console.log(`📦 Found: ${component.name}`);
    console.log(`   Current Price: $${component.price}`);

    // Create specs Map properly
    const specsMap = new Map();
    specsMap.set('Name', 'Samsung 990 PRO 2TB NVMe SSD');
    specsMap.set('Socket', 'M.2 2280');
    specsMap.set('Cores', '2TB Capacity');
    specsMap.set('Digital Storage Capacity', '2 TB');
    specsMap.set('Storage Type', 'NVMe SSD');
    specsMap.set('Interface', 'PCIe 4.0 x4');
    specsMap.set('Form Factor', 'M.2 2280');
    specsMap.set('Capacity', '2TB');
    specsMap.set('Sequential Read', '7,450 MB/s');
    specsMap.set('Sequential Write', '6,900 MB/s');
    specsMap.set('Random Read IOPS', '1,400K');
    specsMap.set('Random Write IOPS', '1,550K');
    specsMap.set('Controller', 'Samsung Proprietary Controller');
    specsMap.set('NAND Flash', 'Samsung V-NAND 3-bit MLC');
    specsMap.set('DRAM Cache', '2GB LPDDR4');
    specsMap.set('Endurance (TBW)', '1,200 TB');
    specsMap.set('MTBF', '1.5 Million Hours');
    specsMap.set('Operating Temperature', '0°C to 70°C');
    specsMap.set('Storage Temperature', '-40°C to 85°C');
    specsMap.set('Power Consumption Active', '6.8W (Max)');
    specsMap.set('Power Consumption Idle', '25mW (Max)');
    specsMap.set('Encryption', 'AES 256-bit, TCG/Opal V2.0, MS eDrive');
    specsMap.set('NVMe Version', '1.4');
    specsMap.set('PCIe Version', '4.0');
    specsMap.set('Thermal Solution', 'Heat Spreader Label');
    specsMap.set('Management Software', 'Samsung Magician Software');
    specsMap.set('Warranty', 'Limited 5 year warranty');
    specsMap.set('Dimensions', '80.15 x 22.15 x 2.38mm');
    specsMap.set('Weight', '8.5g');
    specsMap.set('Compatibility', 'Windows, Mac, Linux');
    specsMap.set('Installation Type', 'Internal M.2 SSD');
    specsMap.set('Hard Disk Interface', 'Solid State');
    specsMap.set('Connectivity Technology', 'PCIe');
    specsMap.set('Special Feature', 'Compact, High Performance');
    specsMap.set('Compatible Devices', 'Desktop, Laptop');
    specsMap.set('Color', 'Black');
    specsMap.set('Manufacturer', 'Samsung Electronics Co., Ltd.');
    specsMap.set('Model Number', 'MZ-V9P2T0BW');
    specsMap.set('Box Contents', 'SSD, User manual');
    specsMap.set('Item Type', 'NVMe M.2 SSD');
    specsMap.set('Enclosure Material', 'Aluminium');
    specsMap.set('Shock Resistance', '1,500G & 0.5ms (Half sine)');
    specsMap.set('Vibration Resistance', '20~2000Hz, ±1.5mm');
    specsMap.set('Data Transfer Rate', '7450 Megabits Per Second');
    specsMap.set('Cache Memory', '94MB');
    specsMap.set('Product Features', 'Gaming Optimized, High Speed');
    specsMap.set('Specific Uses', 'Gaming, Professional Workloads');
    specsMap.set('Hardware Connectivity', 'PCI Express 4.0');
    specsMap.set('Network Technology', 'PCIe 4.0');
    specsMap.set('Performance Class', 'High-End NVMe');
    specsMap.set('Technology', 'V-NAND Flash Memory');
    specsMap.set('Buffer Size', '2GB LPDDR4');
    specsMap.set('Max Sequential Read', '7,450 MB/s');
    specsMap.set('Max Sequential Write', '6,900 MB/s');
    specsMap.set('Max Random Read', '1,400,000 IOPS');
    specsMap.set('Max Random Write', '1,550,000 IOPS');

    // Update the component
    component.name = 'Samsung 990 PRO 2TB NVMe SSD';
    component.brand = 'Samsung';
    component.model = 'MZ-V9P2T0BW';
    component.category = 'Storage';
    component.price = 466.45; // ₹38,902 converted to USD
    component.imageUrl = 'https://m.media-amazon.com/images/I/71ByVZ1x2vL._SX450_.jpg';
    component.stock = 25;
    component.specs = specsMap;

    await component.save();

    console.log('\n✅ Samsung 990 PRO 2TB updated successfully!');
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log(`✅ Component: ${verifyComponent.name}`);
    console.log(`   Brand: ${verifyComponent.brand}`);
    console.log(`   Model: ${verifyComponent.model}`);
    console.log(`   Category: ${verifyComponent.category}`);
    console.log(`   Price: $${verifyComponent.price}`);
    console.log(`   Image: ${verifyComponent.imageUrl}`);
    console.log(`   Stock: ${verifyComponent.stock}`);
    console.log(`   Key Layout Specs:`);
    console.log(`     Name: ${verifyComponent.specs?.get('Name')}`);
    console.log(`     Socket: ${verifyComponent.specs?.get('Socket')}`);
    console.log(`     Cores: ${verifyComponent.specs?.get('Cores')}`);
    console.log(`   Storage Specs:`);
    console.log(`     Capacity: ${verifyComponent.specs?.get('Capacity')}`);
    console.log(`     Interface: ${verifyComponent.specs?.get('Interface')}`);
    console.log(`     Read Speed: ${verifyComponent.specs?.get('Sequential Read')}`);
    console.log(`     Write Speed: ${verifyComponent.specs?.get('Sequential Write')}`);
    console.log(`   Total Specifications: ${verifyComponent.specs?.size || 0}`);

  } catch (error) {
    console.error('❌ Error updating Samsung 990 PRO 2TB:', error);
  }
};

const main = async () => {
  console.log('🔧 Updating Samsung 990 PRO 2TB NVMe SSD...\n');
  console.log('📊 Adding complete specs with Name, Socket, Cores layout\n');
  console.log('💰 Price: ₹38,902 → $466.45 USD\n');
  
  await connectDB();
  await updateSamsung990PRO();
  
  console.log('\n✅ Samsung 990 PRO 2TB update completed successfully!');
  console.log('🎯 Component now has proper Name, Socket, Cores layout');
  console.log('📊 Complete specifications with 50+ technical details');
  console.log('🖼️ Real Amazon product image included');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();