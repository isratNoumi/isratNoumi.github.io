import { Link } from 'react-router-dom'
import HeroSection from '../components/portfolio/HeroSection'
import ExperienceSection from '../components/portfolio/ExperienceSection'

function Home() {
  return (
    <div className="home-page">
      <HeroSection />

      <section className="home-featured">
        <div className="section-wrapper">
          <h2 className="section-heading">What I Do</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="feature-title">Full Stack Development</h3>
              <p className="feature-description">
                Building modern web applications with React, Next.js, and Supabase for seamless user experiences
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M8 21h8M12 17v4"/>
                  <path d="M7 7h10M7 11h10"/>
                </svg>
              </div>
              <h3 className="feature-title">AI-Driven Solutions</h3>
              <p className="feature-description">
                Integrating GenAI, LLM, and RAG systems to create intelligent, context-aware applications
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
                </svg>
              </div>
              <h3 className="feature-title">Database & Backend</h3>
              <p className="feature-description">
                Expert in PostgreSQL, MySQL, Supabase, and high-performance APIs for scalable data-driven applications
              </p>
            </div>
          </div>
        </div>
      </section>

      <ExperienceSection />

      <section className="home-cta-section">
        <div className="section-wrapper">
          <div className="cta-content">
            <h2 className="cta-heading">Let's Build Something Great Together</h2>
            <p className="cta-description">
              I'm always interested in hearing about new projects and opportunities.
            </p>
            <div className="home-cta">
              <Link to="/contact" className="cta-btn">Get In Touch</Link>
              <Link to="/projects" className="cta-btn-outline">View Projects</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
