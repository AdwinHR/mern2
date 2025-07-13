const express = require("express")
const Skills = require("../models/Skills")
const router = express.Router()

// Get skills data
router.get("/", async (req, res) => {
  try {
    let skills = await Skills.findOne()

    if (!skills) {
      skills = new Skills({
        frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        backend: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
        tools: ["Git", "Docker", "AWS", "Vercel"],
      })
      await skills.save()
    }

    res.json(skills)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update skills data
router.put("/", async (req, res) => {
  try {
    let skills = await Skills.findOne()

    if (!skills) {
      skills = new Skills(req.body)
    } else {
      Object.assign(skills, req.body)
    }

    await skills.save()
    res.json(skills)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
