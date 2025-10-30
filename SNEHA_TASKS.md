# 👩‍💻 Sneha's Task List - Frontend Lead & UI/UX Specialist

## 🎯 Your Role
**Frontend Lead & UI/UX Specialist**

You are responsible for creating a beautiful, responsive, and user-friendly frontend. You'll build the user-facing pages, manage state with Redux, and ensure a great user experience.

---

## 📋 Your Responsibilities

### 1. Frontend Architecture (40%)

#### State Management - Redux Store
- [ ] Configure Redux store
- [ ] Create auth slice (login, register, user data)
- [ ] Create product slice (products, filters, search)
- [ ] Create cart slice (add, remove, update cart)
- [ ] Create wishlist slice
- [ ] Create order slice
- [ ] Create UI slice (modals, notifications)

**Files to work on:**
- `client/src/store/store.js`
- `client/src/store/slices/authSlice.js`
- `client/src/store/slices/productSlice.js`
- `client/src/store/slices/cartSlice.js`
- `client/src/store/slices/wishlistSlice.js`
- `client/src/store/slices/orderSlice.js`
- `client/src/store/slices/uiSlice.js`

#### Routing & Navigation
- [ ] Set up React Router
- [ ] Create public routes
- [ ] Create protected routes (require login)
- [ ] Create admin routes
- [ ] Add 404 page
- [ ] Implement navigation guards

**File to work on:**
- `client/src/App.js`

**Routes to implement:**
```javascript
/ - HomePage
/products - ProductsPage
/products/:id - ProductDetailPage
/cart - CartPage
/checkout - CheckoutPage
/login - LoginPage
/register - RegisterPage
/profile - ProfilePage (protected)
/wishlist - WishlistPage (protected)
/orders - OrdersPage (protected)
/admin/* - Admin pages (admin only)
/404 - NotFoundPage
```

---

### 2. User-Facing Pages (40%)

#### HomePage
- [ ] Create hero section with CTA
- [ ] Display featured products
- [ ] Show product categories
- [ ] Add promotional banners
- [ ] Implement smooth animations

**File to work on:**
- `client/src/pages/HomePage.js`

**Components needed:**
- Hero section with search
- Featured products grid
- Category cards
- Newsletter signup
- Testimonials (optional)

#### ProductsPage
- [ ] Product grid layout
- [ ] Category filter sidebar
- [ ] Price range filter
- [ ] Brand filter
- [ ] Sort options (price, rating, newest)
- [ ] Search functionality
- [ ] Pagination
- [ ] Loading states

**File to work on:**
- `client/src/pages/ProductsPage.js`

**Features:**
- Responsive grid (1 col mobile, 2 tablet, 4 desktop)
- Filter by category, brand, price
- Sort by price, rating, date
- Search integration
- "No products found" state

#### ProductDetailPage
- [ ] Product image gallery
- [ ] Product information
- [ ] Add to cart button
- [ ] Add to wishlist button
- [ ] Product reviews section
- [ ] Related products
- [ ] Breadcrumb navigation

**File to work on:**
- `client/src/pages/ProductDetailPage.js`

**Sections:**
- Image gallery with zoom
- Product title, price, rating
- Description and specifications
- Add to cart/wishlist buttons
- Reviews and ratings
- Related products carousel

#### Authentication Pages
- [ ] Login page with form validation
- [ ] Register page with form validation
- [ ] Google OAuth button
- [ ] Forgot password link
- [ ] Form error handling
- [ ] Loading states

**Files to work on:**
- `client/src/pages/LoginPage.js`
- `client/src/pages/RegisterPage.js`

**Features:**
- Email/password validation
- Show/hide password toggle
- Remember me checkbox
- Redirect after login
- Error messages
- Success notifications

#### ProfilePage
- [ ] User information display
- [ ] Edit profile form
- [ ] Change password section
- [ ] Order history link
- [ ] Wishlist link
- [ ] Logout button

**File to work on:**
- `client/src/pages/ProfilePage.js`

**Sections:**
- Personal info (name, email, phone)
- Shipping address
- Update profile form
- Change password
- Account settings

---

### 3. Layout Components (20%)

#### Navbar
- [ ] Logo and branding
- [ ] Navigation links
- [ ] Search bar
- [ ] Cart icon with count badge
- [ ] User menu dropdown
- [ ] Mobile hamburger menu
- [ ] Sticky on scroll

**File to work on:**
- `client/src/components/layout/Navbar.js`

**Features:**
- Responsive design
- Search autocomplete
- Cart count badge
- User dropdown (profile, orders, logout)
- Mobile menu toggle

#### Footer
- [ ] Company information
- [ ] Quick links
- [ ] Social media icons
- [ ] Newsletter signup
- [ ] Copyright notice

