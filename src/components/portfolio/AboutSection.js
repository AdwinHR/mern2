import Card from "../common/Card"

const AboutSection = ({ aboutData }) => {
  if (!aboutData) return null

  return (
    <section id="about" className="py-16 px-4 bg-white/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{aboutData.bio}</p>

            {aboutData.education && aboutData.education.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">Education</h3>
                {aboutData.education.map((edu, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <Card.Content className="p-4">
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <p className="text-purple-600">{edu.institution}</p>
                      <p className="text-gray-600">
                        {edu.year} • {edu.grade}
                      </p>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-6 rounded-2xl text-white">
              <h4 className="text-3xl font-bold">3+</h4>
              <p>Years Experience</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 rounded-2xl text-white">
              <h4 className="text-3xl font-bold">50+</h4>
              <p>Projects Completed</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-2xl text-white">
              <h4 className="text-3xl font-bold">100K+</h4>
              <p>Users Served</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
              <h4 className="text-3xl font-bold">24/7</h4>
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
