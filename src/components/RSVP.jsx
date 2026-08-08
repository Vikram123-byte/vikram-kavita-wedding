import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Reveal } from './Reveal'
import { Ornament } from './Decor'
import { wedding } from '../data/wedding'

const initial = {
  name: '',
  guests: '1',
  attending: 'yes',
  events: '',
  message: '',
  phone: '',
}

export default function RSVP() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const endpoint = wedding.formspreeEndpoint
    const isConfigured = endpoint && !endpoint.includes('YOUR_FORM_ID')

    if (!isConfigured) {
      try {
        const existing = JSON.parse(localStorage.getItem('wedding-rsvps') || '[]')
        existing.push({ ...form, submittedAt: new Date().toISOString() })
        localStorage.setItem('wedding-rsvps', JSON.stringify(existing))
        setStatus('local')
        setForm(initial)
      } catch {
        setStatus('error')
        setErrorMsg('Could not save your RSVP locally. Please try again.')
      }
      return
    }

    try {
      // Formspree AJAX (JSON) — same pattern as their Vanilla JS / React guides
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Wedding RSVP — ${form.name}`,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const fieldError = data?.errors?.[0]?.message
        throw new Error(fieldError || 'Submission failed')
      }
      setStatus('success')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err?.message && err.message !== 'Submission failed'
          ? err.message
          : 'Something went wrong. Please try again or message the family directly.',
      )
    }
  }

  return (
    <section id="rsvp" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">Kindly respond</p>
          <h2 className="mt-3 font-display text-3xl text-sindoor sm:text-4xl">RSVP</h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-gold" />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          {status === 'success' || status === 'local' ? (
            <div className="border border-gold/40 bg-ivory px-6 py-12 text-center">
              <CheckCircle2 className="mx-auto text-sindoor" size={36} strokeWidth={1.25} />
              <h3 className="mt-4 font-display text-2xl text-sindoor">Thank you</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {status === 'local'
                  ? 'Your RSVP has been saved on this device. Connect Formspree to receive email submissions.'
                  : 'Your response has been received. We look forward to celebrating with you.'}
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-8 text-[11px] uppercase tracking-[0.22em] text-sindoor underline-offset-4 hover:underline"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 border border-gold/35 bg-ivory px-5 py-8 sm:px-8">
              <Field label="Full name">
                <input required name="name" value={form.name} onChange={onChange} className="field" placeholder="Your name" />
              </Field>
              <Field label="Phone / WhatsApp">
                <input name="phone" value={form.phone} onChange={onChange} className="field" placeholder="+91 …" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Number of guests">
                  <select name="guests" value={form.guests} onChange={onChange} className="field">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Will you attend?">
                  <select name="attending" value={form.attending} onChange={onChange} className="field">
                    <option value="yes">Joyfully yes</option>
                    <option value="maybe">Hopefully</option>
                    <option value="no">Regretfully no</option>
                  </select>
                </Field>
              </div>
              <Field label="Events you plan to attend">
                <input name="events" value={form.events} onChange={onChange} className="field" placeholder="e.g. Sangeet, Wedding, Reception" />
              </Field>
              <Field label="Message / blessings">
                <textarea name="message" value={form.message} onChange={onChange} rows={3} className="field resize-none" placeholder="A note for the couple…" />
              </Field>
              {status === 'error' && <p className="text-sm text-sindoor">{errorMsg}</p>}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex w-full items-center justify-center gap-2 bg-sindoor py-3.5 text-[11px] uppercase tracking-[0.28em] text-ivory transition hover:bg-sindoor-deep disabled:opacity-60"
              >
                <Send size={14} />
                {status === 'loading' ? 'Sending…' : 'Send RSVP'}
              </button>
            </form>
          )}
        </Reveal>
      </div>

      <style>{`
        .field {
          width: 100%;
          border: 1px solid color-mix(in srgb, #d4af37 45%, transparent);
          background: #fff8ee;
          padding: 0.75rem 0.9rem;
          font-size: 0.9rem;
          color: #2b1418;
          outline: none;
          font-family: inherit;
        }
        .field:focus { border-color: #9b1b2f; }
      `}</style>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-sindoor/70">{label}</span>
      {children}
    </label>
  )
}
