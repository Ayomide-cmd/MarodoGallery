'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)

  const x = useSpring(0, { damping: 30, stiffness: 400, mass: 0.4 })
  const y = useSpring(0, { damping: 30, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    document.documentElement.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
      document.documentElement.removeEventListener('mouseenter', enter)
    }
  }, [visible, x, y])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--color-accent)',
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 100000,
        opacity: visible ? 0.85 : 0,
        transition: 'opacity 0.2s ease',
      }}
    />
  )
}