import { useState } from 'react'
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
import { wedding } from './data/wedding'

function Nav({ visible }) {
  const { playing, toggle, currentTrack } = useMusic()
  if (!visible) return null

  const links = [
    { href: '#scratch', label: 'Date' },
    { href: '#story', label: 'Family' },
    { href: '#events', label: 'Events' },
    { href: '#venue', label: 'Venue' },
    { href: '#rsvp', label: 'RSVP' },
  ]

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
          {links.map((l) => (
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

function Footer() {
  const { toggle, playing, currentTrack } = useMusic()
  return (
    <footer className="bg-maroon-deep px-6 py-14 text-center text-ivory">
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

      {opened && (
        <main>
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
