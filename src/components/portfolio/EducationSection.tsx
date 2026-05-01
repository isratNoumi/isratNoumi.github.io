interface EducationItem {
  institution: string
  degree: string
  period: string
  gpa?: string
  location?: string
  highlights?: string[]
}

function EducationSection() {
  const educationData: EducationItem[] = [
    {
      institution: 'Ahsanullah University of Science and Technology',
      degree: 'Bachelor of Science in Computer Science and Engineering',
      period: '2019 - 2023',
      gpa: '3.83/4.00',
      location: 'Dhaka, Bangladesh',
      highlights: [
        'Dean\'s List of Honors (2023)',
        'Specialized in Software Engineering and AI/ML',
        'Published research in Misogyny Detection'
      ]
    },
    {
      institution: 'Chittagong College',
      degree: 'Higher Secondary Certificate',
      period: '2016 - 2018',
      gpa: '5.00/5.00',
      location: 'Chittagong, Bangladesh'
    },
    {
      institution: 'Dr. Khastagir Govt. Girls\' High School',
      degree: 'Secondary School Certificate',
      period: '2010 - 2016',
      gpa: '5.00/5.00',
      location: 'Chittagong, Bangladesh'
    }
  ]

  return (
    <section className="education-section" id="education">
      <div className="section-wrapper">
        <h2 className="section-heading">Education</h2>
        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-marker">
                <div className="marker-dot"></div>
                <div className="marker-line"></div>
              </div>
              <div className="education-content">
                <div className="education-period">{edu.period}</div>
                <h3 className="education-institution">{edu.institution}</h3>
                <p className="education-degree">{edu.degree}</p>
                {edu.gpa && (
                  <div className="education-gpa">
                    <span className="gpa-label">CGPA:</span>
                    <span className="gpa-value">{edu.gpa}</span>
                  </div>
                )}
                {edu.location && (
                  <div className="education-location">{edu.location}</div>
                )}
                {edu.highlights && (
                  <ul className="education-highlights">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="achievements-showcase">
          <div className="achievement-card featured">
            <h3 className="achievement-title">Dean's List of Honors</h3>
            <p className="achievement-description">
              Awarded for outstanding academic performance in Bachelor of Science (2023)
            </p>
            <div className="achievement-year">2023</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
