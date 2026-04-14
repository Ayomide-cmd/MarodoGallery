'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)

  const x = useSpring(0, { damping: 28, stiffness: 350, mass: 0.5 })
  const y = useSpring(0, { damping: 28, stiffness: 350, mass: 0.5 })

  const xLag = useSpring(0, { damping: 40, stiffness: 150, mass: 1 })
  const yLag = useSpring(0, { damping: 40, stiffness: 150, mass: 1 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      xLag.set(e.clientX)
      yLag.set(e.clientY)
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
  }, [visible, x, y, xLag, yLag])

  return (
    <>
      {/* Outer lagging ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: xLag,
          top: yLag,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--color-accent)',
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 0.6 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Inner snappy dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: x,
          top: y,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </>
  )
}