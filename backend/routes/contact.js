const express = require("express")
const Contact = require("../models/Contact")
const router = express.Router()

// Get contact data
router.get("/", async (req, res) => {
  try {
    let contact = await Contact.findOne()

    if (!contact) {
      contact = new Contact({
        email: "adwin@example.com",
        phone: "+1 (555) 123-4567",
        github: "https://github.com/adwin",
        linkedin: "https://linkedin.com/in/adwin",
      })
      await contact.save()
    }

    res.json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update contact data
router.put("/", async (req, res) => {
  try {
    let contact = await Contact.findOne()

    if (!contact) {
      contact = new Contact(req.body)
    } else {
      Object.assign(contact, req.body)
    }

    await contact.save()
    res.json(contact)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
