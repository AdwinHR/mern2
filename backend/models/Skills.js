const mongoose = require("mongoose")

const skillsSchema = new mongoose.Schema(
  {
    frontend: [
      {
        type: String,
      },
    ],
    backend: [
      {
        type: String,
      },
    ],
    tools: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Skills", skillsSchema)
