'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.css'

const skills = [
  // Frontend Core
  { 
    name: 'React', 
    level: 95, 
    color: '#61DAFB',
    icon: '⚛️',
    category: 'Frontend',
    description: 'Biblioteca UI',
    projects: ['AMARTEKIDS']
  },
  { 
    name: 'Next.js', 
    level: 90, 
    color: '#ffffff',
    icon: '▲',
    category: 'Frontend',
    description: 'Framework React',
    projects: ['AMARTEKIDS']
  },
  { 
    name: 'TypeScript', 
    level: 88, 
    color: '#3178C6',
    icon: '📘',
    category: 'Lenguaje',
    description: 'Tipado estático',
    projects: ['AMARTEKIDS', 'Kyntegro']
  },
  { 
    name: 'JavaScript', 
    level: 92, 
    color: '#F7DF1E',
    icon: '🟨',
    category: 'Lenguaje',
    description: 'ES6+',
    projects: ['AMARTEKIDS']
  },

  // Backend - Java Ecosystem
  { 
    name: 'Java', 
    level: 88, 
    color: '#007396',
    icon: '☕',
    category: 'Backend',
    description: 'Lenguaje principal',
    projects: ['AMARTEKIDS', 'Kyntegro'],
    education: 'CESDE'
  },
  { 
    name: 'Spring Boot', 
    level: 85, 
    color: '#6DB33F',
    icon: '🍃',
    category: 'Backend',
    description: 'Framework Java',
    projects: ['AMARTEKIDS', 'Kyntegro'],
    education: 'CESDE'
  },
  { 
    name: 'JWT', 
    level: 90, 
    color: '#000000',
    icon: '🔐',
    category: 'Seguridad',
    description: 'Auth & Roles',
    projects: ['AMARTEKIDS', 'Kyntegro']
  },

  // Backend - Python
  { 
    name: 'Python', 
    level: 75, 
    color: '#3776AB',
    icon: '🐍',
    category: 'Backend',
    description: 'Scripting & APIs',
    projects: []
  },

  // Backend - Node.js
  { 
    name: 'Node.js', 
    level: 85, 
    color: '#339933',
    icon: '🟢',
    category: 'Backend',
    description: 'Runtime JS',
    projects: []
  },

  // Cloud & DevOps
  { 
    name: 'AWS', 
    level: 70, 
    color: '#FF9900',
    icon: '☁️',
    category: 'Cloud',
    description: 'Certificación en progreso',
    projects: []
  },
  { 
    name: 'Docker', 
    level: 80, 
    color: '#2496ED',
    icon: '🐳',
    category: 'DevOps',
    description: 'Contenedores',
    projects: ['AMARTEKIDS', 'Kyntegro']
  },
  { 
    name: 'Railway', 
    level: 85, 
    color: '#7C3AED',
    icon: '🚂',
    category: 'Cloud',
    description: 'Deploy backend',
    projects: ['AMARTEKIDS']
  },
  { 
    name: 'Vercel', 
    level: 90, 
    color: '#ffffff',
    icon: '▲',
    category: 'Cloud',
    description: 'Deploy frontend',
    projects: ['AMARTEKIDS']
  },

  // Mensajería & Arquitectura
  { 
    name: 'RabbitMQ', 
    level: 75, 
    color: '#FF6600',
    icon: '🐇',
    category: 'Mensajería',
    description: 'Event-Driven',
    projects: ['Kyntegro']
  },
  { 
    name: 'Microservicios', 
    level: 80, 
    color: '#00A98F',
    icon: '🔌',
    category: 'Arquitectura',
    description: 'Escalable',
    projects: ['Kyntegro']
  },

  // Pagos & Analytics
  { 
    name: 'Mercado Pago', 
    level: 85, 
    color: '#009EE3',
    icon: '💰',
    category: 'Pagos',
    description: 'Checkout Pro',
    projects: ['AMARTEKIDS']
  },
  { 
    name: 'Meta Pixel', 
    level: 80, 
    color: '#1877F2',
    icon: '📊',
    category: 'Analytics',
    description: 'Conversiones',
    projects: ['AMARTEKIDS']
  },
  { 
    name: 'Google Auth', 
    level: 88, 
    color: '#4285F4',
    icon: '🔑',
    category: 'Auth',
    description: 'OAuth 2.0',
    projects: ['AMARTEKIDS']
  },

  // En aprendizaje
  { 
    name: 'PHP', 
    level: 30, 
    color: '#777BB4',
    icon: '🐘',
    category: 'Aprendiendo',
    description: 'Próximo lenguaje',
    learning: true,
    projects: []
  },
]

