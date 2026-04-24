'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const quoteY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: 'var(--color-sand)', position: 'relative', overflow: 'hidden' }}
    >
      
      {/* 1. Philosophy Quote Section */}
      <div style={{ padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)', borderBottom: '1px solid rgba(45,41,38,0.1)' }}>
        <motion.div style={{ y: quoteY }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '2rem',
            }}
          >
            Our Philosophy
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.blockquote
              initial={{ y: '60%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.65rem, 4.5vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.25,
                color: 'var(--color-text)',
                maxWidth: '900px',
                letterSpacing: '-0.01em',
              }}
            >
              "Art doesn't need to explain itself. It only needs space to be seen — and
              people willing to look."
            </motion.blockquote>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              color: 'var(--color-text)',
              opacity: 0.38,
              marginTop: '1.75rem',
            }}
          >
            — Adetomiwa Stephanie, Founder & Director, Morodo Gallery
          </motion.p>
        </motion.div>
      </div>

      {/* 2. Content Grid Section */}
      <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-sand-dark)', minHeight: '360px' }}>
          <motion.img
            src="https://images.unsplash.com/photo-1605429523419-d828acb941d9?auto=format&fit=crop&w=900&q=80"
            alt="Morodo Gallery interior"
            style={{
              width: '100%',
              height: '110%',
              objectFit: 'cover',
              display: 'block',
              y: imageY,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,41,38,0.08)' }} />
        </div>

        <div
          style={{
            padding: 'clamp(2.5rem, 6vw, 6rem) clamp(1.5rem, 5vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.5rem',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3vw, 3rem)',
              fontWeight: 300,
              color: 'var(--color-text)',
              lineHeight: 1.2,
            }}
          >
            A gallery built<br />
            <em>for the work.</em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ width: '36px', height: '1px', background: 'var(--color-accent)', transformOrigin: 'left' }}
          />

          {[
            'Morodo Gallery opened with a vision to champion contemporary African art. Today we represent exceptional artists, housing works that exist in conversation across continents.',
            'Our programme moves between solo exhibitions and collaborative group shows, prioritizing an environment where the work remains the primary focus.',
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: i * 0.1 }}
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: 'clamp(0.75rem, 1.5vw, 0.82rem)',
                lineHeight: 1.9,
                color: 'var(--color-text)',
                opacity: 0.6,
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              {para}
            </motion.p>
          ))}

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            whileHover={{ x: 4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.62rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              textDecoration: 'none',
            }}
          >
            Plan a Visit <span>→</span>
          </motion.a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
