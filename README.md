# FashionX - Complete E-commerce Fashion Website

A full-stack fashion e-commerce website built with React.js frontend and Node.js/Express backend with MongoDB database.

## 🚀 Features

- **User Authentication**: Register/Login with JWT tokens and secure password hashing
- **Product Catalog**: Browse fashion items by category, gender, brand with advanced filtering
- **Shopping Cart**: Add/remove items, update quantities with real-time calculations
- **Checkout Process**: Secure payment integration with Stripe and address management
- **Order Management**: Track orders, cancel orders, and receive email confirmations
- **User Profile**: Complete profile management with address autofill and order history
- **Responsive Design**: Mobile-first responsive design with modern UI/UX
- **Email Notifications**: Order confirmations sent via Nodemailer
- **Redux State Management**: Centralized state management with Redux Thunk
- **Sample Data**: Pre-populated with sample products and categories via seeding script

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern React with hooks and functional components
- **Redux + Redux Thunk** - State management with async actions
- **React Router DOM v6** - Client-side routing and navigation
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications for user feedback
- **Stripe React Components** - Secure payment processing
- **React Icons** - Icon library for UI elements
- **Styled Components** - CSS-in-JS styling solution

### Backend
- **Node.js + Express** - Server-side runtime and web framework
- **MongoDB + Mongoose** - NoSQL database with ODM
- **JWT (jsonwebtoken)** - Authentication and authorization
- **bcryptjs** - Password hashing and security
- **Stripe** - Payment processing integration
- **Nodemailer** - Email service for notifications
- **Cloudinary** - Image upload and management
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Detailed Project Structure

```
FashionX/
├── backend/                          # Backend API server
│   ├── middleware/
│   │   └── auth.js                   # JWT authentication middleware
│   ├── models/                       # MongoDB schemas
│   │   ├── User.js                   # User model with profile data
│   │   ├── Product.js                # Product model with variants
│   │   ├── Cart.js                   # Shopping cart model
│   │   ├── Order.js                  # Order model with shipping
│   │   └── Category.js               # Product category model
│   ├── routes/                       # API endpoints
│   │   ├── auth.js                   # Authentication routes
│   │   ├── products.js               # Product CRUD operations
│   │   ├── cart.js                   # Cart management
│   │   ├── orders.js                 # Order processing
│   │   ├── payment.js                # Stripe payment integration
│   │   └── categories.js             # Category management
│   ├── node_modules/                 # Backend dependencies
│   ├── server.js                     # Express server configuration
│   ├── seedData.js                   # Database seeding script
│   ├── package.json                  # Backend dependencies
│   └── .env                          # Environment variables
├── frontend/                         # React frontend application
│   ├── public/
│   │   └── index.html                # HTML template
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Auth/
│   │   │   │   └── ProtectedRoute.js # Route protection component
│   │   │   └── Layout/
│   │   │       ├── Navbar.js         # Navigation component
│   │   │       └── Footer.js         # Footer component
│   │   ├── pages/                    # Page components
│   │   │   ├── Home.js               # Landing page with hero section
│   │   │   ├── Products.js           # Product listing with filters
│   │   │   ├── ProductDetail.js      # Individual product view
│   │   │   ├── Cart.js               # Shopping cart page
│   │   │   ├── Checkout.js           # Checkout with Stripe
│   │   │   ├── Profile.js            # User profile management
│   │   │   ├── Login.js              # User login form
│   │   │   ├── Register.js           # User registration form
│   │   │   └── PaymentSuccess.js     # Payment confirmation
│   │   ├── redux/                    # State management
│   │   │   ├── actions/              # Redux actions
│   │   │   │   ├── authActions.js    # Authentication actions
│   │   │   │   ├── cartActions.js    # Cart management actions
│   │   │   │   └── productActions.js # Product-related actions
│   │   │   ├── reducers/             # Redux reducers
│   │   │   │   ├── authReducer.js    # Auth state management
│   │   │   │   ├── cartReducer.js    # Cart state management
│   │   │   │   └── productReducer.js # Product state management
│   │   │   └── store.js              # Redux store configuration
│   │   ├── App.js                    # Main application component
│   │   ├── App.css                   # Global styles
│   │   └── index.js                  # React DOM entry point
│   ├── node_modules/                 # Frontend dependencies
│   └── package.json                  # Frontend dependencies
├── node_modules/                     # Root level dependencies
├── package.json                      # Root package configuration
└── README.md                         # Project documentation
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas) - [Download](https://www.mongodb.com/)
- **npm** or **yarn** package manager
- **Git** for version control

### 1. Clone the Repository
```bash
git clone <repository-url>
cd FashionX
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory with the following variables:
```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/fashionx

# JWT Configuration
JWT_SECRET=fashionx_super_secret_jwt_key_2024

# Stripe Configuration (Get from Stripe Dashboard)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Email Configuration (Gmail App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Cloudinary Configuration (For image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Seed the Database (Recommended)
```bash
# Make sure MongoDB is running
node seedData.js
```
This will populate your database with:
- 4 product categories (T-Shirts, Jeans, Dresses, Shoes)
- 6 sample products with complete details
- Product images, sizes, colors, and inventory

### 5. Start the Backend Server
```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```
Server will run on `http://localhost:5000`

