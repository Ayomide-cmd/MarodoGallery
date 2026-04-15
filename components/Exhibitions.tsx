'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface Exhibition {
  id: number
  title: string
  subtitle: string
  dates: string
  artists: string[]
  image: string
  status: 'Now Showing' | 'Opening Soon' | 'Closed'
  description: string
}


const exhibitions: Exhibition[] = [
  {
    id: 1,
    title: 'Wooden Canvas',
    subtitle: 'Yinka Adekunle — Solo Exhibition',
    dates: '01 Nov — 20 Dec 2024',
    artists: ['Yinka Adekunle'],
    image:
      'https://i.pinimg.com/1200x/43/b9/08/43b9083da569c5fba7c058097cbfcbc4.jpg',
    status: 'Now Showing',
    description:
      "Yinka's breakthrough solo examines the tension between urban geometry and natural form through fifteen large-scale acrylic and wooden works.",
  },
  {
    id: 2,
    title: 'Earth & Memory',
    subtitle: 'A Group Exhibition',
    dates: '15 Jan — 28 Feb 2025',
    artists: ['Adaeze Nwosu', 'Kemi Lawal', 'Ngozi Eze'],
    image:
      'https://i.pinimg.com/736x/30/fb/e5/30fbe52e5a10ce351038b9d16e2e4514.jpg',
    status: 'Opening Soon',
    description:
      "Three voices, one conversation about land, loss, and the materials of memory. Featuring oil, ceramic, and mixed-media works from Nigeria's most vital voices.",
  },
  {
    id: 3,
    title: 'Photographs from the North',
    subtitle: 'Femi Adeyemi & Zainab Musa',
    dates: '15 Sep — 30 Oct 2024',
    artists: ['Femi Adeyemi', 'Zainab Musa'],
    image:
      'https://i.pinimg.com/1200x/30/95/d8/3095d8134f8d473b057612743631970f.jpg',
    status: 'Closed',
    description:
      'An intimate documentary collaboration — forty large-format photographs capturing daily life, ritual, and identity across northern Nigeria.',
  },
]

const statusColors: Record<Exhibition['status'], { bg: string; color: string }> = {
  'Now Showing': { bg: 'var(--color-accent)', color: 'var(--color-base)' },
  'Opening Soon': { bg: 'var(--color-sage)', color: 'var(--color-base)' },
  Closed: { bg: 'transparent', color: 'var(--color-text)' },
}

function ExhibitionCard({ ex, index }: { ex: Exhibition; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const statusStyle = statusColors[ex.status]

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: index % 2 === 0 ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
        gap: '4rem',
        alignItems: 'center',
        marginBottom: '8rem',
      }}
    >
     
      <div
        style={{
          order: index % 2 === 0 ? 0 : 1,
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '4/3',
          background: 'var(--color-sand)',
        }}
      >
        <motion.img
          src={ex.image}
          alt={ex.title}
          style={{ width: '100%', height: '110%', objectFit: 'cover', display: 'block', y: imageY }}
        />
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            background: ex.status === 'Closed' ? 'rgba(250,249,246,0.85)' : statusStyle.bg,
            color: statusStyle.color,
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '0.35rem 0.85rem',
            border: ex.status === 'Closed' ? '1px solid rgba(45,41,38,0.2)' : 'none',
          }}
        >
          {ex.status}
        </div>
      </div>

     
      <div style={{ order: index % 2 === 0 ? 1 : 0 }}>
        <p
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            marginBottom: '1rem',
          }}
        >
          {ex.dates}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: 'var(--color-text)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          {ex.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            fontStyle: 'italic',
            color: 'var(--color-text)',
            opacity: 0.55,
            marginBottom: '2rem',
          }}
        >
          {ex.subtitle}
        </p>
        <div
          style={{ width: '40px', height: '1px', background: 'var(--color-accent)', marginBottom: '2rem' }}
        />
        <p
          style={{
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.8rem',
            lineHeight: 1.9,
            color: 'var(--color-text)',
            opacity: 0.6,
            marginBottom: '2.5rem',
            fontWeight: 300,
            letterSpacing: '0.02em',
          }}
        >
          {ex.description}
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {ex.artists.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: 'var(--inter-font, system-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.35rem 0.9rem',
                border: '1px solid rgba(45,41,38,0.2)',
                color: 'var(--color-text)',
                opacity: 0.7,
              }}
            >
              {name}
            </span>
          ))}
        </div>
        {ex.status !== 'Closed' && (
          <motion.a
            href="#"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}
          >
            View Exhibition <span style={{ fontSize: '1rem' }}>→</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default function Exhibitions() {
  return (
    <section id="exhibitions" style={{ background: 'var(--color-base)', padding: '8rem 4rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '6rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(45,41,38,0.1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: 'var(--inter-font, system-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '0.6rem',
            }}
          >
            On the Walls
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: 'var(--color-text)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}
          >
            Exhibitions
          </h2>
        </motion.div>

        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          whileHover={{ x: 4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontFamily: 'var(--inter-font, system-ui)',
            fontSize: '0.62rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            opacity: 0.45,
          }}
        >
          Archive <span style={{ fontSize: '1rem' }}>→</span>
        </motion.a>
      </div>

      {exhibitions.map((ex, i) => (
        <ExhibitionCard key={ex.id} ex={ex} index={i} />
      ))}
    </section>
  )
}