'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '120+', label: 'Works Sold' },
  { value: '18', label: 'Artists Represented' },
  { value: '6', label: 'Years in Lagos' },
  { value: '9', label: 'Group Exhibitions' },
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
    <section id="about" ref={sectionRef} style={{ background: 'var(--color-sand)', position: 'relative', overflow: 'hidden' }}>

      
      <div style={{ padding: '8rem 4rem', borderBottom: '1px solid rgba(45, 41, 38, 0.1)' }}>
        <motion.div style={{ y: quoteY }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '3rem',
            }}
          >
            Our Philosophy
          </motion.p>
          <div style={{ overflow: 'hidden' }}>
            <motion.blockquote
              initial={{ y: '60%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4.5vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.2,
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
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--color-text)',
              opacity: 0.4,
              marginTop: '2rem',
            }}
          >
            — Amara Okonkwo, Founder & Director, Morodo Gallery
          </motion.p>
        </motion.div>
      </div>

      {/* Two column section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }}>
        {/* Image */}
        {/* 
          TO USE YOUR OWN GALLERY PHOTO:
          Replace the src below with: '/images/gallery-interior.jpg'
          Put the file in: /public/images/
        */}
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-sand-dark)' }}>
          <motion.img
            src="https://images.unsplash.com/photo-1605429523419-d828acb941d9?auto=format&fit=crop&w=900&q=80"
            alt="Morodo Gallery interior"
            style={{ width: '100%', height: '110%', objectFit: 'cover', display: 'block', y: imageY }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(45, 41, 38, 0.08)' }} />
        </div>

        {/* Text */}
        <div
          style={{
            padding: '6rem 5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3vw, 3rem)',
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
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--color-accent)',
              transformOrigin: 'left',
            }}
          />

          {[
            'Morodo Gallery opened in 2019 with a single room and six paintings. Today we represent eighteen artists from across Nigeria, with works in private collections on four continents.',
            'We believe a gallery is not just a room — it is an argument for why art matters. Every exhibition is curated with the same question: what does this work ask of the person standing in front of it?',
            'Our programme moves between solo exhibitions, collaborative group shows, and an annual open-call that brings emerging voices into conversation with established names.',
          ].map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.82rem',
                lineHeight: 1.9,
                color: 'var(--color-text)',
                opacity: 0.62,
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
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ x: 5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginTop: '0.5rem',
            }}
          >
            Plan a Visit <span style={{ fontSize: '1rem' }}>→</span>
          </motion.a>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid rgba(45, 41, 38, 0.1)' }}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            style={{
              padding: '3.5rem 3rem',
              borderRight: i < stats.length - 1 ? '1px solid rgba(45,41,38,0.1)' : 'none',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '3.5rem',
                fontWeight: 300,
                color: 'var(--color-text)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                opacity: 0.4,
              }}
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}