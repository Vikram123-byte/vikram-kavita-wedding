import { MapPin, Navigation, Shirt } from 'lucide-react'
import { Reveal } from './Reveal'
import { Ornament } from './Decor'
import { wedding } from '../data/wedding'

export default function Venue() {
  return (
    <section id="venue" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">Location</p>
          <h2 className="mt-3 font-display text-3xl text-sindoor sm:text-4xl">Venue & stay</h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-gold" />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden border border-gold/40 bg-ivory-deep/40">
            <div className="aspect-[16/10] w-full sm:aspect-[21/9]">
              <iframe
                title="Shubh Sathal map"
                src={wedding.host.mapsEmbed}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-sindoor" size={20} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-xl text-sindoor">{wedding.host.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{wedding.host.address}</p>
                  <p className="mt-1 text-sm text-ink/55">{wedding.host.name}</p>
                </div>
              </div>
              <a
                href={wedding.host.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-sindoor bg-sindoor px-5 py-3 text-[11px] uppercase tracking-[0.22em] text-ivory transition hover:bg-sindoor-deep"
              >
                <Navigation size={14} />
                Open maps
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-8">
          <div className="border border-gold/30 bg-ivory px-6 py-7 text-center sm:text-left">
            <p className="font-display text-lg text-sindoor">Accommodation</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Guests travelling from out of town — stay details and nearby recommendations will be shared
              personally. Please mention travel plans in your RSVP so we can assist you better.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function DressCode() {
  const { dressCode } = wedding

  return (
    <section id="dress" className="bg-gradient-to-br from-sindoor via-maroon to-peacock-deep px-6 py-20 text-ivory sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <Shirt className="mx-auto text-gold" size={28} strokeWidth={1.25} />
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">{dressCode.title}</h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-gold" />
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ivory/75">{dressCode.note}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {dressCode.suggestions.map((item, i) => (
            <Reveal key={item.event} delay={i * 0.06}>
              <div className="border border-gold/35 bg-maroon-deep/40 px-5 py-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light">{item.event}</p>
                <p className="mt-3 font-display text-lg text-ivory">{item.tip}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
