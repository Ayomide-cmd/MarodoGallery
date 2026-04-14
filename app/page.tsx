import Navigation from '@/components/Navigation'
import CustomCursor from '@/components/CustomCursor'
import Hero from '@/components/Hero'
import HorizontalGallery from '@/components/HorizontalGallery'
import ArtistList from '@/components/ArtistList'
import Exhibitions from '@/components/Exhibitions'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
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