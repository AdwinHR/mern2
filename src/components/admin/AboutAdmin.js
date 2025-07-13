"use client"

import { useState, useEffect } from "react"
import Card from "../common/Card"
import Input from "../common/Input"
import Textarea from "../common/Textarea"
import Button from "../common/Button"
import { aboutAPI } from "../../utils/api"

const AboutAdmin = () => {
  const [aboutData, setAboutData] = useState({
    bio: "",
    education: [{ degree: "", institution: "", year: "", grade: "" }],
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      const data = await aboutAPI.get()
      setAboutData(data)
    } catch (error) {
      console.error("Error loading about data:", error)
    }
  }

  const handleBioChange = (value) => {
    setAboutData({ ...aboutData, bio: value })
  }

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...aboutData.education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setAboutData({ ...aboutData, education: updatedEducation })
  }

  const addEducation = () => {
    setAboutData({
      ...aboutData,
      education: [...aboutData.education, { degree: "", institution: "", year: "", grade: "" }],
    })
  }

  const removeEducation = (index) => {
    const updatedEducation = aboutData.education.filter((_, i) => i !== index)
    setAboutData({ ...aboutData, education: updatedEducation })
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage("")
    try {
      await aboutAPI.update(aboutData)
      setMessage("About section updated successfully!")
    } catch (error) {
      setMessage("Error updating about section")
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold">About Section</h2>
      </Card.Header>
      <Card.Content>
        <div className="space-y-6">
          <Textarea
            label="Biography"
            value={aboutData.bio}
            onChange={(e) => handleBioChange(e.target.value)}
            placeholder="Write about yourself, your experience, and what you're passionate about..."
            rows={6}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Button onClick={addEducation} variant="outline" size="sm">
                Add Education
              </Button>
            </div>

            <div className="space-y-4">
              {aboutData.education.map((edu, index) => (
                <Card key={index} className="border border-gray-200">
                  <Card.Content className="p-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                        placeholder="e.g., Bachelor of Computer Science"
                      />
                      <Input
                        label="Institution"
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                        placeholder="e.g., Tech University"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Year"
                        value={edu.year}
                        onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                        placeholder="e.g., 2019-2023"
                      />
                      <Input
                        label="Grade/GPA"
                        value={edu.grade}
                        onChange={(e) => handleEducationChange(index, "grade", e.target.value)}
                        placeholder="e.g., First Class, 3.8 GPA"
                      />
                    </div>
                    {aboutData.education.length > 1 && (
                      <div className="mt-4 flex justify-end">
                        <Button onClick={() => removeEducation(index)} variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    )}
                  </Card.Content>
                </Card>
              ))}
            </div>
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

export default AboutAdmin
