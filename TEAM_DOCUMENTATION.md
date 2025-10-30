# 👥 Team Documentation - E-commerce Store Project

## 📋 Project Overview

This is a full-stack e-commerce application built with React, Node.js, Express, and MongoDB. The project includes features like product browsing, shopping cart, user authentication, payment processing, admin dashboard, and more.

---

## 🎯 Team Structure & Roles

### 👨‍💼 Subham - **Tech Lead & Backend Architect**
**Primary Responsibilities:** Backend Development, Database Design, API Architecture, Team Coordination

**Why This Role:**
As Tech Lead, Subham will oversee the overall technical direction, ensure code quality, and coordinate between team members. This role requires strong technical skills and leadership qualities.

#### Detailed Responsibilities:

##### 1. Backend Core Development (70%)
- **Authentication & Authorization System**
  - JWT token implementation
  - Password encryption with bcrypt
  - Google OAuth integration
  - Session management
  - File: `server/routes/auth.js`, `server/middleware/auth.js`

- **Database Architecture**
  - MongoDB schema design and optimization
  - User, Product, and Order models
  - Database relationships and indexing
  - Files: `server/models/User.js`, `server/models/Product.js`, `server/models/Order.js`

- **Admin API Routes**
  - Dashboard statistics API
  - User management endpoints
  - Analytics and reporting
  - File: `server/routes/admin.js`

- **Server Configuration**
  - Express server setup
  - Middleware configuration
  - CORS and security
  - File: `server/index.js`

##### 2. Team Leadership (30%)
- Code review for all team members
- Technical problem-solving and guidance
- Integration testing and deployment
- Daily standup coordination
- Conflict resolution and architecture decisions

#### Tech Stack:
- Node.js, Express.js
- MongoDB, Mongoose
- JWT, bcrypt, passport
- REST API design

---

### 👩‍💻 Sneha - **Frontend Lead & UI/UX Specialist**
**Primary Responsibilities:** Frontend Architecture, Component Development, UI/UX Design, State Management

#### Detailed Responsibilities:

##### 1. Core Frontend Architecture (40%)
- **State Management**
  - Redux store configuration
  - Slices for auth, cart, products, orders, wishlist
  - Files: `client/src/store/store.js`, `client/src/store/slices/*`

- **Routing & Navigation**
  - React Router setup
  - Protected routes
  - Navigation flow
  - File: `client/src/App.js`

##### 2. User-Facing Pages (40%)
- **Homepage**
  - Hero section
  - Featured products
  - Categories display
  - File: `client/src/pages/HomePage.js`

- **Products Pages**
  - Product listing with filters
  - Product detail page
  - Search functionality
  - Files: `client/src/pages/ProductsPage.js`, `client/src/pages/ProductDetailPage.js`

- **User Authentication Pages**
  - Login page
  - Registration page
  - Profile management
  - Files: `client/src/pages/LoginPage.js`, `client/src/pages/RegisterPage.js`, `client/src/pages/ProfilePage.js`

##### 3. Layout Components (20%)
- **Navbar Component**
  - Responsive navigation
  - Search bar
  - Cart icon with count
  - File: `client/src/components/layout/Navbar.js`

- **Footer & Sidebar**
  - Footer with links
  - Mobile sidebar menu
  - Files: `client/src/components/layout/Footer.js`, `client/src/components/layout/Sidebar.js`

#### Tech Stack:
- React 18, React Hooks
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion

---

### 👨‍💻 Harsh - **Backend Developer & Payment Integration Specialist**
**Primary Responsibilities:** Payment Processing, Order Management, Email Services

#### Detailed Responsibilities:

##### 1. Payment System (40%)
- **Stripe Integration**
  - Payment processing setup
  - Checkout session creation
  - Payment webhooks
  - File: `server/routes/payments.js`, `client/src/services/stripeService.js`

- **Payment Security**
  - Secure payment flow
  - Transaction validation
  - Error handling

##### 2. Order Management System (40%)
- **Order Routes & Logic**
  - Create order endpoint
  - Get user orders
  - Order status updates
  - Payment confirmation
  - Delivery tracking
  - File: `server/routes/orders.js`

- **Order Models**
  - Order schema design
  - Order validation
  - File: `server/models/Order.js` (collaborate with Subham)

##### 3. Email & Notification Services (20%)
- **Email Service**
  - Nodemailer setup
  - Order confirmation emails
  - Password reset emails
  - Transactional emails
  - File: `server/services/emailService.js`

- **Notification System**
  - Email templates
  - Notification triggers

#### Tech Stack:
- Stripe API
- Nodemailer
- Express.js
- MongoDB/Mongoose

---

### 👨‍💻 Tushar - **Full-Stack Developer & Admin Panel Specialist**
**Primary Responsibilities:** Admin Dashboard, Shopping Cart, Product Management

