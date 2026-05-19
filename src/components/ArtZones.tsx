import React from 'react'
import { TIER_STYLES, TIER_PIP_COUNT } from '../config/cardStyles'
import type { TierKey } from '../config/cardStyles'

// ---------------------------------------------------------------------------
// Shared SVG wrapper props
// ---------------------------------------------------------------------------

const SVG_PROPS: React.SVGProps<SVGSVGElement> = {
  viewBox: '0 0 280 140',
  xmlns: 'http://www.w3.org/2000/svg',
  style: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
  preserveAspectRatio: 'xMidYMid slice',
  'aria-hidden': 'true',
}

// ---------------------------------------------------------------------------
// BlindArt — neutral compass/mandala shown on all Stage 1 cards
// ---------------------------------------------------------------------------

export function BlindArt() {
  const cx = 140
  const cy = 70
  const spoke = (i: number, r0: number, r1: number) => {
    const a = (i * Math.PI * 2) / 12
    return {
      x1: cx + Math.cos(a) * r0,
      y1: cy + Math.sin(a) * r0,
      x2: cx + Math.cos(a) * r1,
      y2: cy + Math.sin(a) * r1,
    }
  }

  return (
    <svg {...SVG_PROPS}>
      {/* Concentric rings */}
      <circle cx={cx} cy={cy} r={52} fill="none" stroke="rgba(242,237,223,0.07)" strokeWidth={0.75} />
      <circle cx={cx} cy={cy} r={34} fill="none" stroke="rgba(242,237,223,0.05)" strokeWidth={0.5} />
      <circle cx={cx} cy={cy} r={16} fill="none" stroke="rgba(242,237,223,0.07)" strokeWidth={0.5} />
      {/* Radial tick marks */}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} {...spoke(i, 46, 52)} stroke="rgba(242,237,223,0.1)" strokeWidth={0.5} />
      ))}
      {/* Cross-hair */}
      <line x1={cx} y1={12} x2={cx} y2={128} stroke="rgba(242,237,223,0.04)" strokeWidth={0.5} />
      <line x1={80} y1={cy} x2={200} y2={cy} stroke="rgba(242,237,223,0.04)" strokeWidth={0.5} />
      {/* Diamond */}
      <polygon
        points={`${cx},44 ${cx + 20},${cy} ${cx},96 ${cx - 20},${cy}`}
        fill="none"
        stroke="rgba(242,237,223,0.06)"
        strokeWidth={0.5}
      />
      {/* Centre dot */}
      <circle cx={cx} cy={cy} r={3} fill="rgba(242,237,223,0.1)" />
      {/* Corner brackets — all four */}
      <path d="M16 16 L30 16 M16 16 L16 30"   fill="none" stroke="rgba(242,237,223,0.08)" strokeWidth={0.5} />
      <path d="M264 16 L250 16 M264 16 L264 30" fill="none" stroke="rgba(242,237,223,0.08)" strokeWidth={0.5} />
      <path d="M16 124 L30 124 M16 124 L16 110"  fill="none" stroke="rgba(242,237,223,0.08)" strokeWidth={0.5} />
      <path d="M264 124 L250 124 M264 124 L264 110" fill="none" stroke="rgba(242,237,223,0.08)" strokeWidth={0.5} />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Tier1Art — fractured triangular shards, radiating conflict lines
// ---------------------------------------------------------------------------

