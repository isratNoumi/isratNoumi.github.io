interface ExperienceItem {
  company: string
  position: string
  period: string
  location: string
  type: string
  responsibilities: string[]
  technologies: string[]
  current?: boolean
}

function ExperienceSection() {
  const experiences: ExperienceItem[] = [
    {
      company: 'Dexian Bangladesh',
      position: 'AI/ML-Application Developer',
      period: 'Current Position',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      current: true,
      responsibilities: [
        'Building full stack applications with React, Next.js, and modern frontend frameworks',
        'Integrating GenAI/LLM technologies and implementing RAG systems for intelligent solutions',
        'Developing and optimizing Supabase/PostgreSQL databases for high-performance data processing',
        'Designing AI-driven features and collaborating with cross-functional teams to deliver scalable solutions',
        'Maintaining code quality through rigorous testing and agile methodologies'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'GenAI', 'LLM', 'RAG', 'Azure', 'Docker', 'Git']
    },
    {
      company: 'Selopia',
      position: 'Software Engineer (Golang)',
      period: 'September 2025 - January 2026',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      responsibilities: [
        'Designed and implemented high-performance backend services using Golang and Iris/Gin frameworks',
        'Optimized database queries and improved system performance',
        'Collaborated with cross-functional teams to deliver scalable solutions and maintain code quality',
        'Participated in code reviews and utilized Git for version control in an agile environment'
      ],
      technologies: ['Golang', 'Iris', 'Gin', 'PostgreSQL', 'MySQL', 'Git', 'Agile']
    },
    {
      company: 'Selopia',
      position: 'Golang Developer Intern',
      period: 'April 2025 - August 2025',
      location: 'Dhaka, Bangladesh',
      type: 'Internship',
      responsibilities: [
        'Gained hands-on experience in Go syntax, concurrency patterns, and backend architecture',
        'Assisted in the development of RESTful APIs and integrated third-party services',
        'Participated in code reviews and utilized Git for version control',
        'Worked in a professional agile environment with experienced developers'
      ],
      technologies: ['Go', 'REST APIs', 'Backend Development', 'Git', 'Concurrent Programming']
    }
  ]

  return (
    <section className="experience-section" id="experience">
      <div className="section-wrapper">
        <h2 className="section-heading">Professional Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-header">
                <div className="experience-left">
                  <h3 className="experience-position">{exp.position}</h3>
                  <div className="experience-company">
                    <span className="company-name">{exp.company}</span>
                    {exp.current && <span className="current-badge">Current</span>}
                  </div>
                  <div className="experience-meta">
                    <span className="experience-period">{exp.period}</span>
                    <span className="experience-location">{exp.location}</span>
                    <span className="experience-type">{exp.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="experience-content">
                <div className="responsibilities">
                  <h4 className="subsection-title">Key Responsibilities</h4>
                  <ul className="responsibility-list">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="tech-stack-section">
                  <h4 className="subsection-title">Technologies Used</h4>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
