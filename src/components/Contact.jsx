import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CircleAlert, Copy, LoaderCircle, Send } from 'lucide-react'
import Reveal from './Reveal'
import { GithubIcon, LinkedinIcon } from './Icons'
import { FORM_ENDPOINT, PROFILE } from '../data'

const EMPTY = { name: '', email: '', subject: '', message: '', _honey: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Indiquez votre nom.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Indiquez une adresse e-mail valide, pour que je puisse vous répondre.'
  if (v.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.'
  return e
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const set = (k) => (ev) => {
    const next = { ...values, [k]: ev.target.value }
    setValues(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(values))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate(values)
    setErrors(e)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(e).length) return
    if (values._honey) return // robot détecté : on ignore silencieusement
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          _replyto: values.email.trim(),
          _subject: values.subject.trim() ? `Portfolio : ${values.subject.trim()}` : `Portfolio : message de ${values.name.trim()}`,
          message: values.message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error(data.message || 'Échec')
      setStatus('sent')
      setValues(EMPTY)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* presse-papiers indisponible : l'adresse reste visible */
    }
  }

  const field = (k, label, props = {}, Tag = 'input') => (
    <div className={`field ${touched[k] && errors[k] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <Tag
        id={`f-${k}`}
        name={k}
        value={values[k]}
        onChange={set(k)}
        onBlur={blur(k)}
        aria-invalid={Boolean(touched[k] && errors[k])}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        {...props}
      />
      {touched[k] && errors[k] && (
        <p className="field-error" id={`e-${k}`}>
          {errors[k]}
        </p>
      )}
    </div>
  )

  return (
    <section className="block dark contact" id="contact">
      <div className="wrap contact-grid">
        <div>
          <Reveal as="h2">Contact</Reveal>
          <Reveal as="p" className="lead on-dark" delay={0.05}>
            Une question sur un projet, une collaboration autour d'un outil de recherche, une opportunité ? Écrivez-moi
            directement ici, je vous réponds par e-mail.
          </Reveal>
          <Reveal delay={0.1} className="contact-alt">
            <p>Vous pouvez aussi me joindre par :</p>
            <button type="button" className="copy-mail" onClick={copy}>
              <span>{PROFILE.email}</span>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span className="sr-only">{copied ? 'Adresse copiée' : "Copier l'adresse"}</span>
            </button>
            <AnimatePresence>
              {copied && (
                <motion.span className="copied" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  Adresse copiée
                </motion.span>
              )}
            </AnimatePresence>
            <div className="contact-social">
              <a className="icon-btn" href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a className="icon-btn" href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="form-card">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div key="ok" className="form-done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <span className="done-icon"><Check size={28} /></span>
                <h3>Message envoyé</h3>
                <p>Merci, votre message m'a bien été transmis. Je vous réponds dès que possible à l'adresse indiquée.</p>
                <button className="btn ghost" onClick={() => setStatus('idle')}>Écrire un autre message</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="row">
                  {field('name', 'Nom', { autoComplete: 'name', placeholder: 'Votre nom' })}
                  {field('email', 'E-mail', { type: 'email', autoComplete: 'email', placeholder: 'vous@exemple.fr' })}
                </div>
                {field('subject', 'Objet (facultatif)', { placeholder: 'Collaboration, question, opportunité…' })}
                {field('message', 'Message', { rows: 6, placeholder: 'Votre message' }, 'textarea')}
                <input className="honey" tabIndex={-1} autoComplete="off" name="_honey" value={values._honey} onChange={set('_honey')} aria-hidden="true" />
                {status === 'error' && (
                  <p className="form-error" role="alert">
                    <CircleAlert size={16} /> L'envoi a échoué. Réessayez dans un instant, ou écrivez-moi directement à {PROFILE.email}.
                  </p>
                )}
                <button className="btn primary send" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle size={18} className="spin" /> Envoi en cours
                    </>
                  ) : (
                    <>
                      <Send size={17} /> Envoyer le message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
