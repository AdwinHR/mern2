#!/bin/bash

# Fast deployment script using pre-built React app

set -e

echo "🚀 Fast Deploying Portfolio App (Pre-built Frontend)..."

# Check if build folder exists
if [ ! -d "build" ]; then
    echo "❌ Build folder not found! Please run 'npm run build' first"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "docker-compose.local.yml" ]; then
    echo "❌ Please run this script from the portfolio-app directory"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# MongoDB
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your_secure_password_here

# Backend
NODE_ENV=production
PORT=5001

# Frontend
REACT_APP_API_URL=/api
EOF
    echo "⚠️  Please edit .env file with secure passwords before continuing"
    echo "Press Enter when ready..."
    read
fi

# Build and start services (should be much faster now!)
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.local.yml up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 15

# Check service status
echo "📊 Checking service status..."
docker-compose -f docker-compose.local.yml ps

# Show logs
echo "📋 Recent logs:"
docker-compose -f docker-compose.local.yml logs --tail=20

echo "✅ Fast deployment complete!"
echo "🌐 Your app should be available at: http://$(curl -s ifconfig.me)"
echo "📊 Check status with: docker-compose -f docker-compose.local.yml ps"
echo "📋 View logs with: docker-compose -f docker-compose.local.yml logs -f"
