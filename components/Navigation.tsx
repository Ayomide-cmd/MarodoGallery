'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['Exhibitions', 'Artists', 'Collection', 'Visit']

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoColor = scrolled || menuOpen ? 'var(--color-text)' : 'var(--color-base)'
  const subColor  = scrolled || menuOpen ? 'var(--color-accent)' : 'rgba(250,249,246,0.45)'
  const navBg     = scrolled || menuOpen ? 'rgba(250,249,246,0.97)' : 'transparent'
  const burgerColor = logoColor

  return (
    <>
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
          padding: '1.1rem 1.5rem',
          background: navBg,
          backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
          borderBottom: scrolled && !menuOpen ? '1px solid rgba(45,41,38,0.07)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none', flexShrink: 0, zIndex: 10 }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: logoColor,
            transition: 'color 0.4s ease',
            display: 'block',
            lineHeight: 1,
          }}>
            Morodo
          </span>
          <span style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.46rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: subColor,
            transition: 'color 0.4s ease',
            display: 'block',
            marginTop: '3px',
          }}>
            Gallery — Lagos
          </span>
        </a>

        {/* Desktop links — hidden on mobile via inline media-style class */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((item) => (
            <DesktopLink key={item} href={`#${item.toLowerCase()}`} scrolled={scrolled}>
              {item}
            </DesktopLink>
          ))}
          <a
            href="#inquire"
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.56rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '0.5rem 1.1rem',
              border: `1px solid ${scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.35)'}`,
              color: scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.85)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)'
              e.currentTarget.style.color = 'var(--color-base)'
              e.currentTarget.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.85)'
              e.currentTarget.style.borderColor = scrolled ? 'var(--color-accent)' : 'rgba(250,249,246,0.35)'
            }}
          >
            Inquire
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'flex-end',
            zIndex: 10,
          }}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: burgerColor, transformOrigin: 'center', borderRadius: '1px' }}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'block', width: '15px', height: '1.5px', background: burgerColor, borderRadius: '1px' }}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'block', width: '22px', height: '1.5px', background: burgerColor, transformOrigin: 'center', borderRadius: '1px' }}
          />
        </button>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="nav-mobile-menu"
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              zIndex: 998,
              background: 'rgba(250,249,246,0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(45,41,38,0.08)',
              padding: '1.25rem 1.5rem 2rem',
            }}
          >
            {navLinks.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.055, duration: 0.28 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  fontWeight: 300,
                  color: 'var(--color-text)',
                  textDecoration: 'none',
                  padding: '0.65rem 0',
                  borderBottom: '1px solid rgba(45,41,38,0.06)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#inquire"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.26, duration: 0.28 }}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                padding: '1.1rem 0 0',
                color: 'var(--color-accent)',
                textDecoration: 'none',
              }}
            >
              Inquire →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-hamburger { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}

function DesktopLink({ href, scrolled, children }: { href: string; scrolled: boolean; children: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--inter-font, system-ui)',
        fontSize: '0.58rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--color-accent)' : scrolled ? 'var(--color-text)' : 'rgba(250,249,246,0.8)',
        transition: 'color 0.25s ease',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  )
}