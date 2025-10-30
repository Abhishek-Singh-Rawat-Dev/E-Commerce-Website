const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Simple User schema for this script
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amazon-clone');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@amazonclone.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@amazonclone.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@amazonclone.com',
      password: hashedPassword,
      role: 'admin'
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@amazonclone.com');
    console.log('🔑 Password: admin123');
    console.log('🌐 Login at: http://localhost:3000/login');
    console.log('👑 Admin Dashboard: http://localhost:3000/admin');

  } catch (error) {
    console.error('Error creating admin user:', error.message);
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n❌ MongoDB is not running!');
      console.log('Please start MongoDB or use MongoDB Atlas');
      console.log('For local MongoDB: brew services start mongodb-community');
    }
  } finally {
    await mongoose.connection.close();
  }
}

createAdminUser();
