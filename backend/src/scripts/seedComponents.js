require('dotenv').config();
const mongoose = require('mongoose');
const Component = require('../models/Component');
const { connectDB } = require('../config/db');

const sampleComponents = [
  // CPUs
  {
    category: 'CPU',
    name: 'Intel Core i9-13900K',
    brand: 'Intel',
    model: 'i9-13900K',
    price: 589.99,
    stock: 15,
    tags: ['Gaming', 'High Performance'],
    description: '24-core processor with high clock speeds',
    specs: {
      cores: 24,
      threads: 32,
      baseClock: '3.0 GHz',
      boostClock: '5.8 GHz',
      socket: 'LGA1700',
      tdp: '125W',
    },
  },
  {
    category: 'CPU',
    name: 'AMD Ryzen 9 7900X',
    brand: 'AMD',
    model: 'Ryzen 9 7900X',
    price: 549.99,
    stock: 12,
    tags: ['Gaming', 'Workstation'],
    description: '12-core AMD processor',
    specs: {
      cores: 12,
      threads: 24,
      baseClock: '4.7 GHz',
      boostClock: '5.6 GHz',
      socket: 'AM5',
      tdp: '170W',
    },
  },
  {
    category: 'CPU',
    name: 'Intel Core i5-13400',
    brand: 'Intel',
    model: 'i5-13400',
    price: 249.99,
    stock: 25,
    tags: ['Budget', 'Gaming'],
    description: '10-core budget-friendly processor',
    specs: {
      cores: 10,
      threads: 16,
      baseClock: '2.5 GHz',
      boostClock: '4.6 GHz',
      socket: 'LGA1700',
      tdp: '65W',
    },
  },
  // GPUs
  {
    category: 'GPU',
    name: 'NVIDIA RTX 4090',
    brand: 'NVIDIA',
    model: 'RTX 4090',
    price: 1599.99,
    stock: 8,
    tags: ['Gaming', 'High Performance'],
    description: 'Top-tier gaming GPU',
    specs: {
      vram: '24GB GDDR6X',
      memoryBus: '384-bit',
      boostClock: '2520 MHz',
      powerConsumption: '450W',
    },
  },
  {
    category: 'GPU',
    name: 'AMD Radeon RX 7900 XTX',
    brand: 'AMD',
    model: 'RX 7900 XTX',
    price: 999.99,
    stock: 10,
    tags: ['Gaming'],
    description: 'High-performance AMD GPU',
    specs: {
      vram: '24GB GDDR6',
      memoryBus: '384-bit',
      boostClock: '2500 MHz',
      powerConsumption: '355W',
    },
  },
  {
    category: 'GPU',
    name: 'NVIDIA RTX 4060',
    brand: 'NVIDIA',
    model: 'RTX 4060',
    price: 299.99,
    stock: 20,
    tags: ['Budget', 'Gaming'],
    description: 'Budget-friendly gaming GPU',
    specs: {
      vram: '8GB GDDR6',
      memoryBus: '128-bit',
      boostClock: '2460 MHz',
      powerConsumption: '115W',
    },
  },
  // RAM
  {
    category: 'RAM',
    name: 'Corsair Vengeance 32GB DDR5',
    brand: 'Corsair',
    model: 'CMK32GX5M2B5600C36',
    price: 129.99,
    stock: 30,
    tags: ['Gaming', 'High Performance'],
    description: '32GB DDR5 RAM kit (2x16GB)',
    specs: {
      capacity: '32GB',
      speed: '5600 MHz',
      type: 'DDR5',
      modules: 2,
      latency: 'CL36',
    },
  },
  {
    category: 'RAM',
    name: 'G.Skill Trident Z5 64GB DDR5',
    brand: 'G.Skill',
    model: 'F5-6000J3636F16GX2-TZ5RK',
    price: 249.99,
    stock: 15,
    tags: ['Workstation', 'High Performance'],
    description: '64GB DDR5 RAM kit (2x32GB)',
    specs: {
      capacity: '64GB',
      speed: '6000 MHz',
      type: 'DDR5',
      modules: 2,
      latency: 'CL36',
    },
  },
  {
    category: 'RAM',
    name: 'Kingston Fury Beast 16GB DDR4',
    brand: 'Kingston',
    model: 'KF432C16BB/16',
    price: 59.99,
    stock: 40,
    tags: ['Budget'],
    description: '16GB DDR4 RAM (single module)',
    specs: {
      capacity: '16GB',
      speed: '3200 MHz',
      type: 'DDR4',
      modules: 1,
      latency: 'CL16',
    },
  },
  // Storage
  {
    category: 'Storage',
    name: 'Samsung 990 PRO 2TB NVMe SSD',
    brand: 'Samsung',
    model: 'MZ-V9P2T0BW',
    price: 199.99,
    stock: 20,
    tags: ['Gaming', 'High Performance'],
    description: '2TB NVMe PCIe 4.0 SSD',
    specs: {
      capacity: '2TB',
      type: 'NVMe PCIe 4.0',
      readSpeed: '7450 MB/s',
      writeSpeed: '6900 MB/s',
      formFactor: 'M.2 2280',
    },
  },
  {
    category: 'Storage',
    name: 'WD Blue SN580 1TB NVMe SSD',
    brand: 'Western Digital',
    model: 'WDS100T3B0E',
    price: 79.99,
    stock: 35,
    tags: ['Budget'],
    description: '1TB NVMe PCIe 4.0 SSD',
    specs: {
      capacity: '1TB',
      type: 'NVMe PCIe 4.0',
      readSpeed: '4150 MB/s',
      writeSpeed: '4150 MB/s',
      formFactor: 'M.2 2280',
    },
  },
  {
    category: 'Storage',
    name: 'Seagate BarraCuda 2TB HDD',
    brand: 'Seagate',
    model: 'ST2000DM008',
    price: 59.99,
    stock: 25,
    tags: ['Budget', 'Storage'],
    description: '2TB 7200 RPM HDD',
    specs: {
      capacity: '2TB',
      type: 'HDD',
      rpm: '7200',
      interface: 'SATA 6Gb/s',
      formFactor: '3.5"',
    },
  },
  // Motherboards
  {
    category: 'Motherboard',
    name: 'ASUS ROG Strix Z790-E Gaming',
    brand: 'ASUS',
    model: 'ROG Strix Z790-E',
    price: 449.99,
    stock: 10,
    tags: ['Gaming', 'High Performance'],
    description: 'ATX motherboard for Intel 13th/14th gen',
    specs: {
      socket: 'LGA1700',
      chipset: 'Z790',
      formFactor: 'ATX',
      ramSlots: 4,
      ramType: 'DDR5',
      m2Slots: 5,
    },
  },
  {
    category: 'Motherboard',
    name: 'MSI B650 Tomahawk',
    brand: 'MSI',
    model: 'B650 Tomahawk',
    price: 199.99,
    stock: 15,
    tags: ['Budget', 'Gaming'],
    description: 'ATX motherboard for AMD Ryzen 7000',
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'ATX',
      ramSlots: 4,
      ramType: 'DDR5',
      m2Slots: 2,
    },
  },
  // PSU
  {
    category: 'PSU',
    name: 'Corsair RM850x 850W 80+ Gold',
    brand: 'Corsair',
    model: 'CP-9020180-NA',
    price: 149.99,
    stock: 20,
    tags: ['Gaming'],
    description: '850W modular power supply',
    specs: {
      wattage: '850W',
      efficiency: '80+ Gold',
      modular: true,
      connectors: 'ATX, PCIe, SATA',
    },
  },
  {
    category: 'PSU',
    name: 'EVGA 600W 80+ Bronze',
    brand: 'EVGA',
    model: '100-BR-0600-K1',
    price: 59.99,
    stock: 30,
    tags: ['Budget'],
    description: '600W power supply',
    specs: {
      wattage: '600W',
      efficiency: '80+ Bronze',
      modular: false,
      connectors: 'ATX, PCIe, SATA',
    },
  },
  // Cases
  {
    category: 'Case',
    name: 'NZXT H7 Flow',
    brand: 'NZXT',
    model: 'H7 Flow',
    price: 149.99,
    stock: 18,
    tags: ['Gaming'],
    description: 'Mid-tower ATX case with excellent airflow',
    specs: {
      formFactor: 'Mid Tower',
      motherboardSupport: 'ATX, mATX, ITX',
      fansIncluded: 2,
      rgb: false,
      temperedGlass: true,
    },
  },
  {
    category: 'Case',
    name: 'Fractal Design Define 7',
    brand: 'Fractal Design',
    model: 'Define 7',
    price: 179.99,
    stock: 12,
    tags: ['Workstation'],
    description: 'Silent-focused ATX case',
    specs: {
      formFactor: 'Mid Tower',
      motherboardSupport: 'ATX, mATX, ITX',
      fansIncluded: 2,
      rgb: false,
      temperedGlass: false,
    },
  },
  // Cooling
  {
    category: 'Cooling',
    name: 'Noctua NH-D15 CPU Cooler',
    brand: 'Noctua',
    model: 'NH-D15',
    price: 99.99,
    stock: 15,
    tags: ['High Performance'],
    description: 'Dual-tower air cooler',
    specs: {
      type: 'Air Cooler',
      tdp: '220W',
      noiseLevel: '24.6 dB',
      compatibility: 'Intel/AMD',
    },
  },
  {
    category: 'Cooling',
    name: 'Corsair iCUE H150i Elite LCD',
    brand: 'Corsair',
    model: 'H150i Elite LCD',
    price: 279.99,
    stock: 10,
    tags: ['Gaming', 'High Performance'],
    description: '360mm AIO liquid cooler with LCD',
    specs: {
      type: 'AIO Liquid Cooler',
      radiatorSize: '360mm',
      rgb: true,
      compatibility: 'Intel/AMD',
    },
  },
];

async function seed() {
  try {
    await connectDB();
    console.log('🌱 Seeding components...');

    // Clear existing components (optional - comment out if you want to keep existing)
    // await Component.deleteMany({});

    // Insert sample components
    const inserted = await Component.insertMany(sampleComponents);
    console.log(`✅ Successfully seeded ${inserted.length} components`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding components:', error);
    process.exit(1);
  }
}

seed();
