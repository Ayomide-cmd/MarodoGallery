'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const titleLines = ['Where Art', 'Finds Its', 'Voice.']

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingLeft: '4rem',
        paddingRight: '4rem',
      }}
    >
      
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10% 0',
          y: bgY,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2200&q=85)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(20,16,14,0.80) 0%, rgba(20,16,14,0.55) 60%, rgba(20,16,14,0.30) 100%)',
          }}
        />
      </motion.div>

      {/* Noise texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: contentOpacity,
          y: contentY,
          maxWidth: '900px',
        }}
      >
        
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(250, 249, 246, 0.5)',
            marginBottom: '2rem',
          }}
        >
          Lagos, Nigeria — Est. 2019
        </motion.p>

        
        {titleLines.map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '105%', skewY: 2 }}
              animate={{ y: '0%', skewY: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.35 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(4.5rem, 10vw, 11rem)',
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'var(--color-base)',
                display: 'block',
                marginBottom: '0.08em',
                fontStyle: i === 2 ? 'italic' : 'normal',
              }}
            >
              {line}
            </motion.h1>
          </div>
        ))}

        {/* Terracotta divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '72px',
            height: '1px',
            background: 'var(--color-accent)',
            margin: '2.8rem 0',
            transformOrigin: 'left center',
          }}
        />

        {/* Subtitle */}
        <motion.p
          style={{ y: subtitleY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.0 }}
        >
          <span
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              color: 'rgba(250, 249, 246, 0.55)',
              maxWidth: '300px',
              lineHeight: 1.9,
              fontWeight: 300,
              display: 'block',
            }}
          >
            A curated space for contemporary fine art, sculpture, and photography.
            Discover works that challenge, inspire, and endure.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: '3rem' }}
        >
          <a
            href="#collection"
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.85rem 2rem',
              background: 'var(--color-accent)',
              color: 'var(--color-base)',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            View Collection
          </a>
          <a
            href="#exhibitions"
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250,249,246,0.65)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = 'var(--color-base)')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = 'rgba(250,249,246,0.65)')
            }
          >
            Current Exhibitions
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.55rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(250,249,246,0.4)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '48px',
            background: 'rgba(250,249,246,0.3)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>

      {/* Bottom info ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(250,249,246,0.08)',
          padding: '1rem 4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {[
          'Now Showing: Fluid Geometries — Emeka Obi',
          '12 Artists in Residence',
          'Opening: Earth & Memory — Jan 15, 2025',
        ].map((text) => (
          <span
            key={text}
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: 'rgba(250,249,246,0.35)',
              textTransform: 'uppercase',
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </section>
  )
}