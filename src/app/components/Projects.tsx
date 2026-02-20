'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Projects.module.css'

const projects = [
  {
    id: 1,
    title: 'AMARTEKIDS',
    description: 'E-commerce infantil en producción con sistema de pagos seguro (Mercado Pago), autenticación multi-rol (JWT + Google Auth), panel de administración, y seguimiento de conversiones con Meta Pixel y Google Analytics.',
    image: '/images/amartekids.png', // Aquí va tu captura de pantalla
    link: 'https://amartekids.com',
    badges: ['🛒 EN PRODUCCIÓN', '💰 MERCADO PAGO', '👥 MULTI-ROL', '📊 META PIXEL'],
    metrics: {
      users: '50+',
      products: '200+',
      payments: '💳 Seguros'
    },
    tags: [
      'Next.js', 
      'TypeScript', 
      'Spring Boot', 
      'Java', 
      'JWT', 
      'Google Auth', 
      'Mercado Pago',
      'Railway', 
      'Vercel', 
      'Docker', 
      'Meta API', 
      'Google Analytics'
    ],
    technologies: {
      frontend: ['Next.js 14', 'TypeScript', 'Vercel'],
      backend: ['Spring Boot 3', 'Java 17', 'JWT', 'Railway', 'Docker'],
      payments: ['Mercado Pago', 'Pagos Seguros', 'Checkout Pro'],
      features: [
        'Google Auth',
        'Meta Pixel',
        'Google Analytics',
        'Meta Feed',
        'API REST',
        'Roles (Admin/Usuario)',
        'Carrito de compras',
        'Gestión de productos',
        'Historial de pagos',
        'Dashboard admin'
      ],
      security: ['JWT', 'HTTPS', 'Validación pagos', 'Protección datos']
    }
  },
  {
    id: 2,
    title: 'KYNTEGRO',
    description: 'Backend empresarial con arquitectura de microservicios orientada a eventos. Sistema de autenticación centralizada con JWT y comunicación asíncrona entre servicios mediante RabbitMQ.',
    image: '/images/1.avif',
    link: '#',
    tags: [
      'Spring Boot', 
      'Java 17', 
      'RabbitMQ', 
      'JWT', 
      'Roles', 
      'Microservicios', 
      'Event-Driven', 
      'API REST', 
      'Docker',
      'Arquitectura Hexagonal',
      'CQRS'
    ],
    technologies: {
      backend: ['Spring Boot', 'Java 17', 'Spring Security', 'JWT', 'JPA'],
      messaging: ['RabbitMQ', 'Event-Driven', 'Mensajería Asíncrona'],
      architecture: ['Microservicios', 'API REST', 'CQRS', 'Arquitectura Hexagonal'],
      features: ['Autenticación JWT', 'Roles y Permisos', 'Eventos de Dominio', 'Escalabilidad']
    }
  },
  {
    id: 3,
    title: 'PROYECTO 03',
    description: 'Descripción de tu tercer proyecto',
    image: '/project3.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    technologies: {
      frontend: ['React'],
      backend: ['Node.js'],
      database: ['MongoDB']
    }
  },
]

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handleProjectClick = (link?: string) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  const renderTags = (tags: string[]) => {
    if (tags.length <= 4) return tags
    return [...tags.slice(0, 4), `+${tags.length - 4}`]
  }

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
              onClick={() => handleProjectClick(project.link)}
            >
              <div className={styles.cardInner}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className={styles.projectImage}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  
                  {/* Badges flotantes para AMARTEKIDS */}
                  {project.id === 1 && project.badges && (
                    <div className={styles.projectBadges}>
                      {project.badges.map((badge, i) => (
                        <span key={i} className={styles.projectBadge}>
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    {/* Métricas para AMARTEKIDS */}
                    {project.id === 1 && project.metrics && (
                      <div className={styles.metricsContainer}>
                        <div className={styles.metricItem}>
                          <span className={styles.metricValue}>{project.metrics.users}</span>
                          <span className={styles.metricLabel}>Usuarios activos</span>
                        </div>
                        <div className={styles.metricDivider} />
                        <div className={styles.metricItem}>
                          <span className={styles.metricValue}>{project.metrics.products}</span>
                          <span className={styles.metricLabel}>Productos</span>
                        </div>
                        <div className={styles.metricDivider} />
                        <div className={styles.metricItem}>
                          <span className={styles.metricValue}>{project.metrics.payments}</span>
                          <span className={styles.metricLabel}>Pagos seguros</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Tecnologías */}
                    {project.technologies && (
                      <div className={styles.techSection}>
                        {Object.entries(project.technologies).map(([key, techs]) => (
                          techs.length > 0 && (
                            <div key={key} className={styles.techGroup}>
                              <span className={styles.techLabel}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </span>
                              <div className={styles.techTags}>
                                {(techs as string[]).slice(0, 3).map((tech: string) => (
                                  <span key={tech} className={styles.techTag}>
                                    {tech}
                                  </span>
                                ))}
                                {(techs as string[]).length > 3 && (
                                  <span className={styles.techTag}>
                                    +{(techs as string[]).length - 3}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                    
                    {project.link && project.link !== '#' && (
                      <div className={styles.linkIndicator}>
                        <span className={styles.linkIcon}>🔗</span>
                        <span className={styles.linkText}>Visitar sitio web</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={styles.borderEffect} />
              </div>
              
              <div className={styles.cardFooter}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <div className={styles.miniTags}>
                  {renderTags(project.tags).map((tag, i) => (
                    <span key={i} className={styles.miniTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}