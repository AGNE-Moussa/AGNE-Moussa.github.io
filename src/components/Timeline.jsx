import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal'
import { TIMELINE } from '../data'

export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section className="block light alt" id="parcours">
      <div className="wrap">
        <Reveal as="h2">Parcours</Reveal>
        <div className="tl" ref={ref}>
          <span className="tl-track" aria-hidden="true" />
          <motion.span className="tl-fill" style={{ scaleY: grow }} aria-hidden="true" />
          <ol className="timeline">
          {TIMELINE.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.05} className={e.current ? 'current' : ''}>
              <time>{e.date}</time>
              <div>
                <h3>{e.title}</h3>
                <p className="org">{e.org}</p>
                <p>{e.text}</p>
              </div>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