### 6. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm start
```
Frontend will run on `http://localhost:3000`

### 7. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🔧 Complete API Documentation

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Product Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products with filters | No |
| GET | `/api/products/:id` | Get single product | No |
| GET | `/api/products/featured/all` | Get featured products | No |
| GET | `/api/products/new-arrivals/all` | Get new arrivals | No |
| GET | `/api/products/category/:categoryId` | Get products by category | No |

### Category Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | No |

### Cart Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user's cart | Yes |
| POST | `/api/cart/add` | Add item to cart | Yes |
| PUT | `/api/cart/update/:itemId` | Update cart item quantity | Yes |
| DELETE | `/api/cart/remove/:itemId` | Remove item from cart | Yes |
| DELETE | `/api/cart/clear` | Clear entire cart | Yes |

### Order Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create new order | Yes |
| GET | `/api/orders/my-orders` | Get user's orders | Yes |
| GET | `/api/orders/:id` | Get specific order | Yes |
| PUT | `/api/orders/:id/cancel` | Cancel order | Yes |

### Payment Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/payment/create-payment-intent` | Create Stripe payment intent | Yes |
| POST | `/api/payment/confirm-payment` | Confirm payment | Yes |

## 🎯 Detailed Usage Guide

### 1. User Authentication Flow
1. **Registration**: Navigate to `/register`
   - Enter name, email, and password
   - Password is automatically hashed using bcryptjs
   - JWT token is generated and stored in localStorage
   - User is redirected to home page

2. **Login**: Navigate to `/login`
   - Enter email and password
   - Credentials are verified against hashed password
   - JWT token is generated for session management
   - User profile data is loaded into Redux store

3. **Profile Management**: Access `/profile`
   - View and edit personal information
   - Manage shipping address
   - View complete order history
   - Cancel orders in 'processing' status

### 2. Product Browsing Experience
1. **Home Page**: 
   - Hero section with call-to-action
   - Category showcase with navigation
   - Featured products carousel
   - New arrivals section

2. **Products Page**: `/products`
   - Grid layout with product cards
   - Advanced filtering by category, gender, price
   - Search functionality
   - Sorting options (price, name, newest)
   - Pagination for large product sets

3. **Product Detail**: `/products/:id`
   - Image gallery with multiple views
   - Size and color selection
   - Stock availability display
   - Add to cart functionality
   - Product specifications and description

### 3. Shopping Cart Management
1. **Add to Cart**: From product detail page
   - Select size and color
   - Choose quantity
   - Item added with real-time cart update

2. **Cart Page**: `/cart`
   - View all cart items
   - Update quantities
   - Remove individual items
   - View order summary with totals
   - Proceed to checkout

### 4. Checkout Process
1. **Shipping Information**:
   - Auto-filled from user profile
   - Manual entry option available
   - Address validation

2. **Payment Processing**:
   - Stripe integration for secure payments
   - Credit card form with validation
   - Payment intent creation and confirmation
   - Order creation upon successful payment

3. **Order Confirmation**:
   - Email notification sent
   - Order details displayed
   - Cart cleared automatically

## 🔑 Advanced Features

### Redux State Management Architecture
```javascript
// Store Structure
{
  auth: {
    token: string,
    user: object,
    isAuthenticated: boolean,
    loading: boolean
  },
  cart: {
    items: array,
    totalAmount: number,
    loading: boolean
  },
  products: {
    products: array,
    currentProduct: object,
    categories: array,
    loading: boolean,
    filters: object
  }
}
```

### Authentication Middleware
- JWT token validation on protected routes
- Automatic token refresh handling
- User session management
- Role-based access control ready

### Payment Integration
- Stripe Elements for secure card input
- Payment intent creation and confirmation
- Error handling and user feedback
- PCI compliance through Stripe

### Email Notifications
- Order confirmation emails
- HTML email templates
- SMTP configuration with Gmail
- Error handling and retry logic

## 🧪 Sample Data Details

The seeding script (`seedData.js`) creates:

