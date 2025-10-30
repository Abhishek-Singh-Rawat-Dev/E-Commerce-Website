# 👨‍💻 Tushar's Task List - Full-Stack Developer & Admin Panel Specialist

## 🎯 Your Role
**Full-Stack Developer & Admin Panel Specialist**

You are responsible for the admin dashboard, shopping cart system, and product management. You'll work on both frontend and backend to create a complete admin experience and smooth shopping cart functionality.

---

## 📋 Your Responsibilities

### 1. Admin Dashboard Frontend (40%)

#### Admin Dashboard Overview
- [ ] Create admin dashboard layout
- [ ] Display key statistics (sales, orders, users, products)
- [ ] Recent orders list
- [ ] Revenue charts
- [ ] Quick action buttons

**File to work on:**
- `client/src/pages/admin/AdminDashboard.js`

**Features:**
- Total revenue card
- Total orders card
- Total users card
- Total products card
- Recent orders table
- Sales chart (last 7 days)
- Top selling products

#### Admin Products Management
- [ ] Products list page with table
- [ ] Add product button
- [ ] Edit product functionality
- [ ] Delete product with confirmation
- [ ] Search and filter products
- [ ] Pagination
- [ ] Image upload preview

**Files to work on:**
- `client/src/pages/admin/AdminProducts.js`
- `client/src/pages/admin/AdminProductForm.js`

**AdminProducts features:**
- Table with columns: Image, Name, Price, Category, Stock, Actions
- Search bar
- Filter by category
- Edit and Delete buttons
- "Add New Product" button

**AdminProductForm features:**
- Form fields: name, description, price, category, brand, stock
- Multiple image upload
- Image preview
- Validation
- Submit and Cancel buttons

#### Admin Orders Management
- [ ] All orders list
- [ ] Order status filter
- [ ] Update order status
- [ ] View order details
- [ ] Mark as delivered
- [ ] Search orders

**File to work on:**
- `client/src/pages/admin/AdminOrders.js`

**Features:**
- Orders table with: Order ID, User, Date, Total, Status, Actions
- Filter by status (pending, processing, shipped, delivered)
- "Mark as Delivered" button
- "View Details" modal
- Search by order ID or user email

#### Admin Users Management
- [ ] Users list table
- [ ] Update user role (user/admin)
- [ ] Delete user
- [ ] View user details
- [ ] Search users

**File to work on:**
- `client/src/pages/admin/AdminUsers.js`

**Features:**
- Users table with: Name, Email, Role, Joined Date, Actions
- Role dropdown (user/admin)
- Delete button with confirmation
- Search by name or email
- Pagination

#### Admin Analytics Page
- [ ] Sales analytics charts
- [ ] Revenue over time graph
- [ ] Category-wise sales
- [ ] Top products
- [ ] Customer insights

**File to work on:**
- `client/src/pages/admin/AdminAnalytics.js`

**Features:**
- Line chart for revenue
- Pie chart for category distribution
- Bar chart for top products
- Date range selector
- Export data button (optional)

---

### 2. Shopping Cart System (30%)

#### Cart Sidebar Component
- [ ] Slide-in cart sidebar
- [ ] Cart items list
- [ ] Quantity controls (+/-)
- [ ] Remove item button
- [ ] Cart total
- [ ] Checkout button
- [ ] Empty cart state

**File to work on:**
- `client/src/components/cart/CartSidebar.js`

**Features:**
- Smooth slide animation
- Product image and name
- Quantity selector
- Price per item
- Subtotal calculation
- "Continue Shopping" button
- "Checkout" button
- Close button

#### Cart Page
- [ ] Full cart page layout
- [ ] Cart items with details
- [ ] Quantity update
- [ ] Remove items
- [ ] Apply coupon code (optional)
- [ ] Cart summary
- [ ] Proceed to checkout button

**File to work on:**
- `client/src/pages/CartPage.js`

**Features:**
- Responsive table/grid of cart items
- Quantity controls
- Remove button
- Continue shopping link
- Cart summary box:
  - Subtotal
  - Tax
  - Shipping
  - Total
- Proceed to checkout button

#### Cart State Management
- [ ] Add to cart action
- [ ] Remove from cart action
- [ ] Update quantity action
- [ ] Clear cart action
- [ ] Calculate totals
- [ ] Persist cart in localStorage

**File to work on:**
- `client/src/store/slices/cartSlice.js`

**Redux actions needed:**
```javascript
addToCart(product, quantity)
removeFromCart(productId)
updateQuantity(productId, quantity)
clearCart()
calculateTotals()
```

#### Checkout Page
- [ ] Shipping address form
- [ ] Order summary
- [ ] Payment method selection
- [ ] Place order button
- [ ] Form validation
- [ ] Integration with payment

**File to work on:**
- `client/src/pages/CheckoutPage.js`

**Sections:**
- Shipping address form (address, city, postal code, country)
- Order summary (items, quantities, prices)
- Payment method selection
- Total amount
- Place order button
- Terms and conditions checkbox

