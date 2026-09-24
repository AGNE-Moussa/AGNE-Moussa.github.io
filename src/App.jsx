import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import { PROFILE } from './data'

export default function App() {
  return (
    <>
      <a className="skip" href="#apropos">Aller au contenu</a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>Conçu et développé avec React, Vite et Framer Motion.</span>
        </div>
      </footer>
    </>
  )
}
