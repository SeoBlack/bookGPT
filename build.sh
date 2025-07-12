#!/bin/bash

# BookGPT Production Build Script

set -e

echo "🚀 Starting BookGPT production build..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "📝 Please edit .env file with your API keys before continuing."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Build the application
echo "🔨 Building application..."
npm run build

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p uploads temp_images

# Set permissions
echo "🔐 Setting permissions..."
chmod 755 uploads temp_images

echo "✅ Production build completed successfully!"
echo "🚀 To start the application: npm start"
echo "🐳 Or use Docker: docker-compose up -d" 