"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom" // Import Link from react-router-dom
import Button from "../components/common/Button"
import Card from "../components/common/Card"
import Input from "../components/common/Input"
import Textarea from "../components/common/Textarea"
import { User, Briefcase, FolderOpen, Code, Mail, Settings, Eye, Loader2 } from "lucide-react"
import { heroAPI, aboutAPI, experienceAPI, projectsAPI, skillsAPI, contactAPI } from "../utils/api"

const Admin = () => {
  const [activeTab, setActiveTab] = useState("hero")
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState("checking") // Keep for internal check, but not displayed by DatabaseStatus component

  // State for all content sections
  const [heroData, setHeroData] = useState({
    name: "Adwin H R",
    title: "Full Stack Developer",
    subtitle: "Building digital experiences with modern technologies",
    description: "Passionate developer with expertise in React, Node.js, and MongoDB.",
  })

  const [aboutData, setAboutData] = useState({
    bio: "I'm a passionate full-stack developer with over 3 years of experience in creating web applications.",
    education: [{ degree: "", institution: "", year: "", grade: "" }],
  })

  const [experienceData, setExperienceData] = useState([])
  const [projectsData, setProjectsData] = useState([])
  const [skillsData, setSkillsData] = useState({
    frontend: ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB", "Mongoose"],
    tools: ["Git", "VS Code", "Docker", "Vercel"],
  })
  const [contactData, setContactData] = useState({
    email: "adwin@example.com",
    phone: "+1 (555) 123-4567",
    github: "https://github.com/adwin",
    linkedin: "https://linkedin.com/in/adwin",
  })

  // Load data from MongoDB on component mount
  useEffect(() => {
    checkConnection()
    loadAllData()
  }, [])

  const checkConnection = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health`)
      if (response.ok) {
        setConnectionStatus("connected")
      } else {
        setConnectionStatus("error")
      }
    } catch (error) {
      setConnectionStatus("error")
    }
  }

  const loadAllData = async () => {
    setIsInitialLoading(true)
    try {
      await Promise.all([
        loadHeroData(),
        loadAboutData(),
        loadExperienceData(),
        loadProjectsData(),
        loadSkillsData(),
        loadContactData(),
      ])
    } catch (error) {
      console.error("Error loading data:", error)
      // No toast here, as we're removing shadcn/ui toast
    } finally {
      setIsInitialLoading(false)
    }
  }

  const loadHeroData = async () => {
    try {
      const data = await heroAPI.get()
      if (data) setHeroData(data)
    } catch (error) {
      console.error("Error loading hero data:", error)
    }
  }

  const loadAboutData = async () => {
    try {
      const data = await aboutAPI.get()
      if (data) setAboutData(data)
    } catch (error) {
      console.error("Error loading about data:", error)
    }
  }

  const loadExperienceData = async () => {
    try {
      const data = await experienceAPI.getAll()
      if (data) setExperienceData(data)
    } catch (error) {
      console.error("Error loading experience data:", error)
    }
  }

  const loadProjectsData = async () => {
    try {
      const data = await projectsAPI.getAll()
      if (data) setProjectsData(data)
    } catch (error) {
      console.error("Error loading projects data:", error)
    }
  }

  const loadSkillsData = async () => {
    try {
      const data = await skillsAPI.get()
      if (data) setSkillsData(data)
    } catch (error) {
      console.error("Error loading skills data:", error)
    }
  }

  const loadContactData = async () => {
    try {
      const data = await contactAPI.get()
      if (data) setContactData(data)
    } catch (error) {
      console.error("Error loading contact data:", error)
    }
  }

  // Save functions
  const saveHeroData = async () => {
    setIsLoading(true)
    try {
      await heroAPI.update(heroData)
      alert("Hero section updated successfully!") // Simple alert for feedback
    } catch (error) {
      alert("Failed to save hero data.")
      console.error("Error saving hero data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveAboutData = async () => {
    setIsLoading(true)
    try {
      await aboutAPI.update(aboutData)
      alert("About section updated successfully!")
    } catch (error) {
      alert("Failed to save about data.")
      console.error("Error saving about data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveSkillsData = async () => {
    setIsLoading(true)
    try {
      await skillsAPI.update(skillsData)
      alert("Skills updated successfully!")
    } catch (error) {
      alert("Failed to save skills data.")
      console.error("Error saving skills data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveContactData = async () => {
    setIsLoading(true)
    try {
      await contactAPI.update(contactData)
      alert("Contact information updated successfully.")
    } catch (error) {
      alert("Failed to save contact data.")
      console.error("Error saving contact data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper functions for Experience and Projects (simplified for now)
  const addExperience = () => {
    const newExperience = {
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      highlights: [""],
    }
    setExperienceData([...experienceData, newExperience])
  }

  const removeExperience = (index) => {
    setExperienceData(experienceData.filter((_, i) => i !== index))
  }

  const updateExperience = (index, field, value) => {
    const updated = [...experienceData]
    updated[index] = { ...updated[index], [field]: value }
    setExperienceData(updated)
  }

  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      techStack: [],
      status: "draft",
      featured: false,
    }
    setProjectsData([...projectsData, newProject])
  }

  const removeProject = (index) => {
    setProjectsData(projectsData.filter((_, i) => i !== index))
  }

  const updateProject = (index, field, value) => {
    const updated = [...projectsData]
    updated[index] = { ...updated[index], [field]: value }
    setProjectsData(updated)
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading portfolio data from MongoDB...</p>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case "hero":
        return (
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Hero Section</h2>
                <Button onClick={saveHeroData} disabled={isLoading} size="sm">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <User className="h-4 w-4 mr-2" />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={heroData.name}
                      onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Professional Title
                    </label>
                    <Input
                      id="title"
                      value={heroData.title}
                      onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
                      Subtitle
                    </label>
                    <Input
                      id="subtitle"
                      value={heroData.subtitle}
                      onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={heroData.description}
                    onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                    rows={6}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card.Content>
          </Card>
        )
      case "about":
        return (
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">About Section</h2>
                <Button onClick={saveAboutData} disabled={isLoading} size="sm">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <User className="h-4 w-4 mr-2" />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="space-y-6">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Biography
                </label>
                <Textarea
                  id="bio"
                  value={aboutData.bio}
                  onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                  placeholder="Write your professional biography..."
                  rows={4}
                  className="mt-1"
                />
              </div>
            </Card.Content>
          </Card>
        )
      case "skills":
        return (
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Skills & Technologies</h2>
                <Button onClick={saveSkillsData} disabled={isLoading} size="sm">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Code className="h-4 w-4 mr-2" />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frontend Technologies</label>
                  <Textarea
                    placeholder="React, JavaScript, TypeScript..."
                    value={skillsData.frontend.join(", ")}
                    onChange={(e) =>
                      setSkillsData({
                        ...skillsData,
                        frontend: e.target.value.split(", ").filter(Boolean),
                      })
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Backend Technologies</label>
                  <Textarea
                    placeholder="Node.js, Express, MongoDB..."
                    value={skillsData.backend.join(", ")}
                    onChange={(e) =>
                      setSkillsData({
                        ...skillsData,
                        backend: e.target.value.split(", ").filter(Boolean),
                      })
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tools & Others</label>
                  <Textarea
                    placeholder="Git, Docker, VS Code..."
                    value={skillsData.tools.join(", ")}
                    onChange={(e) =>
                      setSkillsData({
                        ...skillsData,
                        tools: e.target.value.split(", ").filter(Boolean),
                      })
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card.Content>
          </Card>
        )
      case "contact":
        return (
          <Card>
            <Card.Header>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <Button onClick={saveContactData} disabled={isLoading} size="sm">
                  {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Mail className="h-4 w-4 mr-2" />}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Card.Header>
            <Card.Content className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                      GitHub URL
                    </label>
                    <Input
                      id="github"
                      value={contactData.github}
                      onChange={(e) => setContactData({ ...contactData, github: e.target.value })}
                      placeholder="https://github.com/username"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                      LinkedIn URL
                    </label>
                    <Input
                      id="linkedin"
                      value={contactData.linkedin}
                      onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        )
      case "experience":
        return (
          <Card>
            <Card.Content className="p-6">
              <div className="text-center text-gray-500">
                <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Experience Management</h3>
                <p>Experience management interface coming soon...</p>
                <p className="text-sm mt-2">Currently showing {experienceData.length} experience items from MongoDB</p>
              </div>
            </Card.Content>
          </Card>
        )
      case "projects":
        return (
          <Card>
            <Card.Content className="p-6">
              <div className="text-center text-gray-500">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Projects Management</h3>
                <p>Projects management interface coming soon...</p>
                <p className="text-sm mt-2">Currently showing {projectsData.length} projects from MongoDB</p>
              </div>
            </Card.Content>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Portfolio CMS Admin
            </h1>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Header>
                <h2 className="text-lg font-semibold">Content Management</h2>
              </Card.Header>
              <Card.Content className="p-0">
                <nav className="grid w-full grid-cols-1 h-auto bg-transparent p-1">
                  <button
                    onClick={() => setActiveTab("hero")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      activeTab === "hero"
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Hero Section
                  </button>
                  <button
                    onClick={() => setActiveTab("about")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      activeTab === "about"
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      activeTab === "experience"
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      activeTab === "projects"
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Projects
                  </button>
                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      activeTab === "skills"
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      activeTab === "contact"
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </button>
                </nav>
              </Card.Content>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Quick Stats</h2>
              </Card.Header>
              <Card.Content className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Projects</span>
                  <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full">
                    {projectsData.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Published</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {projectsData.filter((p) => p.status === "published").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Drafts</span>
                  <span className="px-2 py-1 border border-gray-300 text-gray-700 text-xs rounded-full">
                    {projectsData.filter((p) => p.status === "draft").length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Experience Items</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {experienceData.length}
                  </span>
                </div>
              </Card.Content>
            </Card>

            {/* MongoDB Info */}
            <Card className="mt-6">
              <Card.Header>
                <h2 className="text-lg font-semibold">Database Info</h2>
              </Card.Header>
              <Card.Content className="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>Database:</strong> MongoDB
                </div>
                <div>
                  <strong>ODM:</strong> Mongoose
                </div>
                <div>
                  <strong>Backend:</strong> Express.js
                </div>
                <div>
                  <strong>Frontend:</strong> React
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default Admin
