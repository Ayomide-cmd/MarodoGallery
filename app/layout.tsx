import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--inter-font',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Morodo Gallery — Contemporary Art, Lagos',
  description:
    'A curated space for contemporary fine art, sculpture, and photography in Lagos, Nigeria. Discover works that challenge, inspire, and endure.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable}`}
        style={{ fontFamily: 'var(--inter-font, system-ui, sans-serif)' }}
      >
        {children}
      </body>
    </html>
  )
}