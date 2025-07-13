const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Contact", contactSchema)
