'use client'

import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const skills = [
  { name: 'React', level: 95, color: '#61DAFB' },
  { name: 'Next.js', level: 90, color: '#ffffff' },
  { name: 'TypeScript', level: 88, color: '#3178C6' },
  { name: 'Node.js', level: 85, color: '#339933' },
  { name: 'Three.js', level: 80, color: '#ffffff' },
  { name: 'WebGL', level: 75, color: '#990000' },
]

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number }[] = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        particles.forEach((otherParticle, j) => {
          if (i === j) return
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="skills" className={styles.skills}>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      <div className={styles.container}>
        <h2 className={styles.title} style={{ animationDelay: '0.2s' }}>
          SKILLS
          <span>/ tecnologías</span>
        </h2>
        
        <div className={styles.grid}>
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={styles.skillItem}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillPercentage}>{skill.level}%</span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                    boxShadow: `0 0 20px ${skill.color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}