# 🖥️ Custom PC Builder - Complete Project Documentation

## 📋 Project Overview

**Custom PC Builder** is a comprehensive e-commerce platform for building custom PCs with advanced payment integration, user management, and real-time order processing.

### 🎯 Key Features
- **Custom PC Configuration**: Interactive PC building with compatibility checking
- **Advanced Payment System**: Multiple payment methods (UPI, Cards, Net Banking, Wallets, COD)
- **User Management**: Registration, login, profile management
- **Order Management**: Complete order lifecycle from creation to delivery
- **Admin Panel**: Product management, order tracking, user management
- **Real-time Updates**: Live payment status, order tracking
- **Mobile Responsive**: Works perfectly on all devices

## 🏗️ Project Structure

```
custom-pc-builder/
├── backend/                 # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Authentication & validation
│   │   └── scripts/        # Database scripts
│   ├── package.json
│   └── .env
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── styles/         # CSS files
│   ├── package.json
│   └── vite.config.mjs
├── docs/                   # Documentation
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd custom-pc-builder
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database and API keys
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔧 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment**: Razorpay, Stripe integration
- **File Upload**: Multer
- **Security**: bcryptjs, CORS, helmet

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern features
- **Icons**: Emoji-based icons

### Database
- **Primary**: MongoDB
- **ODM**: Mongoose
- **Collections**: Users, Products, Orders, Payments, Builds

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  phone: String,
  address: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  brand: String,
  price: Number,
  specifications: Object,
  images: [String],
  stock: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  buildId: ObjectId,
  items: [Object],
  totalAmount: Number,
  status: String,
  shippingAddress: Object,
  paymentStatus: String,
  timeline: [Object],
  createdAt: Date,
  updatedAt: Date
}
```

### Payments Collection
```javascript
{
  _id: ObjectId,
  orderId: ObjectId,
  userId: ObjectId,
  paymentId: String,
  amount: Number,
  method: String,
  status: String,
  gatewayResponse: Object,
  timeline: [Object],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Payments
- `POST /api/payments/initiate` - Initiate payment
- `POST /api/payments/verify-otp` - Verify OTP
- `GET /api/payments/status/:id` - Get payment status
- `POST /api/payments/webhook` - Payment webhook

### Builds
- `POST /api/builds` - Save PC build
- `GET /api/builds` - Get user builds
- `GET /api/builds/:id` - Get build by ID
- `PUT /api/builds/:id` - Update build
- `DELETE /api/builds/:id` - Delete build

## 💳 Payment Integration

### Supported Methods
- **UPI**: QR codes, Google Pay, PhonePe, Paytm
- **Cards**: Visa, Mastercard, RuPay, American Express
- **Net Banking**: 50+ banks supported
- **Wallets**: Paytm, PhonePe, Amazon Pay
- **COD**: Cash on Delivery

### Payment Flow
1. User selects payment method
2. System creates payment record
3. Payment gateway integration
4. OTP/QR verification (if required)
5. Payment processing
6. Status updates via webhooks
7. Order confirmation

### Security Features
- PCI DSS compliance
- SSL encryption
- OTP verification
- Fraud detection
- Secure tokenization

## 🎮 Key Features

### PC Builder
- **Component Selection**: Choose from thousands of components
- **Compatibility Check**: Automatic compatibility validation
- **Price Calculator**: Real-time price updates
- **Performance Estimation**: Expected performance metrics
- **Save Configurations**: Save and share builds

### User Dashboard
- **Order History**: Complete order tracking
- **Build Library**: Saved PC configurations
- **Payment History**: Transaction records
- **Profile Management**: Account settings
- **Support Tickets**: Customer support

### Admin Panel
- **Product Management**: Add, edit, delete products
- **Order Management**: Process and track orders
- **User Management**: View and manage users
- **Analytics**: Sales and performance metrics
- **Inventory Management**: Stock tracking

## 🔒 Security Features

### Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Session management
- Role-based access control

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting

### Payment Security
- PCI DSS compliance
- Encrypted payment data
- Secure payment gateways
- Fraud detection algorithms

## 📱 Frontend Features

### User Interface
- **Modern Design**: Clean and intuitive interface
- **Responsive Layout**: Works on all screen sizes
- **Interactive Elements**: Smooth animations and transitions
- **Accessibility**: WCAG compliant design

### User Experience
- **Fast Loading**: Optimized performance
- **Real-time Updates**: Live status updates
- **Error Handling**: User-friendly error messages
- **Progressive Enhancement**: Works without JavaScript

### Components
- **PC Builder**: Interactive component selection
- **Payment Forms**: Secure payment interfaces
- **Order Tracking**: Real-time order status
- **Product Catalog**: Searchable product listings

## 🛠️ Development

### Environment Setup
```bash
# Backend environment variables
MONGODB_URI=mongodb://localhost:27017/custompc
JWT_SECRET=your-jwt-secret
PAYMENT_GATEWAY_KEY=your-payment-key
EMAIL_SERVICE_KEY=your-email-key

