const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json({
      success: true,
      wishlist: user.wishlist
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/wishlist/:productId
// @desc    Add product to wishlist
// @access  Private
router.post('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (user.wishlist.includes(req.params.productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(req.params.productId);
    await user.save();

    res.json({
      success: true,
      message: 'Product added to wishlist'
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/users/wishlist/:productId
// @desc    Remove product from wishlist
// @access  Private
router.delete('/wishlist/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(
      item => item.toString() !== req.params.productId
    );
    await user.save();

    res.json({
      success: true,
      message: 'Product removed from wishlist'
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/orders
// @desc    Get user order history
// @access  Private
router.get('/orders', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'orderHistory',
      populate: {
        path: 'orderItems.product',
        select: 'name images'
      }
    });

    res.json({
      success: true,
      orders: user.orderHistory
    });
  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
