import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import HorizontalGallery from '@/components/HorizontalGallery'
import ArtistList from '@/components/ArtistList'
import Exhibitions from '@/components/Exhibitions'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main style={{ position: 'relative', zIndex: 2, background: 'var(--color-base)' }}>
        <Hero />
        <HorizontalGallery />
        <ArtistList />
        <Exhibitions />
        <About />
      </main>
      <Footer />
    </>
  )
}