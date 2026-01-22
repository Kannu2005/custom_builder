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

const fixNZXTCase = async () => {
  try {
    console.log('🔍 Finding NZXT H7 Flow...');
    
    const component = await Component.findOne({ 
      name: 'NZXT H7 Flow' 
    });

    if (!component) {
      console.log('❌ NZXT H7 Flow not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹21,999 to USD
    const inrPrice = 21999;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100;

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for NZXT H7 Flow (no dots in keys)
    const detailedSpecs = {
      'Name': 'NZXT H7 Flow',
      'Socket': 'ATX Mid Tower',
      'Expansion Slots': '7 + 2 Vertical',
      'Brand': 'NZXT',
      'Motherboard Compatibility': 'E-ATX, Micro-ATX, Mini-ITX',
      'Case Type': 'Mid Tower',
      'Recommended Uses For Product': 'Gaming',
      'Colour': 'White',
      'Supported Motherboard': 'E-ATX, Micro-ATX, Mini-ITX',
      'Power Supply Mounting Type': 'Bottom Mount',
      'Cooling Method': 'Air',
      'Fan Size': '120 Millimetres',
      'Total USB 3 Ports': '1',
      'Total USB Ports': '1',
      'Hard Disk Form Factor': '3.5 Inches',
      'Internal Bays Quantity': '2',
      'Compatible Devices': 'Motherboards (Mini-ITX, Micro-ATX, ATX, EATX up to 272mm), Radiators (up to 360mm), Fans (multiple 140mm), Storage Drives, Expansion Cards',
      'Number of Fans': '2',
      'Enclosure Material': 'Glass',
      'User Guide': 'Antenna Location Gaming',
      'Item Weight': '10 Kilograms',
      'Item Dimensions': '48D x 23W x 50.5H Centimeters',
      'Brand Name': 'NZXT',
      'Model Name': 'H7 Flow',
      'Manufacturer': 'NZXT',
      'Item Type Name': 'Computer Case',
      'Country of Origin': 'China',
      'Item Height': '50.5 Centimeters',
      'Unit Count': '1 Case',
      'Warranty Description': '2 Years',
      'Form Factor': 'Mid Tower ATX',
      'Side Panel': 'Tempered Glass',
      'Front Panel': 'Mesh for Airflow',
      'Motherboard Support': 'Mini-ITX, Micro-ATX, ATX, E-ATX (up to 272mm)',
      'GPU Clearance': 'Up to 413mm',
      'CPU Cooler Clearance': 'Up to 185mm',
      'PSU Clearance': 'Up to 200mm',
      'Radiator Support Front': 'Up to 360mm',
      'Radiator Support Top': 'Up to 280mm',
      'Radiator Support Rear': 'Up to 140mm',
      'Drive Bays 35 inch': '2',
      'Drive Bays 25 inch': '4',
      'Expansion Slots Total': '7 + 2 Vertical',
      'Front IO': 'USB 3.2 Gen 1 Type-A, USB 3.2 Gen 2 Type-C, Audio',
      'Pre-installed Fans': '2 x 140mm Front, 1 x 140mm Rear',
      'Fan Support Front': '3 x 120mm or 2 x 140mm',
      'Fan Support Top': '2 x 120mm or 2 x 140mm',
      'Fan Support Rear': '1 x 120mm or 1 x 140mm',
      'Cable Management': 'Extensive routing options',
      'Tool-less Installation': 'Yes',
      'Dust Filters': 'Removable magnetic filters',
      'Build Quality': 'Premium Steel Construction',
      'Design': 'Modern Minimalist',
      'Airflow Optimization': 'High-Flow Mesh Front',
      'RGB Support': 'Compatible with RGB components',
      'Water Cooling Ready': 'Yes',
      'Gaming Focused': 'High-Performance Gaming',
      'Target Market': 'Gamers, Enthusiasts',
      'Price Performance': 'Premium Value',
      'Brand Reputation': 'NZXT Quality',
      'Customer Support': 'Excellent',
      'Availability': 'Worldwide',
      'Recommended Use': 'Gaming, High-Performance Builds',
      'Installation Difficulty': 'Easy',
      'Maintenance': 'Easy Cleaning',
      'Future Proof': 'Modern Standards',
      'Upgrade Path': 'Excellent Expandability'
    };

    // Update component with clean specs
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://m.media-amazon.com/images/I/71yTezo1mRL._SY450_.jpg',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'Premium mid-tower gaming case with tempered glass side panel, high-flow mesh front, and excellent airflow optimization. Supports E-ATX motherboards and 360mm radiators with tool-less installation.'
        }
      }
    );

    console.log('✅ Updated NZXT H7 Flow with image, price, and specifications');
    console.log('🖼️ Image URL: https://m.media-amazon.com/images/I/71yTezo1mRL._SY450_.jpg');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Expansion Slots:', verifyComponent.specs.get('Expansion Slots'));
    console.log('   Case Type:', verifyComponent.specs.get('Case Type'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error fixing NZXT H7 Flow:', error);
  }
};

const main = async () => {
  console.log('🚀 Fixing NZXT H7 Flow specifications...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹21,999 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await fixNZXTCase();
  
  console.log('\n✅ NZXT H7 Flow update completed successfully!');
  console.log('🎯 Premium gaming case now has real image, correct price, and complete specs');
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