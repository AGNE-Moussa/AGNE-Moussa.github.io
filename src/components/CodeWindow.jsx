import { useEffect, useMemo, useState } from 'react'

// Chaque ligne est une suite de jetons [type, texte] pour la coloration syntaxique
const LINES = [
  [['kw', 'const '], ['var', 'moussa'], ['op', ' = {']],
  [['key', '  role'], ['op', ': '], ['str', '"Ingénieur de recherche, CNRS"'], ['op', ',']],
  [['key', '  focus'], ['op', ': '], ['str', '"outils web pour la santé"'], ['op', ',']],
  [['key', '  stack'], ['op', ': ['], ['str', '"Python"'], ['op', ', '], ['str', '"Symfony"'], ['op', ', '], ['str', '"React"'], ['op', '],']],
  [['key', '  ia'], ['op', ': ['], ['str', '"LLM"'], ['op', ', '], ['str', '"RAG"'], ['op', ', '], ['str', '"vision"'], ['op', '],']],
  [['key', '  testsAvantMerge'], ['op', ': '], ['bool', 'true'], ['op', ',']],
  [['op', '};']],
  [],
  [['var', 'moussa'], ['op', '.'], ['fn', 'build'], ['op', '('], ['str', '"ton prochain projet"'], ['op', ');']],
]

export default function CodeWindow() {
  const total = useMemo(() => LINES.reduce((n, l) => n + l.reduce((m, [, t]) => m + t.length, 0) + 1, 0), [])
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [shown, setShown] = useState(reduce ? total : 0)

  useEffect(() => {
    if (reduce) return
    let n = 0
    let id
    const start = setTimeout(() => {
      id = setInterval(() => {
        n += 2
        setShown(Math.min(n, total))
        if (n >= total) clearInterval(id)
      }, 28)
    }, 700)
    return () => {
      clearTimeout(start)
      clearInterval(id)
    }
  }, [reduce, total])

  const done = shown >= total
  // Position de départ de chaque ligne dans le texte complet (calcul pur, sans mutation pendant le rendu)
  const starts = useMemo(() => {
    const acc = []
    let pos = 0
    for (const l of LINES) {
      acc.push(pos)
      pos += l.reduce((m, [, t]) => m + t.length, 0) + 1
    }
    return acc
  }, [])

  return (
    <div className="code-window" aria-label="Présentation sous forme de code">
      <div className="code-bar">
        <span className="dot r" /><span className="dot y" /><span className="dot g" />
        <span className="code-file">moussa.js</span>
      </div>
      <pre className="code-body">
        <code>
          {LINES.map((line, i) => {
            const lineLen = line.reduce((m, [, t]) => m + t.length, 0) + 1
            const local = shown - starts[i]
            const visible = local > 0
            let remaining = Math.min(local, lineLen - 1)
            const out = line.map(([type, text], k) => {
              const part = remaining > 0 ? text.slice(0, remaining) : ''
              remaining -= part.length
              return part ? <span key={k} className={`t-${type}`}>{part}</span> : null
            })
            const isCursorLine = !done && local > 0 && local < lineLen
            return (
              <span className="code-line" key={i} style={{ visibility: visible ? 'visible' : 'hidden' }}>
                <span className="ln">{i + 1}</span>
                {out}
                {(isCursorLine || (done && i === LINES.length - 1)) && <span className="caret" aria-hidden="true" />}
                {'\n'}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}
