# Portfolio CMS - MongoDB & Mongoose

A simple portfolio website with content management system built with **MongoDB**, **Mongoose**, **Express.js**, and **React**.

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework  
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### 1. Clone and Setup Backend

\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/portfolio" >> .env

# Start MongoDB (if using local installation)
mongod

# Seed the database with sample data
node seedData.js

# Start the backend server
npm run dev
\`\`\`

Backend will run on: http://localhost:5000

### 2. Setup Frontend

\`\`\`bash
# Navigate back to root directory
cd ..

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the frontend
npm start
\`\`\`

Frontend will run on: http://localhost:3000

## 📁 Project Structure

\`\`\`
portfolio-cms/
├── backend/
│   ├── models/          # Mongoose schemas
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Experience.js
│   │   ├── Project.js
│   │   ├── Skills.js
│   │   └── Contact.js
│   ├── routes/          # Express API routes
│   │   ├── hero.js
│   │   ├── about.js
│   │   ├── experience.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── contact.js
│   ├── server.js        # Express server
│   ├── seedData.js      # Database seeding script
│   └── package.json
├── src/
│   ├── components/
│   │   ├── common/      # Reusable UI components (Button, Card, Input, Textarea, LoadingSpinner)
│   │   ├── portfolio/   # Portfolio page sections (HeroSection, AboutSection, etc.)
│   │   └── admin/       # Admin panel components (HeroAdmin, AboutAdmin, etc.)
│   ├── pages/
│   │   ├── Portfolio.js # Main portfolio page
│   │   └── Admin.js     # Admin panel page
│   ├── utils/
│   │   └── api.js       # API utility functions for MongoDB backend
│   ├── App.js           # Main React App component
│   └── index.js         # React entry point
├── public/              # Static assets
├── .env                 # Environment variables for frontend
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json
\`\`\`

## 🎯 API Endpoints

### Hero Section
- \`GET /api/hero\` - Get hero data
- \`PUT /api/hero\` - Update hero data

### About Section  
- \`GET /api/about\` - Get about data
- \`PUT /api/about\` - Update about data

### Experience
- \`GET /api/experience\` - Get all experience
- \`POST /api/experience\` - Create new experience
- \`PUT /api/experience/:id\` - Update experience
- \`DELETE /api/experience/:id\` - Delete experience

### Projects
- \`GET /api/projects\` - Get all projects
- \`GET /api/projects?status=published\` - Get published projects
- \`POST /api/projects\` - Create new project
- \`PUT /api/projects/:id\` - Update project
- \`DELETE /api/projects/:id\` - Delete project

### Skills
- \`GET /api/skills\` - Get skills data
- \`PUT /api/skills\` - Update skills data

### Contact
- \`GET /api/contact\` - Get contact info
- \`PUT /api/contact\` - Update contact info

## 🎨 Features

### Portfolio Website
- ✅ Hero section with personal information
- ✅ About section with bio and education
- ✅ Experience timeline
- ✅ Projects showcase with filtering
- ✅ Skills categorization
- ✅ Contact information and form
- ✅ Fully responsive design

### Admin Panel
- ✅ Hero section management
- ✅ About section editing
- ✅ Projects CRUD operations
- 🚧 Experience management (in progress)
- 🚧 Skills management (in progress)
- 🚧 Contact management (in progress)

## 🔧 Development

### Adding New Features

1. **Create Mongoose Model**
\`\`\`javascript
// backend/models/NewModel.js
const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
field: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('NewModel', newSchema)
\`\`\`

2. **Add Express Routes**
\`\`\`javascript
// backend/routes/newroute.js
const express = require('express')
const NewModel = require('../models/NewModel')
const router = express.Router()

router.get('/', async (req, res) => {
// Implementation
})

module.exports = router
\`\`\`

3. **Create React Component**
\`\`\`javascript
// src/components/portfolio/NewSection.js
const NewSection = ({ data }) => {
return <div>{data.field}</div>
}

export default NewSection
\`\`\`

### Database Operations

\`\`\`bash
# Reset database with fresh data
node backend/seedData.js

# Connect to MongoDB shell
mongo portfolio

# View collections
show collections

# Query data
db.heroes.find()
db.projects.find()
\`\`\`

## 🚀 Deployment

### Backend (Heroku)
\`\`\`bash
# In backend directory
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
\`\`\`

### Frontend (Netlify)
\`\`\`bash
npm run build
# Upload build/ folder to Netlify
\`\`\`

### Database (MongoDB Atlas)
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in environment variables

## 📚 Learning Resources

### MongoDB & Mongoose
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)

### Express.js
- [Express.js Guide](https://expressjs.com/)

### React
- [React Documentation](https://react.dev/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit changes (\`git commit -m 'Add amazing feature'\`)
4. Push to branch (\`git push origin feature/amazing-feature\`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Perfect for learning full-stack development with MongoDB and React!** 🎓
