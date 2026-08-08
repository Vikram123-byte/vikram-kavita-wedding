import { MapPin, Navigation, Shirt, Phone } from 'lucide-react'
import { Reveal } from './Reveal'
import { Ornament } from './Decor'
import { contactPhoneDigits, wedding } from '../data/wedding'

function VenueCard({ title, subtitle, address, mapsEmbed, mapsUrl, mapTitle, delay = 0.1 }) {
  return (
    <Reveal delay={delay} className="mt-8 first:mt-12">
      <div className="overflow-hidden border border-gold/40 bg-ivory-deep/40">
        <div className="aspect-[16/10] w-full sm:aspect-[21/9]">
          <iframe
            title={mapTitle}
            src={mapsEmbed}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0 text-sindoor" size={20} strokeWidth={1.5} />
            <div>
              <p className="font-display text-xl text-sindoor">{title}</p>
              {subtitle && <p className="mt-1 text-sm text-ink/55">{subtitle}</p>}
              <p className="mt-1 text-sm leading-relaxed text-ink/70">{address}</p>
            </div>
          </div>
          <a
            href={mapsUrl}
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
  )
}

export default function Venue() {
  const digits = contactPhoneDigits()
  const telHref = digits ? `tel:+${digits.startsWith('91') ? digits : `91${digits}`}` : null
  const waHref = digits
    ? `https://wa.me/${digits.startsWith('91') ? digits : `91${digits}`}`
    : null

  return (
    <section id="venue" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">Location</p>
          <h2 className="mt-3 font-display text-3xl text-sindoor sm:text-4xl">Venue & stay</h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-gold" />
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/60">
            Celebrations begin at the host home in Sirohi; the wedding pheras are at Bankli.
          </p>
        </Reveal>

        <VenueCard
          title={wedding.host.label}
          subtitle={wedding.host.name}
          address={wedding.host.address}
          mapsEmbed={wedding.host.mapsEmbed}
          mapsUrl={wedding.host.mapsUrl}
          mapTitle="Shubh Sathal map"
          delay={0.1}
        />

        <VenueCard
          title={wedding.weddingVenue.label}
          subtitle="Thursday, 26 November 2026 · 10:00 AM"
          address={wedding.weddingVenue.place}
          mapsEmbed={wedding.weddingVenue.mapsEmbed}
          mapsUrl={wedding.weddingVenue.mapsUrl}
          mapTitle="Wedding Phera venue map"
          delay={0.15}
        />

        <Reveal delay={0.2} className="mt-8">
          <div className="border border-gold/30 bg-ivory px-6 py-7 text-center sm:text-left">
            <p className="font-display text-lg text-sindoor">Accommodation</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">
              Guests travelling from out of town — stay details and nearby recommendations will be shared
              personally. Please mention travel plans in your RSVP so we can assist you better.
            </p>
            {(telHref || waHref) && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                {telHref && (
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-2 border border-sindoor/40 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-sindoor"
                  >
                    <Phone size={13} />
                    Call {wedding.contact.name}
                  </a>
                )}
                {waHref && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-sindoor px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ivory"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            )}
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
