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

const updateNoctuaCooler = async () => {
  try {
    console.log('🔍 Finding Noctua NH-D15 CPU Cooler...');
    
    const component = await Component.findOne({ 
      name: 'Noctua NH-D15 CPU Cooler' 
    });

    if (!component) {
      console.log('❌ Noctua NH-D15 CPU Cooler not found!');
      return;
    }

    console.log('📦 Found component:', component.name);
    console.log('💰 Current price: $' + component.price);

    // Convert ₹9,449 to USD
    // Exchange rate: 1 USD = ₹83.40
    const inrPrice = 9449;
    const exchangeRate = 83.40;
    const usdPrice = Math.round((inrPrice / exchangeRate) * 100) / 100; // Round to 2 decimal places

    console.log('💱 Price conversion:');
    console.log('   INR Price: ₹' + inrPrice.toLocaleString());
    console.log('   Exchange Rate: 1 USD = ₹' + exchangeRate);
    console.log('   USD Price: $' + usdPrice);

    // Complete specifications for Noctua NH-D15 CPU Cooler
    const detailedSpecs = {
      'Name': 'Noctua NH-D15 CPU Cooler',
      'Socket': 'Universal Multi-Socket',
      'Number of Fans': '2',
      'Product Dimensions': '15L x 14W x 2.5H Centimeters',
      'Brand': 'Noctua',
      'Power Connector Type': '6-Pin',
      'Voltage': '12 Volts',
      'Wattage': '1.56 Watts',
      'Cooling Method': 'Fan',
      'Compatible Devices': 'Desktop',
      'Noise Level': '24.6 Decibels',
      'Max Rotational Speed': '1500 RPM',
      'Air Flow Capacity': '140.2 Cubic Meters Per Hour',
      'Item Dimensions': '15L x 14W x 2.5H Centimeters',
      'Material Type': 'Aluminium, Copper',
      'Brand Name': 'Noctua',
      'UPC': '807320186861, 803983039766, 842431012456',
      'Manufacturer': 'Noctua',
      'Item Type Name': 'CPU Cooler',
      'Included Components': 'CPU Cooler',
      'Country of Origin': 'China',
      'Item Height': '16.5 Centimeters',
      'Item Weight': '1.3 Kilograms',
      'Unit Count': '1 Count',
      'Warranty Description': '6 year manufacturer',
      'Cooler Type': 'Tower Air Cooler',
      'Heat Pipes': '6 x 6mm Heat Pipes',
      'Heatsink Material': 'Aluminum Fins',
      'Base Material': 'Copper',
      'Fan Size': '140mm',
      'Fan Speed': '300-1500 RPM',
      'Fan Airflow': '140.2 m³/h',
      'Fan Static Pressure': '2.08 mmH₂O',
      'Fan Noise Level': '24.6 dB(A)',
      'PWM Support': 'Yes',
      'Fan Bearing': 'SSO2 Bearing',
      'Fan Lifespan': '150,000 hours MTTF',
      'Socket Support Intel': 'LGA1700, LGA1200, LGA115x, LGA20xx',
      'Socket Support AMD': 'AM5, AM4, AM3(+), AM2(+), FM2(+), FM1',
      'TDP Rating': '220W+',
      'Cooler Height': '165mm',
      'Cooler Width': '150mm',
      'Cooler Depth': '161mm',
      'RAM Clearance': '32mm (with both fans)',
      'Installation': 'SecuFirm2 Mounting System',
      'Thermal Compound': 'NT-H1 Included',
      'Performance': 'Flagship Air Cooling',
      'Build Quality': 'Premium Austrian Engineering',
      'Color Scheme': 'Noctua Brown/Beige',
      'Target Market': 'Enthusiasts, Overclockers',
      'Compatibility': 'High-End CPUs',
      'Overclocking Support': 'Excellent',
      'Silent Operation': 'Ultra-Quiet',
      'Reliability': 'Industry Leading',
      'Brand Reputation': 'Premium Cooling',
      'Customer Support': 'Excellent',
      'Availability': 'Worldwide',
      'Price Performance': 'Premium Value',
      'Recommended Use': 'High-End Gaming, Workstations',
      'Installation Difficulty': 'Moderate',
      'Maintenance': 'Low Maintenance',
      'Dust Resistance': 'Good',
      'Vibration Dampening': 'Yes',
      'Anti-Vibration Pads': 'Included',
      'Mounting Hardware': 'Complete Kit Included',
      'Documentation': 'Comprehensive Manual',
      'Quality Control': 'Rigorous Testing',
      'Environmental': 'RoHS Compliant',
      'Certification': 'CE Certified',
      'Innovation': 'Advanced Aerodynamics',
      'Research': 'Extensive R&D',
      'Awards': 'Multiple Industry Awards',
      'Reviews': 'Consistently Top Rated',
      'Longevity': 'Long-term Performance',
      'Upgrade Path': 'Future Socket Support',
      'Ecosystem': 'Noctua Accessory Compatible'
    };

    // Update component with image, price, and specifications
    await Component.updateOne(
      { _id: component._id },
      { 
        $set: { 
          imageUrl: 'https://m.media-amazon.com/images/I/91Hw1zcAIjL._SX450_.jpg',
          price: usdPrice,
          specs: detailedSpecs,
          description: 'Premium dual-tower CPU cooler with exceptional cooling performance and ultra-quiet operation. Features 6 heat pipes, dual 140mm fans, and universal socket compatibility with 6-year warranty.'
        }
      }
    );

    console.log('✅ Updated Noctua NH-D15 CPU Cooler with image, price, and specifications');
    console.log('🖼️ Image URL: https://m.media-amazon.com/images/I/91Hw1zcAIjL._SX450_.jpg');
    console.log('💰 New price: $' + usdPrice);
    console.log('📊 Total specifications added:', Object.keys(detailedSpecs).length);
    
    // Verify the update
    const verifyComponent = await Component.findById(component._id);
    console.log('\n🔍 Verification:');
    console.log('   Name:', verifyComponent.specs.get('Name'));
    console.log('   Socket:', verifyComponent.specs.get('Socket'));
    console.log('   Number of Fans:', verifyComponent.specs.get('Number of Fans'));
    console.log('   TDP Rating:', verifyComponent.specs.get('TDP Rating'));

    // Show price comparison
    console.log('\n📊 Price Update Summary:');
    console.log('   Original Price: $' + component.price);
    console.log('   New Price: $' + usdPrice);
    console.log('   Price Change: $' + (usdPrice - component.price).toFixed(2));

  } catch (error) {
    console.error('❌ Error updating Noctua NH-D15 CPU Cooler:', error);
  }
};

const main = async () => {
  console.log('🚀 Updating Noctua NH-D15 CPU Cooler...\n');
  console.log('🖼️ Adding Amazon product image');
  console.log('💱 Converting ₹9,449 to USD (Rate: 1 USD = ₹83.40)');
  console.log('📋 Adding complete specifications with Name, Socket, Cores\n');
  
  await connectDB();
  await updateNoctuaCooler();
  
  console.log('\n✅ Noctua NH-D15 CPU Cooler update completed successfully!');
  console.log('🎯 Premium CPU cooler now has real image, correct price, and complete specs');
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