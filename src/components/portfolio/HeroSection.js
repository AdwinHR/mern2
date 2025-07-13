import Button from "../common/Button"

const HeroSection = ({ heroData }) => {
  if (!heroData) return null

  return (
    <section className="pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {heroData.name}
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700">{heroData.title}</h2>
              <p className="text-xl text-purple-600 font-medium">{heroData.subtitle}</p>
              <p className="text-gray-600 text-lg leading-relaxed">{heroData.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">
                View My Work
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
              <Button variant="outline" size="lg">
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={heroData.profileImage || "/placeholder.svg"}
                alt={heroData.name}
                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
