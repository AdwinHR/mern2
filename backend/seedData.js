const mongoose = require("mongoose")
const Hero = require("./models/Hero")
const About = require("./models/About")
const Experience = require("./models/Experience")
const Project = require("./models/Project")
const Skills = require("./models/Skills")
const Contact = require("./models/Contact")
require("dotenv").config()

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to MongoDB")

    // Clear existing data
    await Hero.deleteMany({})
    await About.deleteMany({})
    await Experience.deleteMany({})
    await Project.deleteMany({})
    await Skills.deleteMany({})
    await Contact.deleteMany({})

    // Seed Hero data
    await Hero.create({
      name: "Adwin H R",
      title: "Full Stack Developer",
      subtitle: "Building digital experiences with modern technologies",
      description:
        "Passionate developer with expertise in React, Node.js, and cloud technologies. I create scalable web applications that deliver exceptional user experiences.",
      profileImage: "/placeholder.svg?height=400&width=400",
      resumeUrl: "/resume.pdf",
    })

    // Seed About data
    await About.create({
      bio: "I'm a passionate full-stack developer with over 3 years of experience in creating web applications. I love turning complex problems into simple, beautiful designs.",
      education: [
        {
          degree: "Bachelor of Computer Science",
          institution: "Tech University",
          year: "2019-2023",
          grade: "First Class",
        },
        {
          degree: "Full Stack Web Development Bootcamp",
          institution: "Code Academy",
          year: "2018-2019",
          grade: "Certificate",
        },
      ],
    })

    // Seed Experience data
    await Experience.create([
      {
        role: "Senior Full Stack Developer",
        company: "TechCorp Solutions",
        startDate: "2023-01-01",
        endDate: "",
        isCurrent: true,
        highlights: [
          "Led development of microservices architecture serving 100K+ users",
          "Implemented CI/CD pipelines reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews",
          "Architected scalable solutions using React, Node.js, and AWS",
        ],
        order: 1,
      },
      {
        role: "Frontend Developer",
        company: "Digital Agency",
        startDate: "2021-06-01",
        endDate: "2022-12-31",
        isCurrent: false,
        highlights: [
          "Built responsive web applications using React and TypeScript",
          "Collaborated with design team to implement pixel-perfect UIs",
          "Optimized application performance achieving 95+ Lighthouse scores",
          "Integrated third-party APIs and payment systems",
        ],
        order: 2,
      },
      {
        role: "Junior Web Developer",
        company: "StartupXYZ",
        startDate: "2020-01-01",
        endDate: "2021-05-31",
        isCurrent: false,
        highlights: [
          "Developed and maintained company website using HTML, CSS, JavaScript",
          "Assisted in migration from legacy PHP system to modern React application",
          "Participated in agile development processes and daily standups",
        ],
        order: 3,
      },
    ])

    // Seed Projects data
    await Project.create([
      {
        title: "E-Commerce Platform",
        description:
          "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Features include user authentication, product catalog, shopping cart, order management, and real-time notifications.",
        techStack: ["React", "Node.js", "MongoDB", "Stripe", "Express", "Tailwind CSS"],
        imageUrl: "/placeholder.svg?height=300&width=500",
        liveUrl: "https://ecommerce-demo.adwin.dev",
        githubUrl: "https://github.com/adwin/ecommerce-platform",
        status: "published",
        featured: true,
        order: 1,
      },
      {
        title: "Task Management App",
        description:
          "Collaborative task management application with real-time updates and team collaboration features. Includes project boards, task assignments, time tracking, and team chat functionality.",
        techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
        imageUrl: "/placeholder.svg?height=300&width=500",
        liveUrl: "https://tasks.adwin.dev",
        githubUrl: "https://github.com/adwin/task-manager",
        status: "published",
        featured: true,
        order: 2,
      },
      {
        title: "Weather App",
        description:
          "Modern weather application with location-based forecasts, interactive maps, and weather alerts. Includes 7-day forecasts, hourly updates, and beautiful weather animations.",
        techStack: ["React", "OpenWeather API", "Geolocation", "Chart.js"],
        imageUrl: "/placeholder.svg?height=300&width=500",
        liveUrl: "https://weather.adwin.dev",
        githubUrl: "https://github.com/adwin/weather-app",
        status: "published",
        featured: false,
        order: 3,
      },
    ])

    // Seed Skills data
    await Skills.create({
      frontend: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "GraphQL"],
      tools: ["Git", "VS Code", "Docker", "AWS", "Heroku", "Netlify", "Figma"],
    })

    // Seed Contact data
    await Contact.create({
      email: "adwin@example.com",
      phone: "+1 (555) 123-4567",
      github: "https://github.com/adwin",
      linkedin: "https://linkedin.com/in/adwin-hr",
    })

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
