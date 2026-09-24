import { motion } from 'framer-motion'
import Walker from './Walker'
import CodeWindow from './CodeWindow'
import { GithubIcon, LinkedinIcon } from './Icons'
import { PROFILE } from '../data'

const fade = (d) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap hero-inner">
        <motion.div className="hero-walker" {...fade(0.1)}>
          <Walker />
        </motion.div>
        <div className="hero-text">
          <motion.p className="hero-hello" {...fade(0.2)}>
            Bonjour, je m'appelle {PROFILE.name}.
          </motion.p>
          <motion.h1 {...fade(0.3)}>Des outils web pour la recherche et la santé numérique</motion.h1>
          <motion.p className="hero-role" {...fade(0.45)}>
            Ingénieur de recherche au <strong>CNRS</strong> et développeur full stack. Je construis des applications
            fiables avec Python, Symfony et React, et j'intègre l'IA quand elle sert vraiment l'usage.
          </motion.p>
          <motion.div className="hero-actions" {...fade(0.6)}>
            <a className="btn primary" href="#projets">
              Voir mes projets
            </a>
            <a className="btn ghost" href="#contact">
              Me contacter
            </a>
            <a className="icon-btn" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a className="icon-btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </motion.div>
          <motion.div {...fade(0.75)}>
            <CodeWindow />
          </motion.div>
        </div>
      </div>
      <a className="scroll-hint" href="#apropos" aria-label="Descendre vers la section À propos">
        <span />
      </a>
    </section>
  )
}
