import SmoothScroll from './components/landing/SmoothScroll'
import InstrumentNav from './components/landing/InstrumentNav'
import NewHero from './components/landing/NewHero'
import BuiltOnStrip from './components/landing/BuiltOnStrip'
import FeatureGrid from './components/landing/FeatureGrid'
import HorizontalMechanics from './components/landing/HorizontalMechanics'
import LeadersSpotlight from './components/landing/LeadersSpotlight'
import ClosingSection from './components/landing/ClosingSection'
import MinimalFooter from './components/landing/MinimalFooter'

export default function Landing() {
  return (
    <>
      <SmoothScroll />
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          background: 'var(--s-ink-stage)',
          color: 'var(--s-ink-90)',
          overflowX: 'clip',
        }}
      >
        <InstrumentNav />
        <NewHero />
        <BuiltOnStrip />
        <FeatureGrid />
        <HorizontalMechanics />
        <LeadersSpotlight />
        <ClosingSection />
        <MinimalFooter />
      </div>
    </>
  )
}
