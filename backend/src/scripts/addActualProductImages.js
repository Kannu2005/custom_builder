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

// Better approach - Use product-specific placeholders with actual names
const createActualProductImage = (productName, category) => {
  // Clean product name for URL
  const cleanName = productName
    .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '+') // Replace spaces with +
    .substring(0, 30); // Limit length
  
  const categoryColors = {
    CPU: '1e40af',
    GPU: '16a34a', 
    RAM: '8b5cf6',
    Storage: 'f59e0b',
    Motherboard: 'ef4444',
    PSU: '06b6d4',
    Case: '84cc16',
    Cooling: 'ec4899'
  };
  
  const color = categoryColors[category] || '6b7280';
  
  // Create image with actual product name
  return `https://dummyimage.com/400x300/${color}/ffffff&text=${encodeURIComponent(cleanName)}`;
};

// Actual product images - using reliable sources
const actualProductImages = {
  // AMD GPUs - Real product images
  'AMD Radeon RX 7900 XTX': 'https://www.amd.com/content/dam/amd/en/images/products/graphics/2648997-amd-radeon-7900xtx.jpg',
  
  // NVIDIA GPUs - Real product images
  'NVIDIA RTX 4090': 'https://m.media-amazon.com/images/I/81SvKWZgdyL._AC_SX466_.jpg',
  
  // NVIDIA GPUs - Real product images
  'NVIDIA RTX 4090': 'https://www.amazon.in/NVIDIA-GeForce-Founders-Graphics-GDDR6X/dp/B0BJFRT43X',
  
  // NVIDIA GPUs - Real product images
  'NVIDIA RTX 4060': 'https://m.media-amazon.com/images/I/71togGpKdcL._SY450_.jpg',
  
  // AMD CPUs - Real product images  
  'AMD Ryzen 9 7900X': 'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2505503-ryzen-9-7900x.jpg',
  
  // Intel CPUs - Real product images
  'Intel Core i5-13400': 'https://m.media-amazon.com/images/I/51axr2Y+xOL._SY450_.jpg',
  'Intel Core i9-13900K': 'https://m.media-amazon.com/images/I/51CsbchCa-L._SY450_.jpg',
  
  // ASUS Motherboards - Real product images
  'ASUS ROG Strix Z790-E Gaming': 'https://dlcdnwebimgs.asus.com/gain/A14B0E0C-2EF6-4A28-9E30-089DCE5BF278/w717/h525/fwebp',
  
  // MSI Motherboards - Real product images
  'MSI B650 Tomahawk': 'https://m.media-amazon.com/images/I/81ymStt-9cL._SY450_.jpg',
  
  // Corsair Cooling - Real product images
  'CORSAIR iCUE H150i ELITE LCD': 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSflTIeG4x0WoTFFIUGYq20sYEUjiur1feY6mcnTDr_wctrCjY26KGZsL0gqlXHUoEYEOPrvbUyD93Pr_rIW2TKGZEjV5oXTEE3rGG7W60YCrJKLcvcWzCyng',
  
  // Noctua Cooling - Real product images
  'Noctua NH-D15 CPU Cooler': 'https://m.media-amazon.com/images/I/91Hw1zcAIjL._SX450_.jpg',
  
  // Corsair PSU - Real product images
  'Corsair RM850x 850W 80+ Gold': 'https://m.media-amazon.com/images/I/71dj+5GQwEL._SY450_.jpg',
  
  // Corsair RAM - Real product images
  'Corsair Vengeance 32GB DDR5': 'https://m.media-amazon.com/images/I/61mf24GAOuL._SX450_.jpg',
  
  // G.Skill RAM - Real product images
  'G.Skill Trident Z5 64GB DDR5': 'https://m.media-amazon.com/images/I/51lbzpnkWeL._SY450_.jpg',
  
  // Kingston RAM - Real product images
  'Kingston Fury Beast 16GB DDR4': 'https://m.media-amazon.com/images/I/61MYgWr+xWL._SY450_.jpg',
  
  // Samsung Storage - Real product images
  'Samsung 990 PRO 2TB NVMe SSD': 'https://m.media-amazon.com/images/I/71ByVZ1x2vL._SX450_.jpg',
  'Samsung 990 PRO 2TB w/ Heatsink': 'https://m.media-amazon.com/images/I/51G9ociGFnL._SY450_.jpg',
  
  // Seagate Storage - Real product images
  'Seagate BarraCuda 2TB HDD': 'https://m.media-amazon.com/images/I/410ziAV5pVL._SY300_SX300_QL70_FMwebp_.jpg',
  
  // Western Digital Storage - Real product images
  'WD Blue SN580 1TB NVMe SSD': 'https://m.media-amazon.com/images/I/61tANhen+JL._SX569_.jpg',
  
  // EVGA PSU - Real product images
  'EVGA 600W 80+ Bronze': 'https://m.media-amazon.com/images/I/61+Ex40RlnL._SX522_.jpg',
  
  // Fractal Design Cases - Real product images
  'Fractal Design Define 7': 'https://m.media-amazon.com/images/I/810xwp0eqxL._SY450_.jpg',
  
  // NZXT Cases - Real product images
  'NZXT H7 Flow': 'https://m.media-amazon.com/images/I/71yTezo1mRL._SY450_.jpg',
  
  // Add more product images here as you provide them
  // Format: 'Exact Product Name': 'Image URL',
};

