import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import Reveal from './Reveal'
import Terminal from './Terminal'
import { GithubIcon } from './Icons'
import { FEATURED, FILTERS, PROJECTS } from '../data'

function TiltCard({ children }) {
  const [style, setStyle] = useState({})
  const onMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setStyle({
      transform: `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-3px)`,
      '--mx': `${(x + 0.5) * 100}%`,
      '--my': `${(y + 0.5) * 100}%`,
    })
  }
  return (
    <div className="tilt" style={style} onPointerMove={onMove} onPointerLeave={() => setStyle({})}>
      {children}
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('Tous')
  const list = PROJECTS.filter((p) => filter === 'Tous' || p.tags.includes(filter))

  return (
    <section className="block dark" id="projets">
      <div className="wrap">
        <Reveal as="h2">Projets</Reveal>

        <Reveal className="featured">
          <div className="featured-text">
            <p className="featured-badge">Projet phare</p>
            <h3>{FEATURED.name}</h3>
            <p className="featured-kind">{FEATURED.kind}</p>
            <p>{FEATURED.intro}</p>
            <ul>
              {FEATURED.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="featured-ai">{FEATURED.ai}</p>
            <ul className="chips on-dark" aria-label="Technologies">
              {FEATURED.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <a className="btn primary" href={FEATURED.url} target="_blank" rel="noreferrer">
              <GithubIcon /> Voir le code
            </a>
          </div>
          <div className="featured-visual">
            <Terminal />
          </div>
        </Reveal>

        <div className="filters" role="toolbar" aria-label="Filtrer les projets par technologie">
          {FILTERS.map((f) => (
            <button key={f} className={`filter ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)} aria-pressed={filter === f}>
              {filter === f && <motion.span layoutId="filter-pill" className="filter-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="filter-label">{f}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="grid">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                layout
                key={p.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <TiltCard>
                  <div className="card">
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <ul className="chips on-dark small">
                      {p.stack.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    {p.url ? (
                      <a className="card-link" href={p.url} target="_blank" rel="noreferrer">
                        Voir le code <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <span className="card-note">
                        <Lock size={14} /> {p.note}
                      </span>
                    )}
                  </div>
                </TiltCard>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="empty">Aucun projet public pour ce filtre pour l'instant.</p>}
      </div>
    </section>
  )
}
