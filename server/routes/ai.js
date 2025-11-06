const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const {
  chatSupport,
  getProductRecommendations,
  semanticSearch,
  generateProductDescription,
  analyzeReviewSentiment
} = require('../services/aiService');
const Product = require('../models/Product');
const User = require('../models/User');

const router = express.Router();

/**
 * @route   POST /api/ai/chat
 * @desc    AI Customer Support Chat
 * @access  Public
 */
router.post('/chat', [
  body('message').trim().isLength({ min: 1, max: 500 }).withMessage('Message must be between 1 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, conversationHistory = [] } = req.body;

    // Fetch products from database to provide context to the chatbot
    let products = [];
    try {
      products = await Product.find({ isActive: true })
        .select('_id name category price description ratings stock features')
        .limit(100) // Limit to 100 products to avoid context overflow
        .lean();
    } catch (error) {
      console.error('Error fetching products for chat context:', error);
      // Continue without products if there's an error
    }

    const response = await chatSupport(message, conversationHistory, products);

    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to process chat message',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/ai/recommendations
 * @desc    Get AI-powered product recommendations
 * @access  Public (with optional auth for personalized recommendations)
 */
router.get('/recommendations', async (req, res) => {
  try {
    const userId = req.user?._id;
    let userInterests = [];
    let viewedProducts = [];
    let cartItems = [];

    // Get user data if authenticated
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        userInterests = user.interests || [];
        viewedProducts = user.viewedProducts || [];
        
        // Get cart items from request if available
        if (req.query.cartItems) {
          cartItems = req.query.cartItems.split(',').filter(id => id);
        }
      }
    }

    // Get all active products
    const allProducts = await Product.find({ isActive: true })
      .select('_id name category price ratings sold description')
      .lean();

    // Get AI recommendations
    const recommendedIds = await getProductRecommendations(
      userInterests,
      viewedProducts,
      cartItems,
      allProducts
    );

    // Fetch recommended products
    const recommendedProducts = await Product.find({
      _id: { $in: recommendedIds }
    })
      .populate('reviews.user', 'name avatar')
      .limit(8);

    // Sort by recommendation order
    const sortedProducts = recommendedIds
      .map(id => recommendedProducts.find(p => p._id.toString() === id))
      .filter(p => p !== undefined);

    res.json({
      success: true,
      products: sortedProducts,
      count: sortedProducts.length
    });
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get recommendations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/ai/search
 * @desc    AI-powered semantic search
 * @access  Public
 */
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Search query is required' 
      });
    }

    // Get all active products
    const allProducts = await Product.find({ isActive: true })
      .select('_id name category description price ratings')
      .lean();

    // Get AI semantic search results
    const relevantIds = await semanticSearch(query, allProducts);

    // Fetch relevant products
    const products = await Product.find({
      _id: { $in: relevantIds }
    })
      .populate('reviews.user', 'name avatar')
      .limit(20);

    // Sort by relevance order
    const sortedProducts = relevantIds
      .map(id => products.find(p => p._id.toString() === id))
      .filter(p => p !== undefined);

    res.json({
      success: true,
      products: sortedProducts,
      query,
      count: sortedProducts.length
    });
  } catch (error) {
    console.error('AI Search Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to perform search',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   POST /api/ai/generate-description
 * @desc    Generate product description using AI
 * @access  Private/Admin
 */
router.post('/generate-description', auth, [
  body('name').trim().isLength({ min: 1 }).withMessage('Product name is required'),
  body('category').optional().trim(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number')
], async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Admin access required' 
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category = 'General', price = 0, features = [] } = req.body;

    const description = await generateProductDescription(name, category, price, features);

    res.json({
      success: true,
      description
    });
  } catch (error) {
    console.error('AI Description Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate description',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   POST /api/ai/analyze-sentiment
 * @desc    Analyze review sentiment
 * @access  Private
 */
router.post('/analyze-sentiment', auth, [
  body('reviewText').trim().isLength({ min: 10 }).withMessage('Review text must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reviewText } = req.body;

    const analysis = await analyzeReviewSentiment(reviewText);

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('AI Sentiment Analysis Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze sentiment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;

