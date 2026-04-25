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
    image: 'https://i.pinimg.com/1200x/43/b9/08/43b9083da569c5fba7c058097cbfcbc4.jpg',
    status: 'Now Showing',
    description: "Yinka's breakthrough solo examines the tension between urban geometry and natural form through fifteen large-scale acrylic and wooden works.",
  },
  {
    id: 2,
    title: 'Ordinary',
    subtitle: 'A Group Exhibition',
    dates: '15 Jan — 28 Feb 2025',
    artists: ['Adaeze Nwosu', 'Kemi Lawal', 'Ngozi Eze'],
    image: 'https://i.pinimg.com/1200x/dd/cf/6d/ddcf6d1de4e596a76f15c69f0e8ce8db.jpg',
    status: 'Opening Soon',
    description: "Three voices, one conversation about land, loss, and the materials of memory. Featuring oil, ceramic, and mixed-media works from Nigeria's most vital voices.",
  },
  {
    id: 3,
    title: 'From The North',
    subtitle: 'Femi Adeyemi & Zainab Musa',
    dates: '15 Sep — 30 Oct 2024',
    artists: ['Femi Adeyemi', 'Zainab Musa'],
    image: 'https://i.pinimg.com/1200x/30/95/d8/3095d8134f8d473b057612743631970f.jpg',
    status: 'Closed',
    description: 'An intimate documentary collaboration — forty large-format photographs capturing daily life, ritual, and identity across northern Nigeria.',
  },
]

const statusColors: Record<Exhibition['status'], { bg: string; color: string }> = {
  'Now Showing': { bg: 'var(--color-accent)', color: 'var(--color-base)' },
  'Opening Soon': { bg: 'var(--color-sage, #78866b)', color: 'var(--color-base)' },
  'Closed': { bg: 'rgba(250,249,246,0.9)', color: 'var(--color-text)' },
}

function ExhibitionCard({ ex, index }: { ex: Exhibition; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -50])
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
      className={`exhibit-col col-${index}`}
    >
      <div 
        style={{ 
          position: 'relative', 
          overflow: 'hidden', 
          aspectRatio: index === 1 ? '3/4.5' : '3/4', 
          background: 'var(--color-sand)',
          marginBottom: '1.5rem'
        }}
      >
        <motion.img
          src={ex.image}
          alt={ex.title}
          style={{ width: '100%', height: '130%', objectFit: 'cover', display: 'block', y: imageY }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: statusColors[ex.status].bg,
          color: statusColors[ex.status].color,
          fontFamily: 'var(--inter-font)',
          fontSize: '0.45rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          padding: '0.3rem 0.7rem',
          zIndex: 2
        }}>
          {ex.status}
        </div>
      </div>

      <div>
        <p style={{ 
          fontFamily: 'var(--inter-font)', 
          fontSize: '0.55rem', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          color: 'var(--color-text)', 
          opacity: 0.5,
          marginBottom: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(0,0,0,0.06)'
        }}>
          {index === 0 ? ex.dates : ex.subtitle.split('—')[1] || 'Exhibition'}
        </p>
        <h3 style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '1.25rem', 
          fontWeight: 300, 
          lineHeight: 1.2, 
          color: 'var(--color-text)', 
          marginBottom: '0.5rem' 
        }}>
          {ex.title}
        </h3>
        <p style={{ 
          fontFamily: 'var(--font-serif)', 
          fontSize: '0.9rem', 
          fontStyle: 'italic', 
          color: 'var(--color-text)', 
          opacity: 0.5 
        }}>
          {ex.subtitle.split('—')[0]}
        </p>
      </div>
    </motion.div>
  )
}

export default function Exhibitions() {
  return (
    <section id="exhibitions" style={{ background: 'var(--color-base)', padding: '20vh 4vw' }}>
      <div className="masonry-grid">
        {exhibitions.map((ex, i) => (
          <ExhibitionCard key={ex.id} ex={ex} index={i} />
        ))}
      </div>

      <style jsx>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr 1fr;
          gap: 4rem;
          max-width: 1300px;
          margin: 0 auto;
          align-items: start;
        }

        .col-0 { margin-top: 15vh; }
        .col-1 { margin-top: 0; }
        .col-2 { margin-top: 8vh; }

        @media (max-width: 1024px) {
          .masonry-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
          .exhibit-col { margin-top: 0 !important; }
        }

        @media (max-width: 640px) {
          .masonry-grid {
            grid-template-columns: 1fr;
            gap: 8rem;
          }
        }
      `}</style>
    </section>
  )
}