---

### 3. Product Management Backend (30%)

#### Product Routes
- [ ] Get all products with filters
- [ ] Get single product
- [ ] Create product (Admin)
- [ ] Update product (Admin)
- [ ] Delete product (Admin)
- [ ] Add product review
- [ ] Get product categories

**File to work on:**
- `server/routes/products.js`

**Endpoints to create:**

```javascript
GET /api/products
- Query params: category, brand, minPrice, maxPrice, sort, page, limit
- Returns: products array, pagination info

GET /api/products/featured
- Returns: featured products

GET /api/products/categories
- Returns: unique categories and brands

GET /api/products/:id
- Returns: single product with reviews

POST /api/products (Admin only)
- Body: name, description, price, images, category, brand, stock
- Returns: created product

PUT /api/products/:id (Admin only)
- Body: fields to update
- Returns: updated product

DELETE /api/products/:id (Admin only)
- Returns: success message

POST /api/products/:id/reviews
- Body: rating, comment
- Returns: updated product with review
```

#### User Routes
- [ ] Get user profile
- [ ] Update user profile
- [ ] Get user wishlist
- [ ] Add to wishlist
- [ ] Remove from wishlist
- [ ] Get user orders

**File to work on:**
- `server/routes/users.js`

**Endpoints to create:**

```javascript
GET /api/users/profile
- Returns: user profile

PUT /api/users/profile
- Body: name, email, phone, address
- Returns: updated user

GET /api/users/wishlist
- Returns: wishlist with populated products

POST /api/users/wishlist/:productId
- Returns: updated wishlist

DELETE /api/users/wishlist/:productId
- Returns: updated wishlist

GET /api/users/orders
- Returns: user's order history
```

#### Image Upload with Cloudinary
- [ ] Set up Cloudinary configuration
- [ ] Create image upload endpoint
- [ ] Handle multiple images
- [ ] Delete old images on update
- [ ] Optimize images

**Integration in product routes:**
```javascript
// Use multer for file upload
// Upload to Cloudinary
// Store URLs in product
```

---

### Additional Tasks

#### Wishlist Page
- [ ] Display wishlist items
- [ ] Remove from wishlist button
- [ ] Add to cart from wishlist
- [ ] Empty wishlist state

**File to work on:**
- `client/src/pages/WishlistPage.js`

#### Orders Page
- [ ] User order history
- [ ] Order details
- [ ] Order status tracking
- [ ] Reorder button

**File to work on:**
- `client/src/pages/OrdersPage.js`

#### UI Components
- [ ] Product card component
- [ ] Loading spinner
- [ ] Modal component (optional)
- [ ] Button components (optional)

**Files to work on:**
- `client/src/components/ui/ProductCard.js`
- `client/src/components/ui/LoadingSpinner.js`

---

## 🔧 Technical Stack You'll Use

### Frontend
- React 18
- Redux Toolkit
- React Router
- Tailwind CSS
- Lucide React (icons)
- React Hot Toast

### Backend
- Node.js
- Express.js
- Mongoose
- Multer (file upload)
- Cloudinary (image storage)

---

## 📝 Step-by-Step Implementation Guide

### Week 1: UI Components & Cart

#### Day 1-2: UI Components
1. Create ProductCard component
2. Create LoadingSpinner component
3. Add reusable styles
4. Test components

#### Day 3-4: Cart System
1. Create cart slice with all actions
2. Implement localStorage persistence
3. Create CartSidebar component
4. Create CartPage
5. Test add/remove/update cart

#### Day 5: Wishlist & Orders Pages
1. Create WishlistPage
2. Create OrdersPage
3. Connect to Redux
4. Style pages

### Week 2: Admin Dashboard

#### Day 1-2: Admin Layout & Dashboard
1. Create admin layout with sidebar
2. Create AdminDashboard with stats
3. Fetch and display statistics
4. Add charts (optional: use recharts)

#### Day 3-4: Admin Products
1. Create AdminProducts list page
2. Create AdminProductForm
3. Implement add/edit/delete
4. Add image upload preview

#### Day 5: Admin Orders & Users
1. Create AdminOrders page
2. Create AdminUsers page
3. Implement status updates
4. Add search and filters

### Week 3: Backend Routes

#### Day 1-2: Product Routes
1. Create all product endpoints
2. Add filtering and sorting
3. Add pagination
4. Test with Postman

#### Day 3-4: User Routes & Cloudinary
1. Create user routes
2. Set up Cloudinary
3. Implement image upload
4. Test image upload

#### Day 5: Integration
1. Connect frontend to backend
2. Test all CRUD operations
3. Fix bugs

### Week 4: Checkout & Testing

#### Day 1-2: Checkout Page
1. Create checkout form
2. Add validation
3. Connect to Harsh's payment system
4. Test complete flow

#### Day 3-5: Testing & Polish
1. Test all admin features
2. Test cart operations
3. Fix responsive issues
4. Bug fixes

