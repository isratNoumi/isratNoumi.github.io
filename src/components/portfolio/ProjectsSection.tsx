interface ProjectItem {
  id: number
  name: string
  summary: string
  stack: string[]
  github: string
}

interface PublicationItem {
  id: number
  title: string
  authors: string
  venue: string
  year: string
  link: string
  summary: string
}

function ProjectsSection() {
  const projectList: ProjectItem[] = [
    {
      id: 1,
      name: 'AI-Powered Security & Compliance Platform',
      summary: 'Comprehensive SaaS platform featuring an intelligent AI orchestrator coordinating 8 specialized security agents for multi-layer automated security scanning and compliance validation against industry standards (PCI-DSS, HIPAA, NIST, SOC 2). Built with LangGraph/CrewAI for sophisticated multi-agent coordination.',
      stack: ['Next.js 14', 'React 18', 'TypeScript', 'Python FastAPI', 'LangGraph/CrewAI', 'GPT-4', 'Tailwind CSS', 'Azure SQL', 'Docker', 'Recharts'],
      github: '#'
    },
    {
      id: 2,
      name: 'Check Inn - Hotel Management System',
      summary: 'Java-based hotel management system with comprehensive booking, customer/staff management, and billing automation. Built with JavaFX and MySQL for streamlined hotel operations.',
      stack: ['Java', 'JavaFX', 'MySQL', 'JDBC'],
      github: 'https://github.com/israiNoumi'
    },
    {
      id: 3,
      name: 'AirRush Desktop Game',
      summary: 'C-written 2D side-scrolling game with iGraphics. Features 3 difficulty levels, high-score tracking, and pause/resume functionality for an engaging gaming experience.',
      stack: ['C', 'iGraphics', 'Game Development'],
      github: 'https://github.com/israiNoumi'
    },
    {
      id: 4,
      name: 'Reader\'s Den - Online Bookstore',
      summary: 'Android app for online book shopping with streamlined customer info, inventory management, and billing. Enhanced user experience with simple, intuitive interface.',
      stack: ['Android', 'Java', 'SQLite'],
      github: 'https://github.com/israiNoumi'
    },
    {
      id: 5,
      name: 'BazarSodai - Online Marketplace',
      summary: 'MVC .NET online marketplace for groceries and household items built with C#. Features product management and advanced database integration for efficient operations.',
      stack: ['C#', '.NET MVC', 'SQL Server'],
      github: 'https://github.com/israiNoumi'
    },
    {
      id: 6,
      name: 'Stadium Seat Management System',
      summary: 'Distributed database project providing centralized stadium seat allocation and reservation. Ensures real-time availability updates and booking management.',
      stack: ['PostgreSQL', 'Distributed Systems', 'SQL'],
      github: 'https://github.com/israiNoumi'
    }
  ]

  const publications: PublicationItem[] = [
    {
      id: 1,
      title: 'Towards Better Misogyny Detection in Bangla: Improved Dataset and Cutting-Edge Model Evaluation',
      authors: 'Debopriya Deb Roy, Israt Moyeen Noumi, Md Aminur Rahman',
      venue: '2024 6th International Conference on Sustainable Technologies for Industry 5.0 (STI) - IEEE',
      year: '2024',
      link: 'https://ieeexplore.ieee.org/abstract/document/10951055',
      summary: 'Curated an improved dataset for Bengali misogyny detection from social media and websites, featuring five categories of misogynistic comments. Evaluated multiple machine learning models including SVM and Naive Bayes for robust classification.'
    }
  ]

  return (
    <section className="projects-section" id="projects">
      <div className="section-wrapper">
        <h2 className="section-heading">Featured Projects</h2>
        <div className="projects-grid">
          {projectList.map(project => (
            <div key={project.id} className="project-box">
              <h3 className="project-title">{project.name}</h3>
              <p className="project-summary">{project.summary}</p>
              <div className="project-stack">
                {project.stack.map(tech => (
                  <span key={tech} className="stack-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  View on GitHub →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Publications Section */}
        <div className="publications-section">
          <h2 className="section-heading" style={{ marginTop: '6rem' }}>Research & Publications</h2>
          <p className="section-subtitle">My contributions to academic research</p>
          <div className="publications-list">
            {publications.map(pub => (
              <div key={pub.id} className="publication-card">
                <div className="publication-header">
                  <span className="publication-year">{pub.year}</span>
                  <span className="publication-type">Research Paper</span>
                </div>
                <h3 className="publication-title">{pub.title}</h3>
                <p className="publication-authors">{pub.authors}</p>
                <p className="publication-venue">{pub.venue}</p>
                <p className="publication-summary">{pub.summary}</p>
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="publication-link">
                  Read Paper →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
