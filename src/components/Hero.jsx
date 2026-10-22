import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Typewriter from './Typewriter'
import { GithubIcon, LinkedinIcon } from './Icons'
import { PROFILE, ROLES, STATS } from '../data'

const fade = (d) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-frame">
          <div className="hero-inner">
            <motion.div className="hero-photo" {...fade(0.1)}>
              <span className="blob-back" aria-hidden="true" />
              <span className="blob-ring" aria-hidden="true" />
              <img src={PROFILE.photo} alt={`Portrait de ${PROFILE.name}`} width="400" height="400" />
            </motion.div>
            <div className="hero-text">
              <motion.p className="hero-hello" {...fade(0.2)}>
                Bonjour, je suis
              </motion.p>
              <motion.h1 {...fade(0.3)}>{PROFILE.name}</motion.h1>
              <motion.p className="hero-roles" {...fade(0.4)}>
                Et je suis <Typewriter words={ROLES} />
              </motion.p>
              <motion.p className="hero-role" {...fade(0.5)}>
                Je construis des applications web fiables avec Python, Symfony et React, et je conçois des workflows
                de développement assistés par agents IA qui automatisent la revue, les tests et les contrôles qualité.
              </motion.p>
              <motion.div className="hero-social" {...fade(0.6)}>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <GithubIcon />
                </a>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
                <a href={`mailto:${PROFILE.email}`} aria-label="E-mail">
                  <Mail size={18} />
                </a>
              </motion.div>
              <motion.div className="hero-actions" {...fade(0.7)}>
                <a className="btn primary" href="#projets">
                  Voir mes projets
                </a>
                <a className="btn ghost" href="#contact">
                  Me contacter
                </a>
              </motion.div>
            </div>
          </div>
          <motion.ul className="stats" {...fade(0.85)}>
            {STATS.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
