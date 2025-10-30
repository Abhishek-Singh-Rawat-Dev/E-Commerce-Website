#!/bin/bash

echo "🛒 Setting up Amazon Clone E-commerce Application"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v14 or higher) first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ All dependencies installed successfully!"

# Create .env file for server if it doesn't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating .env file for server..."
    cat > server/.env << EOL
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-clone
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
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
EOL
    echo "✅ Created server/.env file"
    echo "⚠️  Please update the .env file with your actual configuration values"
else
    echo "✅ server/.env file already exists"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your configuration values"
echo "   📖 See DEPLOY.md for detailed instructions on getting API credentials"
echo "2. Make sure MongoDB is running (local or cloud)"
echo "3. Run 'npm run dev' to start both frontend and backend"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation:"
echo "   - README.md: Project overview and setup"
echo "   - DEPLOY.md: Deployment guide and API credential setup"
echo ""
echo "Happy coding! 🚀"
