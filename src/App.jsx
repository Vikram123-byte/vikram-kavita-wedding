import { useState } from 'react'
import { CalendarDays, Heart, MapPin, Send } from 'lucide-react'
import WeddingOpeningCard from './components/WeddingOpeningCard'
import Hero from './components/Hero'
import ScratchCard from './components/ScratchCard'
import OurStory from './components/OurStory'
import Events from './components/Events'
import Venue, { DressCode } from './components/Venue'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import { Ornament } from './components/Decor'
import { MusicProvider, useMusic } from './hooks/useMusic'
import { contactPhoneDigits, wedding } from './data/wedding'

const navLinks = [
  { href: '#scratch', label: 'Date' },
  { href: '#story', label: 'Family' },
  { href: '#events', label: 'Events' },
  { href: '#venue', label: 'Venue' },
  { href: '#rsvp', label: 'RSVP' },
]

const mobileLinks = [
  { href: '#events', label: 'Events', Icon: CalendarDays },
  { href: '#venue', label: 'Venue', Icon: MapPin },
  { href: '#gallery', label: 'Photos', Icon: Heart },
  { href: '#rsvp', label: 'RSVP', Icon: Send },
]

function Nav({ visible }) {
  const { playing, toggle, currentTrack } = useMusic()
  if (!visible) return null

  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-gold/25 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-2.5">
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-2"
          title={playing ? `Now playing: ${currentTrack?.title || 'Music'}` : 'Play music'}
        >
          <img
            src={wedding.assets.logo}
            alt="Logo"
            className={`h-9 w-9 rounded-full border border-gold/60 object-cover ${playing ? 'ring-2 ring-gold animate-pulse-glow' : ''}`}
          />
          <span className="font-script text-xl text-sindoor">
            {wedding.groom.short} & {wedding.bride.short}
          </span>
        </button>
        <div className="hidden gap-4 sm:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[10px] uppercase tracking-[0.18em] text-sindoor/70 transition hover:text-sindoor"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#rsvp"
          className="bg-sindoor px-3 py-1.5 text-[9px] uppercase tracking-[0.18em] text-ivory sm:px-4"
        >
          RSVP
        </a>
      </div>
    </nav>
  )
}

function MobileBottomNav({ visible }) {
  if (!visible) return null

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ivory/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(43,20,24,0.08)] backdrop-blur-md sm:hidden"
      aria-label="Mobile sections"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {mobileLinks.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 rounded-md px-1 py-1.5 text-sindoor/75 transition active:bg-gold/15 active:text-sindoor"
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-[0.14em]">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  )
}

function Footer() {
  const { toggle, playing, currentTrack } = useMusic()
  const digits = contactPhoneDigits()
  const phoneDisplay = wedding.contact.phone
  const telHref = digits ? `tel:+${digits.startsWith('91') ? digits : `91${digits}`}` : null
  const waHref = digits
    ? `https://wa.me/${digits.startsWith('91') ? digits : `91${digits}`}`
    : null

  return (
    <footer className="bg-maroon-deep px-6 py-14 pb-28 text-center text-ivory sm:pb-14">
      <button type="button" onClick={toggle} className="mx-auto block" title="Toggle music">
        <img
          src={wedding.assets.logo}
          alt="Vikram & Kavita"
          className={`mx-auto h-16 w-16 rounded-full border border-gold object-cover ${playing ? 'animate-pulse-glow' : ''}`}
        />
      </button>
      <p className="mt-4 font-script text-3xl text-gold">
        {wedding.groom.short} & {wedding.bride.short}
      </p>
      <Ornament className="mx-auto mt-4 h-5 w-36 text-gold" />
      {currentTrack && playing && (
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-gold/70">
          ♪ {currentTrack.title}
        </p>
      )}
      <p className="mx-auto mt-8 max-w-sm text-xs leading-relaxed text-ivory/45">
        {wedding.contact.note}
      </p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-gold/80">
        {wedding.contact.name}
        {phoneDisplay ? ` · ${phoneDisplay}` : ''}
      </p>
      {(telHref || waHref) && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {telHref && (
            <a
              href={telHref}
              className="border border-gold/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-gold"
            >
              Call
            </a>
          )}
          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="bg-gold px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-maroon-deep"
            >
              WhatsApp
            </a>
          )}
        </div>
      )}
      <p className="mt-10 text-[10px] uppercase tracking-[0.25em] text-gold/50">
        Made with love for our guests
      </p>
    </footer>
  )
}

function InviteApp() {
  const [opened, setOpened] = useState(false)
  const { play } = useMusic()

  const handleEnter = async () => {
    setOpened(true)
    await play()
  }

  return (
    <div id="top" className="min-h-screen">
      <WeddingOpeningCard isOpen={opened} onEnter={handleEnter} />
      <Nav visible={opened} />
      <MobileBottomNav visible={opened} />

      {opened && (
        <main className="pb-16 sm:pb-0">
          <Hero />
          <ScratchCard />
          <OurStory />
          <Events />
          <Venue />
          <DressCode />
          <Gallery />
          <RSVP />
          <Footer />
        </main>
      )}
    </div>
  )
}

export default function App() {
  return (
    <MusicProvider>
      <InviteApp />
    </MusicProvider>
  )
}