**File to work on:**
- `client/src/components/layout/Footer.js`

#### Sidebar (Mobile Menu)
- [ ] Slide-in animation
- [ ] Navigation links
- [ ] Categories
- [ ] Close button
- [ ] Backdrop overlay

**File to work on:**
- `client/src/components/layout/Sidebar.js`

---

## 🔧 Technical Stack You'll Use

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - API calls
- **React Hook Form** - Form handling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

---

## 📝 Step-by-Step Implementation Guide

### Week 1: Foundation

#### Day 1-2: Project Setup & Store
1. Review project structure
2. Configure Redux store
3. Create all slices (auth, product, cart, etc.)
4. Set up API configuration
5. Test Redux DevTools

#### Day 3-4: Routing & Layout
1. Set up React Router in App.js
2. Create Navbar component
3. Create Footer component
4. Create Sidebar component
5. Test navigation between pages

#### Day 5: Authentication Pages
1. Create LoginPage
2. Create RegisterPage
3. Implement form validation
4. Connect to auth slice
5. Test login/register flow (with mock data first)

### Week 2: Main Pages

#### Day 1-2: HomePage
1. Create hero section
2. Add featured products section
3. Create category cards
4. Add animations with Framer Motion
5. Make it responsive

#### Day 3-4: ProductsPage
1. Create product grid
2. Add filter sidebar
3. Implement sort options
4. Add search functionality
5. Connect to product slice

#### Day 5: ProductDetailPage
1. Create image gallery
2. Add product information
3. Implement add to cart
4. Add reviews section
5. Show related products

### Week 3: Polish & Integration

#### Day 1-2: ProfilePage
1. Display user information
2. Create edit profile form
3. Add change password
4. Link to orders and wishlist

#### Day 3-4: Integration with Backend
1. Connect all API calls
2. Replace mock data with real API
3. Handle loading states
4. Handle error states
5. Test all flows

#### Day 5: UI Polish
1. Add loading spinners
2. Add skeleton screens
3. Improve animations
4. Fix responsive issues
5. Cross-browser testing

### Week 4: Testing & Optimization

1. Test all user flows
2. Fix bugs
3. Optimize performance
4. Add meta tags for SEO
5. Accessibility improvements

### Week 5: Deployment

1. Build production bundle
2. Deploy to Vercel
3. Configure environment variables
4. Test production build
5. Monitor and fix issues

---

## 💻 Code Examples

### Example: Auth Slice
```javascript
// client/src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
```

### Example: LoginPage
```javascript
// client/src/pages/LoginPage.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
```

### Example: Navbar Component
```javascript
// client/src/components/layout/Navbar.js
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, Menu, Search } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ShopHub
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 mx-8">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <User className="h-6 w-6 text-gray-700" />
                  <span className="hidden md:block">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

---

## 🎨 UI/UX Guidelines

### Color Scheme
- Primary: Indigo (#4F46E5)
- Secondary: Purple (#7C3AED)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Gray scale for text and backgrounds

### Typography
- Headings: Bold, Large
- Body: Regular, Readable
- Use Tailwind's font utilities

### Spacing
- Consistent padding/margin
- Use Tailwind's spacing scale
- White space is important!

### Responsive Design
- Mobile first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Test on different screen sizes

### Animations
- Smooth transitions
- Hover effects
- Loading states
- Use Framer Motion for complex animations

---

## 🧪 Testing Your Work

### Manual Testing Checklist
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Forms validate properly
- [ ] Login/logout works
- [ ] Cart operations work
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Works on Chrome
- [ ] Works on Firefox
- [ ] Works on Safari

---

## 📞 Coordination Points

### With Subham (Tech Lead)
- Get API endpoint documentation
- Report any API issues
- Ask for help with CORS
- Coordinate on data formats

### With Tushar (Admin/Cart)
- Coordinate on cart UI
- Share reusable components
- Ensure consistency in design

### With Harsh (Payments)
- Coordinate on checkout flow
- Test payment integration together

---

## ✅ Success Criteria

You're doing great when:
- [ ] UI is beautiful and responsive
- [ ] All pages are functional
- [ ] State management works smoothly
- [ ] Forms validate properly
- [ ] Loading states are shown
- [ ] Error handling is graceful
- [ ] Animations are smooth
- [ ] Mobile experience is great

---

## 🆘 Need Help?

### Resources
- [React Docs](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Common Issues
1. **CORS Error**: Ask Subham to configure CORS
2. **State not updating**: Check Redux DevTools
3. **Styles not applying**: Check Tailwind config
4. **Route not working**: Check React Router setup

---

**Remember: You're creating the face of the application! Make it beautiful and user-friendly! ✨**

---

*Your frontend = First impression!*

