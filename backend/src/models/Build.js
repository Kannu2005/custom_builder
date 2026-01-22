const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: 'My Custom Build',
    },
    components: {
      cpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      gpu: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      ram: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      storage: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      motherboard: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      psu: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      case: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      cooling: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
      extras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Component' }],
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

buildSchema.index({ userId: 1 });

module.exports = mongoose.model('Build', buildSchema);
