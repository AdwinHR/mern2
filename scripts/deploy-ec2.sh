#!/bin/bash

# EC2 Deployment Script for Portfolio App
# Run this on your Ubuntu EC2 instance

set -e

echo "🚀 Starting EC2 deployment..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
echo "📋 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
echo "👤 Adding user to docker group..."
sudo usermod -aG docker $USER

# Create app directory
echo "📁 Creating application directory..."
mkdir -p ~/portfolio-app
cd ~/portfolio-app

# Create SSL directory for nginx
mkdir -p nginx/ssl

echo "✅ Basic setup complete!"
echo "🔑 Please log out and log back in for docker group changes to take effect"
echo "📝 Then run: cd ~/portfolio-app && ./deploy.sh"
