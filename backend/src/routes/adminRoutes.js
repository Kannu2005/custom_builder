const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Component = require('../models/Component');
const Order = require('../models/Order');
const Build = require('../models/Build');
const { protect } = require('../middleware/authMiddleware');

// Middleware to verify admin privileges
const requireAdminAccess = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Access denied. Administrator privileges required.' 
    });
  }
  next();
};

// Dashboard statistics endpoint
router.get('/dashboard/stats', protect, requireAdminAccess, async (req, res) => {
  try {
    // Count all users except admins (including users without role field)
    const totalUsers = await User.countDocuments({ 
      $or: [
        { role: 'user' },
        { role: { $exists: false } },
        { role: null }
      ]
    });
    
    const totalComponents = await Component.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalBuilds = await Build.countDocuments();
    
    // Get recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Monthly revenue (last 30 days)
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalAmount' }
        }
      }
    ]);

    // Pending orders count
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    
    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly orders (last 30 days)
    const monthlyOrders = await Order.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // New users this month (including users without role)
    const newUsersThisMonth = await User.countDocuments({
      $or: [
        { role: 'user' },
        { role: { $exists: false } },
        { role: null }
      ],
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Active users (users who placed orders in last 30 days OR recently created)
    const recentOrderUsers = await Order.distinct('userId', {
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });
    
    const recentlyCreatedUsers = await User.find({
      $or: [
        { role: 'user' },
        { role: { $exists: false } },
        { role: null }
      ],
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).select('_id');
    
    // Combine both sets and get unique count
    const allActiveUserIds = new Set([
      ...recentOrderUsers.map(id => id.toString()),
      ...recentlyCreatedUsers.map(user => user._id.toString())
    ]);

    // Top selling components
    const topComponents = await Order.aggregate([
      { $unwind: '$components' },
      {
        $group: {
          _id: '$components',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Revenue by month (last 6 months)
    const revenueByMonth = await Order.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: { $gte: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      totalUsers,
      totalComponents,
      totalOrders,
      totalBuilds,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      pendingOrders,
      monthlyOrders,
      newUsersThisMonth,
      activeUsersCount: allActiveUserIds.size,
      ordersByStatus,
      topComponents,
      revenueByMonth,
      recentOrders
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all users
router.get('/users', protect, requireAdminAccess, async (req, res) => {
  try {
    // Get all users except admins (including users without role field)
    const users = await User.find({ 
      $or: [
        { role: 'user' },
        { role: { $exists: false } },
        { role: null }
      ]
    })
      .select('-passwordHash -emailVerificationCode')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all components with pagination
router.get('/components', protect, requireAdminAccess, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const components = await Component.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Component.countDocuments();
    
    res.json({
      components,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new component
router.post('/components', protect, requireAdminAccess, async (req, res) => {
  try {
    const component = new Component(req.body);
    await component.save();
    res.status(201).json(component);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update component
router.put('/components/:id', protect, requireAdminAccess, async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete component
router.delete('/components/:id', protect, requireAdminAccess, async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ message: 'Component deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders
router.get('/orders', protect, requireAdminAccess, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('buildId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Order.countDocuments();
    
    res.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', protect, requireAdminAccess, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId', 'name email');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
