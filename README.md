# 🛒 Amazon Clone - Full-Stack E-commerce Application

A comprehensive e-commerce platform inspired by Amazon, built with modern web technologies. This project includes a responsive React frontend, Node.js backend, and MongoDB database.

## ✨ Features

### 🏠 Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Product Browsing**: Advanced filtering, sorting, and search functionality
- **Shopping Cart**: Persistent cart with real-time updates
- **User Authentication**: Secure login/signup with JWT tokens
- **Product Reviews**: Rating and review system
- **Wishlist**: Save favorite products for later
- **Order Management**: Track order history and status

### 🔧 Backend Features
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for image management
- **Payment Processing**: Stripe integration ready
- **Admin Panel**: Complete admin dashboard for managing products, orders, and users
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling and logging

### 🎯 Key Components

#### Frontend (React + Tailwind CSS)
- **Homepage**: Hero section, featured products, categories
- **Product Listing**: Advanced filters, sorting, pagination
- **Product Details**: Image gallery, reviews, specifications
- **Shopping Cart**: Add/remove items, quantity management
- **User Authentication**: Login, register, profile management
- **Admin Dashboard**: Product management, order tracking, user management

#### Backend (Node.js + Express + MongoDB)
- **Authentication Routes**: Login, register, profile management
- **Product Routes**: CRUD operations, search, filtering
- **Order Routes**: Order creation, tracking, management
- **User Routes**: Profile, wishlist, order history
- **Admin Routes**: Dashboard, user management, analytics

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amazon-clone
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install all dependencies (root, server, client)
   npm run install-all
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/amazon-clone
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   FRONTEND_URL=http://localhost:3000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
   
   **📖 For detailed instructions on getting API credentials, see [DEPLOY.md](./DEPLOY.md)**

4. **Start the application**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   
   # Or start individually:
   npm run server  # Backend only
   npm run client  # Frontend only
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
amazon-clone/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── layout/     # Layout components
│   │   │   ├── ui/         # UI components
│   │   │   └── cart/       # Cart components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── index.js           # Server entry point
│   └── package.json
├── package.json           # Root package.json
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form handling
- **React Query**: Data fetching and caching
- **Lucide React**: Beautiful icons
- **Framer Motion**: Animations
- **React Hot Toast**: Notifications

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **Cloudinary**: Image storage and optimization
- **Stripe**: Payment processing
- **Nodemailer**: Email sending
- **Express Validator**: Input validation

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get categories and brands
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/reviews` - Add product review
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/pay` - Update order payment
- `PUT /api/orders/:id/deliver` - Update order delivery (Admin)
- `GET /api/orders/admin/all` - Get all orders (Admin)

### Users
- `GET /api/users/wishlist` - Get user wishlist
- `POST /api/users/wishlist/:productId` - Add to wishlist
- `DELETE /api/users/wishlist/:productId` - Remove from wishlist
- `GET /api/users/orders` - Get user order history

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 UI Components

### Layout Components
- **Navbar**: Responsive navigation with search and cart
- **Footer**: Links and company information
- **Sidebar**: Mobile navigation menu
- **CartSidebar**: Shopping cart overlay

### UI Components
- **ProductCard**: Product display with actions
- **LoadingSpinner**: Loading states
- **Form Components**: Input fields, buttons, validation

### Pages
- **HomePage**: Hero section, categories, featured products
- **ProductsPage**: Product listing with filters
- **ProductDetailPage**: Detailed product view with reviews
- **CartPage**: Shopping cart management
- **LoginPage/RegisterPage**: Authentication forms
- **ProfilePage**: User profile management
- **Admin Pages**: Dashboard, product management, user management

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_*`: Cloudinary configuration for image uploads
- `STRIPE_*`: Stripe configuration for payments
- `EMAIL_*`: Email configuration for notifications

### Database Models
- **User**: User authentication and profile data
- **Product**: Product information, images, reviews
- **Order**: Order details, shipping, payment
- **Review**: Product reviews and ratings

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Deploy the `client/build` folder
3. Set environment variables for API endpoints

### Backend Deployment (Heroku/Railway)
1. Set up MongoDB Atlas or other cloud database
2. Configure environment variables
3. Deploy the server directory
4. Update frontend API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Amazon for design inspiration
- React and Node.js communities
- All open-source libraries used in this project

## 📞 Support

For support, email support@amazonclone.com or create an issue in the repository.

---

**Happy Shopping! 🛒✨**
# Basic-E-commerce-Store
# Basic-E-commerce-Store
