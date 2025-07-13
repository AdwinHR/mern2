// MongoDB connection utility
const mongoose = require("mongoose")

let isConnected = false

const connectToMongoDB = async () => {
  if (isConnected) {
    console.log("Already connected to MongoDB")
    return
  }

  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio"

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log("✅ Connected to MongoDB successfully")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    throw error
  }
}

const disconnectFromMongoDB = async () => {
  if (!isConnected) {
    return
  }

  try {
    await mongoose.disconnect()
    isConnected = false
    console.log("Disconnected from MongoDB")
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error)
    throw error
  }
}

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1
}

// Get MongoDB connection status
const getConnectionStatus = () => {
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  }
  return states[mongoose.connection.readyState] || "unknown"
}

module.exports = {
  connectToMongoDB,
  disconnectFromMongoDB,
  isMongoConnected,
  getConnectionStatus,
}
