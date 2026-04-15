'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

interface Artist {
  name: string
  medium: string
  works: number
  image: string
  nationality: string
}


const artists: Artist[] = [
  {
    name: 'Adaeze Nwosu',
    medium: 'Oil & Acrylic',
    works: 14,
    image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=600&q=80',
    nationality: 'Lagos, Nigeria',
  },
  {
    name: 'Emeka Obi',
    medium: 'Acrylic on Board',
    works: 9,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=600&q=80',
    nationality: 'Enugu, Nigeria',
  },
  {
    name: 'Ashabi Ogundipe',
    medium: 'Mixed Media',
    works: 11,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
    nationality: 'Abuja, Nigeria',
  },
  {
    name: 'Femi Adeyemi',
    medium: 'Photography',
    works: 22,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80',
    nationality: 'Ibadan, Nigeria',
  },
  {
    name: 'Kemi Lawal',
    medium: 'Sculpture',
    works: 7,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    nationality: 'Port Harcourt',
  },
  {
    name: 'Zainab Musa',
    medium: 'Watercolor & Gold Leaf',
    works: 6,
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=600&q=80',
    nationality: 'Kano, Nigeria',
  },
]

export default function ArtistList() {
  const [hoveredName, setHoveredName] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [expandedName, setExpandedName] = useState<string | null>(null)

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const mouseX = useSpring(0, { damping: 22, stiffness: 180, mass: 0.8 })
  const mouseY = useSpring(0, { damping: 22, stiffness: 180, mass: 0.8 })

  useEffect(() => {
    if (isMobile) return
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY, isMobile])

  const activeArtist = isMobile
    ? artists.find((a) => a.name === expandedName)
    : artists.find((a) => a.name === hoveredName)

  const handleArtistClick = (name: string) => {
    if (!isMobile) return
    setExpandedName(expandedName === name ? null : name)
  }

  return (
    <section
      id="artists"
      style={{
        background: 'var(--color-base)',
        padding: '5rem 0 6rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Desktop: cursor-following floating image */}
      <AnimatePresence>
        {!isMobile && hoveredName && activeArtist && (
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
              width: '260px',
              height: '330px',
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 1 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={activeArtist.image}
              alt={activeArtist.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                boxShadow: '0 20px 70px rgba(45,41,38,0.22)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'rgba(45,41,38,0.72)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.56rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,249,246,0.55)', marginBottom: '0.15rem' }}>
                {activeArtist.medium}
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--color-base)', fontStyle: 'italic' }}>
                {activeArtist.works} works in collection
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section header */}
      <div style={{ padding: '0 1.5rem', marginBottom: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.58rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '0.5rem',
          }}>
            Artists in Residence
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text)',
              lineHeight: 1,
            }}>
              The Makers
            </h2>
            {/* Instruction — adapts to device */}
            <p style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.65rem',
              color: 'var(--color-text)',
              opacity: 0.38,
              lineHeight: 1.7,
              maxWidth: '200px',
              textAlign: 'right',
            }}>
              {isMobile ? 'Tap a name to see their work.' : 'Hover over a name to see their work.'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(45,41,38,0.1)', margin: '0 1.5rem' }} />

      {/* Artist rows */}
      {artists.map((artist, i) => (
        <div key={artist.name}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.07 }}
            onMouseEnter={() => !isMobile && setHoveredName(artist.name)}
            onMouseLeave={() => !isMobile && setHoveredName(null)}
            onClick={() => handleArtistClick(artist.name)}
            style={{
              padding: '1.25rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(45,41,38,0.07)',
              background:
                (!isMobile && hoveredName === artist.name) ||
                (isMobile && expandedName === artist.name)
                  ? 'var(--color-sand)'
                  : 'transparent',
              transition: 'background 0.3s ease',
              cursor: isMobile ? 'pointer' : 'default',
              gap: '0.75rem',
            }}
          >
            {/* Number */}
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.8rem',
              color: 'var(--color-text)',
              opacity: 0.22,
              flexShrink: 0,
              minWidth: '1.8rem',
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Name — takes remaining space, clips cleanly */}
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 5vw, 4rem)',
              fontWeight: 300,
              color:
                (!isMobile && hoveredName === artist.name) ||
                (isMobile && expandedName === artist.name)
                  ? 'var(--color-accent)'
                  : 'var(--color-text)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease',
              flex: 1,
              minWidth: 0,
            }}>
              {artist.name}
            </h3>

            {/* Right meta — only on desktop */}
            <div className="artist-meta" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexShrink: 0 }}>
              <span style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                color: 'var(--color-text)',
                opacity: 0.4,
                textTransform: 'uppercase',
              }}>
                {artist.medium}
              </span>
              <span style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.58rem',
                color: 'var(--color-text)',
                opacity: 0.3,
              }}>
                {artist.nationality}
              </span>
            </div>

            {/* Arrow */}
            <motion.span
              animate={{
                x: ((!isMobile && hoveredName === artist.name) || (isMobile && expandedName === artist.name)) ? 5 : 0,
                opacity: ((!isMobile && hoveredName === artist.name) || (isMobile && expandedName === artist.name)) ? 1 : 0.25,
                rotate: isMobile && expandedName === artist.name ? 90 : 0,
              }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '1rem',
                color: 'var(--color-accent)',
                flexShrink: 0,
              }}
            >
              →
            </motion.span>
          </motion.div>

          {/* Mobile expanded artwork image */}
          <AnimatePresence>
            {isMobile && expandedName === artist.name && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ overflow: 'hidden', background: 'var(--color-sand)' }}
              >
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    style={{
                      width: '110px',
                      height: '140px',
                      objectFit: 'cover',
                      flexShrink: 0,
                      display: 'block',
                    }}
                  />
                  <div style={{ padding: '0.25rem 0' }}>
                    <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.4rem' }}>
                      {artist.medium}
                    </p>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--color-text)', fontStyle: 'italic', marginBottom: '0.35rem', lineHeight: 1.2 }}>
                      {artist.works} works in collection
                    </p>
                    <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.6rem', color: 'var(--color-text)', opacity: 0.45 }}>
                      {artist.nationality}
                    </p>
                    <a
                      href="#inquire"
                      style={{
                        display: 'inline-block',
                        marginTop: '1rem',
                        fontFamily: 'var(--inter-font, system-ui)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--color-base)',
                        background: 'var(--color-accent)',
                        padding: '0.5rem 1rem',
                        textDecoration: 'none',
                      }}
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .artist-meta { display: none !important; }
        }
      `}</style>
    </section>
  )
}