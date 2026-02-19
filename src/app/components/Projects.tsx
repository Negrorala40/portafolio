'use client'

import { useState } from 'react'
import styles from './Projects.module.css'

const projects = [
  {
    id: 1,
    title: 'PROYECTO 01',
    description: 'Aplicación de realidad aumentada para e-commerce',
    image: '/project1.jpg',
    tags: ['Next.js', 'Three.js', 'TypeScript'],
  },
  {
    id: 2,
    title: 'PROYECTO 02',
    description: 'Dashboard interactivo con animaciones 3D',
    image: '/project2.jpg',
    tags: ['React', 'D3.js', 'Node.js'],
  },
  {
    id: 3,
    title: 'PROYECTO 03',
    description: 'Plataforma de streaming con efectos visuales',
    image: '/project3.jpg',
    tags: ['Vue.js', 'WebGL', 'Express'],
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="proyectos" className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title} style={{ animationDelay: '0.2s' }}>
          PROYECTOS
          <span>/ trabajos destacados</span>
        </h2>
        
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.projectCard}
              style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={styles.cardInner}>
                <div className={styles.imagePlaceholder}>
                  {project.id}
                </div>
                
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    <div className={styles.tags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className={styles.borderEffect} />
              </div>
              
              <h3 className={styles.cardTitle}>{project.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}