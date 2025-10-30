const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 99.99,
    originalPrice: 149.99,
    category: "Electronics",
    subcategory: "Audio",
    brand: "TechSound",
    stock: 50,
    images: [
      {
        public_id: "sample1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
      }
    ],
    features: [
      "30-hour battery life",
      "Active noise cancellation",
      "Wireless connectivity",
      "Premium sound quality"
    ],
    isFeatured: true
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracking watch with heart rate monitor, GPS, and water resistance. Track your workouts and health metrics.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    subcategory: "Wearables",
    brand: "FitTech",
    stock: 30,
    images: [
      {
        public_id: "sample2",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
      }
    ],
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant",
      "7-day battery life"
    ],
    isFeatured: true
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes. Perfect for everyday wear.",
    price: 24.99,
    originalPrice: 34.99,
    category: "Clothing",
    subcategory: "Tops",
    brand: "EcoWear",
    stock: 100,
    images: [
      {
        public_id: "sample3",
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
      }
    ],
    features: [
      "100% organic cotton",
      "Machine washable",
      "Multiple colors available",
      "Sustainable production"
    ],
    isFeatured: false
  },
  {
    name: "Programming Fundamentals Book",
    description: "Comprehensive guide to programming fundamentals. Perfect for beginners and intermediate developers. Covers multiple programming languages.",
    price: 39.99,
    originalPrice: 49.99,
    category: "Books",
    subcategory: "Technology",
    brand: "TechBooks",
    stock: 75,
    images: [
      {
        public_id: "sample4",
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500"
      }
    ],
    features: [
      "Beginner-friendly",
      "Multiple programming languages",
      "Practical examples",
      "Updated content"
    ],
    isFeatured: true
  },
  {
    name: "Indoor Plant Set",
    description: "Beautiful set of 3 indoor plants perfect for home decoration. Includes care instructions and decorative pots.",
    price: 49.99,
    originalPrice: 69.99,
    category: "Home & Garden",
    subcategory: "Plants",
    brand: "GreenHome",
    stock: 40,
    images: [
      {
        public_id: "sample5",
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500"
      }
    ],
    features: [
      "Set of 3 plants",
      "Decorative pots included",
      "Care instructions",
      "Air purifying"
    ],
    isFeatured: false
  },
  {
    name: "Yoga Mat Premium",
    description: "High-quality yoga mat with excellent grip and cushioning. Perfect for yoga, pilates, and other fitness activities.",
    price: 34.99,
    originalPrice: 44.99,
    category: "Sports",
    subcategory: "Fitness",
    brand: "FlexFit",
    stock: 60,
    images: [
      {
        public_id: "sample6",
        url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"
      }
    ],
    features: [
      "Non-slip surface",
      "Extra thick cushioning",
      "Easy to clean",
      "Lightweight and portable"
    ],
    isFeatured: true
  },
  {
    name: "Skincare Set",
    description: "Complete skincare routine set with cleanser, moisturizer, and serum. Natural ingredients for healthy, glowing skin.",
    price: 79.99,
    originalPrice: 99.99,
    category: "Beauty",
    subcategory: "Skincare",
    brand: "GlowBeauty",
    stock: 45,
    images: [
      {
        public_id: "sample7",
        url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500"
      }
    ],
    features: [
      "Natural ingredients",
      "Complete routine",
      "Suitable for all skin types",
      "Cruelty-free"
    ],
    isFeatured: false
  },
  {
    name: "Educational Building Blocks",
    description: "Colorful building blocks set for children. Encourages creativity, problem-solving, and fine motor skills development.",
    price: 29.99,
    originalPrice: 39.99,
    category: "Toys",
    subcategory: "Building",
    brand: "LearnPlay",
    stock: 80,
    images: [
      {
        public_id: "sample8",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"
      }
    ],
    features: [
      "Safe materials",
      "Multiple colors",
      "Educational value",
      "Ages 3+"
    ],
    isFeatured: true
  }
];

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amazon-clone');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Insert sample users (using create to trigger password hashing)
    const users = [];
    for (const userData of sampleUsers) {
      const user = await User.create(userData);
      users.push(user);
    }
    console.log(`Inserted ${users.length} users`);

    console.log('Database seeded successfully!');
    console.log('\nSample accounts:');
    console.log('User: john@example.com / password123');
    console.log('User: jane@example.com / password123');
    console.log('Admin: admin@example.com / admin123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
seedDatabase();
