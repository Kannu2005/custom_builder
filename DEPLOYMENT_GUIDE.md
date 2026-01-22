# 🚀 GitHub Hosting Guide - Custom PC Builder

## 📋 Overview
This guide will help you host your Custom PC Builder project on GitHub and deploy it using free hosting services.

## 🔧 Step 1: Prepare Your Project for GitHub

### Create .gitignore (if not exists)
Make sure your `.gitignore` file includes:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Database
*.db
*.sqlite
```

## 🌐 Step 2: Upload to GitHub

### Option A: Using Git Commands
```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Custom PC Builder project"

# Add GitHub repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/custom-pc-builder.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Desktop
1. Download and install GitHub Desktop
2. Click "Add an Existing Repository from your Hard Drive"
3. Select your project folder
4. Click "Publish repository" to GitHub

## 🚀 Step 3: Deploy Frontend (Free Options)

### Option A: Netlify (Recommended)
1. **Go to**: https://netlify.com
2. **Sign up** with GitHub account
3. **Click**: "New site from Git"
4. **Select**: Your GitHub repository
5. **Build settings**:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`
6. **Deploy**: Click "Deploy site"
7. **Custom domain**: You'll get a free `.netlify.app` domain

### Option B: Vercel
1. **Go to**: https://vercel.com
2. **Sign up** with GitHub account
3. **Import**: Your GitHub repository
4. **Framework**: Select "React"
5. **Root directory**: Set to `frontend`
6. **Deploy**: Automatic deployment

### Option C: GitHub Pages
1. **Go to**: Your GitHub repository
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: Select `main` and `/docs` folder
5. **Build**: You need to build manually and commit to `/docs`

## 🖥️ Step 4: Deploy Backend (Free Options)

### Option A: Railway (Recommended)
1. **Go to**: https://railway.app
2. **Sign up** with GitHub account
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: Your repository
5. **Environment Variables**:
   ```
   MONGODB_URI=your_mongodb_atlas_connection
   JWT_SECRET=your_jwt_secret
   PORT=5000
   NODE_ENV=production
   ```
6. **Deploy**: Automatic deployment

### Option B: Render
1. **Go to**: https://render.com
2. **Sign up** with GitHub account
3. **New** → **Web Service**
4. **Connect**: Your GitHub repository
5. **Settings**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
6. **Environment Variables**: Add your variables
7. **Deploy**: Click "Create Web Service"

### Option C: Heroku (Free tier limited)
1. **Install**: Heroku CLI
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Set vars**: 
   ```bash
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set JWT_SECRET=your_secret
   ```
5. **Deploy**: `git push heroku main`

## 🗄️ Step 5: Database Setup (MongoDB Atlas)

### Create Free MongoDB Database
1. **Go to**: https://mongodb.com/atlas
2. **Sign up** for free account
3. **Create cluster** (free M0 cluster)
4. **Database Access**: Create database user
5. **Network Access**: Add IP address (0.0.0.0/0 for all)
6. **Connect**: Get connection string
7. **Replace**: `<password>` with your database password

### Connection String Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/custompc?retryWrites=true&w=majority
```

## ⚙️ Step 6: Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_PAYMENT_KEY=your_payment_public_key
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/custompc
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=production
PAYMENT_GATEWAY_KEY=your_payment_secret_key
EMAIL_SERVICE_KEY=your_email_service_key
```

## 🔄 Step 7: Automatic Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - name: Install and Build
      run: |
        cd frontend
        npm install
        npm run build
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './frontend/dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🌍 Step 8: Custom Domain (Optional)

### For Netlify:
1. **Domain settings** in Netlify dashboard
2. **Add custom domain**: yourdomain.com
3. **DNS settings**: Point to Netlify servers
4. **SSL**: Automatic HTTPS certificate

### For Railway:
1. **Settings** → **Domains**
2. **Custom Domain**: Add your domain
3. **DNS**: Point CNAME to Railway URL

## 📱 Step 9: Final Configuration

### Update API URLs
Make sure your frontend points to the correct backend URL:

```javascript
// frontend/src/services/api.js
const API_URL = process.env.VITE_API_URL || 'https://your-backend-url.railway.app/api';
```

### CORS Configuration
Update backend CORS settings:

```javascript
// backend/src/app.js
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend-url.netlify.app',
    'https://yourdomain.com'
  ],
  credentials: true
}));
```

## ✅ Step 10: Testing Your Deployed App

### Test Checklist:
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] PC builder functions
- [ ] Payment integration works
- [ ] Admin panel accessible
- [ ] Database operations work
- [ ] Mobile responsiveness

## 🔗 Your Live URLs

After deployment, you'll have:
- **Frontend**: https://your-app.netlify.app
- **Backend API**: https://your-app.railway.app
- **Admin Panel**: https://your-app.netlify.app/admin

## 🛠️ Troubleshooting

### Common Issues:
1. **Build Errors**: Check Node.js version compatibility
2. **API Errors**: Verify environment variables
3. **Database Connection**: Check MongoDB Atlas whitelist
4. **CORS Errors**: Update CORS origins
5. **Payment Issues**: Verify payment gateway settings

### Debug Commands:
```bash
# Check build locally
cd frontend && npm run build

# Test backend locally
cd backend && npm start

# Check environment variables
echo $MONGODB_URI
```

## 📞 Support

If you face any issues:
1. Check deployment logs in your hosting platform
2. Verify all environment variables are set
3. Test locally first before deploying
4. Check GitHub repository for any missing files

---

## 🎉 Congratulations!

Your Custom PC Builder is now live on the internet! 🌐

**Share your project with the world!** 🚀