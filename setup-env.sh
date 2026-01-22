#!/bin/bash

# Custom PC Builder - Environment Setup Script
echo "⚙️ Setting up environment variables..."

# Backend .env setup
echo "🖥️ Setting up backend environment..."
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env file..."
    cat > backend/.env << EOL
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/custompc

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development

# Payment Gateway (Replace with your keys)
PAYMENT_GATEWAY_KEY=your_payment_secret_key
PAYMENT_GATEWAY_SECRET=your_payment_secret

# Email Service (Optional)
EMAIL_SERVICE_KEY=your_email_service_key
EMAIL_FROM=noreply@custompcbuilder.com

# File Upload (Optional)
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=5242880

# Security
BCRYPT_ROUNDS=12
JWT_EXPIRES_IN=7d

# CORS Origins (Add your frontend URLs)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
EOL
    echo "✅ Backend .env file created!"
else
    echo "⚠️ Backend .env file already exists"
fi

# Frontend .env setup
echo "🌐 Setting up frontend environment..."
if [ ! -f "frontend/.env" ]; then
    echo "Creating frontend/.env file..."
    cat > frontend/.env << EOL
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Payment Gateway Public Key
VITE_PAYMENT_KEY=your_payment_public_key

# App Configuration
VITE_APP_NAME=Custom PC Builder
VITE_APP_VERSION=1.0.0

# Environment
VITE_NODE_ENV=development

# Features (true/false)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CHAT=false
VITE_ENABLE_NOTIFICATIONS=true
EOL
    echo "✅ Frontend .env file created!"
else
    echo "⚠️ Frontend .env file already exists"
fi

echo ""
echo "🔧 Environment setup completed!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env with your actual database URL"
echo "2. Edit frontend/.env with your actual API URL"
echo "3. Replace placeholder keys with real payment gateway keys"
echo "4. Run 'npm run install-all' to install dependencies"
echo "5. Run 'npm run dev' to start development servers"
echo ""
echo "📖 Check DEPLOYMENT_GUIDE.md for production deployment"