### Week 5: Final Polish

1. Admin analytics page
2. Performance optimization
3. Final testing
4. Documentation

---

## 💻 Code Examples

### Example: Cart Slice
```javascript
// client/src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart')) 
      : [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item._id === product._id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity: quantity,
          stock: product.stock,
        });
      }
      
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item._id === productId);
      
      if (item) {
        item.quantity = quantity;
        cartSlice.caseReducers.calculateTotals(state);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
    
    calculateTotals: (state) => {
      let quantity = 0;
      let amount = 0;
      
      state.items.forEach(item => {
        quantity += item.quantity;
        amount += item.price * item.quantity;
      });
      
      state.totalQuantity = quantity;
      state.totalAmount = amount;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
```

### Example: Product Routes
```javascript
// server/routes/products.js
const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      sort = '-createdAt',
      page = 1,
      limit = 12,
      search,
    } = req.query;

    // Build query
    let query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get categories and brands
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    res.json({ success: true, categories, brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (Admin)
router.post('/', protect, admin, upload.array('images', 5), async (req, res) => {
  try {
    const { name, description, price, category, brand, stock, featured } = req.body;

    // Upload images to Cloudinary
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images: imageUrls,
      featured: featured === 'true',
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update product (Admin)
router.put('/:id', protect, admin, upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, description, price, category, brand, stock, featured } = req.body;

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.stock = stock !== undefined ? stock : product.stock;
    product.featured = featured !== undefined ? featured === 'true' : product.featured;

    // Upload new images if provided
    if (req.files && req.files.length > 0) {
      const imageUrls = [];
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
      product.images = imageUrls;
    }

    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete product (Admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product review
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

### Example: Admin Dashboard
```javascript
// client/src/pages/admin/AdminDashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<DollarSign className="h-8 w-8" />}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toFixed(2)}`}
          bgColor="bg-green-500"
        />
        <StatCard
          icon={<ShoppingBag className="h-8 w-8" />}
          title="Total Orders"
          value={stats.totalOrders}
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={<Users className="h-8 w-8" />}
          title="Total Users"
          value={stats.totalUsers}
          bgColor="bg-purple-500"
        />
        <StatCard
          icon={<Package className="h-8 w-8" />}
          title="Total Products"
          value={stats.totalProducts}
          bgColor="bg-orange-500"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">#{order._id.slice(-6)}</td>
                  <td className="py-3 px-4">{order.user?.name}</td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.isPaid
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, bgColor }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`${bgColor} text-white p-3 rounded-lg`}>{icon}</div>
    </div>
  </div>
);

export default AdminDashboard;
```

### Example: Cart Sidebar
```javascript
// client/src/components/cart/CartSidebar.js
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-xl">${totalAmount.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Checkout
              </button>
              <button
                onClick={onClose}
                className="w-full mt-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
```

---

## 🧪 Testing Your Work

### Testing Cart
1. Add products to cart
2. Update quantities
3. Remove items
4. Check localStorage persistence
5. Test cart total calculations
6. Test checkout flow

### Testing Admin Panel
1. Login as admin
2. View dashboard statistics
3. Create new product
4. Upload images
5. Edit product
6. Delete product
7. Update order status
8. Manage users

### API Testing
```bash
# Test product endpoints
GET http://localhost:5001/api/products
GET http://localhost:5001/api/products?category=Electronics
GET http://localhost:5001/api/products/:id

# Test admin endpoints (use admin token)
POST http://localhost:5001/api/products
Headers: Authorization: Bearer ADMIN_TOKEN
Body: FormData with product details and images

PUT http://localhost:5001/api/products/:id
DELETE http://localhost:5001/api/products/:id
```

---

## 📞 Coordination Points

### With Subham (Tech Lead)
- Get Product and Order models reviewed
- Ask for help with admin middleware
- Get code reviewed regularly

### With Sneha (Frontend Lead)
- Share ProductCard component
- Coordinate on design consistency
- Share cart state management

### With Harsh (Payment Specialist)
- Integrate checkout with payment
- Test complete order flow
- Ensure order creation works with payment

---

## ✅ Success Criteria

You're doing great when:
- [ ] Admin dashboard shows correct stats
- [ ] All CRUD operations work for products
- [ ] Image upload works smoothly
- [ ] Cart operations are smooth
- [ ] Checkout flow works end-to-end
- [ ] Admin can manage orders and users
- [ ] UI is responsive and polished
- [ ] All backend routes work correctly

---

## 🆘 Need Help?

### Resources
- [React Docs](https://react.dev/)
- [Express.js Docs](https://expressjs.com/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Multer Docs](https://github.com/expressjs/multer)

### Common Issues
1. **Image upload fails**: Check Cloudinary credentials
2. **Cart not persisting**: Check localStorage
3. **Admin routes 403**: Verify admin middleware
4. **File upload error**: Check multer configuration

---

**Remember: You're building the core functionality! Quality matters! 🎯**

---

*Admin + Cart = Heart of the app!*

