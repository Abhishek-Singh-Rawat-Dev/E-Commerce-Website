# 👨‍💼 Subham's Task List - Tech Lead & Backend Architect

## 🎯 Your Role
**Tech Lead & Backend Architect**

You are the technical leader of this project. Your responsibilities include backend development, database architecture, team coordination, and ensuring overall code quality.

---

## 📋 Your Responsibilities

### 1. Backend Core Development (70% of time)

#### Authentication & Authorization System
- [ ] Set up JWT authentication
- [ ] Implement user registration endpoint
- [ ] Implement login endpoint
- [ ] Create password hashing with bcrypt
- [ ] Implement Google OAuth integration
- [ ] Create protected route middleware
- [ ] Add session management

**Files to work on:**
- `server/routes/auth.js`
- `server/middleware/auth.js`

**Key Functions to Implement:**
```javascript
// In auth.js
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- PUT /api/auth/profile
- POST /api/auth/google (Google OAuth)
```

#### Database Models
- [ ] Design User schema with validations
- [ ] Design Product schema with reviews
- [ ] Design Order schema with relationships
- [ ] Add database indexes for performance
- [ ] Create schema relationships (User -> Orders, Products -> Reviews)

**Files to work on:**
- `server/models/User.js`
- `server/models/Product.js`
- `server/models/Order.js`

**User Schema Fields:**
- name, email, password (hashed)
- role (user/admin)
- avatar, phone
- address (shipping)
- wishlist (array of product IDs)
- createdAt, updatedAt

**Product Schema Fields:**
- name, description, price
- images (array)
- category, brand
- stock, ratings
- reviews (embedded)
- featured (boolean)

**Order Schema Fields:**
- user (reference)
- orderItems (array)
- shippingAddress
- paymentMethod, paymentResult
- totalPrice, taxPrice, shippingPrice
- isPaid, paidAt
- isDelivered, deliveredAt

#### Admin Routes
- [ ] Create dashboard statistics endpoint
- [ ] Get all users endpoint
- [ ] Update user role endpoint
- [ ] Delete user endpoint
- [ ] Sales analytics endpoint
- [ ] Recent orders endpoint

**File to work on:**
- `server/routes/admin.js`

**Endpoints to create:**
```javascript
GET  /api/admin/stats           // Dashboard statistics
GET  /api/admin/users           // All users
PUT  /api/admin/users/:id/role  // Update role
DELETE /api/admin/users/:id     // Delete user
GET  /api/admin/analytics       // Sales data
```

#### Server Configuration
- [ ] Set up Express server
- [ ] Configure middleware (cors, body-parser, etc.)
- [ ] Set up MongoDB connection
- [ ] Configure environment variables
- [ ] Add error handling middleware
- [ ] Set up security (helmet, rate limiting)

**File to work on:**
- `server/index.js`

**Setup checklist:**
```javascript
- Express app initialization
- Middleware: cors, express.json, cookie-parser
- MongoDB connection with error handling
- Route mounting (/api/auth, /api/products, etc.)
- Error handling middleware
- 404 handler
- Server listening on PORT
```

---

### 2. Team Leadership (30% of time)

#### Daily Responsibilities
- [ ] Conduct daily standup meetings (15 min)
- [ ] Review pull requests from team members
- [ ] Unblock team members when stuck
- [ ] Answer technical questions
- [ ] Make architectural decisions

#### Weekly Responsibilities
- [ ] Review code quality across the project
- [ ] Update project documentation
- [ ] Plan next week's tasks
- [ ] Integration testing
- [ ] Performance optimization

#### Code Review Checklist
When reviewing team member's code:
- ✅ Code follows project conventions
- ✅ No security vulnerabilities
- ✅ Error handling is present
- ✅ Code is well-commented
- ✅ No console.logs in production code
- ✅ Functions are small and focused
- ✅ Variable names are descriptive

---

## 🔧 Technical Stack You'll Use

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **passport** - Google OAuth
- **dotenv** - Environment variables

