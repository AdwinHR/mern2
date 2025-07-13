const mongoose = require("mongoose")
require("dotenv").config()

const setupDatabase = async () => {
  try {
    console.log("Setting up MongoDB database...")

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("✅ Connected to MongoDB successfully!")

    // Test the connection
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(
      "📁 Available collections:",
      collections.map((c) => c.name),
    )

    console.log("🎉 Database setup complete!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Database setup failed:", error)
    process.exit(1)
  }
}

setupDatabase()
