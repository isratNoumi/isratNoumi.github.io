import { useState } from 'react'
import emailjs from '@emailjs/browser'
import SuccessModal from '../SuccessModal'

function ContactSection() {
  const [inputs, setInputs] = useState({
    fullName: '',
    emailAddr: '',
    messageText: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const serviceId = 'service_rkogfxo'
      const templateId = 'template_hakqz1h'
      const publicKey = '0blEetdePcMUn5JQo'

      const templateParams = {
        name: inputs.fullName,
        from_name: inputs.fullName,
        from_email: inputs.emailAddr,
        message: inputs.messageText,
        to_name: 'Israr Moyeen',
        reply_to: inputs.emailAddr
      }

      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      console.log('Message sent successfully:', response)
      setIsModalOpen(true)
      setInputs({ fullName: '', emailAddr: '', messageText: '' })
    } catch (error: any) {
      console.error('Failed to send message:', error)
      const errorMessage = error?.text || error?.message || 'Unknown error'
      alert(`Failed to send message: ${errorMessage}\n\nPlease try again or contact me directly at israrmoyeen.23@gmail.com`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })
  }

  return (
    <section className="contact-section" id="contact">
      <div className="section-wrapper">
        <h2 className="section-heading">Get In Touch</h2>
        <div className="contact-layout">
          <div className="contact-details">
            <h3 className="details-title">Let's Connect</h3>
            <p className="details-text">
              Interested in working together? I'm open to new projects and collaborations.
              Drop me a message and let's discuss your ideas!
            </p>
            <div className="contact-methods">
              <div className="method-item">
                <div className="method-content">
                  <div className="method-label">Email</div>
                  <div className="method-value">israrmoyeen.23@gmail.com</div>
                </div>
              </div>
              <div className="method-item">
                <div className="method-content">
                  <div className="method-label">Phone</div>
                  <div className="method-value">+880 1845517840</div>
                </div>
              </div>
              <div className="method-item">
                <div className="method-content">
                  <div className="method-label">Location</div>
                  <div className="method-value">Dhaka, Bangladesh</div>
                </div>
              </div>
            </div>
            <div className="social-buttons">
              <a href="https://github.com/israiNoumi" target="_blank" rel="noopener noreferrer" className="social-btn">GitHub</a>
              <a href="https://linkedin.com/in/israi" target="_blank" rel="noopener noreferrer" className="social-btn">LinkedIn</a>
            </div>
          </div>
          <form className="message-form" onSubmit={handleFormSubmit}>
            <div className="input-field">
              <label htmlFor="fullName">Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={inputs.fullName}
                onChange={updateInput}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="emailAddr">Email</label>
              <input
                type="email"
                id="emailAddr"
                name="emailAddr"
                value={inputs.emailAddr}
                onChange={updateInput}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="messageText">Message</label>
              <textarea
                id="messageText"
                name="messageText"
                rows={5}
                value={inputs.messageText}
                onChange={updateInput}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
      <SuccessModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        message="Thanks for reaching out! I will respond to your message soon."
      />
    </section>
  )
}

export default ContactSection
