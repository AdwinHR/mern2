#!/bin/bash

# Simple EC2 deployment script

set -e

echo "🚀 Deploying Portfolio App on EC2..."

# Navigate to project directory
cd ~/mern2

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.local.yml down || true

# Clean up Docker
echo "🧹 Cleaning up Docker..."
docker system prune -f

# Start services
echo "🔨 Starting services..."
docker-compose -f docker-compose.local.yml up -d

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 20

# Check status
echo "📊 Service status:"
docker-compose -f docker-compose.local.yml ps

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: http://$(curl -s ifconfig.me)"
