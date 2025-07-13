"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import Button from "../components/common/Button"
import Card from "../components/common/Card"
import LoadingSpinner from "../components/common/LoadingSpinner"
import { heroAPI, aboutAPI, experienceAPI, projectsAPI, skillsAPI, contactAPI } from "../utils/api"

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState({
    hero: {
      name: "Adwin H R",
      title: "Full Stack Developer",
      subtitle: "Building digital experiences with modern technologies",
      description: "Passionate developer with expertise in React, Node.js, and MongoDB.",
      profileImage: "/placeholder.svg?height=400&width=400",
    },
    about: {
      bio: "I'm a passionate full-stack developer with over 3 years of experience in creating web applications.",
      education: [
        {
          degree: "Bachelor of Computer Science",
          institution: "Tech University",
          year: "2019-2023",
          grade: "First Class",
        },
      ],
    },
    experience: [],
    projects: [],
    skills: {
      frontend: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "MongoDB", "Mongoose"],
      tools: ["Git", "Docker", "VS Code", "Vercel"],
    },
    contact: {
      email: "adwin@example.com",
      phone: "+1 (555) 123-4567",
      github: "https://github.com/adwin",
      linkedin: "https://linkedin.com/in/adwin",
    },
  })

  useEffect(() => {
    loadPortfolioData()
  }, [])

  const loadPortfolioData = async () => {
    setIsLoading(true)
    try {
      console.log("Loading portfolio data from MongoDB...")

      const [heroRes, aboutRes, experienceRes, projectsRes, skillsRes, contactRes] = await Promise.all([
        heroAPI.get(),
        aboutAPI.get(),
        experienceAPI.getAll(),
        projectsAPI.getAll("published"),
        skillsAPI.get(),
        contactAPI.get(),
      ])

      setPortfolioData({
        hero: heroRes || portfolioData.hero,
        about: aboutRes || portfolioData.about,
        experience: experienceRes || [],
        projects: projectsRes || [],
        skills: skillsRes || portfolioData.skills,
        contact: contactRes || portfolioData.contact,
      })

      console.log("Portfolio data loaded successfully!")
    } catch (error) {
      console.error("Error loading portfolio data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPeriod = (exp) => {
    if (exp.isCurrent) {
      return `${exp.startDate} - Present`
    }
    return `${exp.startDate} - ${exp.endDate}`
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading portfolio from MongoDB..." />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {portfolioData.hero.name}
            </div>
            <div className="hidden md:flex space-x-8">
              {["About", "Experience", "Projects", "Skills", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {portfolioData.hero.name}
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700">{portfolioData.hero.title}</h2>
                <p className="text-xl text-purple-600 font-medium">{portfolioData.hero.subtitle}</p>
                <p className="text-gray-600 text-lg leading-relaxed">{portfolioData.hero.description}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <a href={`mailto:${portfolioData.contact.email}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <img
                  src={portfolioData.hero.profileImage || "/placeholder.svg?height=400&width=400"}
                  alt={portfolioData.hero.name}
                  width={320}
                  height={320}
                  className="relative z-10 rounded-full border-4 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">{portfolioData.about.bio}</p>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
                {portfolioData.about.education.map((edu, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <Card.Content className="p-4">
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <p className="text-purple-600">{edu.institution}</p>
                      <p className="text-gray-600">
                        {edu.year} • {edu.grade}
                      </p>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold">3+</h4>
                  <p>Years Experience</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold">{portfolioData.projects.length}+</h4>
                  <p>Projects Completed</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold">100K+</h4>
                  <p>Users Served</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
                  <h4 className="text-3xl font-bold">24/7</h4>
                  <p>Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={exp._id || index}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <Card.Content className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{exp.role}</h3>
                        <p className="text-xl text-purple-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-2 lg:mt-0">
                        {formatPeriod(exp)}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights &&
                        exp.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                    </ul>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div key={project._id || index}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg?height=300&width=500"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 flex space-x-2">
                        {project.liveUrl && (
                          <Button size="sm" variant="secondary">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              Live
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="secondary">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  <Card.Content className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack &&
                        project.techStack.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border">
                            {tech}
                          </span>
                        ))}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(portfolioData.skills).map(([category, skillsArray], index) => (
              <div key={category}>
                <Card className="h-full">
                  <Card.Content className="p-6">
                    <h3 className="text-xl font-bold mb-4 capitalize text-center">
                      {category === "frontend" ? "Frontend" : category === "backend" ? "Backend" : "Tools"}
                    </h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {Array.isArray(skillsArray) &&
                        skillsArray.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`
                              px-3 py-1 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200
                              ${category === "frontend" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" : ""}
                              ${category === "backend" ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" : ""}
                              ${category === "tools" ? "bg-gradient-to-r from-green-500 to-teal-500 text-white" : ""}
                            `}
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </Card.Content>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities and interesting projects. Let's connect!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">{portfolioData.contact.email}</p>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button variant="outline" size="sm">
                  <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="sm">
                  <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            <div>
              <Card>
                <Card.Content className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Send Message
                    </Button>
                  </form>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 {portfolioData.hero.name}. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Built with React, MongoDB, and ❤️</p>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio
