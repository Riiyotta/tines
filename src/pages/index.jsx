import { useEffect } from 'react'
import { initMotion } from '../motion/initMotion.js'
import Hero from '../components/Hero.jsx'
import MonitorBanner from '../components/MonitorBanner.jsx'
import SolutionPanel from '../components/SolutionPanel.jsx'
import UseCases from '../components/UseCases.jsx'
import WhyTines from '../components/WhyTines.jsx'
import CtaStartToday from '../components/CtaStartToday.jsx'

export const title = 'Tines | The secure environment for AI agents, apps and automation'

export default function Home() {
  useEffect(() => initMotion(), [])
  return (
    <>
      <Hero />
      <MonitorBanner />
      <SolutionPanel />
      <UseCases />
      <WhyTines />
      <CtaStartToday />
    </>
  )
}
