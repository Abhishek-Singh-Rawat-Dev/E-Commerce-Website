# 🚀 Deployment Guide - Amazon Clone E-commerce

This guide will help you deploy your Amazon Clone application to various platforms and set up all necessary credentials.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Database Setup](#database-setup)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Backend Deployment (Railway/Heroku)](#backend-deployment-railwayheroku)
6. [Google OAuth Setup](#google-oauth-setup)
7. [Cloudinary Setup](#cloudinary-setup)
8. [Stripe Setup](#stripe-setup)
9. [Email Setup](#email-setup)
10. [Production Checklist](#production-checklist)

## 🔧 Prerequisites

- GitHub account
- Vercel account (free)
- Railway/Heroku account (free)
- MongoDB Atlas account (free)
- Google Cloud Console account
- Cloudinary account (free)
- Stripe account (free)

## 🔐 Environment Variables Setup

### 1. MongoDB Atlas (Database)

1. **Go to**: https://www.mongodb.com/atlas
2. **Create a free account**
3. **Create a new cluster**:
   - Choose "Free" tier (M0)
   - Select a region close to your users
   - Name your cluster (e.g., "amazon-clone")
4. **Create database user**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `amazon-clone-user`
   - Password: Generate a strong password
   - Database User Privileges: "Read and write to any database"
5. **Whitelist IP addresses**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allows access from anywhere)
6. **Get connection string**:
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

**MongoDB URI Example**:
```
mongodb+srv://amazon-clone-user:yourpassword@cluster0.xxxxx.mongodb.net/amazon-clone?retryWrites=true&w=majority
```

### 2. Google OAuth (Sign-in with Google)

1. **Go to**: https://console.cloud.google.com
2. **Create a new project**:
   - Click "New Project"
   - Name: "Amazon Clone"
   - Click "Create"
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"
4. **Create OAuth credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "Amazon Clone Web Client"
   - Authorized JavaScript origins:
     - `http://localhost:3000` (development)
     - `https://your-app.vercel.app` (production)
   - Authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback` (development)
     - `https://your-app.vercel.app/auth/google/callback` (production)
5. **Get credentials**:
   - Copy "Client ID" and "Client Secret"

### 3. Cloudinary (Image Storage)

1. **Go to**: https://cloudinary.com
2. **Create a free account**
3. **Get credentials from dashboard**:
   - Cloud Name
   - API Key
   - API Secret

### 4. Stripe (Payment Processing)

1. **Go to**: https://stripe.com
2. **Create a free account**
3. **Get API keys**:
   - Go to "Developers" > "API keys"
   - Copy "Publishable key" and "Secret key"
   - Use test keys for development, live keys for production

### 5. Email Service (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"

## 🗄️ Database Setup

### Option 1: MongoDB Atlas (Recommended)

Use the MongoDB URI from step 1 above.

### Option 2: Railway MongoDB

1. **Go to**: https://railway.app
2. **Create new project**
3. **Add MongoDB service**
4. **Copy connection string**

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare for Deployment

1. **Update API endpoints** in your frontend:
   ```javascript
   // In client/src/config/api.js
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-backend.onrender.com' 
     : 'http://localhost:5000';
   ```

2. **Create vercel.json** in the root directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "client/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "build"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "client/build/index.html"
       }
     ]
   }
   ```

### Step 2: Deploy to Vercel

1. **Connect GitHub**:
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure build settings**:
   - Framework Preset: "Create React App"
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Add environment variables**:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com
   REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```

4. **Deploy**: Click "Deploy"

## ⚙️ Backend Deployment (Render) - **RECOMMENDED**

### Why Render?
- **100% Free**: No time limits, always running
- **Better Performance**: More reliable than Railway
- **No Credit Card**: Truly free
- **Automatic Deployments**: From GitHub
- **Built-in Database**: PostgreSQL included (optional)

### Step 1: Prepare Backend

1. **Create render.yaml** in server directory:
   ```yaml
   services:
     - type: web
       name: amazon-clone-backend
       env: node
       plan: free
       buildCommand: npm install
       startCommand: npm start
       healthCheckPath: /api/products
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 5000
   ```

2. **Update package.json** scripts (already done):
   ```json
   {
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     }
   }
   ```

### Step 2: Deploy to Render

1. **Connect GitHub**:
   - Go to https://render.com
   - Sign in with GitHub
   - Click "New +" → "Web Service"
   - Connect your repository

2. **Configure service**:
   - **Name**: `amazon-clone-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Add environment variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/amazon-clone
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Deploy**: Click "Create Web Service" - Render will automatically deploy

### Step 3: Get Your Backend URL
After deployment, you'll get a URL like: `https://amazon-clone-backend.onrender.com`

## 🔐 Google OAuth Implementation

### Backend Setup

1. **Install passport and Google strategy**:
   ```bash
   cd server
   npm install passport passport-google-oauth20
   ```

2. **Create Google OAuth routes** in `server/routes/auth.js`:
   ```javascript
   const passport = require('passport');
   const GoogleStrategy = require('passport-google-oauth20').Strategy;

   // Configure Google Strategy
   passport.use(new GoogleStrategy({
     clientID: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     callbackURL: "/api/auth/google/callback"
   },
   async (accessToken, refreshToken, profile, done) => {
     try {
       let user = await User.findOne({ googleId: profile.id });
       
       if (user) {
         return done(null, user);
       }
       
       user = await User.findOne({ email: profile.emails[0].value });
       if (user) {
         user.googleId = profile.id;
         await user.save();
         return done(null, user);
       }
       
       user = await User.create({
         googleId: profile.id,
         name: profile.displayName,
         email: profile.emails[0].value,
         avatar: profile.photos[0].value
       });
       
       done(null, user);
     } catch (error) {
       done(error, null);
     }
   }));

   // Google OAuth routes
   router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

   router.get('/google/callback', 
     passport.authenticate('google', { failureRedirect: '/login' }),
     (req, res) => {
       const token = generateToken(req.user._id);
       res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
     }
   );
   ```

### Frontend Setup

The frontend Google OAuth implementation is already integrated in the LoginPage. When users click "Sign in with Google", they will be redirected to the backend OAuth route, which handles the authentication flow.

**How it works:**
1. User clicks "Sign in with Google" button on the login page
2. Frontend redirects to `http://localhost:5000/api/auth/google`
3. Backend handles Google OAuth flow
4. After successful authentication, backend redirects to `http://localhost:3000/auth/google/callback?token=JWT_TOKEN`
5. Frontend callback page stores the token and fetches user data
6. User is logged in and redirected to the homepage

## 📸 Cloudinary Setup

1. **Install Cloudinary SDK**:
   ```bash
   cd server
   npm install cloudinary
   ```

2. **Configure Cloudinary** in `server/index.js`:
   ```javascript
   const cloudinary = require('cloudinary').v2;

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
   });
   ```

## 💳 Stripe Setup

1. **Install Stripe**:
   ```bash
   cd server
   npm install stripe
   ```

2. **Configure Stripe** in payment routes:
   ```javascript
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
   ```

## 📧 Email Setup

1. **Install Nodemailer**:
   ```bash
   cd server
   npm install nodemailer
   ```

2. **Configure email service**:
   ```javascript
   const nodemailer = require('nodemailer');

   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
     }
   });
   ```

## ✅ Production Checklist

### Before Deployment

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Google OAuth working
- [ ] Cloudinary integration tested
- [ ] Stripe integration tested
- [ ] Email service working
- [ ] CORS configured for production domains
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Security headers added

### After Deployment

- [ ] Test all authentication flows
- [ ] Test product CRUD operations
- [ ] Test payment processing
- [ ] Test email notifications
- [ ] Test image uploads
- [ ] Monitor application logs
- [ ] Set up monitoring (Railway/Heroku metrics)
- [ ] Configure custom domain (optional)

## 🔗 Production URLs

After deployment, your application will be available at:

- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`
- **Admin Dashboard**: `https://your-app.vercel.app/admin`

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure FRONTEND_URL is set correctly in backend
2. **Database Connection**: Verify MongoDB URI and network access
3. **Google OAuth**: Check redirect URIs and client ID/secret
4. **Image Uploads**: Verify Cloudinary credentials
5. **Payments**: Ensure Stripe keys are correct and webhooks configured

### Support

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2

---

**🎉 Congratulations! Your Amazon Clone is now live in production!**
