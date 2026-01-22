#!/bin/bash

# Custom PC Builder - Deployment Script
echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
read -p "Enter commit message (or press Enter for default): " commit_message
if [ -z "$commit_message" ]; then
    commit_message="Deploy: Custom PC Builder project"
fi
git commit -m "$commit_message"

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "🔗 Adding GitHub repository..."
    read -p "Enter your GitHub repository URL: " repo_url
    git remote add origin "$repo_url"
fi

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "✅ Deployment to GitHub completed!"
echo ""
echo "🌐 Next steps:"
echo "1. Go to https://netlify.com to deploy frontend"
echo "2. Go to https://railway.app to deploy backend"
echo "3. Set up MongoDB Atlas database"
echo "4. Configure environment variables"
echo ""
echo "📖 Check DEPLOYMENT_GUIDE.md for detailed instructions"