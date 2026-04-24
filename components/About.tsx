'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { label: 'Exhibitions', value: '42' },
  { label: 'Artists', value: '18' },
  { label: 'Years', value: '07' },
  { label: 'Cities', value: '04' },
]

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
            'Morodo Gallery opened in 2019 with a single room and six paintings. Today we represent eighteen artists from across Nigeria, with works in private collections on four continents.',
            'Our programme moves between solo exhibitions, collaborative group shows, and an annual open-call that brings emerging voices into conversation with established names.',
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

      
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(45,41,38,0.1)' }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.08 }}
            style={{
              padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1rem, 3vw, 3rem)',
              borderRight: i < stats.length - 1 ? '1px solid rgba(45,41,38,0.1)' : 'none',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 300,
              color: 'var(--color-text)',
              lineHeight: 1,
              marginBottom: '0.4rem',
            }}>
              {stat.value}
            </p>
            <p style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: 'clamp(0.48rem, 1vw, 0.6rem)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              opacity: 0.38,
            }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(45,41,38,0.1);
          }
        }
      `}</style>
    </section>
  )
}