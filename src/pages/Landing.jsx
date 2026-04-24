import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Infrastructure from '../components/Infrastructure'
import Markets from '../components/Markets'
import Security from '../components/Security'
import TokenEarn from '../components/TokenEarn'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import SectionBg from '../components/SectionBg'
import SmoothScroll from '../components/SmoothScroll'

export default function Landing() {
  return (
    <SmoothScroll>
    <div className="relative min-h-screen bg-[#06060a]" style={{ overflowX: 'clip' }}>
      <Navbar />
      <Hero />

      <div className="glow-divider" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(153,69,255,0.05) 0%, transparent 60%)' }} />
        <div className="bg-orb bg-orb-1 w-[400px] h-[400px] 3xl:w-[600px] 3xl:h-[600px] 4xl:w-[800px] 4xl:h-[800px] top-[10%] left-[-5%] opacity-[0.04]" style={{ background: '#9945FF' }} />
        <div className="bg-orb bg-orb-2 w-[300px] h-[300px] 3xl:w-[450px] 3xl:h-[450px] 4xl:w-[600px] 4xl:h-[600px] top-[50%] right-[-3%] opacity-[0.03]" style={{ background: '#FFD700' }} />
        <Infrastructure />
      </div>

      <div className="glow-divider" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,215,0,0.045) 0%, transparent 60%)' }} />
        <div className="bg-orb bg-orb-2 w-[350px] h-[350px] 3xl:w-[520px] 3xl:h-[520px] 4xl:w-[700px] 4xl:h-[700px] top-[20%] right-[5%] opacity-[0.04]" style={{ background: '#FFD700' }} />
        <Markets />
      </div>

      <div className="glow-divider" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 20%, rgba(20,241,149,0.04) 0%, transparent 55%)' }} />
        <SectionBg preset="green" />
        <div className="bg-orb bg-orb-1 w-[500px] h-[500px] 3xl:w-[750px] 3xl:h-[750px] 4xl:w-[1000px] 4xl:h-[1000px] top-[5%] left-[10%] opacity-[0.035]" style={{ background: '#14F195' }} />
        <div className="bg-orb bg-orb-3 w-[300px] h-[300px] 3xl:w-[450px] 3xl:h-[450px] 4xl:w-[600px] 4xl:h-[600px] bottom-[10%] right-[15%] opacity-[0.03]" style={{ background: '#9945FF' }} />
        <Security />
      </div>

      <div className="glow-divider" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 70% 30%, rgba(255,215,0,0.045) 0%, transparent 60%)' }} />
        <SectionBg preset="gold" />
        <div className="bg-orb bg-orb-2 w-[400px] h-[400px] 3xl:w-[600px] 3xl:h-[600px] 4xl:w-[800px] 4xl:h-[800px] top-[15%] left-[-5%] opacity-[0.04]" style={{ background: '#FFD700' }} />
        <div className="bg-orb bg-orb-1 w-[350px] h-[350px] 3xl:w-[520px] 3xl:h-[520px] 4xl:w-[700px] 4xl:h-[700px] bottom-[5%] right-[10%] opacity-[0.035]" style={{ background: '#9945FF' }} />
        <TokenEarn />
      </div>

      <div className="glow-divider" />
      <div className="relative overflow-hidden">
        <div className="bg-orb bg-orb-3 w-[300px] h-[300px] 3xl:w-[450px] 3xl:h-[450px] 4xl:w-[600px] 4xl:h-[600px] top-[20%] left-[15%] opacity-[0.03]" style={{ background: '#9945FF' }} />
        <FAQ />
      </div>
      <div className="relative overflow-hidden">
        <SectionBg preset="purple" />
        <div className="bg-orb bg-orb-1 w-[500px] h-[500px] 3xl:w-[750px] 3xl:h-[750px] 4xl:w-[1000px] 4xl:h-[1000px] top-[10%] left-1/2 -translate-x-1/2 opacity-[0.04]" style={{ background: '#FFD700' }} />
        <CTA />
      </div>
      <Footer />
    </div>
    </SmoothScroll>
  )
}