---

## 📝 Step-by-Step Implementation Guide

### Week 1: Foundation

#### Day 1-2: Server Setup
1. Create `server/.env` file with all environment variables
2. Set up Express server in `server/index.js`
3. Configure MongoDB connection
4. Test server is running on http://localhost:5001

#### Day 3-4: Database Models
1. Create User model with all fields
2. Create Product model with reviews
3. Create Order model with relationships
4. Test models by creating sample documents

#### Day 5: Authentication - Part 1
1. Set up JWT utilities (sign, verify)
2. Create user registration endpoint
3. Create login endpoint
4. Test with Postman/Thunder Client

### Week 2: Authentication & Admin

#### Day 1-2: Authentication - Part 2
1. Create auth middleware for protected routes
2. Implement get current user endpoint
3. Create update profile endpoint
4. Add Google OAuth (optional)

#### Day 3-5: Admin Routes
1. Create admin middleware (check if user.role === 'admin')
2. Implement dashboard statistics
3. Create user management endpoints
4. Create analytics endpoints

### Week 3: Integration & Optimization

#### Day 1-2: Code Review
1. Review all backend code from Harsh
2. Review admin backend from Tushar
3. Ensure consistency across all routes

#### Day 3-4: Integration
1. Test frontend-backend integration with Sneha
2. Fix any API issues
3. Ensure all endpoints work correctly

#### Day 5: Optimization
1. Add database indexes
2. Optimize queries
3. Add request validation

### Week 4: Security & Testing

#### Day 1-2: Security
1. Add helmet.js for security headers
2. Implement rate limiting
3. Add input sanitization
4. Review for SQL injection, XSS vulnerabilities

#### Day 3-5: Testing
1. Test all authentication flows
2. Test admin operations
3. Load testing
4. Bug fixes

### Week 5: Deployment

1. Set up MongoDB Atlas (cloud database)
2. Deploy backend to Railway/Render
3. Configure environment variables in production
4. Test production APIs
5. Monitor and fix issues

---

## 💻 Code Examples

### Example: User Model
```javascript
// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### Example: Auth Route
```javascript
// server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({ name, email, password });
    
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email and password provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
    
    // Get user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
});

module.exports = router;
```

### Example: Auth Middleware
```javascript
// server/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};
```

---

## 🧪 Testing Your Work

### Test Authentication
```bash
# Register a new user
POST http://localhost:5001/api/auth/register
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}

# Login
POST http://localhost:5001/api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}

# Get current user (use token from login)
GET http://localhost:5001/api/auth/me
Headers: Authorization: Bearer YOUR_TOKEN
```

---

## 📞 Coordination Points

### With Sneha (Frontend Lead)
- Coordinate on API response formats
- Ensure frontend can consume your APIs
- Help with CORS issues
- Provide API documentation

### With Harsh (Payment/Orders)
- Review his order routes
- Help with database queries
- Guide on error handling
- Coordinate order model design

### With Tushar (Admin/Cart)
- Review admin APIs he'll use
- Help with product routes
- Guide on image upload
- Coordinate on cart logic

---

## ✅ Success Criteria

You're doing great when:
- [ ] All authentication works smoothly
- [ ] Database models are well-designed
- [ ] Admin APIs provide accurate data
- [ ] Team members get quick responses to questions
- [ ] Code reviews are done within 24 hours
- [ ] No major bugs in backend
- [ ] APIs are well-documented
- [ ] Production deployment is successful

---

## 🆘 Need Help?

### Resources
- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [MongoDB University](https://university.mongodb.com/)

### Common Issues
1. **MongoDB Connection Error**: Check MONGODB_URI
2. **JWT Error**: Verify JWT_SECRET is set
3. **CORS Error**: Add frontend URL to CORS config
4. **Port in use**: Change PORT in .env

---

**Remember: You're the Tech Lead! Your team looks up to you. Be helpful, be patient, and lead by example! 🚀**

---

*Your success = Team's success!*

