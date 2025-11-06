const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  helpful: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
    maxlength: [5000, 'Description cannot be more than 5000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    default: null
  },
  images: [{
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: [
      'Electronics',
      'Clothing',
      'Books',
      'Home & Garden',
      'Sports',
      'Beauty',
      'Toys',
      'Automotive',
      'Health',
      'Grocery'
    ]
  },
  subcategory: {
    type: String,
    default: ''
  },
  brand: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    required: [true, 'Please provide stock quantity'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  ratings: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  features: [String],
  specifications: {
    type: Map,
    of: String
  },
  weight: {
    type: Number,
    default: 0
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  seoTitle: String,
  seoDescription: String
}, {
  timestamps: true
});

// Index for search functionality
productSchema.index({ name: 'text', description: 'text', category: 'text', brand: 'text' });

// Calculate average rating
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.ratings = 0;
    this.numOfReviews = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.ratings = sum / this.reviews.length;
    this.numOfReviews = this.reviews.length;
  }
};

module.exports = mongoose.model('Product', productSchema);
