const mongoose = require("mongoose")

const aboutSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
      required: true,
      default: "I'm a passionate full-stack developer with over 3 years of experience in creating web applications.",
    },
    education: [
      {
        degree: String,
        institution: String,
        year: String,
        grade: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("About", aboutSchema)
