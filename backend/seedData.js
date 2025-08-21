const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("./models/Category");
const Product = require("./models/Product");

dotenv.config();

// Sample categories
const categories = [
  {
    name: "T-Shirts",
    description: "Comfortable and stylish t-shirts for everyday wear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    subcategories: ["Basic Tees", "Graphic Tees", "V-Neck", "Long Sleeve"],
  },
  {
    name: "Jeans",
    description: "Premium quality denim jeans in various fits",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    subcategories: ["Skinny", "Straight", "Bootcut", "Wide Leg"],
  },
  {
    name: "Dresses",
    description: "Elegant dresses for every occasion",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    subcategories: ["Casual", "Formal", "Party", "Maxi"],
  },
  {
    name: "Shoes",
    description: "Footwear for style and comfort",
    image:
      "https://images.unsplash.com/photo-1596744288277-51c233f9edbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBzbmVha2VyfGVufDB8fDB8fHww",
    subcategories: ["Sneakers", "Boots", "Heels", "Sandals"],
  },
];

// Sample products
const products = [
  {
    name: "crew-neck Yellow T-Shirt",
    description:
      "A classic crew-neck t-shirt made from soft cotton. Perfect for casual outings.",
    price: 299,
    discountPrice: 0,
    images: [
      "https://images.unsplash.com/photo-1532296075534-cc428d395281?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
    ],
    subcategory: "Basic Tees",
    brand: "FashionX Basics",
    gender: "women",
    sizes: [
      { size: "S", stock: 25 },
      { size: "M", stock: 30 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 15 },
    ],
    colors: ["Yellow"],
    tags: ["basic", "crew-neck", "casual"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
  },
  {
    name: "Classic White T-Shirt",
    description:
      "A timeless white t-shirt made from 100% cotton. Perfect for layering or wearing on its own.",
    price: 399,
    discountPrice: 0,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
    ],
    subcategory: "Basic Tees",
    brand: "FashionX Basics",
    gender: "men",
    sizes: [
      { size: "S", stock: 25 },
      { size: "M", stock: 30 },
      { size: "L", stock: 20 },
      { size: "XL", stock: 15 },
    ],
    colors: ["White", "Black"],
    tags: ["basic", "cotton", "casual"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
  },
  {
    name: "Vintage Graphic Tee",
    description:
      "Retro-inspired graphic t-shirt with vintage band print. Soft cotton blend for comfort.",
    price: 299,
    discountPrice: 249,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", //not working
    ],
    subcategory: "Graphic Tees",
    brand: "Vintage Co.",
    gender: "unisex",
    sizes: [
      { size: "S", stock: 15 },
      { size: "M", stock: 20 },
      { size: "L", stock: 18 },
      { size: "XL", stock: 12 },
    ],
    colors: ["Black", "Off-white"],
    tags: ["vintage", "graphic", "band"],
    isFeatured: false,
    isNewArrival: true,
    isOnSale: true,
  },
  {
    name: "Slim Fit Jeans",
    description:
      "Modern slim fit jeans with stretch denim for comfort and style. Perfect for everyday wear.",
    price: 999,
    discountPrice: 799,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGplYW5zfGVufDB8fDB8fHww", //not working
    ],
    subcategory: "Skinny",
    brand: "Denim Works",
    gender: "men",
    sizes: [
      { size: "28", stock: 10 },
      { size: "30", stock: 15 },
      { size: "32", stock: 20 },
      { size: "34", stock: 12 },
      { size: "36", stock: 8 },
    ],
    colors: ["Dark Blue", "Light Blue", "Black"],
    tags: ["denim", "slim", "stretch"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
  },
  {
    name: "Summer Floral Dress",
    description:
      "Beautiful floral print dress perfect for summer occasions. Lightweight and breathable fabric.",
    price: 1499,
    discountPrice: 0,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
    ],
    subcategory: "Casual",
    brand: "Summer Styles",
    gender: "women",
    sizes: [
      { size: "XS", stock: 8 },
      { size: "S", stock: 12 },
      { size: "M", stock: 15 },
      { size: "L", stock: 10 },
      { size: "XL", stock: 5 },
    ],
    colors: ["Red", "white"],
    tags: ["floral", "summer", "casual"],
    isFeatured: false,
    isNewArrival: true,
    isOnSale: false,
  },
  {
    name: "Classic Sneakers",
    description:
      "Comfortable white sneakers perfect for everyday wear. Durable construction with cushioned sole.",
    price: 899,
    discountPrice: 699,
    images: [
      "https://images.unsplash.com/photo-1596744288277-51c233f9edbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBzbmVha2VyfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1596744271582-1d87e9aae223?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBzbmVha2VyfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNuZWFrZXJ8ZW58MHx8MHx8fDA%3D",
    ],
    subcategory: "Sneakers",
    brand: "SportStyle",
    gender: "men",
    sizes: [
      { size: "7", stock: 10 },
      { size: "8", stock: 15 },
      { size: "9", stock: 20 },
      { size: "10", stock: 18 },
      { size: "11", stock: 12 },
      { size: "12", stock: 8 },
    ],
    colors: ["White", "Black"],
    tags: ["sneakers", "comfortable", "casual"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
  },
  {
    name: "Elegant Evening Dress",
    description:
      "Sophisticated black evening dress perfect for formal events. Premium fabric with elegant silhouette.",
    price: 1399,
    discountPrice: 0,
    images: [
      "https://images.unsplash.com/photo-1741816219305-827580cab505?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwZXZlbmluZyUyMGZvcm1hbCUyMGRyZXNzfGVufDB8fDB8fHww", //not working
      "https://images.unsplash.com/photo-1741816219785-a642b0ad30b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwZXZlbmluZyUyMGZvcm1hbCUyMGRyZXNzfGVufDB8fDB8fHww",
    ],
    subcategory: "Formal",
    brand: "Elegance",
    gender: "women",
    sizes: [
      { size: "XS", stock: 5 },
      { size: "S", stock: 8 },
      { size: "M", stock: 10 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 },
    ],
    colors: ["Black"],
    tags: ["formal", "elegant", "evening"],
    isFeatured: true,
    isNewArrival: true,
    isOnSale: false,
  },
  {
    name: "Wearing White Boots",
    description:
      "Comfortable white Boots perfect for party wear.",
    price: 1999,
    discountPrice: 0,
    images: [
      "https://plus.unsplash.com/premium_photo-1674719144437-d1c253a8b775?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9vdHN8ZW58MHx8MHx8fDA%3D",    ],
    subcategory: "Sneakers",
    brand: "Nike",
    gender: "women",
    sizes: [
      { size: "7", stock: 10 },
      { size: "8", stock: 15 },
      { size: "9", stock: 20 },
      { size: "10", stock: 18 },
      { size: "11", stock: 12 },
      { size: "12", stock: 8 },
    ],
    colors: ["very pale cream"],
    tags: ["Party Wear", "comfortable", "casual"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
  },
  {
    name: "Athletic Shoes",
    description:
      "design for comfort and performance in sports and fitness activities.",
    price: 1399,
    discountPrice: 1299,
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c25lYWtlcnxlbnwwfHwwfHx8MA%3D%3D"],
    subcategory: "Sneakers",
    brand: "jordan",
    gender: "unisex",
    sizes: [
      { size: "7", stock: 10 },
      { size: "8", stock: 15 },
      { size: "9", stock: 20 },
      { size: "10", stock: 18 },
      { size: "11", stock: 12 },
      { size: "12", stock: 8 },
    ],
    colors: ["white & orange"],
    tags: ["Sports", "comfortable"],
    isFeatured: true,
    isNewArrival: true,
    isOnSale: true,
  },
  {
    name: "Women cloth Pair",
    description:
      "A pair dress designed",
    price: 2499,
    discountPrice: 0,
    images: [
      "https://plus.unsplash.com/premium_photo-1691622500373-da5adfe5b2ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FzdWFsfGVufDB8fDB8fHww"],
    subcategory: "Casual",
    brand: "Zara",
    gender: "women",
    sizes: [
      { size: "XS", stock: 5 },
      { size: "S", stock: 8 },
      { size: "M", stock: 10 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 },
    ],
    colors: ["gray and cream"],
    tags: ["casual", "comfortable"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
  },
  {
    name: "Man Black Suit Jacket",
    description:
      "A stylish black suit jacket designed for formal occasions.",
    price: 4999,
    discountPrice: 0,
    images: [
      "https://images.unsplash.com/photo-1474583846830-43fa959fc6ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZvcm1hbHxlbnwwfHwwfHx8MA%3D%3D"],
    subcategory: "Formal",
    brand: "H&M",
    gender: "men",
    sizes: [
      { size: "XS", stock: 5 },
      { size: "S", stock: 8 },
      { size: "M", stock: 10 },
      { size: "L", stock: 6 },
      { size: "XL", stock: 3 },
    ],
    colors: ["black"],
    tags: ["casual", "comfortable", "formal", "jacket"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: false,
  },
  {
    name: "Straight Fit Jeans",
    description:
      "Modern Straight fit jeans for comfort and style. Perfect for everyday wear.",
    price: 799,
    discountPrice: 699,
    images: [
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1638404390952-3a9442fbad15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBqZWFuc3xlbnwwfHwwfHx8MA%3D%3D"
    ],
    subcategory: "Straight",
    brand: "H&M",
    gender: "women",
    sizes: [
      { size: "28", stock: 10 },
      { size: "30", stock: 15 },
      { size: "32", stock: 20 },
      { size: "34", stock: 12 },
      { size: "36", stock: 8 },
    ],
    colors: ["Light Blue","Black"],
    tags: ["denim", "Straight", "stretch"],
    isFeatured: true,
    isNewArrival: false,
    isOnSale: true,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log(`Inserted ${insertedCategories.length} categories`);

    // Map category names to IDs
    const categoryMap = {};
    insertedCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });

    // Add category IDs to products
    const productsWithCategories = products.map((product) => {
      let categoryName;
      if (
        product.subcategory === "Basic Tees" ||
        product.subcategory === "Graphic Tees"
      ) {
        categoryName = "T-Shirts";
      } else if (
        product.subcategory === "Skinny" ||
        product.subcategory === "Straight"
      ) {
        categoryName = "Jeans";
      } else if (
        product.subcategory === "Casual" ||
        product.subcategory === "Formal"
      ) {
        categoryName = "Dresses";
      } else if (product.subcategory === "Sneakers") {
        categoryName = "Shoes";
      }

      return {
        ...product,
        category: categoryMap[categoryName],
      };
    });

    // Insert products
    const insertedProducts = await Product.insertMany(productsWithCategories);
    console.log(`Inserted ${insertedProducts.length} products`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
