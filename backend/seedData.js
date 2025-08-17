const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

// Sample categories
const categories = [
  {
    name: 'T-Shirts',
    description: 'Comfortable and stylish t-shirts for everyday wear',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    subcategories: ['Basic Tees', 'Graphic Tees', 'V-Neck', 'Long Sleeve']
  },
  {
    name: 'Jeans',
    description: 'Premium quality denim jeans in various fits',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
    subcategories: ['Skinny', 'Straight', 'Bootcut', 'Wide Leg']
  },
  {
    name: 'Dresses',
    description: 'Elegant dresses for every occasion',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    subcategories: ['Casual', 'Formal', 'Party', 'Maxi']
  },
  {
    name: 'Shoes',
    description: 'Footwear for style and comfort',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    subcategories: ['Sneakers', 'Boots', 'Heels', 'Sandals']
  }
];

// Sample products
const products = [
  {
    name: 'Classic White T-Shirt',
    description: 'A timeless white t-shirt made from 100% cotton. Perfect for layering or wearing on its own.',
    price: 29.99,
    discountPrice: 0,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
    ],
    subcategory: 'Basic Tees',
    brand: 'FashionX Basics',
    gender: 'unisex',
    sizes: [
      { size: 'S', stock: 25 },
      { size: 'M', stock: 30 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 15 }
    ],
    colors: ['White', 'Black', 'Gray'],
    tags: ['basic', 'cotton', 'casual'],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false
  },
  {
    name: 'Vintage Graphic Tee',
    description: 'Retro-inspired graphic t-shirt with vintage band print. Soft cotton blend for comfort.',
    price: 34.99,
    discountPrice: 24.99,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=500'
    ],
    subcategory: 'Graphic Tees',
    brand: 'Vintage Co.',
    gender: 'unisex',
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 12 }
    ],
    colors: ['Black', 'Navy', 'Burgundy'],
    tags: ['vintage', 'graphic', 'band'],
    isFeatured: false,
    isNewArrival: true,
    isOnSale: true
  },
  {
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans with stretch denim for comfort and style. Perfect for everyday wear.',
    price: 79.99,
    discountPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      'https://images.unsplash.com/photo-1506629905607-d5b94c0d4d0e?w=500'
    ],
    subcategory: 'Skinny',
    brand: 'Denim Works',
    gender: 'unisex',
    sizes: [
      { size: '28', stock: 10 },
      { size: '30', stock: 15 },
      { size: '32', stock: 20 },
      { size: '34', stock: 12 },
      { size: '36', stock: 8 }
    ],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    tags: ['denim', 'slim', 'stretch'],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true
  },
  {
    name: 'Summer Floral Dress',
    description: 'Beautiful floral print dress perfect for summer occasions. Lightweight and breathable fabric.',
    price: 89.99,
    discountPrice: 0,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500'
    ],
    subcategory: 'Casual',
    brand: 'Summer Styles',
    gender: 'women',
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 5 }
    ],
    colors: ['Floral Pink', 'Floral Blue', 'Floral Yellow'],
    tags: ['floral', 'summer', 'casual'],
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false
  },
  {
    name: 'Classic Sneakers',
    description: 'Comfortable white sneakers perfect for everyday wear. Durable construction with cushioned sole.',
    price: 99.99,
    discountPrice: 79.99,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    subcategory: 'Sneakers',
    brand: 'SportStyle',
    gender: 'unisex',
    sizes: [
      { size: '7', stock: 10 },
      { size: '8', stock: 15 },
      { size: '9', stock: 20 },
      { size: '10', stock: 18 },
      { size: '11', stock: 12 },
      { size: '12', stock: 8 }
    ],
    colors: ['White', 'Black', 'Gray'],
    tags: ['sneakers', 'comfortable', 'casual'],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true
  },
  {
    name: 'Elegant Evening Dress',
    description: 'Sophisticated black evening dress perfect for formal events. Premium fabric with elegant silhouette.',
    price: 159.99,
    discountPrice: 0,
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
      'https://images.unsplash.com/photo-1566479179817-c0e8b7c46b7f?w=500',
    ],
    subcategory: 'Formal',
    brand: 'Elegance',
    gender: 'women',
    sizes: [
      { size: 'XS', stock: 5 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 10 },
      { size: 'L', stock: 6 },
      { size: 'XL', stock: 3 }
    ],
    colors: ['Black', 'Navy', 'Burgundy'],
    tags: ['formal', 'elegant', 'evening'],
    isFeatured: true,
    isNewArrival: true,
    isOnSale: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Map category names to IDs
    const categoryMap = {};
    insertedCategories.forEach(category => {
      categoryMap[category.name] = category._id;
    });

    // Add category IDs to products
    const productsWithCategories = products.map(product => {
      let categoryName;
      if (product.subcategory === 'Basic Tees' || product.subcategory === 'Graphic Tees') {
        categoryName = 'T-Shirts';
      } else if (product.subcategory === 'Skinny' || product.subcategory === 'Straight') {
        categoryName = 'Jeans';
      } else if (product.subcategory === 'Casual' || product.subcategory === 'Formal') {
        categoryName = 'Dresses';
      } else if (product.subcategory === 'Sneakers') {
        categoryName = 'Shoes';
      }
      
      return {
        ...product,
        category: categoryMap[categoryName]
      };
    });

    // Insert products
    const insertedProducts = await Product.insertMany(productsWithCategories);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
