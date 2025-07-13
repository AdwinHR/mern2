const express = require("express")
const Hero = require("../models/Hero")
const router = express.Router()

// Get hero data
router.get("/", async (req, res) => {
  try {
    let hero = await Hero.findOne()

    // Create default hero if none exists
    if (!hero) {
      hero = new Hero()
      await hero.save()
    }

    res.json(hero)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update hero data
router.put("/", async (req, res) => {
  try {
    let hero = await Hero.findOne()

    if (!hero) {
      hero = new Hero(req.body)
    } else {
      Object.assign(hero, req.body)
    }

    await hero.save()
    res.json(hero)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
