import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const BITS = ['🎉', '🎊', '✨', '💛', '🩷', '❀', '✦', '🤍', '🧡']

/**
 * Party popper / confetti burst when the invite opens.
 */
export default function PartyPoppers({ fire }) {
  const [show, setShow] = useState(false)
  const pieces = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${2 + ((i * 17) % 96)}%`,
        delay: (i % 14) * 0.035,
        duration: 2.1 + (i % 6) * 0.22,
        glyph: BITS[i % BITS.length],
        x: (i % 2 === 0 ? 1 : -1) * (12 + (i % 9) * 9),
        size: 14 + (i % 7) * 3,
      })),
    [],
  )

  useEffect(() => {
    if (!fire) return
    setShow(true)
    const t = window.setTimeout(() => setShow(false), 3400)
    return () => window.clearTimeout(t)
  }, [fire])

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-[48] overflow-hidden" aria-hidden>
          {/* Side cannons */}
          <motion.div
            className="absolute bottom-28 left-3 text-4xl sm:bottom-20 sm:left-6"
            initial={{ scale: 0, rotate: -25, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], rotate: [-25, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1 }}
          >
            🎊
          </motion.div>
          <motion.div
            className="absolute bottom-28 right-3 text-4xl sm:bottom-20 sm:right-6"
            initial={{ scale: 0, rotate: 25, opacity: 0 }}
            animate={{ scale: [0, 1.4, 1], rotate: [25, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.1, delay: 0.05 }}
          >
            🎉
          </motion.div>

          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-[-4%]"
              style={{ left: p.left, fontSize: p.size }}
              initial={{ y: 0, opacity: 0, rotate: 0, scale: 0.35 }}
              animate={{
                y: '115vh',
                x: [0, p.x, p.x * -0.35],
                opacity: [0, 1, 1, 0],
                rotate: [0, 200, 400],
                scale: [0.35, 1.15, 0.9],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
            >
              {p.glyph}
            </motion.span>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
