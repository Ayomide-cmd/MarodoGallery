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

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '6%'])

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingLeft: '3rem',
        paddingRight: '4rem',
        paddingBottom: '6rem',
      }}
    >
      
      <motion.div style={{ position: 'absolute', inset: '-12% 0', y: bgY }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url(https://i.pinimg.com/736x/4d/b4/50/4db450b93d780015a70348792bb1890a.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(18,13,11,0.85) 0%, rgba(18,13,11,0.62) 55%, rgba(18,13,11,0.28) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(18,13,11,0.6) 0%, transparent 40%)',
          }}
        />
      </motion.div>

      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundSize: '200px',
          pointerEvents: 'none',
        }}
      />


      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: contentOpacity,
          y: contentY,
          maxWidth: '820px',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.58rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'rgba(250,249,246,0.45)',
            marginBottom: '1.5rem',
          }}
        >
          Lagos, Nigeria — Est. 2019
        </motion.p>

        {titleLines.map((line, i) => (
          <div key={line} style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.0, delay: 0.4 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.5rem, 7.5vw, 8.5rem)',
                fontWeight: 300,
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
                color: 'var(--color-base)',
                display: 'block',
                fontStyle: i === 2 ? 'italic' : 'normal',
              }}
            >
              {line}
            </motion.h1>
          </div>
        ))}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '56px',
            height: '1px',
            background: 'var(--color-accent)',
            margin: '2rem 0',
            transformOrigin: 'left center',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.0 }}
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.78rem',
            letterSpacing: '0.02em',
            color: 'rgba(250,249,246,0.5)',
            maxWidth: '320px',
            lineHeight: 1.85,
            fontWeight: 300,
            marginBottom: '2.5rem',
          }}
        >
          A curated space for contemporary fine art, sculpture, and photography.
          Discover works that challenge, inspire, and endure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          style={{ display: 'flex', gap: '1.75rem', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#collection"
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              padding: '0.8rem 1.75rem',
              background: 'var(--color-accent)',
              color: 'var(--color-base)',
              transition: 'opacity 0.25s ease',
              textDecoration: 'none',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            View Collection
          </a>
          <a
            href="#exhibitions"
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(250,249,246,0.6)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.25s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-base)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(250,249,246,0.6)')}
          >
            Exhibitions <span style={{ fontSize: '0.9rem' }}>→</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.5rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(250,249,246,0.35)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll to explore
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(250,249,246,0.25)',
            transformOrigin: 'top',
          }}
        />
      </motion.div>

      {/* Bottom ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.9 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid rgba(250,249,246,0.07)',
          padding: '0.9rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
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
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              color: 'rgba(250,249,246,0.28)',
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