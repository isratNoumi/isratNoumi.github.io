import { Link } from 'react-router-dom'
import profileImage from '../../assets/Image.jpg'

function HeroSection() {
  return (
    <header className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">Hello, I'm</div>
            <h1 className="hero-name">Israt Moyeen Noumi</h1>
            <p className="hero-role">
              <span className="role-highlight">AI/ML-Application Developer</span>
            </p>
            <p className="hero-description">
              Building scalable full stack applications and AI-driven solutions with <strong>React</strong>, <strong>Next.js</strong>, <strong>Supabase</strong>, and cutting-edge <strong>GenAI/LLM</strong> technologies. Currently working at Dexian Bangladesh, delivering intelligent applications powered by RAG and modern AI frameworks.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="action-btn primary">
                <span>View My Work</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/contact" className="action-btn outline">
                <span>Get In Touch</span>
              </Link>
            </div>
          </div>
          <div className="hero-image-container">
            <div className="hero-image-wrapper">
              <div className="profile-image">
                <img src={profileImage} alt="Israt Moyeen Noumi - Full Stack Developer" className="profile-photo" />
              </div>
              <div className="image-decoration decoration-1"></div>
              <div className="image-decoration decoration-2"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeroSection
