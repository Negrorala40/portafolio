'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} style={{ animationDelay: '0.1s' }}>
          Sebastian Arboleda Londoño
        </Link>
        
        <div className={styles.navLinks}>
          {['Inicio', 'Proyectos', 'Skills', 'Contacto'].map((item, index) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={styles.navLink}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}