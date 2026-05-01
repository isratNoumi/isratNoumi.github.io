function AboutSection() {
  const highlights = [
    { value: '1+', label: 'Years Experience' },
    { value: 'Full Stack', label: 'Development' },
    { value: 'AI/GenAI', label: '' }
  ]

  const hobbies = [
    { name: 'Travelling', description: 'Exploring new places and cultures' },
    { name: 'Cooking', description: 'Experimenting with new recipes' },
    { name: 'Reading', description: 'Tech blogs and sci-fi novels' }
  ]

  return (
    <section className="about-section" id="about">
      <div className="section-wrapper">
        <h2 className="section-heading">About Me</h2>
        <div className="about-layout">
          <div className="about-description">
            <p className="about-paragraph">
              I'm a Full Stack Developer at Dexian Bangladesh with expertise in building intelligent, 
              high-performance applications using React, Next.js, and AI-driven solutions. I hold a Bachelor's 
              degree in Computer Science and Engineering from Ahsanullah University of Science and Technology 
              (CGPA: 3.83/4.00).
            </p>
            <p className="about-paragraph">
              My experience spans full stack development, GenAI/LLM integration, RAG systems, Supabase/PostgreSQL 
              databases, and modern frontend frameworks. I'm passionate about leveraging AI to deliver scalable, 
              intelligent solutions and maintaining code quality through rigorous testing and agile methodologies. 
              I've successfully integrated LLMs and built AI-driven applications that enhance user experiences.
            </p>
            
            <h3 className="interests-heading">Beyond Coding</h3>
            <p className="about-paragraph">
              When I'm not coding, I enjoy exploring new destinations and experiencing different cultures through 
              travel. I also love experimenting in the kitchen, trying out new recipes and cuisines. These hobbies 
              keep me creative and inspired in both my personal and professional life.
            </p>
          </div>
          <div className="about-highlights">
            {highlights.map((item, idx) => (
              <div key={idx} className="highlight-card">
                <div className="highlight-value">{item.value}</div>
                <div className="highlight-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hobbies-section">
          <h3 className="hobbies-title">Interests & Hobbies</h3>
          <div className="hobbies-grid">
            {hobbies.map((hobby, idx) => (
              <div key={idx} className="hobby-card">
                <h4 className="hobby-name">{hobby.name}</h4>
                <p className="hobby-description">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
