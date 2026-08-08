import {
  Flower2,
  Gem,
  Heart,
  Music2,
  Sparkles,
  PartyPopper,
  Caravan,
} from 'lucide-react'
import { Reveal } from './Reveal'
import { Ornament } from './Decor'
import { wedding } from '../data/wedding'

const icons = {
  om: Gem,
  flower: Flower2,
  sparkle: Sparkles,
  music: Music2,
  horse: Caravan,
  rings: Heart,
  cheers: PartyPopper,
}

export default function Events() {
  return (
    <section id="events" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">Itinerary</p>
          <h2 className="mt-3 font-display text-3xl text-sindoor sm:text-4xl">Celebration timeline</h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-gold" />
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-ink/65">
            Seven auspicious moments — each framed in its own royal mood.
          </p>
        </Reveal>

        <div className="mt-14 space-y-8">
          {wedding.events.map((event, index) => {
            const Icon = icons[event.icon] || Sparkles
            return (
              <Reveal key={event.id} delay={index * 0.04}>
                <article
                  className={`overflow-hidden border ${
                    event.highlight
                      ? 'border-sindoor/40 shadow-royal'
                      : 'border-gold/30'
                  } bg-ivory/80`}
                >
                  <div className="grid sm:grid-cols-[1.1fr_1fr]">
                    <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto sm:min-h-[260px]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: event.imagePosition || 'center 15%' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/40 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-transparent" />
                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-ivory/90 text-sindoor">
                        <Icon size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className={`flex flex-col justify-center px-5 py-6 sm:px-8 ${event.highlight ? 'bg-sindoor text-ivory' : ''}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className={`font-display text-2xl ${event.highlight ? 'text-ivory' : 'text-sindoor'}`}>
                          {event.title}
                        </h3>
                        {event.highlight && (
                          <span className="text-[9px] uppercase tracking-[0.2em] text-gold-light">Main event</span>
                        )}
                      </div>
                      <p className={`mt-2 text-xs uppercase tracking-[0.18em] ${event.highlight ? 'text-gold-light' : 'text-gold-deep'}`}>
                        {event.date} · {event.time}
                      </p>
                      {event.location && (
                        <p className={`mt-2 text-xs tracking-wide ${event.highlight ? 'text-gold-light/90' : 'text-peacock'}`}>
                          📍 {event.location}
                        </p>
                      )}
                      <p className={`mt-3 text-sm leading-relaxed ${event.highlight ? 'text-ivory/80' : 'text-ink/65'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
