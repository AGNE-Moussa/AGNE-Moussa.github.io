import { useEffect, useState } from 'react'

// Écrit puis efface chaque mot à tour de rôle ; texte fixe si l'utilisateur réduit les animations
export default function Typewriter({ words }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [still] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (still) return
    const word = words[index]
    let delay = deleting ? 40 : 85
    if (!deleting && text === word) delay = 1800
    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, index, words, still])

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <span className="typed" aria-hidden="true">
        {still ? words[0] : text}
        <span className="type-caret" />
      </span>
    </>
  )
}
