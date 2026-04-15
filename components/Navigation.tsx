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

  const linkColor = scrolled ? 'var(--color-text)' : 'rgba(250,249,246,0.8)'
  const logoColor = scrolled ? 'var(--color-text)' : 'var(--color-base)'
  const subColor = scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.45)'

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: scrolled ? '1.1rem 2.5rem' : '1.75rem 2.5rem',
        background: scrolled ? 'rgba(250,249,246,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(45,41,38,0.07)' : 'none',
        transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none' }}>
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 400,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: logoColor,
            transition: 'color 0.45s ease',
            display: 'block',
            lineHeight: 1,
          }}
        >
          Morodo
        </span>
        <span
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.5rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: subColor,
            transition: 'color 0.45s ease',
            display: 'block',
            marginTop: '3px',
          }}
        >
          Gallery — Lagos
        </span>
      </a>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
        {navLinks.map((item) => (
          <NavLink key={item} href={`#${item.toLowerCase()}`} color={linkColor}>
            {item}
          </NavLink>
        ))}

        {/* Inquire CTA */}
        <a
          href="#inquire"
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.6rem',
            fontWeight: 400,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '0.55rem 1.25rem',
            border: `1px solid ${scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.35)'}`,
            color: scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.8)',
            transition: 'all 0.3s ease',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.background = 'var(--color-accent)'
            el.style.color = 'var(--color-base)'
            el.style.borderColor = 'var(--color-accent)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.background = 'transparent'
            el.style.color = scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.8)'
            el.style.borderColor = scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.35)'
          }}
        >
          Inquire
        </a>
      </div>
    </motion.nav>
  )
}

function NavLink({
  href,
  color,
  children,
}: {
  href: string
  color: string
  children: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--inter-font, system-ui)',
        fontSize: '0.6rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--color-accent)' : color,
        transition: 'color 0.25s ease',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  )
}