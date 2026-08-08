import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { wedding } from '../data/wedding'

const EMOJIS = ['❤️', '💕', '💍', '👰', '🤵', '✨', '🌸', '🎉', '💖', '🪷', '🎊', '💫']

function spawnEmojis(count = 28) {
  const root = document.body
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div')
    el.className = 'emoji-burst'
    el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight * 0.55 + window.innerHeight * 0.15
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    el.style.setProperty('--dx', `${(Math.random() - 0.5) * 220}px`)
    el.style.setProperty('--dy', `${-120 - Math.random() * 280}px`)
    el.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`)
    el.style.fontSize = `${1.1 + Math.random() * 1.2}rem`
    root.appendChild(el)
    setTimeout(() => el.remove(), 1700)
  }
}

export default function ScratchCard() {
  const canvasRef = useRef(null)
  const wrappingRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [ready, setReady] = useState(false)
  const drawing = useRef(false)
  const revealedOnce = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrappingRef.current
    if (!canvas || !wrap) return

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Foil scratch layer
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height)
      grad.addColorStop(0, '#8a6800')
      grad.addColorStop(0.35, '#f0d78c')
      grad.addColorStop(0.55, '#c9a227')
      grad.addColorStop(1, '#6e4f00')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Metallic texture lines
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.lineWidth = 1
      for (let i = -rect.height; i < rect.width + rect.height; i += 6) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + rect.height, rect.height)
        ctx.stroke()
      }

      ctx.fillStyle = 'rgba(74, 10, 22, 0.55)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      ctx.fillStyle = '#f0d78c'
      ctx.font = `600 ${Math.max(14, rect.width * 0.045)}px Montserrat, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✦ SCRATCH TO REVEAL ✦', rect.width / 2, rect.height / 2 - 12)
      ctx.font = `${Math.max(11, rect.width * 0.032)}px Montserrat, sans-serif`
      ctx.fillStyle = 'rgba(255,248,238,0.9)'
      ctx.fillText('the muhurat date', rect.width / 2, rect.height / 2 + 16)

      setReady(true)
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const scratchAt = (clientX, clientY) => {
    if (revealedOnce.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, Math.max(22, rect.width * 0.06), 0, Math.PI * 2)
    ctx.fill()

    // Sample cleared percentage
    const sample = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let cleared = 0
    for (let i = 3; i < sample.length; i += 16) {
      if (sample[i] < 128) cleared += 1
    }
    const total = sample.length / 16
    if (cleared / total > 0.42) {
      revealedOnce.current = true
      setRevealed(true)
      spawnEmojis(36)
      // wipe remaining foil
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const getPoint = (e) => {
    if (e.touches?.[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    return { x: e.clientX, y: e.clientY }
  }

  const onDown = (e) => {
    drawing.current = true
    const { x, y } = getPoint(e)
    scratchAt(x, y)
  }
  const onMove = (e) => {
    if (!drawing.current) return
    e.preventDefault()
    const { x, y } = getPoint(e)
    scratchAt(x, y)
  }
  const onUp = () => {
    drawing.current = false
  }

  const d = wedding.weddingDateReveal

  return (
    <section id="scratch" className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-gold-deep">Lucky invite</p>
        <h2 className="mt-3 font-display text-3xl text-sindoor sm:text-4xl">Scratch the shagun card</h2>
        <p className="mt-3 text-sm text-ink/65">
          A little surprise for every guest — scratch the foil to unveil the wedding muhurat.
        </p>

        <motion.div
          className="relative mx-auto mt-10 overflow-hidden rounded-sm border-2 border-gold shadow-royal"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            ref={wrappingRef}
            className="relative aspect-[16/10] w-full bg-gradient-to-br from-sindoor via-maroon to-peacock-deep"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-ivory">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">Save the date</p>
              <p className="mt-2 font-script text-3xl text-gold-light sm:text-4xl">
                {wedding.groom.short} & {wedding.bride.short}
              </p>
              <p
                className={`mt-4 font-display text-4xl transition duration-700 sm:text-5xl ${
                  revealed ? 'scale-105 text-gold-light' : 'text-ivory/90'
                }`}
              >
                {d.day}
              </p>
              <p className="mt-1 font-display text-xl text-ivory sm:text-2xl">
                {d.month} {d.year}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-gold-light/80">{d.weekday}</p>
            </div>

            {!revealed && (
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 z-10 touch-none cursor-crosshair ${ready ? '' : 'opacity-0'}`}
                onMouseDown={onDown}
                onMouseMove={onMove}
                onMouseUp={onUp}
                onMouseLeave={onUp}
                onTouchStart={onDown}
                onTouchMove={onMove}
                onTouchEnd={onUp}
              />
            )}
          </div>
        </motion.div>

        {revealed && (
          <motion.p
            className="mt-6 font-script text-2xl text-sindoor"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            See you on {d.label} 💍
          </motion.p>
        )}
      </div>
    </section>
  )
}
