"use client"

import { useState, useEffect } from "react"
import Card from "../common/Card"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import Button from "../common/Button"
import { heroAPI } from "../../utils/api"

const HeroAdmin = () => {
  const [heroData, setHeroData] = useState({
    name: "",
    title: "",
    subtitle: "",
    description: "",
    profileImage: "",
    resumeUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadHeroData()
  }, [])

  const loadHeroData = async () => {
    try {
      const data = await heroAPI.get()
      setHeroData(data)
    } catch (error) {
      console.error("Error loading hero data:", error)
    }
  }

  const handleInputChange = (field, value) => {
    setHeroData({ ...heroData, [field]: value })
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage("")
    try {
      await heroAPI.update(heroData)
      setMessage("Hero section updated successfully!")
    } catch (error) {
      setMessage("Error updating hero section")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">Hero Section</h2>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={heroData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Your full name"
            />
            <Input
              label="Professional Title"
              value={heroData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <Input
            label="Subtitle"
            value={heroData.subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            placeholder="Brief tagline about what you do"
          />

          <Textarea
            label="Description"
            value={heroData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Detailed description about yourself"
            rows={4}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Profile Image URL"
              value={heroData.profileImage}
              onChange={(e) => handleInputChange("profileImage", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Input
              label="Resume URL"
              value={heroData.resumeUrl}
              onChange={(e) => handleInputChange("resumeUrl", e.target.value)}
              placeholder="https://example.com/resume.pdf"
            />
          </div>

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
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default HeroAdmin
