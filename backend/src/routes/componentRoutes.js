const express = require('express');
const Component = require('../models/Component');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all components (public, filtered by isActive)
router.get('/', async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, tags } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (search) {
      // Use regex for better search (fallback if text index not available)
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (tags) {
      query.tags = { $in: Array.isArray(tags) ? tags : [tags] };
    }

    const components = await Component.find(query).sort({ createdAt: -1 });
    console.log(`Found ${components.length} components`);
    res.json(components);
  } catch (err) {
    console.error('Error fetching components:', err);
    next(err);
  }
});

// Get single component (public)
router.get('/:id', async (req, res, next) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component || !component.isActive) {
      res.status(404);
      throw new Error('Component not found');
    }
    res.json(component);
  } catch (err) {
    next(err);
  }
});

// Admin routes - Create component
router.post('/', protect, admin, async (req, res, next) => {
  try {
    const component = await Component.create(req.body);
    res.status(201).json(component);
  } catch (err) {
    next(err);
  }
});

// Admin routes - Update component
router.put('/:id', protect, admin, async (req, res, next) => {
  try {
    const component = await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!component) {
      res.status(404);
      throw new Error('Component not found');
    }
    res.json(component);
  } catch (err) {
    next(err);
  }
});

// Admin routes - Delete component (soft delete)
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const component = await Component.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!component) {
      res.status(404);
      throw new Error('Component not found');
    }
    res.json({ message: 'Component deactivated' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
