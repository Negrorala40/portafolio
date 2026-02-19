'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHoveringImage, setIsHoveringImage] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      
      const { clientX, clientY } = e
      const { width, height, left, top } = heroRef.current.getBoundingClientRect()
      
      const x = (clientX - left) / width - 0.5
      const y = (clientY - top) / height - 0.5
      
      setMousePosition({ x, y })
      heroRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Efecto para la foto cuando el mouse se acerca
  const getImageTransform = () => {
    if (!imageRef.current) return {}
    
    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (mousePosition.x * window.innerWidth - centerX) / 30
    const deltaY = (mousePosition.y * window.innerHeight - centerY) / 30
    
    return {
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${isHoveringImage ? 1.1 : 1})`,
    }
  }

  const getRoleText = () => {
    const roles = [
      'SOFTWARE ENGINEER',
      'WEB DEVELOPER', 
      'FULL STACK',
      'UI/UX DESIGNER',
      'MOBILE DEV'
    ]
    const index = Math.floor((mousePosition.x + 0.5) * roles.length)
    return roles[Math.min(Math.max(index, 0), roles.length - 1)]
  }

  // 📥 Función para descargar CV
  const handleDownloadCV = () => {
    // El PDF debe estar en: public/cv-sebastian-arboleda.pdf
    window.open('/CVSebastianArboleda.pdf', '_blank')
  }

  // 🔗 Función para ir a proyectos
  const scrollToProjects = () => {
    document.getElementById('proyectos')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  // 📞 Función para ir a contacto
  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }

  return (
    <section id="inicio" ref={heroRef} className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
        <div className={styles.glow3} />
        
        {/* Partículas */}
        <div className={styles.particles}>
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className={styles.grid}>
        {/* Columna izquierda - Texto */}
        <div className={styles.leftColumn}>
          <div className={styles.roleBadge}>
            <span className={styles.roleText}>{getRoleText()}</span>
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>Sebastian Arboleda Londoño</span>
            <span className={styles.titleLineGradient}>
              WEB & SOFTWARE
            </span>
          </h1>
          
          <div className={styles.subtitle}>
            <span className={styles.subtitleLine}>
              Transformando ideas en {' '}
              <span className={styles.highlight}>soluciones digitales</span>
            </span>
            <span className={styles.subtitleLine}>
              con código limpio y experiencias{' '}
              <span className={styles.highlight2}>inolvidables</span>
            </span>
          </div>
          
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2+</span>
              <span className={styles.statLabel}>Años Experiencia</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3+</span>
              <span className={styles.statLabel}>Proyectos</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Clientes</span>
            </div>
          </div>
          
          <div className={styles.buttons}>
            {/* Botón Ver Proyectos - AHORA SIRVE */}
            <button 
              onClick={scrollToProjects}
              className={styles.primaryButton}
            >
              <span className={styles.buttonText}>Ver proyectos</span>
              <div className={styles.buttonOverlay} />
              <span className={styles.buttonGlow} />
            </button>
            
            {/* Botón Contactar - AHORA SIRVE */}
            <button 
              onClick={scrollToContact}
              className={styles.secondaryButton}
            >
              Contactar
            </button>

            {/* Botón CV */}
            <button 
              onClick={handleDownloadCV}
              className={styles.cvButton}
            >
              <span className={styles.cvIcon}>📄</span>
              <span className={styles.cvText}>CV</span>
              <span className={styles.cvDownload}>↓</span>
              <div className={styles.cvRipple} />
            </button>
          </div>

          <div className={styles.techStack}>
            {['React', 'Node.js', 'Python', 'AWS', 'TypeScript', 'Next.js', 'Java', 'Springboot', 'JavaScript'].map((tech, i) => (
              <span 
                key={tech}
                className={styles.techItem}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Columna derecha - FOTO */}
        <div className={styles.rightColumn}>
          <div 
            ref={imageRef}
            className={styles.imageContainer}
            onMouseEnter={() => setIsHoveringImage(true)}
            onMouseLeave={() => setIsHoveringImage(false)}
            style={getImageTransform()}
          >
            {/* Marco animado */}
            <div className={styles.imageFrame}>
              <div className={styles.frameCorner1} />
              <div className={styles.frameCorner2} />
              <div className={styles.frameCorner3} />
              <div className={styles.frameCorner4} />
            </div>

            {/* La foto */}
            <div className={styles.imageWrapper}>
              {!imageLoaded && <div className={styles.imageSkeleton} />}
              <Image
                src="/images/yo.jpeg"
                alt="Sebastian Arboleda Londoño"
                width={500}
                height={800}
                className={`${styles.profileImage} ${imageLoaded ? styles.loaded : ''}`}
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>

            {/* Efectos de luz */}
            <div className={styles.imageGlow} />
            <div className={styles.imageGlow2} />
            
            {/* Badges flotantes */}
            <div className={styles.floatingBadge1}>
              <span className={styles.badgeIcon}>⚡</span>
              <span className={styles.badgeText}>Java</span>
            </div>
            <div className={styles.floatingBadge1}>
              <span className={styles.badgeIcon}>⚡</span>
              <span className={styles.badgeText}>Springboot</span>
            </div>
            <div className={styles.floatingBadge1}>
              <span className={styles.badgeIcon}>⚡</span>
              <span className={styles.badgeText}>Python</span>
            </div>
            <div className={styles.floatingBadge1}>
              <span className={styles.badgeIcon}>⚡</span>
              <span className={styles.badgeText}>React</span>
            </div>
            <div className={styles.floatingBadge2}>
              <span className={styles.badgeIcon}>🔥</span>
              <span className={styles.badgeText}>Next.js</span>
            </div>
            <div className={styles.floatingBadge3}>
              <span className={styles.badgeIcon}>💎</span>
              <span className={styles.badgeText}>TypeScript</span>
            </div>
            <div className={styles.floatingBadge4}>
              <span className={styles.badgeIcon}>🚀</span>
              <span className={styles.badgeText}>Full Stack</span>
            </div>

            {/* Círculos decorativos */}
            <div className={styles.circle1} />
            <div className={styles.circle2} />
            <div className={styles.circle3} />
          </div>

          {/* Texto flotante "DISPONIBLE" */}
          <div className={styles.hireMeText}>
            <span>D</span>
            <span>I</span>
            <span>S</span>
            <span>P</span>
            <span>O</span>
            <span>N</span>
            <span>I</span>
            <span>B</span>
            <span>L</span>
            <span>E</span>
          </div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span className={styles.scrollText}>SCROLL</span>
      </div>
    </section>
  )
}