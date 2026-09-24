import Reveal from './Reveal'
import { NOW } from '../data'

export default function About() {
  return (
    <section className="block light" id="apropos">
      <div className="wrap">
        <Reveal as="h2">À propos</Reveal>
        <div className="two">
          <div>
            <Reveal as="p" className="lead">
              Je conçois des applications web fiables et maintenables, du back-end à l'interface, jusqu'au déploiement
              conteneurisé.
            </Reveal>
            <Reveal as="p" delay={0.08}>
              Diplômé du Master Informatique de l'INSA Hauts-de-France (parcours Technologies Nouvelles des Systèmes
              d'Information et Décisionnels), j'aime partir des besoins métier avant d'écrire la première ligne de code.
              J'accorde une place centrale à la qualité : tests automatisés, revue de code, historique Git lisible.
            </Reveal>
            <Reveal as="p" delay={0.16}>
              Je pratique aussi le développement assisté par IA avec Claude Code, dans un cadre précis : conventions de
              projet, sous-agents de revue et de tests, plan validé avant chaque fonctionnalité. L'agent écrit du code ;
              je garde l'architecture, les choix techniques et la validation.
            </Reveal>
          </div>
          <Reveal delay={0.1} className="now">
            <div className="now-head">
              <span className="pulse" aria-hidden="true" />
              <h3>{NOW.title}</h3>
            </div>
            <p className="now-where">{NOW.where}</p>
            <ul>
              {NOW.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <ul className="chips" aria-label="Technologies">
              {NOW.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
