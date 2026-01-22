const express = require('express');
const Build = require('../models/Build');
const Component = require('../models/Component');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get user's builds
router.get('/my-builds', async (req, res, next) => {
  try {
    const builds = await Build.find({ userId: req.user._id })
      .populate('components.cpu components.gpu components.ram components.storage components.motherboard components.psu components.case components.cooling')
      .sort({ updatedAt: -1 });
    res.json(builds);
  } catch (err) {
    next(err);
  }
});

// Get single build
router.get('/:id', async (req, res, next) => {
  try {
    const build = await Build.findById(req.params.id)
      .populate('components.cpu components.gpu components.ram components.storage components.motherboard components.psu components.case components.cooling components.extras');
    
    if (!build) {
      res.status(404);
      throw new Error('Build not found');
    }

    // Check if user owns the build or is admin
    if (build.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    res.json(build);
  } catch (err) {
    next(err);
  }
});

// Create build
router.post('/', async (req, res, next) => {
  try {
    const { name, components, notes } = req.body;

    // Calculate total price
    let totalPrice = 0;
    const componentIds = Object.values(components).flat().filter(Boolean);
    
    if (componentIds.length > 0) {
      const componentDocs = await Component.find({ _id: { $in: componentIds } });
      totalPrice = componentDocs.reduce((sum, comp) => sum + (comp.price || 0), 0);
    }

    const build = await Build.create({
      userId: req.user._id,
      name: name || 'My Custom Build',
      components,
      totalPrice,
      notes: notes || '',
    });

    const populatedBuild = await Build.findById(build._id)
      .populate('components.cpu components.gpu components.ram components.storage components.motherboard components.psu components.case components.cooling');

    res.status(201).json(populatedBuild);
  } catch (err) {
    next(err);
  }
});

// Update build
router.put('/:id', async (req, res, next) => {
  try {
    const build = await Build.findById(req.params.id);
    
    if (!build) {
      res.status(404);
      throw new Error('Build not found');
    }

    if (build.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    const { name, components, notes } = req.body;

    // Recalculate total price if components changed
    let totalPrice = build.totalPrice;
    if (components) {
      const componentIds = Object.values(components).flat().filter(Boolean);
      if (componentIds.length > 0) {
        const componentDocs = await Component.find({ _id: { $in: componentIds } });
        totalPrice = componentDocs.reduce((sum, comp) => sum + (comp.price || 0), 0);
      }
    }

    const updatedBuild = await Build.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name }),
        ...(components && { components }),
        ...(notes !== undefined && { notes }),
        totalPrice,
      },
      { new: true, runValidators: true }
    ).populate('components.cpu components.gpu components.ram components.storage components.motherboard components.psu components.case components.cooling');

    res.json(updatedBuild);
  } catch (err) {
    next(err);
  }
});

// Delete build
router.delete('/:id', async (req, res, next) => {
  try {
    const build = await Build.findById(req.params.id);
    
    if (!build) {
      res.status(404);
      throw new Error('Build not found');
    }

    if (build.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized');
    }

    await Build.findByIdAndDelete(req.params.id);
    res.json({ message: 'Build deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
