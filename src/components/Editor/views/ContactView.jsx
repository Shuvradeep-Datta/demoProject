import { useState } from 'react'
import profile from '../../../data/profile.js'
import { Icon } from '../../../utils/icons.jsx'

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''

function ContactLink({ icon, label, field, href }) {
  const isPlaceholder = field.placeholder
  return (
    <div className="contact-item">
      <span className="ci-ico">
        <Icon name={icon} size={18} />
      </span>
      <div>
        <div className="ci-label">{label}</div>
        {isPlaceholder ? (
          <div className="ci-value" style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
            {field.value} <span className="placeholder-note">(placeholder — edit in data/profile.js)</span>
          </div>
        ) : (
          <a className="ci-value" href={href} target="_blank" rel="noreferrer noopener">
            {field.value}
          </a>
        )}
      </div>
    </div>
  )
}

export default function ContactView() {
  const c = profile.contacts
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // { type: 'ok'|'err', msg }
  const [sending, setSending] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.'
    if (!form.subject.trim()) errs.subject = 'Subject is required.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)
    if (!validate()) return

    // If no backend endpoint is configured, fall back to the mail client.
    if (!ENDPOINT) {
      const to = c.email.placeholder ? '' : c.email.value
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
      const subject = encodeURIComponent(form.subject)
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
      setStatus({
        type: 'ok',
        msg: 'No form backend is configured, so your mail client was opened instead. Set VITE_CONTACT_ENDPOINT to enable direct submission.',
      })
      return
    }

    try {
      setSending(true)
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus({ type: 'ok', msg: 'Message sent — thank you! I will get back to you soon.' })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'err', msg: 'Submission failed. Please try again or email me directly.' })
      }
    } catch {
      setStatus({ type: 'err', msg: 'Network error. Please try again or email me directly.' })
    } finally {
      setSending(false)
    }
  }

  const resumeBase = import.meta.env.BASE_URL || '/'
  const resumeHref = profile.resumePath.startsWith('/')
    ? resumeBase.replace(/\/$/, '') + profile.resumePath
    : profile.resumePath

  return (
    <div className="animate-in">
      <h1 className="doc-title">
        <Icon name="Mail" size={24} /> Contact
      </h1>
      <p className="doc-sub">Let's connect — all fields below are editable in <code className="inline">data/profile.js</code>.</p>

      <div className="contact-grid">
        <div>
          <div className="section-h">
            <Icon name="UserRound" size={15} /> Reach me
          </div>
          <ContactLink icon="Mail" label="Email" field={c.email} href={`mailto:${c.email.value}`} />
          <ContactLink icon="Linkedin" label="LinkedIn" field={c.linkedin} href={c.linkedin.value} />
          <ContactLink icon="Github" label="GitHub" field={c.github} href={c.github.value} />
          <ContactLink icon="Phone" label="Phone" field={c.phone} href={`tel:${c.phone.value}`} />
          <div className="contact-item">
            <span className="ci-ico">
              <Icon name="MapPin" size={18} />
            </span>
            <div>
              <div className="ci-label">Location</div>
              <div className="ci-value">{profile.location}</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <a className="btn primary" href={resumeHref} download>
              <Icon name="Download" size={15} /> Download Resume
            </a>
            <div className="placeholder-note" style={{ marginTop: 8 }}>
              <Icon name="Info" size={12} /> Configure the file at <code className="inline">public{profile.resumePath}</code> (VITE_RESUME_PATH).
            </div>
          </div>
        </div>

        <div>
          <div className="section-h">
            <Icon name="Send" size={15} /> Send a message
          </div>
          <form onSubmit={onSubmit} noValidate>
            <div className={`form-field ${errors.name ? 'invalid' : ''}`}>
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" value={form.name} onChange={update('name')} placeholder="Your name" />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className={`form-field ${errors.email ? 'invalid' : ''}`}>
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className={`form-field ${errors.subject ? 'invalid' : ''}`}>
              <label htmlFor="cf-subject">Subject</label>
              <input id="cf-subject" value={form.subject} onChange={update('subject')} placeholder="How can I help?" />
              {errors.subject && <span className="form-error">{errors.subject}</span>}
            </div>
            <div className={`form-field ${errors.message ? 'invalid' : ''}`}>
              <label htmlFor="cf-message">Message</label>
              <textarea id="cf-message" value={form.message} onChange={update('message')} placeholder="Your message…" />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button className="btn primary" type="submit" disabled={sending}>
              <Icon name="Send" size={15} /> {sending ? 'Sending…' : 'Submit'}
            </button>
            {!ENDPOINT && (
              <div className="placeholder-note" style={{ marginTop: 10 }}>
                <Icon name="Info" size={12} /> No backend configured — submitting opens your mail client. Set
                VITE_CONTACT_ENDPOINT (e.g. Formspree) for direct submission.
              </div>
            )}
            {status && <div className={`form-status ${status.type}`}>{status.msg}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}
