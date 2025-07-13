const express = require("express")
const Project = require("../models/Project")
const router = express.Router()

// Get all projects
router.get("/", async (req, res) => {
  try {
    const { status } = req.query
    const filter = status ? { status } : {}
    const projects = await Project.find(filter).sort({ order: 1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update project
router.put("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: "Project deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
