# 🚀 Vercel Deployment Guide - Custom PC Builder

## 📋 Overview
Deploy your Custom PC Builder project on Vercel with both frontend and backend hosting.

## 🔧 Step 1: Prepare Project for Vercel

### ✅ Files Created:
- `vercel.json` (Root configuration)
- `frontend/vercel.json` (Frontend configuration)
- `backend/vercel.json` (Backend configuration)

## 🌐 Step 2: Deploy Frontend on Vercel

### Method A: Using Vercel Website (Recommended)

1. **Go to Vercel**: https://vercel.com
2. **Sign Up**: Use your GitHub account
3. **Import Project**: Click "New Project"
4. **Select Repository**: Choose `Kannu2005/custom_builder`
5. **Configure Project**:
   - **Framework Preset**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Environment Variables** (Add these):
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   VITE_PAYMENT_KEY=your_payment_public_key
   VITE_APP_NAME=Custom PC Builder
   ```

7. **Deploy**: Click "Deploy"

### Method B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from frontend folder
cd frontend
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: custom-pc-builder-frontend
# - Directory: ./
```

## 🖥️ Step 3: Deploy Backend on Vercel

### Using Vercel Website:

1. **New Project**: Create another project for backend
2. **Select Repository**: Same `Kannu2005/custom_builder`
3. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Environment Variables** (Add these):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/custompc
   JWT_SECRET=your_super_secret_jwt_key_change_this
   NODE_ENV=production
   PAYMENT_GATEWAY_KEY=your_payment_secret_key
   PORT=3000
   ```

5. **Deploy**: Click "Deploy"

## 🗄️ Step 4: Setup MongoDB Atlas Database

### Create Free Database:
1. **Go to**: https://mongodb.com/atlas
2. **Sign Up**: Create free account
3. **Create Cluster**: Choose free M0 cluster
4. **Database User**: Create username and password
5. **Network Access**: Add IP `0.0.0.0/0` (allow all)
6. **Connect**: Get connection string

### Connection String Format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/custompc?retryWrites=true&w=majority
```

## ⚙️ Step 5: Configure Environment Variables

### Frontend Environment Variables:
```env
VITE_API_URL=https://your-backend-name.vercel.app/api
VITE_PAYMENT_KEY=your_razorpay_public_key
VITE_APP_NAME=Custom PC Builder
VITE_APP_VERSION=1.0.0
```

### Backend Environment Variables:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/custompc
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
PAYMENT_GATEWAY_KEY=your_razorpay_secret_key
PORT=3000
CORS_ORIGINS=https://your-frontend-name.vercel.app
```

## 🔄 Step 6: Update API Configuration

### Update Frontend API URL:
Edit `frontend/src/services/api.js`:

```javascript
const API_URL = process.env.VITE_API_URL || 'https://your-backend-name.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Update Backend CORS:
Edit `backend/src/app.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-name.vercel.app',
    'https://yourdomain.com'
  ],
  credentials: true
}));
```

## 🚀 Step 7: Deploy Process

### Automatic Deployment:
1. **Push to GitHub**: Any changes pushed to main branch
2. **Auto Deploy**: Vercel automatically redeploys
3. **Build Logs**: Check deployment status in Vercel dashboard

### Manual Deployment:
```bash
# Frontend
cd frontend
vercel --prod

# Backend
cd backend
vercel --prod
```

## 🔗 Step 8: Your Live URLs

After successful deployment:

- **Frontend**: `https://your-frontend-name.vercel.app`
- **Backend API**: `https://your-backend-name.vercel.app`
- **Admin Panel**: `https://your-frontend-name.vercel.app/admin`

## 🔑 Admin Access

- **URL**: `https://your-frontend-name.vercel.app/admin`
- **Email**: `admin@pcbuilder.com`
- **Password**: `Admin@123`

## ✅ Step 9: Testing Checklist

### Test These Features:
- [ ] **Homepage loads** correctly
- [ ] **User registration** works
- [ ] **User login** works
- [ ] **PC Builder** functions properly
- [ ] **Product catalog** displays
- [ ] **Add to cart** works
- [ ] **Checkout process** works
- [ ] **Payment integration** (test mode)
- [ ] **Admin login** works
- [ ] **Admin dashboard** accessible
- [ ] **Mobile responsiveness**

## 🛠️ Step 10: Troubleshooting

### Common Issues:

#### Build Errors:
```bash
# Check Node.js version in vercel.json
{
  "functions": {
    "src/server.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

#### API Connection Issues:
- Verify CORS settings in backend
- Check environment variables
- Ensure API URLs are correct

#### Database Connection:
- Verify MongoDB Atlas connection string
- Check IP whitelist (0.0.0.0/0)
- Ensure database user has proper permissions

### Debug Commands:
```bash
# Check build locally
npm run build

# Test API locally
npm run dev

# Check environment variables
vercel env ls
```

## 📊 Step 11: Performance Optimization

### Frontend Optimization:
- **Code Splitting**: Implemented with React lazy loading
- **Image Optimization**: Use Vercel's image optimization
- **Caching**: Static assets cached automatically

### Backend Optimization:
- **Serverless Functions**: Automatic scaling
- **Cold Start**: Minimize by keeping functions warm
- **Database**: Use connection pooling

## 🔄 Step 12: Continuous Deployment

### Automatic Updates:
1. **Push to GitHub**: Changes to main branch
2. **Auto Build**: Vercel builds automatically
3. **Auto Deploy**: Live site updates automatically
4. **Rollback**: Easy rollback to previous versions

### Branch Deployments:
- **Main Branch**: Production deployment
- **Other Branches**: Preview deployments
- **Pull Requests**: Automatic preview links

## 📱 Step 13: Custom Domain (Optional)

### Add Custom Domain:
1. **Vercel Dashboard**: Go to project settings
2. **Domains**: Add custom domain
3. **DNS Settings**: Update your domain's DNS
4. **SSL**: Automatic HTTPS certificate

## 📞 Support & Monitoring

### Vercel Features:
- **Analytics**: Built-in web analytics
- **Monitoring**: Performance monitoring
- **Logs**: Real-time function logs
- **Alerts**: Error notifications

---

## 🎉 Deployment Summary

After following this guide, you'll have:

✅ **Frontend**: Deployed on Vercel with React  
✅ **Backend**: Serverless API on Vercel  
✅ **Database**: MongoDB Atlas (free tier)  
✅ **Domain**: Free .vercel.app subdomain  
✅ **SSL**: Automatic HTTPS  
✅ **Auto Deploy**: GitHub integration  

## 🔗 Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GitHub Repo**: https://github.com/Kannu2005/custom_builder.git

**Your Custom PC Builder is ready to go live on Vercel!** 🚀