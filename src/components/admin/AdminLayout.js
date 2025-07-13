"use client"

import Button from "../common/Button"
// import DatabaseStatus from "../common/DatabaseStatus" // Removed

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: "hero", name: "Hero Section", icon: "👤" },
    { id: "about", name: "About", icon: "📝" },
    { id: "experience", name: "Experience", icon: "💼" },
    { id: "projects", name: "Projects", icon: "🚀" },
    { id: "skills", name: "Skills", icon: "⚡" },
    { id: "contact", name: "Contact", icon: "📧" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Portfolio Admin</h1>
              {/* <DatabaseStatus /> Removed */}
            </div>
            <div className="flex space-x-4">
              <a href="/">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </a>
              <Button variant="primary" size="sm">
                Save All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Content Sections</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-purple-100 text-purple-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* MongoDB Info */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-semibold mb-3">Database Info</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <strong>Database:</strong> MongoDB
                </div>
                <div>
                  <strong>ODM:</strong> Mongoose
                </div>
                <div>
                  <strong>Backend:</strong> Express.js
                </div>
                <div>
                  <strong>Frontend:</strong> React
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
