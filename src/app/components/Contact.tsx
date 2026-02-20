'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneNumber = "573246482490" // Formato internacional sin + ni espacios
  const email = "londono.990625@gmail.com" // Tu email aquí

  // Efecto para el halo que sigue al mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    
    // Simular envío
    setTimeout(() => {
      setIsSending(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola Sebastián! Me interesa contactarte sobre tus servicios.`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }

  const sendEmail = () => {
    const subject = encodeURIComponent('Contacto desde tu portafolio')
    const body = encodeURIComponent(
      `Hola Sebastián,\n\nMe interesa contactarte para...\n\nSaludos!`
    )
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    alert('📋 Email copiado al portapapeles!')
  }

  return (
    <section id="contacto" className={styles.contact}>
      {/* Fondo con partículas */}
      <div className={styles.background}>
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
        <div className={styles.glowOrb3} />
        
        {/* Grid de líneas */}
        <div className={styles.gridLines}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={styles.gridLine} style={{ left: `${i * 10}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={i} className={styles.gridLineHorizontal} style={{ top: `${i * 10}%` }} />
          ))}
        </div>
      </div>

      {/* Halo que sigue al mouse */}
      <div 
        className={styles.mouseHalo}
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
        }}
      />

      <div className={styles.container} ref={containerRef}>
        <h2 className={styles.title}>
          <span className={styles.titleGlitch}>CONTACTO</span>
          <span className={styles.titleGlitchSecond}>CONTACTO</span>
          <span className={styles.titleGlitchThird}>CONTACTO</span>
        </h2>

        {/* Contacto Rápido - WHATSAPP Y EMAIL */}
        <div className={styles.quickContact}>
          <div className={styles.quickContactHeader}>
            <span className={styles.quickContactLine} />
            <h3 className={styles.quickContactTitle}>Contacto directo</h3>
            <span className={styles.quickContactLine} />
          </div>

          <div className={styles.contactButtons}>
            <button 
              onClick={openWhatsApp}
              className={`${styles.contactButton} ${styles.whatsappButton}`}
            >
              <span className={styles.buttonIcon}>📱</span>
              <div className={styles.buttonContent}>
                <span className={styles.buttonLabel}>WhatsApp</span>
                <span className={styles.buttonValue}>+57 324 648 2490</span>
                <span className={styles.buttonHint}>Click para hablar directo</span>
              </div>
              <div className={styles.buttonGlow} />
              <div className={styles.whatsappRipple} />
            </button>

            <button 
              onClick={sendEmail}
              className={`${styles.contactButton} ${styles.emailButton}`}
            >
              <span className={styles.buttonIcon}>📧</span>
              <div className={styles.buttonContent}>
                <span className={styles.buttonLabel}>Email</span>
                <span className={styles.buttonValue}>{email}</span>
                <span className={styles.buttonHint}>Click para enviar mensaje</span>
              </div>
              <div className={styles.buttonGlow} />
              <button 
                onClick={copyEmail}
                className={styles.copyButton}
                title="Copiar email"
              >
                📋
              </button>
            </button>
          </div>
        </div>

        {/* Separador épico */}
        <div className={styles.separator}>
          <div className={styles.separatorLine} />
          <span className={styles.separatorText}>o si prefieres</span>
          <div className={styles.separatorLine} />
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGlow} />
          
          <div className={styles.formGrid}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
                required
              />
              <div className={styles.inputBorder} />
              <div className={styles.inputGlow} />
              <span className={styles.inputIcon}>👤</span>
            </div>
            
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Tu email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.input}
                required
              />
              <div className={styles.inputBorder} />
              <div className={styles.inputGlow} />
              <span className={styles.inputIcon}>📧</span>
            </div>
          </div>
          
          <div className={styles.textareaWrapper}>
            <textarea
              placeholder="Cuéntame sobre tu proyecto..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className={styles.textarea}
              required
            />
            <div className={styles.textareaBorder} />
            <div className={styles.textareaGlow} />
            <span className={styles.textareaIcon}>💬</span>
          </div>
          
          <div className={styles.buttonContainer}>
            <button 
              type="submit" 
              className={`${styles.submitButton} ${isSending ? styles.sending : ''}`}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <span className={styles.sendingSpinner} />
                  <span className={styles.buttonText}>Enviando...</span>
                </>
              ) : (
                <>
                  <span className={styles.buttonText}>Enviar mensaje</span>
                </>
              )}
              <div className={styles.buttonOverlay} />
              <div className={styles.buttonGlow} />
            </button>
          </div>
        </form>

        {/* Mensaje de éxito */}
        {showSuccess && (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✅</div>
            <div className={styles.successContent}>
              <h4 className={styles.successTitle}>¡Mensaje enviado!</h4>
              <p className={styles.successText}>Te contactaré lo antes posible</p>
            </div>
          </div>
        )}

        {/* Stats de disponibilidad */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>24/7</span>
            <span className={styles.statLabel}>Disponibilidad</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>⏱️ 5 H</span>
            <span className={styles.statLabel}>Tiempo respuesta</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>📍</span>
            <span className={styles.statLabel}>Medellín, COL</span>
          </div>
        </div>
      </div>
    </section>
  )
}