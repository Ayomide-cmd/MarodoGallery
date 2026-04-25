'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, animate, useScroll, useTransform } from 'framer-motion'

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

const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Mask',
    artist: 'Adaeze Nwosu',
    year: '2024',
    medium: 'ivory stone',
    dimensions: '120 × 90 cm',
    price: '₦4,500,000',
    image: 'https://i.pinimg.com/1200x/3f/a1/fb/3fa1fb374ea43fa4799feec624b482ac.jpg',
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
    title: 'Hidden',
    artist: 'Kemi Badmus',
    year: '2024',
    medium: 'Mixed Media & Thread',
    dimensions: '150 × 120 cm',
    price: '₦6,800,000',
    image: 'https://i.pinimg.com/736x/51/31/76/5131761d2136b41b8551c978fcfc1ce8.jpg',
    sold: false,
  },
  {
    id: 4,
    title: 'Sunken',
    artist: 'Femi Adeyemi',
    year: '2023',
    medium: 'Archival Photography',
    dimensions: '90 × 120 cm',
    price: '₦190,000',
    image: 'https://i.pinimg.com/736x/36/77/cc/3677cceb913bb5d1cd520ea595138038.jpg',
    sold: false,
  },
  {
    id: 5,
    title: 'The Aunties',
    artist: 'Kemi Lawal',
    year: '2024',
    medium: 'oil on canvas',
    dimensions: '45 × 45 × 80 cm',
    price: '₦9,500,000',
    image: 'https://i.pinimg.com/1200x/60/96/28/6096285ed9da3eb8e29c0246d54c6a65.jpg',
    sold: false,
  },
  {
    id: 6,
    title: 'Ikoko',
    artist: 'Femi Odesimi',
    year: '2022',
    medium: 'Fired Clay & Water colour',
    dimensions: '30 × 30 × 65 cm',
    price: '₦5,300,000',
    image: 'https://i.pinimg.com/736x/e5/6f/70/e56f701913be9da73eac9c1f009c6617.jpg',
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
    image: 'https://i.pinimg.com/736x/bc/3a/10/bc3a1071c96b92bb0820f56a6042a5d1.jpg',
    sold: false,
  },
]

const CARD_WIDTH = 320
const GAP = 28
const STRIDE = CARD_WIDTH + GAP

function ArtworkCard({ artwork, index }: { artwork: Artwork; index: number }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Scroll animations for entry/exit
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const slideY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -40])

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y: slideY,
        flexShrink: 0,
        width: CARD_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
            zIndex: 3
          }}
        >
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--color-base)', textAlign: 'center', padding: '0 1.5rem', lineHeight: 1.2 }}>
            {artwork.title}
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(250,249,246,0.4)' }} />
          {artwork.sold ? (
            <span style={{ fontFamily: 'var(--inter-font)', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-base)', padding: '0.28rem 0.8rem', border: '1px solid rgba(250,249,246,0.4)', opacity: 0.75 }}>
              Sold
            </span>
          ) : (
            <span style={{ fontFamily: 'var(--inter-font)', fontSize: '0.82rem', color: 'rgba(250,249,246,0.94)', fontWeight: 300 }}>
              {artwork.price}
            </span>
          )}
          <button style={{ marginTop: '0.2rem', fontFamily: 'var(--inter-font)', fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.5rem 1.3rem', border: '1px solid rgba(250,249,246,0.5)', color: 'var(--color-base)', background: 'transparent', cursor: 'pointer' }}>
            Inquire
          </button>
        </motion.div>

        {artwork.sold && (
          <div style={{ position: 'absolute', top: '0.9rem', left: '0.9rem', background: 'var(--color-sage)', color: 'var(--color-base)', fontFamily: 'var(--inter-font)', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '0.25rem 0.65rem', zIndex: 2 }}>
            Sold
          </div>
        )}
      </div>

      <div>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--color-text)', lineHeight: 1.2, marginBottom: '0.3rem' }}>
          {artwork.title}
        </p>
        <p style={{ fontFamily: 'var(--inter-font)', fontSize: '0.6rem', color: 'var(--color-text)', opacity: 0.5, marginBottom: '0.1rem' }}>
          {artwork.artist}, {artwork.year}
        </p>
        <p style={{ fontFamily: 'var(--inter-font)', fontSize: '0.56rem', color: 'var(--color-text)', opacity: 0.35 }}>
          {artwork.medium} — {artwork.dimensions}
        </p>
      </div>
    </motion.div>
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
        const overflow = trackRef.current.scrollWidth - containerRef.current.offsetWidth + 96
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
      style={{ background: 'var(--color-sand)', padding: '8rem 0', overflow: 'hidden' }}
    >
      <div style={{ padding: '0 3rem', marginBottom: '3.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p style={{ fontFamily: 'var(--inter-font)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '0.4rem' }}>
            Current Collection
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--color-text)', lineHeight: 1 }}>
            2024 — 2025
          </h2>
        </motion.div>

        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--color-text)', opacity: 0.28 }}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(artworks.length).padStart(2, '0')}
        </span>
      </div>

      <motion.div
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        style={{
          display: 'flex',
          gap: GAP,
          paddingLeft: '3rem',
          paddingRight: '3rem',
          x: springX,
          cursor: 'grab',
          touchAction: 'pan-y',
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {artworks.map((artwork, i) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
        ))}
      </motion.div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.75rem', marginTop: '3.5rem' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {artworks.map((_, i) => (
            <button
              key={i}
              onClick={() => snapTo(i)}
              style={{
                width: i === activeIndex ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === activeIndex ? 'var(--color-accent)' : 'rgba(45,41,38,0.2)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}