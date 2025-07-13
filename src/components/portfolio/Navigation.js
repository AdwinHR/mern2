"use client"

import Button from "../common/Button"

const Navigation = ({ heroData }) => {
  const navItems = ["About", "Experience", "Projects", "Skills", "Contact"]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase())
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {heroData?.name || "Portfolio"}
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          <a href="/admin">
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
