import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import AboutSection from './components/portfolio/AboutSection'
import EducationSection from './components/portfolio/EducationSection'
import ExperienceSection from './components/portfolio/ExperienceSection'
import ProjectsSection from './components/portfolio/ProjectsSection'
import SkillsSection from './components/portfolio/SkillsSection'
import ContactSection from './components/portfolio/ContactSection'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <BrowserRouter>
      <div className="portfolio">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/education" element={<EducationSection />} />
            <Route path="/experience" element={<ExperienceSection />} />
            <Route path="/projects" element={<ProjectsSection />} />
            <Route path="/skills" element={<SkillsSection />} />
            <Route path="/contact" element={<ContactSection />} />
          </Routes>
        </main>
        <ChatBot />
        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2026 Israt Moyeen Noumi. All rights reserved.</p>
            <div className="footer-links">
              <a href="https://github.com/israiNoumi" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/israi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App