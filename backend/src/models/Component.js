const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case', 'Cooling', 'Extras'],
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    specs: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

componentSchema.index({ category: 1, isActive: 1 });
componentSchema.index({ name: 'text', brand: 'text', model: 'text' });

module.exports = mongoose.model('Component', componentSchema);