# Frontend environment variables
VITE_API_URL=http://localhost:5000/api
VITE_PAYMENT_KEY=your-payment-public-key
```

### Scripts
```bash
# Backend
npm run dev          # Development server
npm start           # Production server
npm run seed        # Seed database
npm test           # Run tests

# Frontend
npm run dev         # Development server
npm run build      # Production build
npm run preview    # Preview build
```

### Testing
- **Unit Tests**: Jest for backend testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Cypress for frontend testing
- **Payment Tests**: Sandbox environment testing

## 📦 Deployment

### Production Setup
1. **Database**: MongoDB Atlas or self-hosted
2. **Backend**: Deploy to Heroku, AWS, or DigitalOcean
3. **Frontend**: Deploy to Netlify, Vercel, or AWS S3
4. **CDN**: CloudFlare for static assets
5. **SSL**: Let's Encrypt or CloudFlare SSL

### Environment Configuration
- Production environment variables
- Database connection strings
- Payment gateway credentials
- Email service configuration
- File upload storage

## 📈 Performance

### Optimization
- **Database Indexing**: Optimized queries
- **Caching**: Redis for session and data caching
- **CDN**: Static asset delivery
- **Image Optimization**: Compressed images
- **Code Splitting**: Lazy loading components

### Monitoring
- **Error Tracking**: Sentry integration
- **Performance Monitoring**: New Relic or similar
- **Uptime Monitoring**: Pingdom or UptimeRobot
- **Analytics**: Google Analytics integration

## 🔄 Maintenance

### Regular Tasks
- **Database Backups**: Daily automated backups
- **Security Updates**: Regular dependency updates
- **Performance Monitoring**: Weekly performance reviews
- **User Feedback**: Monthly feedback analysis

### Scaling
- **Horizontal Scaling**: Load balancer configuration
- **Database Scaling**: Read replicas and sharding
- **CDN Scaling**: Global content delivery
- **Microservices**: Service decomposition ready

## 📞 Support

### Customer Support
- **Live Chat**: Real-time customer support
- **Email Support**: 24/7 email assistance
- **Phone Support**: Toll-free customer service
- **Knowledge Base**: Self-service documentation

### Technical Support
- **API Documentation**: Comprehensive API docs
- **Developer Guides**: Integration tutorials
- **Community Forum**: Developer community
- **GitHub Issues**: Bug reporting and feature requests

## 🎯 Future Enhancements

### Planned Features
- **AI Recommendations**: ML-powered component suggestions
- **VR Showroom**: Virtual reality PC showcase
- **Mobile App**: Native mobile applications
- **International Shipping**: Global delivery options
- **Cryptocurrency**: Bitcoin and other crypto payments

### Technical Improvements
- **GraphQL API**: More efficient data fetching
- **Microservices**: Service-oriented architecture
- **Real-time Chat**: WebSocket-based communication
- **Advanced Analytics**: Business intelligence dashboard

---

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies** for both backend and frontend
3. **Set up environment variables**
4. **Start MongoDB** database
5. **Run backend server** on port 5000
6. **Run frontend server** on port 5173
7. **Access the application** and start building PCs!

## 📝 Notes

- **Database**: Make sure MongoDB is running before starting the backend
- **Environment**: Copy .env.example to .env and fill in your values
- **Ports**: Default ports are 5000 (backend) and 5173 (frontend)
- **Testing**: Use the demo payment credentials for testing payments
- **Documentation**: Check the docs/ folder for detailed documentation

**Happy PC Building!** 🖥️✨