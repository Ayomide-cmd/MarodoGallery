'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, AnimatePresence, useScroll, useTransform } from 'framer-motion'

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
    image: 'https://i.pinimg.com/736x/d1/22/5e/d1225e169a9e738361b62ab7da2c8c5f.jpg',
    nationality: 'Enugu, Nigeria',
  },
  {
    name: 'Kemi Badmus',
    medium: 'Mixed Media',
    works: 11,
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=600&q=80',
    nationality: 'Abuja, Nigeria',
  },
  {
    name: 'Femi Adeyemi',
    medium: 'Photography',
    works: 22,
    image: 'https://i.pinimg.com/736x/69/65/4e/69654e724b61acd81723a73a8cc3418b.jpg',
    nationality: 'Ibadan, Nigeria',
  },
  {
    name: 'Kemi Lawal',
    medium: 'Oil on Canvas',
    works: 7,
    image: 'https://i.pinimg.com/1200x/46/eb/b9/46ebb907bfcf2397b15f00f0a90d610c.jpg',
    nationality: 'Port Harcourt',
  },
  {
    name: 'Femi Odesimi',
    medium: 'Fired Clay & Watercolour',
    works: 8,
    image: 'https://i.pinimg.com/1200x/c8/e9/39/c8e939f759d753966cb958e92da7aa82.jpg',
    nationality: 'Lagos, Nigeria',
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
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Floating Image Mouse Follow
  const mouseX = useSpring(0, { damping: 25, stiffness: 150, mass: 0.5 })
  const mouseY = useSpring(0, { damping: 25, stiffness: 150, mass: 0.5 })

  useEffect(() => {
    if (isMobile) return
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY, isMobile])

  // Scroll Fade Out Effect for the entire list
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const activeArtist = artists.find((a) => a.name === (isMobile ? expandedName : hoveredName))

  return (
    <motion.section
      id="artists"
      ref={sectionRef}
      style={{
        background: 'var(--color-base)',
        padding: '10vh 0',
        position: 'relative',
        opacity,
      }}
    >
      {/* FLOATING PREVIEW IMAGE (DESKTOP) */}
      <AnimatePresence mode="wait">
        {!isMobile && hoveredName && activeArtist && (
          <motion.div
            key={hoveredName}
            style={{
              position: 'fixed',
              left: mouseX,
              top: mouseY,
              translateX: '20%',
              translateY: '-50%',
              zIndex: 99,
              pointerEvents: 'none',
              width: '300px',
              height: '400px',
            }}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={activeArtist.image}
              alt={activeArtist.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ padding: '0 5vw', marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p style={{
            fontFamily: 'var(--inter-font)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '1rem',
          }}>
            Representation
          </p>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--color-text)',
            lineHeight: 1,
          }}>
            Our Artists
          </h2>
        </motion.div>
      </div>

      <div className="artists-wrapper">
        {artists.map((artist, i) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div
              onMouseEnter={() => !isMobile && setHoveredName(artist.name)}
              onMouseLeave={() => !isMobile && setHoveredName(null)}
              onClick={() => isMobile && setExpandedName(expandedName === artist.name ? null : artist.name)}
              className="artist-row"
              style={{
                padding: '2.5rem 5vw',
                borderBottom: '1px solid rgba(45,41,38,0.08)',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ position: 'relative', zIndex: 2 }}>
                <motion.h3 
                  animate={{ 
                    x: hoveredName === artist.name && !isMobile ? 20 : 0,
                    color: hoveredName === artist.name ? 'var(--color-accent)' : 'var(--color-text)'
                  }}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.8rem, 5vw, 4.2rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {artist.name}
                </motion.h3>
              </div>

              <div className="artist-details" style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: 'var(--inter-font)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text)',
                  opacity: hoveredName === artist.name ? 1 : 0.4,
                  transition: 'opacity 0.3s ease'
                }}>
                  {artist.medium}
                </p>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  opacity: hoveredName === artist.name ? 0.6 : 0.2,
                  transition: 'opacity 0.3s ease'
                }}>
                  {artist.nationality}
                </p>
              </div>

              {/* Hover Background Reveal */}
              {!isMobile && (
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hoveredName === artist.name ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--color-sand)',
                    zIndex: 1,
                    transformOrigin: 'bottom'
                  }}
                />
              )}
            </div>

            {/* MOBILE EXPANDED VIEW */}
            <AnimatePresence>
              {isMobile && expandedName === artist.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mobile-expand"
                  style={{ overflow: 'hidden', background: 'var(--color-sand)' }}
                >
                  <div style={{ padding: '2rem 5vw', display: 'flex', gap: '1.5rem' }}>
                    <img src={artist.image} style={{ width: '40%', aspectRatio: '3/4', objectFit: 'cover' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <p style={{ fontFamily: 'var(--inter-font)', fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>{artist.works} Works</p>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', margin: '0.5rem 0' }}>{artist.name}</h4>
                      <p style={{ fontFamily: 'var(--inter-font)', fontSize: '0.7rem', opacity: 0.6 }}>{artist.medium}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .artist-details { display: none; }
          .artist-row { padding: 1.5rem 5vw !important; }
        }
      `}</style>
    </motion.section>
  )
}