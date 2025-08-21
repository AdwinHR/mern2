# AWS EC2 Deployment Guide (Free Tier)

## Prerequisites
- AWS Account with EC2 access
- Basic knowledge of AWS Console
- SSH client (Terminal on Mac/Linux, PuTTY on Windows)

## Step 1: Launch EC2 Instance

### 1.1 Create Instance
1. Go to AWS Console → EC2 → Launch Instance
2. **Name**: `portfolio-app`
3. **AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
4. **Instance Type**: t2.micro (Free tier eligible)
5. **Key Pair**: Create new key pair, download `.pem` file
6. **Security Group**: Create new security group with these rules:
   - SSH (Port 22): Your IP
   - HTTP (Port 80): 0.0.0.0/0
   - HTTPS (Port 443): 0.0.0.0/0 (optional)

### 1.2 Connect to Instance
```bash
# Make key file executable
chmod 400 your-key.pem

# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

## Step 2: Deploy Application

### 2.1 Upload Files
```bash
# On your local machine, zip the project
cd /path/to/mern2
zip -r portfolio-app.zip . -x "node_modules/*" ".git/*"

# Upload to EC2 (replace with your details)
scp -i your-key.pem portfolio-app.zip ubuntu@your-ec2-public-ip:~/
```

### 2.2 Setup on EC2
```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Extract files
cd ~
unzip portfolio-app.zip -d portfolio-app
cd portfolio-app

# Make scripts executable
chmod +x scripts/*.sh

# Run setup script
./scripts/deploy-ec2.sh

# Log out and log back in
exit
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Continue with deployment
cd ~/portfolio-app
./scripts/deploy.sh
```

## Step 3: Configure Environment

### 3.1 Edit .env File
```bash
nano .env
```
Update with secure passwords:
```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your_secure_password_here
NODE_ENV=production
PORT=5001
REACT_APP_API_URL=/api
```

### 3.2 Restart Services
```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

## Step 4: Access Your App

- **Frontend**: http://your-ec2-public-ip
- **Backend Health**: http://your-ec2-public-ip/health
- **API**: http://your-ec2-public-ip/api

## Useful Commands

### Check Status
```bash
# Service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Check specific service
docker-compose -f docker-compose.prod.yml logs backend
```

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build
```

### Troubleshooting
```bash
# Check container logs
docker logs portfolio-backend-prod
docker logs portfolio-frontend-prod
docker logs portfolio-nginx

# Restart specific service
docker-compose -f docker-compose.prod.yml restart backend

# View nginx config
docker exec -it portfolio-nginx cat /etc/nginx/nginx.conf
```

## Security Considerations

1. **Change default passwords** in .env file
2. **Restrict SSH access** to your IP only
3. **Use HTTPS** with SSL certificates (Let's Encrypt)
4. **Regular updates**: `sudo apt update && sudo apt upgrade`
5. **Monitor logs** for suspicious activity

## Cost Optimization (Free Tier)

- **t2.micro**: 750 hours/month free
- **EBS Storage**: 30GB free tier
- **Data Transfer**: 15GB outbound free
- **Monitor usage** in AWS Billing Dashboard

## Next Steps

1. **Domain Name**: Point your domain to EC2 public IP
2. **SSL Certificate**: Set up HTTPS with Let's Encrypt
3. **Monitoring**: Set up CloudWatch alarms
4. **Backup**: Configure automated backups
5. **Scaling**: Consider ECS/EKS for production loads

## Support

- Check Docker logs for application errors
- Verify security group rules
- Ensure ports 80/443 are open
- Monitor EC2 instance status in AWS Console