export function Tier1Art() {
  const s = 'rgba(196,80,80,'
  return (
    <svg {...SVG_PROPS}>
      <polygon points="140,8 206,140 74,140"   fill={`${s}0.06)`} stroke={`${s}0.18)`} strokeWidth={0.5} />
      <polygon points="140,28 192,140 88,140"  fill={`${s}0.04)`} stroke={`${s}0.10)`} strokeWidth={0.5} />
      {/* Radiating lines */}
      <line x1={140} y1={8} x2={8}   y2={140} stroke={`${s}0.10)`} strokeWidth={0.5} />
      <line x1={140} y1={8} x2={272} y2={140} stroke={`${s}0.10)`} strokeWidth={0.5} />
      <line x1={140} y1={8} x2={40}  y2={140} stroke={`${s}0.07)`} strokeWidth={0.5} />
      <line x1={140} y1={8} x2={240} y2={140} stroke={`${s}0.07)`} strokeWidth={0.5} />
      {/* Tension horizon */}
      <line x1={8} y1={70} x2={272} y2={70} stroke={`${s}0.07)`} strokeWidth={0.5} />
      {/* Dashed orbit — unstable */}
      <circle cx={140} cy={38} r={20} fill="none" stroke={`${s}0.16)`} strokeWidth={0.5} strokeDasharray="3 5" />
      {/* Corner brackets */}
      <path d="M16 16 L30 16 M16 16 L16 30"   fill="none" stroke={`${s}0.14)`} strokeWidth={0.5} />
      <path d="M264 16 L250 16 M264 16 L264 30" fill="none" stroke={`${s}0.14)`} strokeWidth={0.5} />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Tier2Art — concentric semicircles reaching upward, incomplete arcs
// ---------------------------------------------------------------------------

export function Tier2Art() {
  const s = 'rgba(196,136,42,'
  const radii = [22, 44, 66, 88, 110] as const
  return (
    <svg {...SVG_PROPS}>
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M${140 - r} 140 A${r} ${r} 0 0 1 ${140 + r} 140`}
          fill="none"
          stroke={`${s}0.14)`}
          strokeWidth={0.5}
          strokeDasharray={i === 4 ? '4 6' : undefined}
        />
      ))}
      {/* Lateral sweep lines */}
      <path d="M10 140 Q50 55 110 25"  fill="none" stroke={`${s}0.09)`} strokeWidth={0.5} />
      <path d="M270 140 Q230 55 170 25" fill="none" stroke={`${s}0.09)`} strokeWidth={0.5} />
      {/* Dashed horizon */}
      <line x1={20} y1={70} x2={260} y2={70} stroke={`${s}0.07)`} strokeWidth={0.5} strokeDasharray="3 5" />
      {/* Origin anchor */}
      <circle cx={140} cy={140} r={5} fill={`${s}0.20)`} />
      {/* Corner brackets */}
      <path d="M16 16 L30 16 M16 16 L16 30"   fill="none" stroke={`${s}0.14)`} strokeWidth={0.5} />
      <path d="M264 16 L250 16 M264 16 L264 30" fill="none" stroke={`${s}0.14)`} strokeWidth={0.5} />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Tier3Art — lotus bloom: nested rings with 8-petal orbit
// ---------------------------------------------------------------------------

export function Tier3Art() {
  const s = 'rgba(61,107,101,'
  const rings = [12, 28, 46, 65] as const
  return (
    <svg {...SVG_PROPS}>
      {/* Concentric rings */}
      {rings.map((r) => (
        <circle key={r} cx={140} cy={70} r={r} fill="none" stroke={`${s}0.16)`} strokeWidth={0.5} />
      ))}
      {/* 8-petal orbit */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI * 2) / 8
        return (
          <circle
            key={i}
            cx={140 + Math.cos(a) * 46}
            cy={70 + Math.sin(a) * 46}
            r={16}
            fill="none"
            stroke={`${s}0.09)`}
            strokeWidth={0.5}
          />
        )
      })}
      {/* Outer halo */}
      <circle cx={140} cy={70} r={80} fill="none" stroke={`${s}0.07)`} strokeWidth={0.5} />
      {/* Centre dot */}
      <circle cx={140} cy={70} r={4} fill={`${s}0.30)`} />
      {/* Corner brackets — all four */}
      <path d="M16 16 L30 16 M16 16 L16 30"      fill="none" stroke={`${s}0.16)`} strokeWidth={0.5} />
      <path d="M264 16 L250 16 M264 16 L264 30"   fill="none" stroke={`${s}0.16)`} strokeWidth={0.5} />
      <path d="M16 124 L30 124 M16 124 L16 110"   fill="none" stroke={`${s}0.16)`} strokeWidth={0.5} />
      <path d="M264 124 L250 124 M264 124 L264 110" fill="none" stroke={`${s}0.16)`} strokeWidth={0.5} />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// TIER_ART — factory map (avoids stale React node serialisation)
// ---------------------------------------------------------------------------

export const TIER_ART_COMPONENTS: Record<TierKey, React.ComponentType> = {
  tier1: Tier1Art,
  tier2: Tier2Art,
  tier3: Tier3Art,
}

/** Render the correct art component for a given tier key */
export function TierArt({ tier }: { tier: TierKey }) {
  const Component = TIER_ART_COMPONENTS[tier]
  return <Component />
}

// ---------------------------------------------------------------------------
// RarityPips — 1 (tier1) · 2 (tier2) · 3 (tier3)
// ---------------------------------------------------------------------------

export function RarityPips({ tier, size = 5 }: { tier: TierKey; size?: number }) {
  const { accentColor } = TIER_STYLES[tier]
  const filled = TIER_PIP_COUNT[tier]
  return (
    <div style={{ display: 'flex', gap: 3, alignItems: 'center' }} aria-hidden="true">
      {([0, 1, 2] as const).map((i) => (
        <div
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: i < filled ? accentColor : 'rgba(242,237,223,0.08)',
          }}
        />
      ))}
    </div>
  )
}