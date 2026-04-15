'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'

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
  TO USE YOUR OWN ARTWORK IMAGES:
  Replace `image` with: '/images/your-file.jpg'
  Place image files in: /public/images/
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
    image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
  {
    id: 4,
    title: 'The Tide Waits',
    artist: 'Femi Adeyemi',
    year: '2023',
    medium: 'Archival Photography',
    dimensions: '90 × 120 cm',
    price: '₦190,000',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&w=800&q=80',
    sold: false,
  },
]

const CARD_WIDTH = 320
const GAP = 28
const STRIDE = CARD_WIDTH + GAP

function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: CARD_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: index % 3 === 1 ? '3/4' : '4/5',
          overflow: 'hidden',
          background: 'var(--color-sand-dark)',
        }}
      >
        <motion.img
          src={artwork.image}
          alt={artwork.title}
          draggable={false}
          animate={{ scale: hovered ? 1.04 : 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
        />

        {/* Terracotta overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(142, 74, 46, 0.84)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.7rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.65rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-base)',
              textAlign: 'center',
              padding: '0 1.5rem',
              lineHeight: 1.2,
            }}
          >
            {artwork.title}
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(250,249,246,0.4)' }} />
          {artwork.sold ? (
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.56rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-base)',
                padding: '0.28rem 0.8rem',
                border: '1px solid rgba(250,249,246,0.4)',
                opacity: 0.75,
              }}
            >
              Sold
            </span>
          ) : (
            <span
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.82rem',
                color: 'rgba(250,249,246,0.94)',
                fontWeight: 300,
              }}
            >
              {artwork.price}
            </span>
          )}
          <button
            style={{
              marginTop: '0.2rem',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.56rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.3rem',
              border: '1px solid rgba(250,249,246,0.5)',
              color: 'var(--color-base)',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(250,249,246,0.14)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            Inquire
          </button>
        </motion.div>

        {artwork.sold && (
          <div
            style={{
              position: 'absolute',
              top: '0.9rem',
              left: '0.9rem',
              background: 'var(--color-sage)',
              color: 'var(--color-base)',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.5rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.65rem',
            }}
          >
            Sold
          </div>
        )}
      </div>

      <div>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            fontStyle: 'italic',
            color: 'var(--color-text)',
            lineHeight: 1.2,
            marginBottom: '0.3rem',
          }}
        >
          {artwork.title}
        </p>
        <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.6rem', color: 'var(--color-text)', opacity: 0.5, marginBottom: '0.1rem' }}>
          {artwork.artist}, {artwork.year}
        </p>
        <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.56rem', color: 'var(--color-text)', opacity: 0.35 }}>
          {artwork.medium} — {artwork.dimensions}
        </p>
      </div>
    </div>
  )
}

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [maxDrag, setMaxDrag] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const x = useMotionValue(0)
  const springX = useSpring(x, { damping: 38, stiffness: 300, mass: 0.7 })

  useEffect(() => {
    const calc = () => {
      if (trackRef.current && containerRef.current) {
        const overflow = trackRef.current.scrollWidth - containerRef.current.offsetWidth + 48
        setMaxDrag(Math.max(0, overflow))
      }
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  const snapTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, artworks.length - 1))
    setActiveIndex(clamped)
    animate(x, -clamped * STRIDE, { type: 'spring', stiffness: 300, damping: 38, mass: 0.7 })
  }

  const handleDragEnd = () => {
    const currentX = x.get()
    const nearest = Math.round(-currentX / STRIDE)
    snapTo(nearest)
  }

  return (
    <section
      id="collection"
      ref={containerRef}
      style={{ background: 'var(--color-sand)', padding: '5rem 0', overflow: 'hidden' }}
    >
      {/* Section header */}
      <div
        style={{
          padding: '0 3rem',
          marginBottom: '2.5rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.58rem',
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: 'var(--color-text)',
              lineHeight: 1,
            }}
          >
            2024 — 2025
          </h2>
        </motion.div>

        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            color: 'var(--color-text)',
            opacity: 0.28,
            letterSpacing: '0.06em',
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(artworks.length).padStart(2, '0')}
        </span>
      </div>

      {/* Draggable gallery track */}
      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.06}
        dragMomentum={true}
        onDragEnd={handleDragEnd}
        style={{
          display: 'flex',
          gap: GAP,
          paddingLeft: '3rem',
          paddingRight: '3rem',
          x: springX,
          cursor: 'grab',
          touchAction: 'pan-y',
          willChange: 'transform',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {artworks.map((artwork, i) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
        ))}
      </motion.div>

      {/* Dot navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.75rem',
          marginTop: '2.25rem',
          padding: '0 3rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.5rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            opacity: 0.28,
          }}
        >
          ← Swipe
        </span>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {artworks.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              aria-label={`Go to artwork ${i + 1}`}
              style={{
                width: i === activeIndex ? '22px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === activeIndex ? 'var(--color-accent)' : 'rgba(45,41,38,0.22)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.38s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ))}
        </div>

        <span
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.5rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            opacity: 0.28,
          }}
        >
          Swipe →
        </span>
      </div>
    </section>
  )
}