// Agrupar por categorías para mostrar de forma organizada
const categories = [
  { name: 'Frontend', color: '#61DAFB' },
  { name: 'Backend', color: '#6DB33F' },
  { name: 'Lenguaje', color: '#F7DF1E' },
  { name: 'Cloud & DevOps', color: '#FF9900' },
  { name: 'Arquitectura', color: '#00A98F' },
  { name: 'Seguridad & Auth', color: '#4285F4' },
  { name: 'Aprendiendo', color: '#777BB4' },
]

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  const filteredSkills = activeCategory === 'Todos' 
    ? skills 
    : skills.filter(s => {
        if (activeCategory === 'Cloud & DevOps') 
          return ['AWS', 'Docker', 'Railway', 'Vercel'].includes(s.name)
        if (activeCategory === 'Seguridad & Auth')
          return ['JWT', 'Google Auth'].includes(s.name)
        return s.category === activeCategory
      })

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.background}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
        <div className={styles.glow3} />
      </div>
      
      <div className={styles.container}>
        <h2 className={styles.title} style={{ animationDelay: '0.2s' }}>
          SKILLS
        </h2>

        {/* Filtros por categoría */}
        <div className={styles.categories}>
          <button 
            className={`${styles.categoryBtn} ${activeCategory === 'Todos' ? styles.active : ''}`}
            onClick={() => setActiveCategory('Todos')}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              className={`${styles.categoryBtn} ${activeCategory === cat.name ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.name)}
              style={{ '--category-color': cat.color } as React.CSSProperties}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        <div className={styles.grid}>
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={`${styles.skillCard} ${skill.learning ? styles.learning : ''}`}
              style={{ animationDelay: `${0.3 + (index % 8) * 0.1}s` }}
              onMouseEnter={() => setSelectedSkill(index)}
              onMouseLeave={() => setSelectedSkill(null)}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <div className={styles.skillIcon} style={{ backgroundColor: skill.color + '20' }}>
                    <span className={styles.iconEmoji}>{skill.icon}</span>
                  </div>
                  <h3 className={styles.skillName}>{skill.name}</h3>
                  <div className={styles.skillLevel}>
                    <div className={styles.levelBar}>
                      <div 
                        className={styles.levelFill}
                        style={{ 
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: `0 0 10px ${skill.color}`
                        }}
                      />
                    </div>
                    <span className={styles.levelText}>{skill.level}%</span>
                  </div>
                  <span className={styles.skillCategory}>{skill.category}</span>
                </div>
                
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <h4 className={styles.backTitle}>{skill.name}</h4>
                    <p className={styles.backDescription}>{skill.description}</p>
                    
                    {skill.projects && skill.projects.length > 0 && (
                      <div className={styles.backProjects}>
                        <span className={styles.backLabel}>Proyectos:</span>
                        <div className={styles.projectTags}>
                          {skill.projects.map(proj => (
                            <span key={proj} className={styles.projectTag}>
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {skill.education && (
                      <div className={styles.backEducation}>
                        <span className={styles.backLabel}>Educación:</span>
                        <span className={styles.educationText}>{skill.education}</span>
                      </div>
                    )}
                    
                    {skill.learning && (
                      <div className={styles.learningBadge}>
                        <span className={styles.learningIcon}>📚</span>
                        <span className={styles.learningText}>Aprendiendo</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={styles.cardGlow} style={{ backgroundColor: skill.color }} />
            </div>
          ))}
        </div>

        {/* Educación destacada */}
        <div className={styles.education}>
          <div className={styles.educationCard}>
            <span className={styles.educationIcon}>🎓</span>
            <div className={styles.educationContent}>
              <h4 className={styles.educationTitle}>Formación Académica</h4>
              <p className={styles.educationText}>
                <strong>Técnica en CESDE</strong> · Tec. Desarrollo de Software
              </p>
              <p className={styles.educationText}>
                <strong>Ingeniería de Software y Datos</strong> · UI Digital (En curso)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}