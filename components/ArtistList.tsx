'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

interface Artist {
  name: string
  medium: string
  period: string
  works: number
  image: string
  nationality: string
}


const artists: Artist[] = [
  {
    name: 'Adaeze Nwosu',
    medium: 'Oil & Acrylic',
    period: '2019 — Present',
    works: 14,
    image:
      'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=600&q=80',
    nationality: 'Lagos, Nigeria',
  },
  {
    name: 'Emeka Obi',
    medium: 'Acrylic on Board',
    period: '2020 — Present',
    works: 9,
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=600&q=80',
    nationality: 'Enugu, Nigeria',
  },
  {
    name: 'Ngozi Eze',
    medium: 'Mixed Media',
    period: '2021 — Present',
    works: 11,
    image:
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
    nationality: 'Abuja, Nigeria',
  },
  {
    name: 'Femi Adeyemi',
    medium: 'Photography',
    period: '2019 — Present',
    works: 22,
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80',
    nationality: 'Ibadan, Nigeria',
  },
  {
    name: 'Kemi Lawal',
    medium: 'Sculpture',
    period: '2022 — Present',
    works: 7,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    nationality: 'Port Harcourt, Nigeria',
  },
  {
    name: 'Zainab Musa',
    medium: 'Watercolor & Gold Leaf',
    period: '2023 — Present',
    works: 6,
    image:
      'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=600&q=80',
    nationality: 'Kano, Nigeria',
  },
]

export default function ArtistList() {
  const [hoveredName, setHoveredName] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const mouseX = useSpring(0, { damping: 22, stiffness: 180, mass: 0.8 })
  const mouseY = useSpring(0, { damping: 22, stiffness: 180, mass: 0.8 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  const currentArtist = artists.find((a) => a.name === hoveredName)

  return (
    <section
      ref={sectionRef}
      id="artists"
      style={{
        background: 'var(--color-base)',
        padding: '8rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating cursor image */}
      <AnimatePresence>
        {hoveredName && currentArtist && (
          <motion.div
            key={hoveredName}
            style={{
              position: 'fixed',
              left: mouseX,
              top: mouseY,
              translateX: '-50%',
              translateY: '-65%',
              zIndex: 9990,
              pointerEvents: 'none',
              width: '280px',
              height: '360px',
            }}
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={currentArtist.image}
              alt={currentArtist.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                boxShadow: '0 24px 80px rgba(45, 41, 38, 0.25)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.25rem',
                background: 'rgba(45, 41, 38, 0.7)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--inter-font, system-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(250,249,246,0.6)',
                  marginBottom: '0.2rem',
                }}
              >
                {currentArtist.medium}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  color: 'var(--color-base)',
                  fontStyle: 'italic',
                }}
              >
                {currentArtist.works} works in collection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section header */}
      <div
        style={{
          padding: '0 4rem',
          marginBottom: '4rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '0.6rem',
            }}
          >
            Artists in Residence
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text)',
              lineHeight: 1,
            }}
          >
            The Makers
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.7rem',
            color: 'var(--color-text)',
            opacity: 0.45,
            maxWidth: '220px',
            lineHeight: 1.8,
            textAlign: 'right',
          }}
        >
          Hover over an artist's name to see their work.
        </motion.p>
      </div>

      <div style={{ height: '1px', background: 'rgba(45, 41, 38, 0.1)', margin: '0 4rem' }} />

      {/* Artist rows */}
      {artists.map((artist, i) => (
        <motion.div
          key={artist.name}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredName(artist.name)}
          onMouseLeave={() => setHoveredName(null)}
          style={{
            padding: '1.75rem 4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(45, 41, 38, 0.08)',
            background: hoveredName === artist.name ? 'var(--color-sand)' : 'transparent',
            transition: 'background 0.35s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                color: 'var(--color-text)',
                opacity: 0.25,
                minWidth: '2rem',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                fontWeight: 300,
                color:
                  hoveredName === artist.name ? 'var(--color-accent)' : 'var(--color-text)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                transition: 'color 0.35s ease',
              }}
            >
              {artist.name}
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text)',
                opacity: 0.45,
                textTransform: 'uppercase',
              }}
            >
              {artist.medium}
            </span>
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.65rem',
                color: 'var(--color-text)',
                opacity: 0.35,
              }}
            >
              {artist.nationality}
            </span>
            <motion.span
              animate={{
                x: hoveredName === artist.name ? 8 : 0,
                opacity: hoveredName === artist.name ? 1 : 0.3,
              }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '1.1rem', color: 'var(--color-accent)' }}
            >
              →
            </motion.span>
          </div>
        </motion.div>
      ))}
    </section>
  )
}