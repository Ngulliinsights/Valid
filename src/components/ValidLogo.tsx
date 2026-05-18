import React from 'react'

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

  const sizes = {
    sm: { wordmark: 19, tagline: 8,  symW: 78,  symH: 56  },
    md: { wordmark: 28, tagline: 10, symW: 118, symH: 84  },
    lg: { wordmark: 40, tagline: 11, symW: 150, symH: 106 },
  }

  const s = sizes[size]

  const textColor    = color === 'parchment' ? '#F2EDDF' : '#3D6B65'
  const taglineColor = color === 'parchment' ? '#9A9488' : '#5E8880'

  const DOT_TOP = '#E8E0D0'   // cream
  const DOT_MID = '#C4882A'   // terracotta
  const DOT_BOT = '#7A9AAD'   // slate blue

  /*
   * MERGED APPROACH:
   *
   * Version 1 used filled closed paths (crescent shapes) — accurate to the logo
   * but the inner-curve control points produced a slightly boxy belly.
   *
   * Version 2 used a single stroked open arc — elegant math but the uniform
   * stroke weight loses the tapered-tip character of the real mark.
   *
   * MERGED: filled closed path whose outer curve mirrors v2's wide, smooth
   * arc, while the inner curve is a tighter parallel arc that preserves the
   * natural taper at the tips — giving us the crescent solidity of v1 with
   * the refined curvature of v2.
   *
   * ViewBox: 0 0 220 160
   * Symbol center: (110, 80)
   *
   * Left crescent
   *   Outer edge:  M(92,14) → C(32,44, 32,116, 92,146)   wide leftward sweep
   *   Inner edge:  C(62,116, 62,44, 92,14)                tighter, stays right of outer
   *
   * Right crescent (mirror across x=110)
   *   Outer edge:  M(128,14) → C(188,44, 188,116, 128,146)
   *   Inner edge:  C(158,116, 158,44, 128,14)
   */

  return (
    <div
      className="inline-flex flex-col items-center select-none"
      role="img"
      aria-label={`Valid — ${tagline}`}
    >
      <svg
        width={s.symW}
        height={s.symH}
        viewBox="0 0 220 160"
        fill="none"
        aria-hidden="true"
      >
        {/* ── Left crescent ─────────────────────────────────────── */}
        <path
          d="
            M 92 14
            C 32 44, 32 116, 92 146
            C 62 116, 62 44, 92 14
            Z
          "
          fill={textColor}
        />

        {/* ── Right crescent (mirrored) ──────────────────────────── */}
        <path
          d="
            M 128 14
            C 188 44, 188 116, 128 146
            C 158 116, 158 44, 128 14
            Z
          "
          fill={textColor}
        />

        {/* ── Three-dot vertical axis ────────────────────────────── */}
        {/* Top — smaller, cream; sits between the arc tips */}
        <circle cx="110" cy="38"  r="8.5" fill={DOT_TOP} />
        {/* Mid — dominant, terracotta; visual center of gravity */}
        <circle cx="110" cy="80"  r="11"  fill={DOT_MID} />
        {/* Bot — steel blue; grounds the mark */}
        <circle cx="110" cy="122" r="11"  fill={DOT_BOT} />
      </svg>

      {/* ── Wordmark ───────────────────────────────────────────── */}
      <span
        className="font-cormorant font-semibold"
        style={{
          fontSize:      s.wordmark,
          color:         textColor,
          letterSpacing: '0.22em',
          lineHeight:    1,
          marginTop:     5,
        }}
      >
        VALID
      </span>

      {/* ── Optional tagline ───────────────────────────────────── */}
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