'use client'

import { useEffect, useState } from 'react'
import styles from './Cursor.module.css'

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', updateCursor)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        className={`${styles.cursor} ${hidden ? styles.hidden : ''} ${clicked ? styles.clicked : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className={`${styles.cursorFollower} ${hidden ? styles.hidden : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: clicked ? 'scale(0.6)' : 'scale(1)',
        }}
      />
    </>
  )
}