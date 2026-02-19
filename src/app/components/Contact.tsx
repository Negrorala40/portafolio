'use client'

import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contacto" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title} style={{ animationDelay: '0.2s' }}>
          CONTACTO
          <span>/ hablemos</span>
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup} style={{ animationDelay: '0.3s' }}>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup} style={{ animationDelay: '0.4s' }}>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>
          
          <div className={styles.textareaGroup} style={{ animationDelay: '0.5s' }}>
            <textarea
              placeholder="Mensaje"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className={styles.textarea}
            />
          </div>
          
          <div className={styles.buttonContainer} style={{ animationDelay: '0.6s' }}>
            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonText}>Enviar mensaje</span>
              <div className={styles.buttonOverlay} />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}