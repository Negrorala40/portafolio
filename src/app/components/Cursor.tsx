'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  // Caracteres para efecto matrix
  const matrixCharacters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ'

  useEffect(() => {
    let frameId: number | undefined = undefined
    let lastTrailTime = 0

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Crear estela cada cierto tiempo
      const now = Date.now()
      if (now - lastTrailTime > 50) { // 20fps para la estela
        lastTrailTime = now
        setTrail(prev => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }]
          // Mantener solo las últimas 8 posiciones
          if (newTrail.length > 8) newTrail.shift()
          return newTrail
        })
      }
    }

    const handleMouseLeave = () => {
      setHidden(true)
      setTrail([]) // Limpiar estela al salir
    }
    
    const handleMouseEnter = () => setHidden(false)
    
    const handleMouseDown = () => setClicked(true)
    
    const handleMouseUp = () => setClicked(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('a, button, input, textarea, [data-cursor="hover"]')) {
        setHovered(true)
      } else {
        setHovered(false)
      }
    }

    // Generar caracteres matrix aleatorios
    const generateMatrixChars = () => {
      const chars = []
      for (let i = 0; i < 20; i++) {
        chars.push(matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)])
      }
      setMatrixChars(chars)
    }

    // Actualizar caracteres matrix cada 100ms
    const matrixInterval = setInterval(generateMatrixChars, 100)

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)

    // Limpiar estela después de un tiempo
    const trailCleaner = setInterval(() => {
      setTrail(prev => {
        if (prev.length > 0) {
          const newTrail = [...prev]
          newTrail.shift()
          return newTrail
        }
        return prev
      })
    }, 100)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      clearInterval(matrixInterval)
      clearInterval(trailCleaner)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <>
      {/* Cursor principal - Estilo hacker */}
      <div
        className={`${styles.cursor} ${hidden ? styles.hidden : ''} ${clicked ? styles.clicked : ''} ${hovered ? styles.hovered : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className={styles.cursorInner}>
          <div className={styles.cursorGlitch} />
          <div className={styles.cursorGlitch2} />
          <div className={styles.cursorText}>
            {matrixChars[0] || '0'}
          </div>
        </div>
      </div>

      {/* Cursor seguidor - Matrix rain effect */}
      <div
        className={`${styles.cursorFollower} ${hidden ? styles.hidden : ''} ${clicked ? styles.followerClicked : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className={styles.followerRing}>
          <div className={styles.followerRingInner} />
          <div className={styles.followerRingGlow} />
        </div>
        <div className={styles.followerMatrix}>
          {matrixChars.slice(0, 4).map((char, i) => (
            <span key={i} className={styles.followerChar} style={{ animationDelay: `${i * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Estela del cursor - Binary trail */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className={styles.trail}
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: (index + 1) / trail.length * 0.5,
            transform: `scale(${0.2 + (index / trail.length) * 0.3})`,
          }}
        >
          <span className={styles.trailChar}>
            {Math.random() > 0.5 ? '1' : '0'}
          </span>
        </div>
      ))}

      {/* Partículas alrededor del cursor */}
      {!hidden && (
        <div
          className={styles.cursorParticles}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${i * 60}deg) translateX(30px)`,
              }}
            >
              <span className={styles.particleChar}>
                {matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)]}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}