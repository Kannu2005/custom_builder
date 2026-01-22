const express = require('express');
const Order = require('../models/Order');
const Build = require('../models/Build');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get user's orders
router.get('/my-orders', async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('buildId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Get single order
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('buildId');
    
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Create order
router.post('/', async (req, res, next) => {
  try {
    const { buildId, shippingAddress, paymentMethod } = req.body;

    const build = await Build.findById(buildId)
      .populate('components.cpu components.gpu components.ram components.storage components.motherboard components.psu components.case components.cooling components.extras');

    if (!build) {
      res.status(404);
      throw new Error('Build not found');
    }

    if (build.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized');
    }

    // Create snapshot of build
    const buildSnapshot = JSON.parse(JSON.stringify(build));

    const order = await Order.create({
      userId: req.user._id,
      buildId,
      buildSnapshot,
      shippingAddress,
      paymentMethod: paymentMethod || 'cash_on_delivery',
      totalAmount: build.totalPrice,
      timeline: [
        {
          status: 'pending',
          date: new Date(),
          note: 'Order placed',
        },
      ],
    });

    const populatedOrder = await Order.findById(order._id).populate('buildId');
    res.status(201).json(populatedOrder);
  } catch (err) {
    next(err);
  }
});

// Admin: Get all orders
router.get('/admin/all', admin, async (req, res, next) => {
  try {
    const { status, userId } = req.query;
    const query = {};
    if (status) query.status = status;
    if (userId) query.userId = userId;

    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .populate('buildId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Admin: Update order status
router.put('/:id/status', admin, async (req, res, next) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    order.status = status;
    order.timeline.push({
      status,
      date: new Date(),
      note: note || `Status changed to ${status}`,
    });

    await order.save();
    const populatedOrder = await Order.findById(order._id)
      .populate('userId', 'name email')
      .populate('buildId');

    res.json(populatedOrder);
  } catch (err) {
    next(err);
  }
});

// Cancel order (user can cancel their own pending orders)
router.put('/:id/cancel', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Check if user owns the order
    if (order.userId.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to cancel this order');
    }

    // Check if order can be cancelled (only pending orders)
    if (order.status !== 'pending') {
      res.status(400);
      throw new Error(`Cannot cancel order with status: ${order.status}. Only pending orders can be cancelled.`);
    }

    // Update order status to cancelled
    order.status = 'cancelled';
    order.timeline.push({
      status: 'cancelled',
      date: new Date(),
      note: 'Order cancelled by user',
    });

    await order.save();
    
    const populatedOrder = await Order.findById(order._id)
      .populate('buildId');

    res.json(populatedOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
