const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "Portfolio Backend API is running!" })
})

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running!",
    port: PORT,
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  })
})

// MongoDB Connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://adwin25hr:hrA%406600@first.ofisccr.mongodb.net/portfolio"
    console.log("Attempting to connect to MongoDB:", mongoURI)

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ MongoDB connected successfully")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message)
    // Don't exit the process, just log the error
    console.log("⚠️  Server will continue without MongoDB connection")
  }
}

// Routes - only add if models exist
try {
  app.use("/api/hero", require("./routes/hero"))
  app.use("/api/about", require("./routes/about"))
  app.use("/api/experience", require("./routes/experience"))
  app.use("/api/projects", require("./routes/projects"))
  app.use("/api/skills", require("./routes/skills"))
  app.use("/api/contact", require("./routes/contact"))
  console.log("✅ All routes loaded successfully")
} catch (error) {
  console.log("⚠️  Some routes failed to load:", error.message)
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Start server
const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`)
      console.log(`🌐 Test URL: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

// Handle process termination
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...")
  await mongoose.connection.close()
  process.exit(0)
})

startServer()
