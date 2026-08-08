import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { wedding } from '../data/wedding'

/**
 * Cinematic mobile royal gate opening — AI artwork doors + Ganesha crest
 * Style inspired by trending palace-gate WhatsApp wedding invites
 */
export default function OpeningOverlay({ open, onOpen }) {
  const [opening, setOpening] = useState(false)

  const handleTap = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(() => onOpen(), 1400)
  }

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Inner palace reveal (seen as doors open) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/opening/inner-glow.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a0c12]/55 via-transparent to-[#1a080c]/70" />

          <div className="relative flex h-[100svh] w-full flex-col">
            {/* Ganesha crest — AI artwork */}
            <motion.div
              className="relative z-40 shrink-0 px-3 pt-[max(0.6rem,env(safe-area-inset-top))]"
              animate={opening ? { y: -24, opacity: 0.85 } : { y: 0, opacity: 1 }}
              transition={{ duration: 1.1 }}
            >
              <div className="relative mx-auto max-w-md overflow-hidden rounded-b-[1.5rem] border border-[#D4AF37]/55 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
                <img
                  src="/opening/ganesha.jpg"
                  alt="Lord Ganesha blessings"
                  className="h-[22svh] w-full object-cover object-[center_30%] sm:h-[24svh]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a080c]/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-3 pb-2 text-center">
                  <p className="text-[8px] uppercase tracking-[0.35em] text-[#F0D78C]/90">
                    Shree Ganeshaya Namah
                  </p>
                </div>
                {/* Gold edge trim */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#F0D78C]/30" />
              </div>
            </motion.div>

            {/* Couple names under Ganesha */}
            <motion.div
              className="relative z-40 px-4 py-2 text-center"
              animate={opening ? { opacity: 0 } : { opacity: 1 }}
            >
              <p className="font-script text-[1.65rem] leading-none text-[#F0D78C] drop-shadow">
                {wedding.groom.short}
                <span className="mx-1 text-[#D4AF37]"> & </span>
                {wedding.bride.short}
              </p>
            </motion.div>

            {/* Royal gates */}
            <div
              className="relative mx-2 mb-[max(0.75rem,env(safe-area-inset-bottom))] min-h-0 flex-1"
              style={{ perspective: '1200px' }}
            >
              {/* Ornate arch frame around doors */}
              <div className="absolute -inset-x-1 -top-2 bottom-0 z-10 pointer-events-none">
                <div className="absolute inset-0 rounded-t-[48%_48%_4%_4%] border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.2)]" />
                <div className="absolute inset-[3px] rounded-t-[48%_48%_4%_4%] border border-[#F0D78C]/25" />
              </div>

              <div className="absolute inset-0 overflow-hidden rounded-t-[46%_46%_3%_3%]">
                {/* LEFT DOOR — AI art */}
                <motion.div
                  className="absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                  animate={
                    opening
                      ? { rotateY: -112, x: '-8%', filter: 'brightness(0.85)' }
                      : { rotateY: 0, x: 0 }
                  }
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="/opening/door-left.jpg"
                    alt=""
                    className="h-full w-full object-cover object-right"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/35" />
                  <div className="pointer-events-none absolute inset-y-[8%] right-0 w-[2px] bg-gradient-to-b from-transparent via-[#F0D78C] to-transparent opacity-80" />
                </motion.div>

                {/* RIGHT DOOR — AI art */}
                <motion.div
                  className="absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                  animate={
                    opening
                      ? { rotateY: 112, x: '8%', filter: 'brightness(0.85)' }
                      : { rotateY: 0, x: 0 }
                  }
                  transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src="/opening/door-right.jpg"
                    alt=""
                    className="h-full w-full object-cover object-left"
                    draggable={false}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/20 via-transparent to-black/35" />
                  <div className="pointer-events-none absolute inset-y-[8%] left-0 w-[2px] bg-gradient-to-b from-transparent via-[#F0D78C] to-transparent opacity-80" />
                </motion.div>
              </div>

              {/* Golden glow when opening */}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[60%] w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0D78C]/35 blur-3xl"
                animate={{ opacity: opening ? 1 : 0.35, scale: opening ? 1.4 : 1 }}
                transition={{ duration: 1 }}
              />

              {/* Center royal seal — tap target */}
              <button
                type="button"
                onClick={handleTap}
                disabled={opening}
                className="absolute left-1/2 top-[48%] z-50 flex w-[10.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none"
                aria-label="Open royal palace gates"
              >
                <motion.div
                  className="relative"
                  animate={
                    opening
                      ? { scale: 0.55, opacity: 0, y: 20 }
                      : { scale: [1, 1.05, 1] }
                  }
                  transition={
                    opening
                      ? { duration: 0.45 }
                      : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                >
                  {/* Outer gold rings */}
                  <div className="absolute -inset-2 rounded-full border-2 border-[#F0D78C]/70" />
                  <div className="absolute -inset-4 rounded-full border border-[#D4AF37]/40" />

                  <div
                    className="relative flex h-[6.4rem] w-[6.4rem] items-center justify-center rounded-full"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 25%, #F5E6A8 0%, #D4AF37 40%, #8A6800 78%, #5c4000 100%)',
                      boxShadow:
                        '0 14px 36px rgba(0,0,0,0.55), inset 0 0 0 3px rgba(155,27,47,0.9)',
                    }}
                  >
                    <div className="flex h-[5.1rem] w-[5.1rem] flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#9b1b2f] to-[#5c0018] shadow-inner">
                      <span className="font-display text-[1.55rem] tracking-[0.08em] text-[#F0D78C]">
                        V&K
                      </span>
                      <span className="mt-0.5 text-[7px] uppercase tracking-[0.28em] text-[#F0D78C]/75">
                        Open
                      </span>
                    </div>
                  </div>
                </motion.div>

                {!opening && (
                  <motion.p
                    className="mt-4 rounded-full bg-black/35 px-4 py-1.5 font-script text-[1.45rem] text-[#F0D78C] backdrop-blur-sm"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    Tap to open gates
                  </motion.p>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