// Better fallback - use proper placeholder with product name
const createProductPlaceholder = (productName, category) => {
  const encodedName = encodeURIComponent(productName.substring(0, 20));
  const categoryColors = {
    CPU: '1e40af',
    GPU: '16a34a', 
    RAM: '8b5cf6',
    Storage: 'f59e0b',
    Motherboard: 'ef4444',
    PSU: '06b6d4',
    Case: '84cc16',
    Cooling: 'ec4899'
  };
  const color = categoryColors[category] || '6b7280';
  return `https://dummyimage.com/400x300/${color}/ffffff&text=${encodedName}`;
};

const addActualProductImages = async () => {
  try {
    console.log('🔍 Finding all components...');
    
    const components = await Component.find({});
    console.log(`📦 Found ${components.length} components`);

    if (components.length === 0) {
      console.log('❌ No components found in database!');
      return;
    }

    let updatedCount = 0;
    let actualMatches = 0;
    let placeholderUsed = 0;

    for (const component of components) {
      let imageUrl = '';
      let matchType = '';

      // Try to get actual product image
      if (actualProductImages[component.name]) {
        imageUrl = actualProductImages[component.name];
        matchType = '🎯 Actual Product';
        actualMatches++;
      } 
      // Use product-specific image with actual product name
      else {
        imageUrl = createActualProductImage(component.name, component.category);
        matchType = '📝 Product Name Image';
        placeholderUsed++;
      }

      // Update component with actual product image
      await Component.findByIdAndUpdate(component._id, {
        imageUrl: imageUrl
      });

      console.log(`✅ Updated: ${component.name}`);
      console.log(`   ${matchType}: ${imageUrl}`);
      
      updatedCount++;
    }

    console.log('\n🎉 Actual product image update completed!');
    console.log(`✅ Updated ${updatedCount} components with proper product images`);
    console.log(`🎯 ${actualMatches} actual product images found`);
    console.log(`📝 ${placeholderUsed} product-specific placeholders used`);
    
    // Final verification
    const withImages = await Component.countDocuments({ 
      imageUrl: { $exists: true, $ne: '', $ne: null } 
    });
    
    console.log('\n📊 Final Statistics:');
    console.log(`   Total Components: ${components.length}`);
    console.log(`   Components with Images: ${withImages}`);
    console.log(`   Image Coverage: ${Math.round((withImages/components.length) * 100)}%`);
    console.log(`   Actual Product Rate: ${Math.round((actualMatches/components.length) * 100)}%`);

    // Show sample of what was added
    console.log('\n🔗 Sample product images added:');
    const sampleComponents = await Component.find({}).limit(5);
    sampleComponents.forEach(comp => {
      const isActual = actualProductImages[comp.name] ? '🎯' : '📝';
      console.log(`   ${isActual} ${comp.name}: ${comp.imageUrl}`);
    });

  } catch (error) {
    console.error('❌ Error updating images:', error);
  }
};

const main = async () => {
  console.log('🚀 Starting actual product image update...\n');
  console.log('🎯 Adding real product images (no random/wrong images)...\n');
  console.log('❌ Removing dog photos, random images, etc.\n');
  console.log('✅ Adding actual product photos or proper placeholders\n');
  
  await connectDB();
  await addActualProductImages();
  
  console.log('\n✅ Process completed successfully!');
  console.log('🎯 No more random images - only actual products!');
  console.log('📱 "Corsair RM850x" will show Corsair PSU, not dog photo!');
  console.log('🛒 Each product shows correct image or proper placeholder!');
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the script
main();