'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const footerLinks = {
  Gallery: ['Exhibitions', 'Collection', 'Artists', 'Archive'],
  Visit: ['Opening Hours', 'Location', 'Private Events', 'Press'],
  'Get In Touch': ['Inquire About a Work', 'Artist Submissions', 'Newsletter', 'Instagram'],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer style={{ background: 'var(--color-text)', color: 'var(--color-base)', position: 'relative', overflow: 'hidden' }}>

      
      <div
        style={{
          borderBottom: '1px solid rgba(250,249,246,0.1)',
          padding: '5rem 4rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.1,
              marginBottom: '1rem',
              color: 'var(--color-base)',
            }}
          >
            Stay close<br />to the work.
          </h3>
          <p
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.75rem',
              color: 'rgba(250,249,246,0.45)',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            Opening announcements, artist features, and first access to new acquisitions.
            
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: 'var(--color-base)',
                opacity: 0.7,
              }}
            >
              You're on the list. Welcome.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(250,249,246,0.25)' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '1rem 0',
                    fontFamily: 'var(--inter-font, system-ui)',
                    fontSize: '0.8rem',
                    color: 'var(--color-base)',
                    fontWeight: 300,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--inter-font, system-ui)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '1rem 0 1rem 1.5rem',
                    transition: 'opacity 0.3s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.7')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
                >
                  Subscribe →
                </button>
              </div>
              <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.55rem', color: 'rgba(250,249,246,0.3)', letterSpacing: '0.08em' }}>
                No spam, ever. Unsubscribe at any time.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          padding: '5rem 4rem',
          borderBottom: '1px solid rgba(250,249,246,0.08)',
        }}
      >
        <div>
          <div style={{ marginBottom: '2.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--color-base)',
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}
            >
              Morodo
            </p>
            <p
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
              }}
            >
              Gallery — Lagos
            </p>
          </div>

          <p
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.75rem',
              lineHeight: 1.9,
              color: 'rgba(250,249,246,0.45)',
              fontWeight: 300,
              maxWidth: '280px',
              marginBottom: '2rem',
            }}
          >
            14,Eko Hotel Way, Ikoyi <br />
            Lagos, Nigeria 
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { label: 'Tue — Sat', hours: '10:00 — 18:00' },
              { label: 'Sunday', hours: '12:00 — 17:00' },
              { label: 'Monday', hours: 'Closed' },
            ].map((h) => (
              <div key={h.label} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.62rem', color: 'rgba(250,249,246,0.3)', minWidth: '80px' }}>
                  {h.label}
                </span>
                <span style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.62rem', color: 'rgba(250,249,246,0.55)' }}>
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </div>


        {Object.entries(footerLinks).map(([section, links]) => (
          <div key={section}>
            <p
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(250,249,246,0.35)',
                marginBottom: '1.5rem',
              }}
            >
              {section}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      fontFamily: 'var(--inter-font, system-ui)',
                      fontSize: '0.72rem',
                      color: 'rgba(250,249,246,0.55)',
                      fontWeight: 300,
                      transition: 'color 0.25s ease',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--color-base)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,249,246,0.55)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(250,249,246,0.2)' }}>
          © 2025 Morodo Gallery Ltd. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Terms', 'Accessibility'].map((item) => (
            <a
              key={item}
              href="#"
              style={{ fontFamily: 'var(--inter-font, system-ui)', fontSize: '0.58rem', color: 'rgba(250,249,246,0.2)', transition: 'color 0.25s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,249,246,0.5)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,249,246,0.2)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}