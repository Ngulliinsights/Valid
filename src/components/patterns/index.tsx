/* ─────────────────────────────────────────────────────────────────
   VALID SIGNATURE PATTERN LIBRARY
   All patterns render as position:absolute inset-0 with z-[0].
   Content containers must use relative z-[10] to sit above.
   All opacities calibrated to the brand spec: 3–12%.
   All patterns are deterministic — no Math.random().
───────────────────────────────────────────────────────────────── */

const LEFT_ARC  = 'M 92 14 C 32 44, 32 116, 92 146 C 62 116, 62 44, 92 14 Z'
const RIGHT_ARC = 'M 128 14 C 188 44, 188 116, 128 146 C 158 116, 158 44, 128 14 Z'

function ValidMark({ color = '#F2EDDF' }: { color?: string }) {
  return (
    <>
      <path d={LEFT_ARC}  fill={color} />
      <path d={RIGHT_ARC} fill={color} />
      <circle cx="110" cy="38"  r="8.5" fill={color} opacity="0.7" />
      <circle cx="110" cy="80"  r="11"  fill="#C4882A" />
      <circle cx="110" cy="122" r="11"  fill="#3D6B65" />
    </>
  )
}

interface PatternProps {
  className?: string
}

/* ─────────────────────────────────────────────
   01 · ECHO FIELD
   "Validation reverberation"
   Faded Valid symbols scattered asymmetrically.
   Use: hero backgrounds, session complete.
───────────────────────────────────────────── */
export function EchoField({ className = '' }: PatternProps) {
  const symbols = [
    { x: -32,  y: 440, size: 260, opacity: 0.038 },
    { x: 480,  y: -55, size: 155, opacity: 0.048 },
    { x: 800,  y: 390, size: 95,  opacity: 0.028 },
    { x: 185,  y: 530, size: 75,  opacity: 0.028 },
    { x: 960,  y: 130, size: 185, opacity: 0.042 },
    { x: 360,  y: 270, size: 55,  opacity: 0.022 },
    { x: 1090, y: 530, size: 125, opacity: 0.032 },
  ]
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[0] ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      {symbols.map((s, i) => (
        <g key={i} transform={`translate(${s.x},${s.y})`} opacity={s.opacity}>
          <svg viewBox="0 0 220 160" width={s.size} height={(s.size * 160) / 220}>
            <ValidMark />
          </svg>
        </g>
      ))}
    </svg>
  )
}

/* ─────────────────────────────────────────────
   02 · CONTAINMENT PATTERN
   "Held space"
   Repeating crescent arcs from the parentheses.
   Use: Phase 2 Response Analysis (held tension).
───────────────────────────────────────────── */
export function ContainmentPattern({ className = '' }: PatternProps) {
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[0] ${className}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="containment" x="0" y="0" width="88" height="130" patternUnits="userSpaceOnUse">
          <path d="M 36 12 C 8 34, 8 96, 36 118"
            fill="none" stroke="#F2EDDF" strokeWidth="0.7" opacity="0.065" />
          <path d="M 52 12 C 80 34, 80 96, 52 118"
            fill="none" stroke="#F2EDDF" strokeWidth="0.7" opacity="0.065" />
          <path d="M 20 30 C 4 52, 4 78, 20 100"
            fill="none" stroke="#F2EDDF" strokeWidth="0.35" opacity="0.035" />
          <path d="M 68 30 C 84 52, 84 78, 68 100"
            fill="none" stroke="#F2EDDF" strokeWidth="0.35" opacity="0.035" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#containment)" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   03 · DIALOGUE STACK
   "Three emotional states"
   Vertical dot stacks — some missing, some glowing.
   Use: Character Selection (the three lenses).
───────────────────────────────────────────── */
export function DialogueStackPattern({ className = '' }: PatternProps) {
  type Stack = { x: number; y: number; missing?: number; ember?: boolean; tide?: boolean }
  const stacks: Stack[] = []
  const cols = 10
  const rows = 8
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = r * cols + c
      const s: Stack = { x: c * 95 + 32, y: r * 85 + 24 }
      if (seed % 11 === 0) s.missing = 0
      if (seed % 13 === 0) s.missing = 2
      if (seed % 17 === 0) s.ember = true
      if (seed % 23 === 0) s.tide = true
      stacks.push(s)
    }
  }
  const sp = 13
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[0] ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 960 700"
      xmlns="http://www.w3.org/2000/svg"
    >
      {stacks.map((s, i) => (
        <g key={i} transform={`translate(${s.x},${s.y})`}>
          {s.missing !== 0 && (
            <circle cx="0" cy="0" r="3.5"
              fill={s.ember ? '#C4882A' : '#F2EDDF'}
              opacity={s.ember ? 0.13 : 0.05} />
          )}
          <circle cx="0" cy={sp} r="3.5"
            fill="#C4882A"
            opacity={s.ember ? 0.16 : 0.065} />
          {s.missing !== 2 && (
            <circle cx={s.missing === 2 ? 5 : 0} cy={sp * 2} r="3.5"
              fill={s.tide ? '#3D6B65' : '#F2EDDF'}
              opacity={s.tide ? 0.13 : 0.05} />
          )}
        </g>
      ))}
    </svg>
  )
}

