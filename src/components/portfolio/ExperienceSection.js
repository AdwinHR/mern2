import Card from "../common/Card"

const ExperienceSection = ({ experiences }) => {
  if (!experiences || experiences.length === 0) return null

  const formatPeriod = (exp) => {
    if (exp.isCurrent) {
      return `${exp.startDate} - Present`
    }
    return `${exp.startDate} - ${exp.endDate}`
  }

  return (
    <section id="experience" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={exp._id || index} className="hover:shadow-xl transition-shadow duration-300">
              <Card.Content className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{exp.role}</h3>
                    <p className="text-xl text-purple-600 font-semibold">{exp.company}</p>
                  </div>
                  <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mt-2 lg:mt-0">
                    {formatPeriod(exp)}
                  </span>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
