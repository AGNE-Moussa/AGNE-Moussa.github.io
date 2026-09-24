import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Mini terminal qui « rejoue » la suite de tests de LabTrack quand il entre à l'écran
const SCRIPT = [
  { t: 'cmd', v: 'docker compose exec backend python manage.py test' },
  { t: 'out', v: 'Found 44 test(s).' },
  { t: 'out', v: 'Creating test database for alias \'default\'...' },
  { t: 'dots', v: '............................................' },
  { t: 'out', v: '------------------------------------------' },
  { t: 'out', v: 'Ran 44 tests in 3.812s' },
  { t: 'ok', v: 'OK' },
]

export default function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [reduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [animLines, setLines] = useState(0)
  const [animDots, setDots] = useState(0)
  // Sans animation, on affiche directement le résultat final
  const lines = reduce && inView ? SCRIPT.length : animLines
  const dots = reduce && inView ? 44 : animDots

  useEffect(() => {
    if (!inView || reduce) return
    const timers = []
    let t = 400
    SCRIPT.forEach((l, i) => {
      timers.push(setTimeout(() => setLines(i + 1), t))
      if (l.t === 'dots') {
        for (let d = 1; d <= 44; d++) timers.push(setTimeout(() => setDots(d), t + d * 38))
        t += 44 * 38 + 200
      } else {
        t += i === 0 ? 700 : 260
      }
    })
    return () => timers.forEach(clearTimeout)
  }, [inView, reduce])

  return (
    <div className="terminal" ref={ref} aria-label="Exécution de la suite de tests de LabTrack">
      <div className="code-bar">
        <span className="dot r" /><span className="dot y" /><span className="dot g" />
        <span className="code-file">labtrack — tests</span>
      </div>
      <pre className="term-body">
        {SCRIPT.slice(0, lines).map((l, i) => (
          <div key={i} className={`term-${l.t}`}>
            {l.t === 'cmd' && <span className="prompt">$ </span>}
            {l.t === 'dots' ? l.v.slice(0, dots) : l.v}
          </div>
        ))}
        {lines < SCRIPT.length && <span className="caret" aria-hidden="true" />}
      </pre>
    </div>
  )
}
