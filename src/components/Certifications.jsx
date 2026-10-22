import { ArrowUpRight, BadgeCheck } from 'lucide-react'
import Reveal from './Reveal'
import { CERTIFICATIONS } from '../data'

export default function Certifications() {
  return (
    <section className="block" id="certifications">
      <div className="wrap">
        <Reveal as="h2">Certifications</Reveal>
        <ul className="certs">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.06} className="cert">
              <BadgeCheck className="cert-icon" size={22} aria-hidden="true" />
              <h3>{c.title}</h3>
              <p className="cert-issuer">{c.issuer}</p>
              <p className="cert-date">{c.date}</p>
              {c.url ? (
                <a className="cert-link" href={c.url} target="_blank" rel="noreferrer">
                  Voir le certificat <ArrowUpRight size={16} />
                </a>
              ) : (
                <span className="cert-note">Certificat sans lien public</span>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
