interface ValidLogoProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'parchment' | 'tide'
  showTagline?: boolean
  tagline?: string
}

export default function ValidLogo({
  size = 'md',
  color = 'parchment',
  showTagline = false,
  tagline = 'THERAPEUTIC CONNECTIONS · PROFESSIONAL',
}: ValidLogoProps) {

  /*
   * ViewBox: 0 0 220 200   Symbol center: (110, 100)
   *
   * GEOMETRY RATIONALE
   * ─────────────────────────────────────────────────────────
   * Each crescent is built from two bezier arcs (inner + outer)
   * connected at both tips by a small bezier cap. The cap is the
   * key to the dulled/blunted tip — inner and outer arcs never
   * meet at the same point; instead a short curve bridges them,
   * producing a soft, rounded termination consistent with the mark.
   *
   * Left crescent anchor points:
   *   Inner top:    (96, 26)   Inner bottom: (96, 174)
   *   Outer top:    (86, 22)   Outer bottom: (86, 178)
   *   Inner mid:    (75, 100)  Outer mid:    (48, 100)   ← calculated
   *   Crescent belly thickness ≈ 27 units (12% of viewBox width)
   *
   * Bottom cap:  (96,174) → bezier → (86,178)   [dips slightly below]
   * Top cap:     (86,22)  → bezier → (96,26)    [rises slightly above]
   *
   * Dot positions (breathing room from arch tips):
   *   Top  cy=65  (gap from tip y=22: 34 px)
   *   Mid  cy=100 (vertical centre)
   *   Bot  cy=135 (gap from tip y=178: 32 px)
   *
   * Right crescent: mirror across x=110  (x → 220-x)
   */

  const sizes = {
    sm: { wordmark: 19, tagline: 8,  symW: 78,  symH: 71  },
    md: { wordmark: 28, tagline: 10, symW: 118, symH: 107 },
    lg: { wordmark: 40, tagline: 11, symW: 150, symH: 136 },
  }

  const s = sizes[size]

  const textColor    = color === 'parchment' ? '#F2EDDF' : '#3D6B65'
  const taglineColor = color === 'parchment' ? '#9A9488' : '#5E8880'

  const DOT_TOP = '#E8E0D0'
  const DOT_MID = '#C4882A'
  const DOT_BOT = '#7A9AAD'

  /* ── LEFT CRESCENT ──────────────────────────────────────
   * Read as: start at inner-top → inner arc down → bottom cap
   *          → outer arc up → top cap → close
   */
  const LEFT = `
    M 96 26
    C 68 52, 68 148, 96 174
    C 96 179, 89 182, 86 178
    C 36 152, 36 48, 86 22
    C 90 18, 96 22, 96 26
    Z
  `

  /* ── RIGHT CRESCENT (mirror: x → 220-x) ─────────────── */
  const RIGHT = `
    M 124 26
    C 152 52, 152 148, 124 174
    C 124 179, 131 182, 134 178
    C 184 152, 184 48, 134 22
    C 130 18, 124 22, 124 26
    Z
  `

  return (
    <div
      className="inline-flex flex-col items-center select-none"
      role="img"
      aria-label={`Valid — ${tagline}`}
    >
      <svg
        width={s.symW}
        height={s.symH}
        viewBox="0 0 220 200"
        fill="none"
        aria-hidden="true"
      >
        {/* ── Left crescent ─────────────────────────── */}
        <path d={LEFT}  fill={textColor} />

        {/* ── Right crescent ────────────────────────── */}
        <path d={RIGHT} fill={textColor} />

        {/* ── Three-dot vertical axis ───────────────── */}
        {/* Top — cream, intentionally smaller */}
        <circle cx="110" cy="65"  r="8.5"  fill={DOT_TOP} />
        {/* Mid — ember, dominant weight */}
        <circle cx="110" cy="100" r="12"   fill={DOT_MID} />
        {/* Bot — slate blue, grounds the mark */}
        <circle cx="110" cy="135" r="11"   fill={DOT_BOT} />
      </svg>

      {/* ── Wordmark ──────────────────────────────────── */}
      <span
        className="font-cormorant font-semibold"
        style={{
          fontSize:      s.wordmark,
          color:         textColor,
          letterSpacing: '0.22em',
          lineHeight:    1,
          marginTop:     4,
        }}
      >
        VALID
      </span>

      {/* ── Optional tagline ──────────────────────────── */}
      {showTagline && (
        <span
          className="font-dm font-medium uppercase"
          style={{
            fontSize:      s.tagline,
            color:         taglineColor,
            letterSpacing: '0.17em',
            lineHeight:    1,
            marginTop:     7,
          }}
        >
          {tagline}
        </span>
      )}
    </div>
  )
}
