'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const footerLinks = {
  Gallery: ['Exhibitions', 'Collection', 'Artists', 'Archive'],
  Visit: ['Opening Hours', 'Location', 'Private Events', 'Press'],
  'Get In Touch': ['Inquire About a Work', 'Artist Submissions', 'Newsletter', 'Instagram'],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  })

  const y = useTransform(scrollYProgress, [0, 0.4], [-60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer 
      ref={containerRef}
      style={{ 
        background: 'var(--color-text)', 
        color: 'var(--color-base)', 
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden' 
      }}
    >
      <motion.div style={{ y, opacity }}>
        <div className="newsletter-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h3 className="newsletter-title">Join our list</h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {submitted ? (
              <p className="success-msg">You're on the list. Welcome.</p>
            ) : (
              <form onSubmit={handleSubmit} className="footer-form">
                <div className="input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                  <button type="submit">Subscribe →</button>
                </div>
                <p className="helper-text">
                  Sign up to receive emails featuring the latest news and events.
                </p>
              </form>
            )}
          </motion.div>
        </div>

        <div className="links-grid">
          <div className="brand-column">
            <div className="logo-block">
              <p className="logo-main">Morodo</p>
              <p className="logo-sub">Gallery — Lagos</p>
            </div>

            <p className="address">
              14, Eko Hotel Way, Ikoyi <br />
              Lagos, Nigeria 
            </p>

            <div className="hours-grid">
              {[
                { label: 'Tue — Sat', hours: '10:00 — 18:00' },
                { label: 'Sunday', hours: '12:00 — 17:00' },
                { label: 'Monday', hours: 'Closed' },
              ].map((h) => (
                <div key={h.label} style={{ display: 'contents' }}>
                  <span className="hour-label">{h.label}</span>
                  <span className="hour-time">{h.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="link-column">
              <p className="column-title">{section}</p>
              <ul className="link-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="nav-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bottom-bar">
          <p>© 2025 Morodo Gallery Ltd. All rights reserved.</p>
          <div className="bottom-links">
            {['Privacy', 'Terms', 'Accessibility'].map((item) => (
              <a key={item} href="#" className="legal-link">{item}</a>
            ))}
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .newsletter-section {
          border-bottom: 1px solid rgba(250,249,246,0.1);
          padding: clamp(3.5rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          align-items: center;
        }

        .newsletter-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4vw, 4.5rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1;
          color: var(--color-base);
        }

        .input-wrap {
          display: flex;
          border-bottom: 1px solid rgba(250,249,246,0.2);
          margin-bottom: 1rem;
        }

        .input-wrap input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          padding: 1.2rem 0;
          font-family: var(--inter-font, system-ui);
          font-size: 0.85rem;
          color: var(--color-base);
          font-weight: 300;
        }

        .input-wrap button {
          background: transparent;
          border: none;
          color: var(--color-accent);
          font-family: var(--inter-font, system-ui);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          padding-left: 2rem;
        }

        .helper-text {
          font-family: var(--inter-font, system-ui);
          font-size: 0.55rem;
          color: rgba(250,249,246,0.3);
          letter-spacing: 0.05em;
        }

        .success-msg {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--color-base);
          opacity: 0.8;
        }

        .links-grid {
          display: grid;
          grid-template-columns: 2fr repeat(auto-fill, minmax(160px, 1fr));
          gap: 4rem;
          padding: clamp(4rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem);
          border-bottom: 1px solid rgba(250,249,246,0.06);
        }

        .logo-block { margin-bottom: 3rem; }

        .logo-main {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .logo-sub {
          font-family: var(--inter-font, system-ui);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent);
        }

        .address {
          font-family: var(--inter-font, system-ui);
          font-size: 0.75rem;
          line-height: 1.8;
          color: rgba(250,249,246,0.45);
          font-weight: 300;
          margin-bottom: 2.5rem;
          max-width: 240px;
        }

        .hours-grid {
          display: grid;
          grid-template-columns: 90px 1fr;
          row-gap: 0.7rem;
        }

        .hour-label {
          font-family: var(--inter-font, system-ui);
          font-size: 0.62rem;
          color: rgba(250,249,246,0.25);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .hour-time {
          font-family: var(--inter-font, system-ui);
          font-size: 0.62rem;
          color: rgba(250,249,246,0.5);
          letter-spacing: 0.02em;
        }

        .column-title {
          font-family: var(--inter-font, system-ui);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(250,249,246,0.3);
          margin-bottom: 2rem;
        }

        .link-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.9rem; }

        .nav-link {
          text-decoration: none;
          font-family: var(--inter-font, system-ui);
          font-size: 0.72rem;
          color: rgba(250,249,246,0.5);
          font-weight: 300;
          transition: color 0.3s ease;
        }

        .nav-link:hover { color: var(--color-base); }

        .bottom-bar {
          padding: 2rem clamp(1.5rem, 5vw, 4rem);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .bottom-bar p {
          font-family: var(--inter-font, system-ui);
          font-size: 0.58rem;
          color: rgba(250,249,246,0.15);
          letter-spacing: 0.02em;
        }

        .bottom-links { display: flex; gap: 2.5rem; }

        .legal-link {
          text-decoration: none;
          font-family: var(--inter-font, system-ui);
          font-size: 0.58rem;
          color: rgba(250,249,246,0.15);
          transition: color 0.3s ease;
        }

        .legal-link:hover { color: rgba(250,249,246,0.4); }

        @media (max-width: 1024px) {
          .links-grid { grid-template-columns: 1fr repeat(auto-fill, minmax(180px, 1fr)); }
        }

        @media (max-width: 768px) {
          .links-grid { grid-template-columns: 1fr; gap: 4rem; }
          .brand-column { border-bottom: 1px solid rgba(250,249,246,0.06); padding-bottom: 4rem; }
          .bottom-bar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  )
}