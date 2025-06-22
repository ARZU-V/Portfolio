
import { BrowserRouter } from 'react-router-dom'
import { SlideTabsExample} from './components/NavBar'

import HeroSection from './components/HeroSection'
import { BackgroundBeams,} from './components/ui/Background'
import Skill from './components/Skill'
import AboutSection from './components/AboutMeSection'
import ProjectsSection from './components/ProjectsSection'

export default function App() {
  return (
    
    <BrowserRouter>
    <div className='  bg-black'>
      
      {/* <GridBackgroundDemo></GridBackgroundDemo> */}
      
      <SlideTabsExample></SlideTabsExample>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
     <Skill></Skill>
     <ProjectsSection></ProjectsSection>
          {/* <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas /> */}
    </div>
    </BrowserRouter>
  )
}