### Categories
- **T-Shirts**: Basic Tees, Graphic Tees, V-Neck, Long Sleeve
- **Jeans**: Skinny, Straight, Bootcut, Wide Leg
- **Dresses**: Casual, Formal, Party, Maxi
- **Shoes**: Sneakers, Boots, Heels, Sandals

### Products
1. **Classic White T-Shirt** - Basic cotton tee (Featured)
2. **Vintage Graphic Tee** - Retro band print (New Arrival, On Sale)
3. **Slim Fit Jeans** - Stretch denim (Featured, On Sale)
4. **Summer Floral Dress** - Lightweight casual dress (New Arrival)
5. **Classic Sneakers** - Comfortable everyday shoes (Featured, On Sale)
6. **Elegant Evening Dress** - Formal black dress (Featured, New Arrival)

Each product includes:
- Multiple high-quality images
- Size variants with stock levels
- Color options
- Detailed descriptions
- Pricing with discount options
- Category and brand information

## 🔒 Security Implementation

### Password Security
- bcryptjs hashing with salt rounds
- Password strength validation
- Secure password reset flow

### JWT Authentication
- Token-based authentication
- 7-day token expiration
- Secure token storage in localStorage
- Automatic token validation middleware

### API Security
- CORS configuration for cross-origin requests
- Request body size limits
- Input validation and sanitization
- Error handling without sensitive data exposure

### Environment Variables
- Sensitive data stored in .env files
- Production-ready configuration
- Database connection security

## 🎨 UI/UX Design Features

### Modern Design System
- Consistent color scheme and typography
- Responsive grid system
- Mobile-first approach
- Accessibility considerations

### Interactive Elements
- Hover effects on buttons and cards
- Loading states for async operations
- Toast notifications for user feedback
- Form validation with error messages

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📱 Mobile Responsiveness

### Mobile Features
- Touch-friendly interface
- Optimized image loading
- Mobile navigation menu
- Swipe gestures for image galleries
- Mobile-optimized checkout flow

### Performance Optimizations
- Lazy loading for images
- Code splitting for faster load times
- Optimized bundle sizes
- Efficient state management

## 🚀 Deployment Guide

### Backend Deployment (Heroku/Railway)
1. **Prepare for deployment**:
   ```bash
   # Add start script to package.json
   "scripts": {
     "start": "node server.js"
   }
   ```

2. **Environment variables**:
   - Set all .env variables in hosting platform
   - Update MONGODB_URI to cloud database
   - Configure CORS origins for production

3. **Database setup**:
   - Use MongoDB Atlas for cloud database
   - Update connection string
   - Run seeding script on production database

### Frontend Deployment (Netlify/Vercel)
1. **Build the application**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Configure API endpoints**:
   - Update API base URL to production backend
   - Configure environment variables for frontend

3. **Deploy static files**:
   - Upload build folder to hosting service
   - Configure redirects for React Router

### Environment-Specific Configurations
```javascript
// Production API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.herokuapp.com/api'
  : 'http://localhost:5000/api';
```

## 🧪 Testing Guide

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Add to cart functionality
- [ ] Cart management (update, remove)
- [ ] Checkout process
- [ ] Payment processing
- [ ] Order creation and email notification
- [ ] Profile management
- [ ] Order history and cancellation
- [ ] Responsive design on different devices

### API Testing
Use tools like Postman or Insomnia to test API endpoints:
```bash
# Test user registration
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

## 🤝 Contributing Guidelines

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes with proper commit messages
4. Test thoroughly on both frontend and backend
5. Update documentation if necessary
6. Submit a pull request with detailed description

### Code Standards
- Use consistent indentation (2 spaces)
- Follow React functional component patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent file structure

### Pull Request Template
- Description of changes
- Testing performed
- Screenshots (if UI changes)
- Breaking changes (if any)

## 📞 Support and Troubleshooting

### Common Issues

**MongoDB Connection Error**:
```bash
# Ensure MongoDB is running
mongod

# Check connection string in .env
MONGODB_URI=mongodb://127.0.0.1:27017/fashionx
```

**CORS Error**:
- Check frontend URL in backend CORS configuration
- Verify API endpoints are correct

**Stripe Payment Issues**:
- Ensure Stripe secret key is correctly configured
- Check Stripe webhook configuration for production

**Email Not Sending**:
- Verify Gmail app password is correct
- Check email service configuration

### Getting Help
- Create an issue in the repository with detailed error description
- Include error logs and steps to reproduce
- Specify your environment (OS, Node version, etc.)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the amazing framework
- MongoDB team for the flexible database
- Stripe for secure payment processing
- All open-source contributors

---

**FashionX** - Your ultimate destination for fashion! 🛍️✨

Built with ❤️ using modern web technologies.
