import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'
import { getPortfolioData } from '@/lib/data'

export const dynamic = 'force-static'

export default async function Home() {
  const data = await getPortfolioData()

  return (
    <>
      <Navbar personal={data.personal} />
      <main>
        <Hero personal={data.personal} />
        <About about={data.about} stats={data.stats} />
        <Projects projects={data.featuredProjects} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Education education={data.education} />
        <Certifications certifications={data.certifications} />
        <Contact personal={data.personal} />
      </main>
      <Footer personal={data.personal} />
    </>
  )
}
