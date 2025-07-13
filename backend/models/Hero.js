const mongoose = require("mongoose")

const heroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Adwin H R",
    },
    title: {
      type: String,
      required: true,
      default: "Full Stack Developer",
    },
    subtitle: {
      type: String,
      default: "Building digital experiences with modern technologies",
    },
    description: {
      type: String,
      default: "Passionate developer with expertise in React, Node.js, and cloud technologies.",
    },
    profileImage: {
      type: String,
      default: "/placeholder.svg?height=400&width=400",
    },
    resumeUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Hero", heroSchema)