#### Detailed Responsibilities:

##### 1. Admin Dashboard Frontend (40%)
- **Admin Pages**
  - Admin dashboard overview
  - Product management interface
  - Order management interface
  - User management interface
  - Analytics page
  - Files: 
    - `client/src/pages/admin/AdminDashboard.js`
    - `client/src/pages/admin/AdminProducts.js`
    - `client/src/pages/admin/AdminProductForm.js`
    - `client/src/pages/admin/AdminOrders.js`
    - `client/src/pages/admin/AdminUsers.js`
    - `client/src/pages/admin/AdminAnalytics.js`

##### 2. Shopping Cart System (30%)
- **Cart Frontend**
  - Cart sidebar component
  - Cart page
  - Cart state management
  - Files: 
    - `client/src/components/cart/CartSidebar.js`
    - `client/src/pages/CartPage.js`
    - `client/src/store/slices/cartSlice.js`

- **Checkout Page**
  - Checkout form
  - Order summary
  - File: `client/src/pages/CheckoutPage.js`

##### 3. Product Management Backend (30%)
- **Product Routes**
  - CRUD operations for products
  - Product search and filtering
  - Category management
  - Image upload with Cloudinary
  - File: `server/routes/products.js`

- **User Routes**
  - Wishlist functionality
  - User order history
  - Profile updates
  - File: `server/routes/users.js`

#### Additional Tasks:
- **Wishlist & Orders Pages**
  - Files: `client/src/pages/WishlistPage.js`, `client/src/pages/OrdersPage.js`

- **UI Components**
  - Product card component
  - Loading spinner
  - Files: `client/src/components/ui/*`

#### Tech Stack:
- React + Redux
- Node.js + Express
- Cloudinary API
- Tailwind CSS

---

## 📂 File Assignment Matrix

| Team Member | Files/Directories |
|------------|-------------------|
| **Subham** | `server/index.js`, `server/routes/auth.js`, `server/middleware/auth.js`, `server/models/User.js`, `server/models/Product.js`, `server/models/Order.js`, `server/routes/admin.js` |
| **Sneha** | `client/src/App.js`, `client/src/store/`, `client/src/pages/HomePage.js`, `client/src/pages/ProductsPage.js`, `client/src/pages/ProductDetailPage.js`, `client/src/pages/LoginPage.js`, `client/src/pages/RegisterPage.js`, `client/src/pages/ProfilePage.js`, `client/src/components/layout/` |
| **Harsh** | `server/routes/orders.js`, `server/routes/payments.js`, `server/services/emailService.js`, `client/src/services/stripeService.js` |
| **Tushar** | `client/src/pages/admin/`, `client/src/pages/CartPage.js`, `client/src/pages/CheckoutPage.js`, `client/src/pages/WishlistPage.js`, `client/src/pages/OrdersPage.js`, `client/src/components/cart/`, `client/src/components/ui/`, `server/routes/products.js`, `server/routes/users.js` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Clone the Repository**
```bash
cd /Users/adityapandey/Downloads/Basic-E-commerce-Store-main
```

2. **Install Dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

3. **Environment Configuration**

