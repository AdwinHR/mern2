const express = require("express")
const About = require("../models/About")
const router = express.Router()

// Get about data
router.get("/", async (req, res) => {
  try {
    let about = await About.findOne()

    if (!about) {
      about = new About({
        education: [
          {
            degree: "Bachelor of Computer Science",
            institution: "Tech University",
            year: "2019-2023",
            grade: "First Class",
          },
        ],
      })
      await about.save()
    }

    res.json(about)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update about data
router.put("/", async (req, res) => {
  try {
    let about = await About.findOne()

    if (!about) {
      about = new About(req.body)
    } else {
      Object.assign(about, req.body)
    }

    await about.save()
    res.json(about)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
