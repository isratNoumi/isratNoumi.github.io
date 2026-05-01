import { useEffect } from 'react'
import './SuccessModal.css'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">✓</div>
        <h3 className="modal-title">Success!</h3>
        <p className="modal-message">{message}</p>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default SuccessModal
