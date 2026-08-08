import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { wedding } from '../data/wedding'
import { useMusic } from '../hooks/useMusic'

function PalaceDoor({ side, opening, onOpen }) {
  const isLeft = side === 'left'

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={opening}
      aria-label={isLeft ? 'Open left door' : 'Open right door'}
      className="relative h-full w-1/2 overflow-hidden border-0 p-0"
      animate={opening ? { x: isLeft ? '-100%' : '100%' } : { x: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url(/opening/corridor-arches.webp)',
          backgroundSize: '200% 100%',
          backgroundPosition: isLeft ? 'left center' : 'right center',
        }}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 w-px bg-[#D4AF37]/50 ${
          isLeft ? 'right-0' : 'left-0'
        }`}
      />
    </motion.button>
  )
}

export default function WeddingOpeningCard({ isOpen, onEnter }) {
  const [opening, setOpening] = useState(false)
  const { playing, toggle } = useMusic()

  const handleOpen = () => {
    if (opening || isOpen) return
    setOpening(true)
    window.setTimeout(() => onEnter?.(), 1050)
  }

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/90"
          initial={{ opacity: 1 }}
          animate={{ opacity: opening ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex h-full w-full max-w-md flex-col overflow-hidden bg-[#1a0507] shadow-2xl md:h-[92vh] md:rounded-2xl">
            {/* Music */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                toggle()
              }}
              className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-black/40 text-[#F0D78C] backdrop-blur-sm"
              aria-label={playing ? 'Mute music' : 'Unmute music'}
            >
              {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Full-height palace doors */}
            <div className="absolute inset-0 flex">
              <PalaceDoor side="left" opening={opening} onOpen={handleOpen} />
              <PalaceDoor side="right" opening={opening} onOpen={handleOpen} />
            </div>

            {/* Soft top gradient for readable overlay text */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-black/55 via-black/25 to-transparent" />

            {/* Floating header overlay — integrated on doors */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[max(1.25rem,env(safe-area-inset-top))] z-30 flex flex-col items-center px-6 text-center"
              animate={opening ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#F0D78C] to-[#A67C00] p-[2px] shadow-[0_0_24px_rgba(212,175,55,0.55)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1a0507]/90">
                  <span className="font-display text-2xl text-[#F0D78C]">ॐ</span>
                </div>
              </div>
              <p className="mt-2 font-script text-xl italic text-[#F0D78C] drop-shadow sm:text-2xl">
                Shree Ganeshay Namah
              </p>
              <p className="mt-1 font-display text-2xl text-white drop-shadow sm:text-3xl">
                {wedding.groom.short}
                <span className="mx-2 font-script text-[#D4AF37]">&</span>
                {wedding.bride.short}
              </p>
            </motion.div>

            {/* Center seal */}
            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={opening}
              className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0"
              animate={
                opening
                  ? { scale: 0.4, opacity: 0 }
                  : { scale: [1, 1.07, 1] }
              }
              transition={
                opening
                  ? { duration: 0.35 }
                  : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
              }
              aria-label="Tap to Open"
            >
              <div className="flex h-[6.5rem] w-[6.5rem] flex-col items-center justify-center rounded-full border-[3px] border-[#D4AF37] bg-gradient-to-b from-[#9b1b2f] to-[#58111A] shadow-[0_0_0_6px_rgba(26,5,7,0.55),0_0_36px_rgba(212,175,55,0.45)]">
                <p className="font-display text-2xl tracking-wide text-[#F0D78C]">V & K</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.26em] text-[#F0D78C]/85">
                  Open
                </p>
              </div>
            </motion.button>

            {!opening && (
              <motion.p
                className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/45 px-4 py-1.5 font-script text-xl text-[#F0D78C] backdrop-blur-sm"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                Tap to Open
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
