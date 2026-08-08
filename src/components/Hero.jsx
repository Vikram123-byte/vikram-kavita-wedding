import { motion } from 'framer-motion'
import { FloralCorner, Mandala, Ornament } from './Decor'
import { useCountdown } from './Reveal'
import { useMusic } from '../hooks/useMusic'
import { wedding } from '../data/wedding'

function Unit({ value, label }) {
  return (
    <div className="flex min-w-[4.1rem] flex-col items-center border border-gold/40 bg-ivory/90 px-3 py-3 backdrop-blur sm:min-w-[5rem]">
      <span className="font-display text-2xl text-sindoor sm:text-3xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-sindoor/60">{label}</span>
    </div>
  )
}

export default function Hero() {
  const time = useCountdown(wedding.weddingDate)
  const { playing, toggle, currentTrack } = useMusic()

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${wedding.assets.hero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/75 via-sindoor/55 to-ivory" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(74,10,22,0.35)_100%)]" />

      <FloralCorner className="pointer-events-none absolute left-2 top-16 z-10 h-24 w-24 text-gold/60 sm:h-32 sm:w-32" />
      <FloralCorner
        flip
        className="pointer-events-none absolute right-2 top-16 z-10 h-24 w-24 text-gold/60 sm:h-32 sm:w-32"
      />
      <Mandala className="pointer-events-none absolute left-1/2 top-1/3 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 text-gold/20" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
        {/* AI Ganesha above elder blessings */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#D4AF37] shadow-[0_0_28px_rgba(212,175,55,0.45)] sm:h-28 sm:w-28">
            <img
              src="/ganesha-blessing.jpg"
              alt="Lord Ganesha"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <p className="mt-2 font-script text-lg text-gold-light">Shree Ganeshay Namah</p>
        </motion.div>

        <motion.p
          className="text-[10px] uppercase tracking-[0.4em] text-gold-light"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          With the blessings of our elders
        </motion.p>

        <motion.button
          type="button"
          onClick={toggle}
          className="mt-6 animate-float"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
          title={playing ? `Now playing: ${currentTrack?.title || 'Music'}` : 'Toggle music'}
        >
          <div className="relative mx-auto h-32 w-32 sm:h-40 sm:w-40">
            <div className={`absolute inset-0 rounded-full border-2 border-gold/70 ${playing ? 'animate-pulse-glow' : ''}`} />
            <img
              src={wedding.assets.logo}
              alt="Vikram & Kavita logo"
              className="h-full w-full rounded-full object-cover shadow-royal"
            />
            <span className="absolute -bottom-3 left-1/2 max-w-[14rem] -translate-x-1/2 truncate rounded-full bg-ivory/95 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-sindoor shadow">
              {playing ? `♪ ${currentTrack?.title || 'Music on'}` : '♪ Music paused'}
            </span>
          </div>
        </motion.button>

        <motion.h1
          className="mt-10 font-display text-[2.5rem] leading-[1.12] text-ivory sm:text-6xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <span className="block drop-shadow">{wedding.groom.short}</span>
          <span className="my-1 block font-script text-3xl text-gold-light sm:text-4xl">&</span>
          <span className="block drop-shadow">{wedding.bride.short}</span>
        </motion.h1>

        <Ornament className="mt-5 h-6 w-48 text-gold-light" />

        <motion.p
          className="mt-4 max-w-md font-display text-lg italic text-ivory/90 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {wedding.tagline}
        </motion.p>

        <motion.p
          className="mt-3 text-xs uppercase tracking-[0.25em] text-gold-light/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {wedding.dateRangeLabel} · {wedding.city}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {time.done ? (
            <p className="font-script text-3xl text-ivory">We are married!</p>
          ) : (
            <>
              <Unit value={time.days} label="Days" />
              <Unit value={time.hours} label="Hours" />
              <Unit value={time.minutes} label="Mins" />
              <Unit value={time.seconds} label="Secs" />
            </>
          )}
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          <a
            href="#scratch"
            className="border border-gold bg-gold/90 px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-maroon-deep transition hover:bg-gold-light"
          >
            Scratch the date
          </a>
          <a
            href="#events"
            className="border border-ivory/70 bg-transparent px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-ivory transition hover:bg-ivory/10"
          >
            View celebrations
          </a>
        </motion.div>
      </div>
    </section>
  )
}
