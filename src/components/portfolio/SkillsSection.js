import Card from "../common/Card"

const SkillsSection = ({ skills }) => {
  if (!skills) return null

  const skillCategories = [
    { name: "Frontend", key: "frontend", color: "from-purple-500 to-pink-500" },
    { name: "Backend", key: "backend", color: "from-blue-500 to-indigo-500" },
    { name: "Tools", key: "tools", color: "from-green-500 to-teal-500" },
  ]

  return (
    <section id="skills" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.key} className="h-full">
              <Card.Content className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center">{category.name}</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skills[category.key] &&
                    skills[category.key].map((skill, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 bg-gradient-to-r ${category.color} text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200`}
                      >
                        {skill}
                      </span>
                    ))}
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
