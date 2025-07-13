const express = require("express")
const Experience = require("../models/Experience")
const router = express.Router()

// Get all experience
router.get("/", async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 })
    res.json(experiences)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create new experience
router.post("/", async (req, res) => {
  try {
    const experience = new Experience(req.body)
    await experience.save()
    res.status(201).json(experience)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update experience
router.put("/:id", async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(experience)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete experience
router.delete("/:id", async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id)
    res.json({ message: "Experience deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
