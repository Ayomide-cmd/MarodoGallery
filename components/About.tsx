'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ 
        background: 'var(--color-sand)', 
        position: 'relative', 
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 10rem) 5vw'
      }}
    >
      <div className="about-container">
        <div className="about-grid">
          {/* IMAGE SIDE */}
          <div className="image-column">
            <div className="image-overflow-wrap">
              <motion.img
                src="https://images.unsplash.com/photo-1605429523419-d828acb941d9?auto=format&fit=crop&w=1200&q=80"
                alt="Morodo Gallery interior"
                style={{
                  width: '100%',
                  height: '120%',
                  objectFit: 'cover',
                  display: 'block',
                  y: imageY,
                }}
              />
            </div>
          </div>

          {/* TEXT SIDE */}
          <div className="text-column">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="about-title">
                A gallery built<br />
                <span className="serif-italic">for the work.</span>
              </h2>

              <div className="accent-line" />

              <div className="description-wrap">
                <p>
                  Morodo Gallery opened with a vision to champion contemporary African art. 
                  Today we represent exceptional artists, housing works that exist in 
                  conversation across continents.
                </p>
                <p>
                  Our programme moves between solo exhibitions and collaborative group shows, 
                  prioritizing an environment where the work remains the primary focus.
                </p>
              </div>

              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="visit-link"
              >
                Plan a Visit <span>→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(3rem, 8vw, 8rem);
          align-items: center;
        }

        .image-column {
          position: relative;
        }

        .image-overflow-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/5;
          background: var(--color-sand-dark, #e5e2da);
        }

        .text-column {
          display: flex;
          flex-direction: column;
        }

        .about-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4vw, 3.5rem);
          font-weight: 300;
          color: var(--color-text);
          line-height: 1.1;
          margin-bottom: 2rem;
          letter-spacing: -0.01em;
        }

        .serif-italic {
          font-style: italic;
          opacity: 0.8;
        }

        .accent-line {
          width: 40px;
          height: 1px;
          background: var(--color-accent);
          margin-bottom: 2.5rem;
        }

        .description-wrap p {
          font-family: var(--inter-font, system-ui);
          font-size: clamp(0.9rem, 1.2vw, 1rem);
          line-height: 1.8;
          color: var(--color-text);
          opacity: 0.7;
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .visit-link {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          font-family: var(--inter-font, system-ui);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text);
          text-decoration: none;
          margin-top: 1.5rem;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding-bottom: 6px;
          transition: border-color 0.3s ease;
        }

        .visit-link:hover {
          border-color: var(--color-accent);
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .text-column {
            order: 2;
          }

          .image-column {
            order: 1;
          }

          .image-overflow-wrap {
            aspect-ratio: 1/1;
          }
        }
      `}</style>
    </section>
  )
}