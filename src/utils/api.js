// Main API utility - MongoDB backend
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api"

// Generic API function with error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log(`Making API call to: ${API_BASE_URL}${endpoint}`)

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`API response for ${endpoint}:`, data)
    return data
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error)

    // Return fallback data for development
    if (endpoint === "/hero") {
      return {
        name: "Adwin H R",
        title: "Full Stack Developer",
        subtitle: "Building digital experiences with modern technologies",
        description: "Passionate developer with expertise in React, Node.js, and MongoDB.",
        profileImage: "/placeholder.svg?height=400&width=400",
      }
    }

    if (endpoint === "/about") {
      return {
        bio: "I'm a passionate full-stack developer with over 3 years of experience.",
        education: [
          {
            degree: "Bachelor of Computer Science",
            institution: "Tech University",
            year: "2019-2023",
            grade: "First Class",
          },
        ],
      }
    }

    if (endpoint === "/skills") {
      return {
        frontend: ["React", "JavaScript", "HTML", "CSS"],
        backend: ["Node.js", "Express", "MongoDB"],
        tools: ["Git", "VS Code", "Docker"],
      }
    }

    if (endpoint === "/contact") {
      return {
        email: "adwin@example.com",
        phone: "+1 (555) 123-4567",
        github: "https://github.com/adwin",
        linkedin: "https://linkedin.com/in/adwin",
      }
    }

    // Default fallback
    return endpoint.includes("/projects") || endpoint.includes("/experience") ? [] : {}
  }
}

// Hero API
export const heroAPI = {
  get: () => apiCall("/hero"),
  update: (data) =>
    apiCall("/hero", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// About API
export const aboutAPI = {
  get: () => apiCall("/about"),
  update: (data) =>
    apiCall("/about", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// Experience API
export const experienceAPI = {
  getAll: () => apiCall("/experience"),
  create: (data) =>
    apiCall("/experience", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiCall(`/experience/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiCall(`/experience/${id}`, {
      method: "DELETE",
    }),
}

// Projects API
export const projectsAPI = {
  getAll: (status) => apiCall(`/projects${status ? `?status=${status}` : ""}`),
  create: (data) =>
    apiCall("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiCall(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiCall(`/projects/${id}`, {
      method: "DELETE",
    }),
}

// Skills API
export const skillsAPI = {
  get: () => apiCall("/skills"),
  update: (data) =>
    apiCall("/skills", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}

// Contact API
export const contactAPI = {
  get: () => apiCall("/contact"),
  update: (data) =>
    apiCall("/contact", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
}
