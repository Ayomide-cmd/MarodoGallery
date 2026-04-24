'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const INTERVAL_MS = 4000

const exhibitions = [
  {
    id: 1,
    artist: 'Fola Jaiyeoba',
    title: 'Print on Textile',
    dates: '8 March – 17 May 2026',
    location: 'Lagos',
    href: '/exhibitions/fola-jaiyeoba-print-on-textile/',
    image: 'https://i.pinimg.com/1200x/3d/7b/7c/3d7b7ce954ed53d14058e836c96c879b.jpg',
  },
  {
    id: 2,
    artist: 'Femi Odesimi & Salma Wuya',
    title: null,
    dates: '22 March – 28 June 2026',
    location: 'Lagos',
    href: '/exhibitions/femi-odesimi-salma-wuya/',
    image: 'https://i.pinimg.com/1200x/fe/c2/68/fec268c891906c74a864380aef464b74.jpg',
  },
  {
    id: 3,
    artist: 'Ayo Akinwande',
    title: 'Mama Eleja',
    dates: '5 January – 1 March 2026',
    location: 'Lagos',
    href: '/exhibitions/ayo-akinwande-beneath-the-mangrove-sky/',
    image: 'https://i.pinimg.com/736x/d3/e9/ee/d3e9ee1b80d6c09a7d754d8305a90ecd.jpg',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = exhibitions.length
  const ex = exhibitions[current]

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL_MS)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section
      id="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        overflow: 'hidden',
        background: '#111',
      }}
    >
      
      <AnimatePresence>
        <motion.div
          key={ex.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${ex.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.12) 35%, transparent 55%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      
      {(['prev', 'next'] as const).map((dir) => (
        <button
          key={dir}
          onClick={dir === 'prev' ? prev : next}
          aria-label={dir === 'prev' ? 'Previous exhibition' : 'Next exhibition'}
          style={{
            position: 'absolute',
            top: '50%',
            [dir === 'prev' ? 'left' : 'right']: '1.75rem',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '1rem',
            color: 'rgba(255,255,255,0.5)',
            transition: 'color 0.2s ease',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,1)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1">
            {dir === 'prev' ? (
              <>
                <line x1="18" y1="11" x2="4" y2="11" />
                <polyline points="10,5 4,11 10,17" />
              </>
            ) : (
              <>
                <line x1="4" y1="11" x2="18" y2="11" />
                <polyline points="12,5 18,11 12,17" />
              </>
            )}
          </svg>
        </button>
      ))}

      
      <AnimatePresence mode="wait">
        <motion.div
          key={ex.id + '-text'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: '3.75rem',
            left: '2.75rem',
            zIndex: 10,
            maxWidth: 520,
          }}
        >
          <p
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '0.59rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              margin: '0 0 0.65rem',
              fontWeight: 400,
            }}
          >
            {ex.dates}&nbsp;&nbsp;·&nbsp;&nbsp;{ex.location}
          </p>

          <a
            href={ex.href}
            style={{
              display: 'block',
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(2rem, 4.5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textDecoration: 'none',
              margin: '0 0 0.6rem',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.72')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {ex.artist}
          </a>

          {ex.title && (
            <p
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 'clamp(0.78rem, 1.2vw, 0.95rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.62)',
                margin: 0,
                lineHeight: 1.5,
                letterSpacing: '0.005em',
                maxWidth: 420,
              }}
            >
              {ex.title}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

     
      <div
        style={{
          position: 'absolute',
          bottom: '1.6rem',
          right: '2.75rem',
          zIndex: 10,
          display: 'flex',
          gap: '0.4rem',
          alignItems: 'center',
        }}
      >
        {exhibitions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '2rem' : '0.55rem',
              height: '1px',
              background: i === current ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'width 0.45s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </section>
  )
}