'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Artwork {
  id: number
  title: string
  artist: string
  year: string
  medium: string
  dimensions: string
  price: string
  image: string
  sold: boolean
}

/*
  ─────────────────────────────────────────────
  HOW TO USE YOUR OWN ARTWORK IMAGES
  ─────────────────────────────────────────────
  1. Put your image files in the /public/images/ folder
     e.g. /public/images/artwork1.jpg

  2. Replace the `image` value below like this:
     image: '/images/artwork1.jpg',

  3. The size that looks best: at least 800px wide.
  ─────────────────────────────────────────────
*/
const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Harmattan Reverie',
    artist: 'Adaeze Nwosu',
    year: '2024',
    medium: 'Oil on Canvas',
    dimensions: '120 × 90 cm',
    price: '₦4,500,000',
    image:
      'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
  {
    id: 2,
    title: 'Niger Delta Dusk',
    artist: 'Emeka Obi',
    year: '2023',
    medium: 'Acrylic on Board',
    dimensions: '100 × 80 cm',
    price: '₦3,200,000',
    image:
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
    sold: true,
  },
  {
    id: 3,
    title: 'Ancestral Echoes',
    artist: 'Ngozi Eze',
    year: '2024',
    medium: 'Mixed Media & Thread',
    dimensions: '150 × 120 cm',
    price: '₦6,800,000',
    image:
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
  {
    id: 4,
    title: 'The Tide Waits',
    artist: 'Femi Adeyemi',
    year: '2023',
    medium: 'Archival Photography',
    dimensions: '90 × 120 cm',
    price: '₦2,100,000',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
  {
    id: 5,
    title: 'Sunken Garden',
    artist: 'Kemi Lawal',
    year: '2024',
    medium: 'Ceramic & Pigment',
    dimensions: '45 × 45 × 80 cm',
    price: '₦9,500,000',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
  {
    id: 6,
    title: 'Memory Vessel',
    artist: 'Tunde Bakare',
    year: '2022',
    medium: 'Fired Clay & Wire',
    dimensions: '30 × 30 × 65 cm',
    price: '₦5,300,000',
    image:
      'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?auto=format&fit=crop&w=800&q=80',
    sold: true,
  },
  {
    id: 7,
    title: 'Between Two Rivers',
    artist: 'Zainab Musa',
    year: '2024',
    medium: 'Watercolor & Gold Leaf',
    dimensions: '80 × 60 cm',
    price: '₦7,200,000',
    image:
      'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
]

function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 28vw, 420px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: index % 3 === 1 ? '3/4' : '4/5',
          overflow: 'hidden',
          background: 'var(--color-sand)',
        }}
      >
        <motion.img
          src={artwork.image}
          alt={artwork.title}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Terracotta hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(142, 74, 46, 0.82)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-base)',
              textAlign: 'center',
              padding: '0 2rem',
              lineHeight: 1.2,
            }}
          >
            {artwork.title}
          </span>
          <div style={{ width: '32px', height: '1px', background: 'rgba(250,249,246,0.5)' }} />
          {artwork.sold ? (
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-base)',
                padding: '0.35rem 0.9rem',
                border: '1px solid rgba(250,249,246,0.4)',
                opacity: 0.7,
              }}
            >
              Sold
            </span>
          ) : (
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                color: 'rgba(250,249,246,0.9)',
                fontWeight: 300,
              }}
            >
              {artwork.price}
            </span>
          )}
          <button
            style={{
              marginTop: '0.5rem',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.5rem',
              border: '1px solid rgba(250,249,246,0.6)',
              color: 'var(--color-base)',
              background: 'transparent',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.target as HTMLElement).style.background = 'rgba(250,249,246,0.15)'
            }}
            onMouseLeave={(e) => {
              ;(e.target as HTMLElement).style.background = 'transparent'
            }}
          >
            Inquire
          </button>
        </motion.div>

        {/* Sold tag */}
        {artwork.sold && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'var(--color-sage)',
              color: 'var(--color-base)',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.55rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.75rem',
            }}
          >
            Sold
          </div>
        )}
      </div>

      {/* Artwork caption */}
      <div style={{ paddingLeft: '0.25rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--color-text)',
            lineHeight: 1.2,
            marginBottom: '0.4rem',
          }}
        >
          {artwork.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            color: 'var(--color-text)',
            opacity: 0.55,
            marginBottom: '0.15rem',
          }}
        >
          {artwork.artist}, {artwork.year}
        </p>
        <p
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.6rem',
            letterSpacing: '0.04em',
            color: 'var(--color-text)',
            opacity: 0.4,
          }}
        >
          {artwork.medium} — {artwork.dimensions}
        </p>
      </div>
    </motion.div>
  )
}

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const [currentCard, setCurrentCard] = useState(1)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const x = useTransform(scrollYProgress, [0, 1], [0, -translateX])

  useEffect(() => {
    const calc = () => {
      if (trackRef.current) {
        setTranslateX(trackRef.current.scrollWidth - window.innerWidth + 128)
      }
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setCurrentCard(Math.min(artworks.length, Math.round(v * artworks.length) + 1))
    })
  }, [scrollYProgress])

  return (
    <section
      ref={containerRef}
      id="collection"
      style={{ position: 'relative', height: '340vh' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--color-sand)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Header row */}
        <div
          style={{
            position: 'absolute',
            top: '2.5rem',
            left: '4rem',
            right: '4rem',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '0.4rem',
              }}
            >
              Current Collection
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                fontWeight: 300,
                color: 'var(--color-text)',
                lineHeight: 1,
              }}
            >
              2024 — 2025
            </h2>
          </div>

          {/* Live counter */}
          <div style={{ textAlign: 'right' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.5rem',
                fontWeight: 300,
                color: 'var(--color-text)',
                opacity: 0.12,
                lineHeight: 1,
              }}
            >
              {String(currentCard).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: 'var(--color-text)',
                opacity: 0.4,
                display: 'block',
                marginTop: '0.25rem',
              }}
            >
              / {String(artworks.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Scrolling track */}
        <motion.div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '2.5rem',
            paddingLeft: '4rem',
            paddingRight: '8rem',
            alignItems: 'center',
            x,
            willChange: 'transform',
          }}
        >
          {artworks.map((artwork, i) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
          ))}
        </motion.div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{ width: '40px', height: '1px', background: 'var(--color-text)', opacity: 0.2 }}
          />
          <span
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              opacity: 0.3,
            }}
          >
            Scroll to browse
          </span>
          <div
            style={{ width: '40px', height: '1px', background: 'var(--color-text)', opacity: 0.2 }}
          />
        </div>
      </div>
    </section>
  )
}