/* ─────────────────────────────────────────────
   04 · FRACTURE GRID
   "Communication breakdown"
   Interrupted grid — structure that tries and fails.
   Use: Phase 3 Reflection.
───────────────────────────────────────────── */
export function FractureGrid({ className = '' }: PatternProps) {
  const W = 1200
  const H = 900
  const hCount = 12
  const vCount = 16
  const hStep = H / hCount
  const vStep = W / vCount

  const hLines = Array.from({ length: hCount }, (_, i) => {
    const y = hStep * i + hStep * 0.4
    const isSeam = i === 5 || i === 9
    const gaps: Array<[number, number]> = []
    if (i % 4 === 2) gaps.push([280, 420])
    if (i % 6 === 1) gaps.push([750, 820])
    if (i % 7 === 3) gaps.push([480, 510])
    return { y, isSeam, gaps }
  })

  const vLines = Array.from({ length: vCount }, (_, j) => {
    const x = vStep * j + vStep * 0.3
    const gaps: Array<[number, number]> = []
    if (j % 5 === 1) gaps.push([180, 290])
    if (j % 7 === 3) gaps.push([520, 610])
    const offset = (j % 6 === 4) ? 14 : 0
    return { x, gaps, offset }
  })

  function hSegs(line: (typeof hLines)[number]) {
    if (!line.gaps.length) return null
    const parts: { x1: number; x2: number }[] = []
    let cur = 0
    for (const [a, b] of line.gaps) { parts.push({ x1: cur, x2: a }); cur = b }
    parts.push({ x1: cur, x2: W })
    return parts
  }

  function vSegs(line: (typeof vLines)[number]) {
    if (!line.gaps.length) return null
    const parts: { y1: number; y2: number }[] = []
    let cur = 0
    for (const [a, b] of line.gaps) { parts.push({ y1: cur, y2: a }); cur = b }
    parts.push({ y1: cur, y2: H })
    return parts
  }

  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[0] ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {hLines.map((line, i) => {
        const segs = hSegs(line)
        if (!segs) return (
          <line key={`h${i}`} x1="0" y1={line.y} x2={W} y2={line.y}
            stroke={line.isSeam ? '#C4882A' : '#3D6B65'}
            strokeWidth={line.isSeam ? 0.55 : 0.4}
            opacity={line.isSeam ? 0.14 : 0.08} />
        )
        return (
          <g key={`h${i}`}>
            {segs.map((seg, si) => (
              <line key={si} x1={seg.x1} y1={line.y} x2={seg.x2} y2={line.y}
                stroke="#3D6B65" strokeWidth="0.4" opacity="0.08" />
            ))}
          </g>
        )
      })}
      {vLines.map((line, j) => {
        const segs = vSegs(line)
        const ox = line.offset
        if (!segs) return (
          <line key={`v${j}`} x1={line.x + ox} y1="0" x2={line.x} y2={H}
            stroke="#3D6B65" strokeWidth="0.4" opacity="0.08" />
        )
        return (
          <g key={`v${j}`}>
            {segs.map((seg, si) => (
              <line key={si} x1={line.x} y1={seg.y1}
                x2={line.x + (si === segs.length - 1 ? ox : 0)} y2={seg.y2}
                stroke="#3D6B65" strokeWidth="0.4" opacity="0.08" />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

/* ─────────────────────────────────────────────
   05 · CLINICAL SIGNAL
   "Institutional precision"
   Ruling lines + colored dot markers.
   Use: Phase 1 Diagnostic.
───────────────────────────────────────────── */
export function ClinicalSignalPattern({ className = '' }: PatternProps) {
  const rows: Array<{ y: number; thick: boolean; dot: 'ember' | 'tide' | null }> = [
    { y: 72,  thick: true,  dot: 'ember' },
    { y: 112, thick: false, dot: null },
    { y: 152, thick: false, dot: 'tide' },
    { y: 192, thick: false, dot: null },
    { y: 232, thick: true,  dot: null },
    { y: 272, thick: false, dot: 'ember' },
    { y: 312, thick: false, dot: null },
    { y: 352, thick: false, dot: 'tide' },
    { y: 392, thick: true,  dot: null },
    { y: 432, thick: false, dot: null },
    { y: 472, thick: false, dot: 'ember' },
    { y: 512, thick: false, dot: null },
    { y: 552, thick: true,  dot: 'tide' },
    { y: 592, thick: false, dot: null },
    { y: 632, thick: false, dot: null },
    { y: 672, thick: false, dot: 'ember' },
    { y: 712, thick: true,  dot: null },
    { y: 752, thick: false, dot: null },
    { y: 792, thick: false, dot: 'tide' },
  ]
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[0] ${className}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1200 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      {rows.map((r, i) => (
        <g key={i}>
          <line x1="40" y1={r.y} x2="1160" y2={r.y}
            stroke="#F2EDDF"
            strokeWidth={r.thick ? 0.65 : 0.3}
            opacity={r.thick ? 0.06 : 0.035} />
          {r.dot && (
            <circle cx="26" cy={r.y} r="2.2"
              fill={r.dot === 'ember' ? '#C4882A' : '#3D6B65'}
              opacity="0.22" />
          )}
        </g>
      ))}
    </svg>
  )
}

/* ─────────────────────────────────────────────
   06 · THRESHOLD PATTERN
   "Approach / withdrawal"
   Symbols compress toward a seam on one side.
   Dense on right → sparse toward left seam.
   Use: Landing hero (right half).
───────────────────────────────────────────── */
export function ThresholdPattern({ className = '' }: PatternProps) {
  type Sym = { x: number; y: number; size: number; opacity: number }
  const syms: Sym[] = []

  const rows = 7
  const cols = 6
  const W = 560
  const H = 720
  const gx = W / cols
  const gy = H / rows

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = r * cols + c
      const density = c / (cols - 1)
      if (seed % 7 === 3 && density < 0.35) continue
      const opacity = 0.018 + density * 0.065
      const size = 26 + density * 54
      const jitterX = (c % 2 === 0 ? -7 : 5)
      const jitterY = (r % 3 === 0 ? 9 : -4)
      syms.push({ x: c * gx + jitterX, y: r * gy + jitterY, size, opacity })
    }
  }

  return (
    <svg
      aria-hidden="true"
      className={`absolute right-0 top-0 pointer-events-none z-[0] ${className}`}
      style={{ width: '50%', height: '100%' }}
      preserveAspectRatio="xMinYMid meet"
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Seam: very faint Ember line at left edge — the "space before contact" */}
      <line x1="0" y1="0" x2="0" y2={H}
        stroke="#C4882A" strokeWidth="1" opacity="0.07" />
      {syms.map((s, i) => (
        <g key={i} transform={`translate(${s.x},${s.y})`} opacity={s.opacity}>
          <svg viewBox="0 0 220 160" width={s.size} height={(s.size * 160) / 220}>
            <ValidMark />
          </svg>
        </g>
      ))}
    </svg>
  )
}
