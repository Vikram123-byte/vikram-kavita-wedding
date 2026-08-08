import { Reveal } from './Reveal'
import { Ornament, FloralCorner } from './Decor'
import { wedding } from '../data/wedding'

function FamilyCard({ title, name, parents, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="relative overflow-hidden border-2 border-[#D4AF37]/70 bg-family-panel px-6 py-10 shadow-[0_16px_40px_rgba(128,0,32,0.12)]">
        {/* Ornate corner brackets */}
        <div className="absolute left-2 top-2 h-6 w-6 border-l-2 border-t-2 border-[#800020]/70" />
        <div className="absolute right-2 top-2 h-6 w-6 border-r-2 border-t-2 border-[#800020]/70" />
        <div className="absolute bottom-2 left-2 h-6 w-6 border-b-2 border-l-2 border-[#800020]/70" />
        <div className="absolute bottom-2 right-2 h-6 w-6 border-b-2 border-r-2 border-[#800020]/70" />

        {/* Soft marigold glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#F0A202]/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full bg-[#800020]/10 blur-2xl" />

        <p className="font-script text-2xl text-[#C45C26]">{title}</p>
        <div className="mx-auto mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <h3 className="mt-4 font-display text-2xl text-[#800020]">{name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-[#2b1418]/75">{parents}</p>
      </div>
    </Reveal>
  )
}

export default function OurStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-heritage-section px-6 py-20 sm:py-28">
      <FloralCorner className="pointer-events-none absolute left-2 top-6 h-24 w-24 text-[#D4AF37]/45 sm:h-32 sm:w-32" />
      <FloralCorner
        flip
        className="pointer-events-none absolute right-2 top-6 h-24 w-24 text-[#D4AF37]/45 sm:h-32 sm:w-32"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <div className="inline-block rounded-full border border-[#D4AF37]/50 bg-[#800020]/90 px-4 py-1.5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#F0D78C]">Our families</p>
          </div>
          <h2 className="mt-4 font-display text-3xl text-[#800020] sm:text-4xl">
            With love & blessings
          </h2>
          <Ornament className="mx-auto mt-5 h-5 w-40 text-[#D4AF37]" />
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#2b1418]/70">
            Two households, one sacred celebration — joined in joy, tradition, and endless blessings.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-8">
          <FamilyCard
            delay={0.1}
            title="The Groom"
            name={wedding.groom.name}
            parents={wedding.groom.parents}
          />
          <FamilyCard
            delay={0.18}
            title="The Bride"
            name={wedding.bride.name}
            parents={wedding.bride.parents}
          />
        </div>

        <Reveal delay={0.25} className="mt-12">
          <div className="relative overflow-hidden border-2 border-[#D4AF37]/60 bg-gradient-to-br from-[#9b1b2f] via-[#800020] to-[#0f5c5c] px-6 py-11 text-[#FAF6EE] shadow-[0_20px_50px_rgba(128,0,32,0.28)]">
            <div className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.55'%3E%3Cpath d='M30 0l2 10h10l-8 6 3 10-7-5-7 5 3-10-8-6h10z'/%3E%3C/g%3E%3C/svg%3E\")",
              }}
            />
            <p className="relative text-[10px] uppercase tracking-[0.3em] text-[#F0D78C]">
              {wedding.host.label}
            </p>
            <h3 className="relative mt-3 font-display text-2xl sm:text-3xl">{wedding.host.name}</h3>
            <p className="relative mt-2 text-sm text-[#FAF6EE]/80">{wedding.host.lineage}</p>
            <Ornament className="relative mx-auto mt-5 h-5 w-36 text-[#D4AF37]" />
            <p className="relative mt-5 text-sm leading-relaxed text-[#FAF6EE]/90">
              {wedding.host.address}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
