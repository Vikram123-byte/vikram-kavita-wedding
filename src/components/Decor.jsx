export function Ornament({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M10 12h70M120 12h70"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      <circle cx="100" cy="12" r="3.5" fill="currentColor" />
      <circle cx="100" cy="12" r="7" stroke="currentColor" strokeWidth="1" fill="none" />
      <path
        d="M88 12c4-6 8-6 12 0M112 12c-4 6-8 6-12 0"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}

export function Mandala({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180
        const x2 = 100 + Math.cos(a) * 90
        const y2 = 100 + Math.sin(a) * 90
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.3"
          />
        )
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = ((i * 45 + 22.5) * Math.PI) / 180
        const cx = 100 + Math.cos(a) * 58
        const cy = 100 + Math.sin(a) * 58
        return (
          <circle
            key={`p-${i}`}
            cx={cx}
            cy={cy}
            r="4"
            stroke="currentColor"
            strokeWidth="0.6"
            fill="none"
            opacity="0.45"
          />
        )
      })}
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.35" />
    </svg>
  )
}

export function FloralCorner({ className = '', flip = false }) {
  return (
    <svg
      className={`${className} ${flip ? 'scale-x-[-1]' : ''}`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 112C8 70 28 42 58 28C42 48 40 72 48 96"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M18 108C30 78 55 55 88 42"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        opacity="0.7"
      />
      <circle cx="58" cy="28" r="5" fill="currentColor" opacity="0.55" />
      <circle cx="42" cy="48" r="3.5" fill="currentColor" opacity="0.4" />
      <circle cx="88" cy="42" r="4" fill="currentColor" opacity="0.45" />
      <path
        d="M48 96c8-4 14-2 18 6"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )
}
