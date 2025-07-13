"use client"

import { useState, useEffect } from "react"

const DatabaseStatus = () => {
  const [status, setStatus] = useState("checking")
  const [error, setError] = useState(null)

  useEffect(() => {
    checkDatabaseConnection()
  }, [])

  const checkDatabaseConnection = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/health`)

      if (response.ok) {
        setStatus("connected")
        setError(null)
      } else {
        setStatus("error")
        setError("API not responding")
      }
    } catch (err) {
      setStatus("error")
      setError("Cannot connect to backend")
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "connected":
        return "MongoDB Connected"
      case "error":
        return `Error: ${error}`
      default:
        return "Checking..."
    }
  }

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      <span className="mr-1">{status === "connected" ? "✅" : status === "error" ? "❌" : "⏳"}</span>
      {getStatusText()}
    </div>
  )
}

export default DatabaseStatus