Create `server/.env` file:
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ecommerce-store
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure
JWT_EXPIRE=7d

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary (For image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe (For payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

FRONTEND_URL=http://localhost:3000
```

4. **Run the Application**

```bash
# From root directory, run both frontend and backend
npm run dev

# Or run separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

5. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

---

## 📝 Development Workflow

### Git Workflow

1. **Branch Naming Convention**
   - Subham: `backend/feature-name` or `lead/feature-name`
   - Sneha: `frontend/feature-name`
   - Harsh: `payment/feature-name` or `order/feature-name`
   - Tushar: `admin/feature-name` or `cart/feature-name`

2. **Daily Workflow**
```bash
# Start of day
git checkout main
git pull origin main
git checkout -b your-branch-name

# Make changes and commit
git add .
git commit -m "descriptive message"

# Push to remote
git push origin your-branch-name

# Create Pull Request on GitHub
# Get code review from Subham
```

3. **Commit Message Format**
```
feat: Add user authentication
fix: Resolve cart calculation bug
docs: Update API documentation
style: Format code with prettier
refactor: Optimize product query
test: Add unit tests for orders
```

### Code Review Process

1. All code must be reviewed by **Subham** before merging
2. Create detailed pull requests with description
3. Address review comments promptly
4. Ensure all tests pass before requesting review

### Communication

1. **Daily Standup** (15 minutes)
   - What did you do yesterday?
   - What will you do today?
   - Any blockers?

2. **Tools**
   - Use project management tool (Trello/Jira)
   - Communication: Slack/Discord
   - Code: GitHub

---

## 🧪 Testing Guidelines

### Subham's Responsibilities
- Backend API testing with Postman/Thunder Client
- Integration testing
- Database integrity tests

### Sneha's Responsibilities
- Component testing
- UI/UX testing
- Responsive design testing

### Harsh's Responsibilities
- Payment flow testing (use Stripe test mode)
- Order creation and email testing

### Tushar's Responsibilities
- Admin panel functionality testing
- Cart operations testing
- End-to-end user flow testing

---

## 📊 Development Timeline

### Week 1: Foundation
- **Subham**: Database models, auth system
- **Sneha**: Project setup, routing, state management
- **Harsh**: Email service setup
- **Tushar**: Basic UI components

### Week 2: Core Features
- **Subham**: Admin APIs, user management
- **Sneha**: Homepage, product pages, auth pages
- **Harsh**: Order routes, payment integration
- **Tushar**: Admin dashboard, product management

### Week 3: Advanced Features
- **Subham**: API optimization, security
- **Sneha**: Advanced filters, search, UI polish
- **Harsh**: Payment testing, email templates
- **Tushar**: Cart system, checkout flow

### Week 4: Integration & Testing
- **All**: Integration testing
- **Subham**: Lead integration efforts, bug fixes
- **All**: Bug fixes and optimization

### Week 5: Deployment
- **Subham**: Backend deployment (Railway/Render)
- **Sneha**: Frontend deployment (Vercel)
- **Harsh**: Payment production setup
- **Tushar**: Final testing

---

## 🔧 Useful Commands

```bash
# Development
npm run dev              # Run both frontend and backend
npm run server          # Run backend only
npm run client          # Run frontend only

# Database
cd server && npm run seed    # Seed database with sample data

# Build
cd client && npm run build   # Build production frontend

# Testing
npm test                # Run tests
```

---

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Update payment status

### Payment Endpoints
- `POST /api/payments/create-checkout-session` - Create Stripe session

### Admin Endpoints
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role

---

## 🎯 Key Milestones

- [ ] **Milestone 1**: Basic setup and authentication (Week 1)
- [ ] **Milestone 2**: Product and cart functionality (Week 2)
- [ ] **Milestone 3**: Payment and order system (Week 3)
- [ ] **Milestone 4**: Admin panel complete (Week 4)
- [ ] **Milestone 5**: Production deployment (Week 5)

---

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env

2. **CORS Error**
   - Verify FRONTEND_URL in server/.env
   - Check proxy in client/package.json

3. **Port Already in Use**
   - Kill process: `lsof -ti:5001 | xargs kill`

4. **Dependencies Error**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

---

## 📞 Contact Information

- **Subham (Tech Lead)**: subham@example.com
- **Sneha (Frontend Lead)**: sneha@example.com
- **Harsh (Backend Dev)**: harsh@example.com
- **Tushar (Full-Stack Dev)**: tushar@example.com

---

## 🏆 Best Practices

### For Everyone

1. **Code Quality**
   - Write clean, readable code
   - Add comments for complex logic
   - Follow naming conventions
   - Keep functions small and focused

2. **Git Practices**
   - Commit frequently with meaningful messages
   - Pull latest changes before starting work
   - Never commit directly to main
   - Resolve conflicts carefully

3. **Communication**
   - Ask questions when stuck
   - Update team on progress
   - Document important decisions
   - Help team members when possible

### Subham (Tech Lead)
- Review code daily
- Unblock team members quickly
- Make architectural decisions
- Ensure code quality standards
- Coordinate integrations

### Sneha (Frontend Lead)
- Maintain UI consistency
- Ensure responsive design
- Optimize performance
- Follow accessibility guidelines

### Harsh (Payment Specialist)
- Never use production keys in development
- Test payment flows thoroughly
- Handle errors gracefully
- Log all transactions

### Tushar (Full-Stack)
- Test admin features thoroughly
- Ensure data validation
- Maintain security in admin panel
- Optimize cart operations

---

## 📚 Learning Resources

### For Backend (Subham & Harsh)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Best Practices](https://jwt.io/)
- [Stripe API Documentation](https://stripe.com/docs/api)

### For Frontend (Sneha & Tushar)
- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)

---

## ✅ Definition of Done

A feature is considered complete when:
1. ✅ Code is written and tested
2. ✅ Code review approved by Subham
3. ✅ No linting errors
4. ✅ Documentation updated
5. ✅ Merged to main branch
6. ✅ Tested on development environment

---

## 🎉 Project Goals

By the end of this project, the team will have built:
- A fully functional e-commerce platform
- Professional portfolio piece
- Real-world development experience
- Team collaboration skills
- Production deployment experience

---

**Remember: Communication is key! Don't hesitate to ask questions and help each other. We're a team! 🚀**

---

*Last Updated: October 29, 2025*
*Maintained by: Subham (Tech Lead)*

