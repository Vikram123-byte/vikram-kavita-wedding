import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Soft ambient pad via Web Audio API (no external file required).
 * Replace with <audio src="/your-song.mp3" /> if you prefer a track.
 */
export default function AudioToggle({ enabled }) {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef(null)
  const nodesRef = useRef([])

  const stop = () => {
    nodesRef.current.forEach((n) => {
      try {
        n.stop?.()
        n.disconnect?.()
      } catch {
        /* ignore */
      }
    })
    nodesRef.current = []
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {})
      ctxRef.current = null
    }
    setPlaying(false)
  }

  const start = async () => {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return

    const ctx = new Ctx()
    await ctx.resume()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = 0.045
    master.connect(ctx.destination)

    const freqs = [196, 246.94, 293.66, 392]
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = f
      gain.gain.value = 0.15 / (i + 1)
      osc.connect(gain)
      gain.connect(master)
      osc.start()
      nodesRef.current.push(osc, gain)
    })

    // gentle LFO on master for "breathing" ambience
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 0.02
    lfo.connect(lfoGain)
    lfoGain.connect(master.gain)
    lfo.start()
    nodesRef.current.push(lfo, lfoGain)

    setPlaying(true)
  }

  const toggle = async () => {
    if (playing) stop()
    else await start()
  }

  useEffect(() => {
    if (!enabled && playing) stop()
    return () => stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  if (!enabled) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? 'Mute ambient audio' : 'Play ambient audio'}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-maroon text-gold shadow-lg transition hover:bg-maroon-deep"
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  )
}
