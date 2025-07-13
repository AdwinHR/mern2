"use client"

import { useState, useEffect } from "react"
import Card from "../common/Card"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import Button from "../common/Button"
import { projectsAPI } from "../../utils/api"

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await projectsAPI.getAll()
      setProjects(data)
    } catch (error) {
      console.error("Error loading projects:", error)
    }
  }

  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      techStack: [],
      imageUrl: "",
      liveUrl: "",
      githubUrl: "",
      status: "draft",
      featured: false,
    }
    setProjects([...projects, newProject])
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...projects]
    if (field === "techStack") {
      updatedProjects[index][field] = value
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean)
    } else {
      updatedProjects[index][field] = value
    }
    setProjects(updatedProjects)
  }

  const removeProject = async (index) => {
    const project = projects[index]
    if (project._id) {
      try {
        await projectsAPI.delete(project._id)
      } catch (error) {
        console.error("Error deleting project:", error)
      }
    }
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
  }

  const saveProjects = async () => {
    setLoading(true)
    setMessage("")
    try {
      for (const project of projects) {
        if (project._id) {
          await projectsAPI.update(project._id, project)
        } else {
          await projectsAPI.create(project)
        }
      }
      setMessage("Projects updated successfully!")
      loadProjects() // Reload to get updated data with IDs
    } catch (error) {
      setMessage("Error updating projects")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Button onClick={addProject} variant="outline" size="sm">
            Add Project
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <Card key={index} className="border border-gray-200">
              <Card.Content className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Project Title"
                    value={project.title}
                    onChange={(e) => updateProject(index, "title", e.target.value)}
                    placeholder="Project name"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={project.status}
                      onChange={(e) => updateProject(index, "status", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <Textarea
                  label="Description"
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Describe your project..."
                  rows={3}
                />

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Live URL"
                    value={project.liveUrl}
                    onChange={(e) => updateProject(index, "liveUrl", e.target.value)}
                    placeholder="https://project-demo.com"
                  />
                  <Input
                    label="GitHub URL"
                    value={project.githubUrl}
                    onChange={(e) => updateProject(index, "githubUrl", e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <Input
                    label="Image URL"
                    value={project.imageUrl}
                    onChange={(e) => updateProject(index, "imageUrl", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <Input
                    label="Tech Stack (comma separated)"
                    value={project.techStack.join(", ")}
                    onChange={(e) => updateProject(index, "techStack", e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={project.featured}
                      onChange={(e) => updateProject(index, "featured", e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Featured Project</span>
                  </label>
                  <Button onClick={() => removeProject(index)} variant="outline" size="sm">
                    Remove Project
                  </Button>
                </div>
              </Card.Content>
            </Card>
          ))}

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={saveProjects} disabled={loading}>
              {loading ? "Saving..." : "Save All Projects"}
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default ProjectsAdmin
