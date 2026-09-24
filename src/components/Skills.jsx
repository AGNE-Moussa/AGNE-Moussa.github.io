import { motion } from 'framer-motion'
import Reveal from './Reveal'
import { SKILLS } from '../data'

export default function Skills() {
  return (
    <section className="block light" id="competences">
      <div className="wrap">
        <Reveal as="h2">Compétences</Reveal>
        <div className="skills">
          {SKILLS.map((g, gi) => (
            <Reveal key={g.group} delay={gi * 0.06} className="skill-group">
              <h3>{g.group}</h3>
              <ul>
                {g.items.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + gi * 0.06 + i * 0.04, duration: 0.35 }}
                  >
                    {it}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
