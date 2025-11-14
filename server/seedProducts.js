const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple iPhone with A17 Pro chip and titanium design",
    price: 999.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500",
    stock: 25,
    featured: true
  },
  {
    name: "Samsung Galaxy S24",
    description: "Advanced Android smartphone with AI features",
    price: 849.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500",
    stock: 30,
    featured: true
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight laptop with Apple M2 chip for ultimate performance",
    price: 1199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
    stock: 15,
    featured: true
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with maximum air cushioning",
    price: 129.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 50,
    featured: false
  },
  {
    name: "Levi's Jeans",
    description: "Classic denim jeans for everyday wear",
    price: 59.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    stock: 40,
    featured: false
  },
  {
    name: "The Great Gatsby",
    description: "Classic novel by F. Scott Fitzgerald",
    price: 12.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    stock: 100,
    featured: false
  },
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with programmable features",
    price: 79.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    stock: 20,
    featured: true
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling Bluetooth headphones",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 35,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    // Display added products
    const products = await Product.find();
    console.log(`Total products in database: ${products.length}`);
    
    products.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();