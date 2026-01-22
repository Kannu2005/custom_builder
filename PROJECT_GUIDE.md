# 🖥️ Custom PC Builder - Simple Project Guide

## 🎯 What is this Project?

**Custom PC Builder** is a complete website where people can build their own custom computers online, just like Amazon or Flipkart, but specifically for PC components.

## 🌟 Main Features

### For Customers:
- **🛒 Build Custom PC**: Choose CPU, GPU, RAM, etc. and build your dream PC
- **💳 Pay Online**: UPI, Cards, Net Banking, Wallets, Cash on Delivery
- **📱 Mobile Friendly**: Works perfectly on phones and computers
- **📦 Track Orders**: See where your order is in real-time
- **💾 Save Builds**: Save your PC configurations for later

### For Admin:
- **📊 Admin Dashboard**: Manage everything from one place
- **🛍️ Product Management**: Add, edit, delete PC components
- **📋 Order Management**: See and manage all customer orders
- **👥 User Management**: View and manage registered users
- **📈 Analytics**: See sales reports and statistics

## 🚀 How to Start the Project

### Step 1: Install Requirements
```bash
# You need Node.js and MongoDB installed on your computer
```

### Step 2: Start Backend (Server)
```bash
cd backend
npm install
npm run dev
```
**Backend will run on:** http://localhost:5000

### Step 3: Start Frontend (Website)
```bash
cd frontend  
npm install
npm run dev
```
**Website will run on:** http://localhost:5173

## 🌐 How to Use the Website

### For Regular Users:

1. **Visit Website**: Go to http://localhost:5173
2. **Register/Login**: Create account or login
3. **Build PC**: 
   - Go to "Build PC" section
   - Choose CPU, GPU, RAM, Storage, etc.
   - See total price automatically
4. **Save Build**: Save your configuration
5. **Place Order**: Convert build to order
6. **Make Payment**: Choose payment method and pay
7. **Track Order**: See order status in dashboard

### For Admin Users:

1. **Admin Portal**: Go to http://localhost:5173/admin
2. **Login**: Use admin credentials to login
3. **Dashboard**: See overview of orders, users, products
4. **Manage Products**: 
   - Add new PC components
   - Edit existing products
   - Set prices and stock
5. **Manage Orders**:
   - View all customer orders
   - Update order status
   - Process refunds
6. **View Analytics**: See sales reports and statistics

## 💳 Payment Methods Available

- **📱 UPI**: Google Pay, PhonePe, Paytm, Any UPI app
- **💳 Cards**: Visa, Mastercard, RuPay, American Express
- **🏦 Net Banking**: All major banks (HDFC, ICICI, SBI, etc.)
- **📱 Wallets**: Paytm, PhonePe, Amazon Pay
- **💵 COD**: Cash on Delivery (Pay when delivered)

## 🛍️ Product Categories

- **🧠 CPU (Processors)**: Intel, AMD processors
- **🎮 GPU (Graphics Cards)**: NVIDIA, AMD graphics cards  
- **⚡ RAM (Memory)**: Corsair, G.Skill, Kingston RAM
- **💾 Storage**: SSDs, HDDs from Samsung, WD, Seagate
- **🔌 Motherboard**: ASUS, MSI, Gigabyte motherboards
- **🔋 PSU (Power Supply)**: Corsair, Seasonic, EVGA PSUs
- **📦 Cases**: Cooler Master, Fractal Design cases
- **❄️ Cooling**: CPU coolers, case fans

## 📊 Admin Features

### Product Management:
- **Add Products**: Add new PC components with images
- **Edit Products**: Update prices, specifications, stock
- **Categories**: Organize products by category
- **Inventory**: Track stock levels

### Order Management:
- **View Orders**: See all customer orders
- **Order Status**: Update order status (Processing, Shipped, Delivered)
- **Payment Status**: Track payment confirmations
- **Customer Details**: View customer information

### User Management:
- **User List**: See all registered users
- **User Details**: View user profiles and order history
- **Account Status**: Enable/disable user accounts

### Analytics:
- **Sales Reports**: Daily, weekly, monthly sales
- **Popular Products**: Best-selling components
- **Revenue Tracking**: Total earnings and profits
- **Order Statistics**: Order completion rates

## 🔧 Technical Details (Simple)

### What Technologies Used:
- **Frontend**: React (for website interface)
- **Backend**: Node.js + Express (for server)
- **Database**: MongoDB (to store data)
- **Payments**: Razorpay, Stripe (for processing payments)

### How it Works:
1. **User visits website** → React shows the interface
2. **User clicks something** → Request sent to Node.js server
3. **Server processes request** → Gets/saves data in MongoDB
4. **Server sends response** → Website updates with new information

## 📱 Mobile App Features

- **Responsive Design**: Website works perfectly on mobile
- **Touch Friendly**: Easy to use on touchscreens
- **Fast Loading**: Optimized for mobile internet
- **All Features**: Same features as desktop version

## 🔒 Security Features

- **Secure Login**: Passwords are encrypted
- **Payment Security**: Bank-level security for payments
- **Data Protection**: User data is safely stored
- **Admin Protection**: Admin panel is secure

## 🚀 Future Plans

- **Mobile App**: Native Android/iOS apps
- **AI Recommendations**: Smart product suggestions
- **Live Chat**: Real-time customer support
- **More Payment Options**: Cryptocurrency, EMI options
- **International Shipping**: Worldwide delivery

## 📞 Support & Help

### For Users:
- **Help Section**: Built-in help and FAQ
- **Contact Support**: Email and phone support
- **Live Chat**: Real-time help (coming soon)

### For Developers:
- **Documentation**: Complete technical docs
- **API Guide**: How to use the APIs
- **Setup Guide**: Detailed installation instructions

## 🎯 Quick Summary

**This is a complete e-commerce website for PC building with:**
- ✅ User registration and login
- ✅ Interactive PC builder
- ✅ Multiple payment methods
- ✅ Order tracking
- ✅ Admin management panel
- ✅ Mobile responsive design
- ✅ Secure payment processing
- ✅ Real-time updates

## 🔗 Important Links

- **Main Website**: http://localhost:5173
- **Admin Portal**: http://localhost:5173/admin
- **API Documentation**: http://localhost:5000/api
- **Backend Health**: http://localhost:5000/health

## 📝 Quick Notes

- **Default Ports**: Frontend (5173), Backend (5000)
- **Database**: MongoDB must be running
- **Admin Access**: Admin portal requires admin account
- **Payment Testing**: Use test credentials for development
- **Mobile Testing**: Test on different screen sizes

---

**🎉 Ready to Build PCs Online!**

This project is a complete solution for anyone who wants to start a PC building business online. It has everything needed - from product catalog to payment processing to order management.

**Happy PC Building!** 🖥️✨