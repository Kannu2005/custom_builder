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

const updateSeagateBarraCuda2TB = async () => {
  try {
    console.log('🔍 Finding Seagate BarraCuda 2TB HDD...');
    
    // Find existing Seagate BarraCuda or create new one
    let component = await Component.findOne({
      name: { $regex: 'Seagate BarraCuda 2TB', $options: 'i' }
    });

    if (!component) {
      console.log('➕ Creating new Seagate BarraCuda 2TB HDD...');
      component = new Component({
        name: 'Seagate BarraCuda 2TB HDD',
        brand: 'Seagate',
        model: 'ST2000DMZ08',
        category: 'Storage',
        price: 148.57,
        imageUrl: 'https://m.media-amazon.com/images/I/410ziAV5pVL._SY300_SX300_QL70_FMwebp_.jpg',
        stock: 30,
        specs: new Map()
      });
    } else {
      console.log('📦 Found existing Seagate BarraCuda 2TB HDD, updating...');
    }

    // Create specs Map properly (avoiding dots in keys)
    const specsMap = new Map();
    specsMap.set('Name', 'Seagate BarraCuda 2TB HDD');
    specsMap.set('Socket', 'SATA 3.5"');
    specsMap.set('Cores', '2TB Capacity');
    specsMap.set('Digital Storage Capacity', '2 TB');
    specsMap.set('Storage Type', 'Mechanical Hard Disk');
    specsMap.set('Interface', 'Serial ATA');
    specsMap.set('Form Factor', '3.5 Inches');
    specsMap.set('Capacity', '2TB');
    specsMap.set('Rotational Speed', '7200 RPM');
    specsMap.set('Read Speed', '220 Megabytes Per Second');
    specsMap.set('Write Speed', '220 Megabytes Per Second');
    specsMap.set('Cache Memory', '256MB');
    specsMap.set('Data Transfer Rate', '220 Megabits Per Second');
    specsMap.set('Hardware Connectivity', 'SATA 6.0 Gb/s');
    specsMap.set('Connectivity Technology', 'SATA');
    specsMap.set('Network Connectivity Technology', 'SATA');
    specsMap.set('Special Feature', 'SATA 6Gb');
    specsMap.set('Compatible Devices', 'Desktop');
    specsMap.set('Installation Type', 'Internal Hard Drive');
    specsMap.set('Color', 'Green & Black');
    specsMap.set('Brand Name', 'Seagate');
    specsMap.set('Model Number', 'ST2000DMZ08');
    specsMap.set('Model Name', 'BarraCuda');
    specsMap.set('Country of Origin', 'China');
    specsMap.set('Hard Disk Type', 'Mechanical Hard Disk');
    specsMap.set('Item Height', '0.28 Inches');
    specsMap.set('Item Weight', '0.99 Pounds');
    specsMap.set('Item Dimensions', '14.6L x 10.1W x 2Th Centimeters');
    specsMap.set('Unit Count', '1 Count');
    specsMap.set('Warranty Description', '3 Years of Brand Warranty');
    specsMap.set('Hard-Drive Size', '2 TB');
    specsMap.set('Product Features', 'SATA 6Gb, Reliable Storage');
    specsMap.set('Specific Uses', 'Personal, Desktop Storage');
    specsMap.set('Media Speed', '220 megabytes_per_second');
    specsMap.set('Cache Memory Installed Size', '256MB');
    specsMap.set('Performance Class', 'Desktop HDD');
    specsMap.set('Technology', 'Perpendicular Magnetic Recording');
    specsMap.set('Buffer Size', '256MB');
    specsMap.set('Max Sustained Transfer Rate', '220 MB/s');
    specsMap.set('Average Seek Time', '8.5ms');
    specsMap.set('Power Consumption Idle', '5.3W');
    specsMap.set('Power Consumption Active', '6.8W');
    specsMap.set('Operating Temperature', '0°C to 60°C');
    specsMap.set('Storage Temperature', '-40°C to 70°C');
    specsMap.set('Shock Tolerance Operating', '63G');
    specsMap.set('Shock Tolerance Non-Operating', '300G');
    specsMap.set('Vibration Tolerance', '0.25G');
    specsMap.set('MTBF', '1 Million Hours');
    specsMap.set('Workload Rate', '55TB/year');
    specsMap.set('Multi-Tier Caching', 'Yes');
    specsMap.set('Error Recovery Control', 'Yes');
    specsMap.set('SMART Support', 'Yes'); // Changed from S.M.A.R.T. to avoid dots
    specsMap.set('Instant Secure Erase', 'Yes');
    specsMap.set('Power Management', 'Advanced Power Management');
    specsMap.set('Acoustics Idle', '25dB');
    specsMap.set('Acoustics Seek', '28dB');
    specsMap.set('Reliability Rating', '4.6/5 stars (72,885 reviews)');
    specsMap.set('Best Seller Rank', '#39 in Internal Hard Drives');
    specsMap.set('ASIN', 'B07H2RR55Q');
    specsMap.set('UPC', '763649129081');
    specsMap.set('Global Trade ID', '00763649129081');

    // Update the component
    component.name = 'Seagate BarraCuda 2TB HDD';
    component.brand = 'Seagate';
    component.model = 'ST2000DMZ08';
    component.category = 'Storage';
    component.price = 148.57; // ₹12,391 converted to USD
    component.imageUrl = 'https://m.media-amazon.com/images/I/410ziAV5pVL._SY300_SX300_QL70_FMwebp_.jpg';
    component.stock = 30;
    component.specs = specsMap;

    await component.save();

    console.log('\n✅ Seagate BarraCuda 2TB HDD updated successfully!');
    
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
    console.log(`     RPM: ${verifyComponent.specs?.get('Rotational Speed')}`);
    console.log(`     Read Speed: ${verifyComponent.specs?.get('Read Speed')}`);
    console.log(`     Cache: ${verifyComponent.specs?.get('Cache Memory')}`);
    console.log(`   Total Specifications: ${verifyComponent.specs?.size || 0}`);

  } catch (error) {
    console.error('❌ Error updating Seagate BarraCuda 2TB HDD:', error);
  }
};

const main = async () => {
  console.log('🔧 Updating Seagate BarraCuda 2TB HDD...\n');
  console.log('💾 Reliable mechanical hard drive for desktop storage\n');
  console.log('💰 Price: ₹12,391 → $148.57 USD\n');
  
  await connectDB();
  await updateSeagateBarraCuda2TB();
  
  console.log('\n✅ Seagate BarraCuda 2TB HDD update completed successfully!');
  console.log('🎯 Component now has proper Name, Socket, Cores layout');
  console.log('📊 Complete specifications with 50+ technical details');
  console.log('🖼️ Real Amazon product image included');
  console.log('💾 7200 RPM performance with 256MB cache');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();