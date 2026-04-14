'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = ['Exhibitions', 'Artists', 'Collection', 'Visit']

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '1.25rem 3rem' : '2rem 3rem',
        background: scrolled ? 'rgba(250, 249, 246, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(45, 41, 38, 0.08)' : 'none',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            fontWeight: 400,
            letterSpacing: '0.35em',
            color: scrolled ? 'var(--color-text)' : 'var(--color-base)',
            textTransform: 'uppercase',
            transition: 'color 0.5s ease',
            lineHeight: 1,
          }}
        >
          Morodo
        </span>
        <span
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            color: scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.55)',
            textTransform: 'uppercase',
            transition: 'color 0.5s ease',
          }}
        >
          Gallery — Lagos
        </span>
      </a>

      {/* Nav Links */}
      <ul
        style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
          alignItems: 'center',
        }}
      >
        {navLinks.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.65rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                color: scrolled ? 'var(--color-text)' : 'rgba(250, 249, 246, 0.75)',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                ;(e.target as HTMLElement).style.color = 'var(--color-accent)'
              }}
              onMouseLeave={(e) => {
                ;(e.target as HTMLElement).style.color = scrolled
                  ? 'var(--color-text)'
                  : 'rgba(250, 249, 246, 0.75)'
              }}
            >
              {item}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#inquire"
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.65rem',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.6rem 1.4rem',
              border: `1px solid ${scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.4)'}`,
              color: scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.85)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement
              el.style.background = 'var(--color-accent)'
              el.style.color = 'var(--color-base)'
              el.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement
              el.style.background = 'transparent'
              el.style.color = scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.85)'
              el.style.borderColor = scrolled
                ? 'var(--color-accent)'
                : 'rgba(250,249,246,0.4)'
            }}
          >
            Inquire
          </a>
        </li>
      </ul>
    </motion.nav>
  )
}