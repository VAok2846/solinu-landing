import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Integrations from '../components/Integrations'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Leaders from '../components/Leaders'
import FAQ from '../components/FAQ'
import Closing from '../components/Closing'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Integrations />
      <Features />
      <HowItWorks />
      <Leaders />
      <FAQ />
      <Closing />
      <Footer />
    </main>
  )
}
