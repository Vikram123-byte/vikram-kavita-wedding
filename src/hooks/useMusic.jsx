import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { wedding } from '../data/wedding'

const MusicContext = createContext(null)
const LAST_TRACK_KEY = 'vk-wedding-last-track'

function pickRandomTrack() {
  const tracks = wedding.playlist || []
  if (!tracks.length) return null

  let lastId = null
  try {
    lastId = localStorage.getItem(LAST_TRACK_KEY)
  } catch {
    /* ignore */
  }

  const pool = tracks.length > 1 ? tracks.filter((t) => t.id !== lastId) : tracks
  const chosen = pool[Math.floor(Math.random() * pool.length)]

  try {
    localStorage.setItem(LAST_TRACK_KEY, chosen.id)
  } catch {
    /* ignore */
  }

  return chosen
}

export function MusicProvider({ children }) {
  const [playing, setPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const audioRef = useRef(null)

  const stopAll = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
    audioRef.current = null
    setPlaying(false)
  }, [])

  const play = useCallback(async (preferredTrack) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.removeAttribute('src')
      audioRef.current.load()
      audioRef.current = null
    }

    const track = preferredTrack || pickRandomTrack()
    if (!track) return false

    const startAt = Number(track.startAt) || 0
    const audio = new Audio(track.src)
    audio.volume = 0.55
    audio.preload = 'auto'
    // Custom loop from the hook/chorus, not from 0:00
    audio.loop = false
    audioRef.current = audio
    setCurrentTrack(track)

    const jumpToHook = () => {
      try {
        if (Number.isFinite(startAt) && startAt > 0) {
          audio.currentTime = startAt
        }
      } catch {
        /* ignore seek errors before metadata */
      }
    }

    audio.addEventListener('loadedmetadata', jumpToHook, { once: true })
    audio.addEventListener('ended', () => {
      jumpToHook()
      audio.play().catch(() => {})
    })

    try {
      // Seek as soon as possible, then play
      const onCanPlay = () => jumpToHook()
      audio.addEventListener('canplay', onCanPlay, { once: true })
      await audio.play()
      jumpToHook()
      setPlaying(true)
      return true
    } catch {
      setPlaying(false)
      return false
    }
  }, [])

  const toggle = useCallback(async () => {
    if (playing) stopAll()
    else await play()
  }, [play, playing, stopAll])

  return (
    <MusicContext.Provider value={{ playing, currentTrack, toggle, play, stop: stopAll }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
