// ---------------------------------------------------------------------------
// Card styles, tier metadata, and shared constants
// ---------------------------------------------------------------------------

export type TierKey = 'tier1' | 'tier2' | 'tier3'

export type ResponseType =
  | 'invalidating-antagonising'
  | 'invalidating-enabling'
  | 'partial'
  | 'validating'

export interface TierStyle {
  /** CSS colour token for accent lines, text, and pip fills */
  accentColor: string
  /** Background tint applied to card surfaces */
  bgTint: string
  /** Semi-transparent fill for label badges */
  tagBg: string
  /** Short effectiveness verdict shown in the card footer */
  effectiveness: string
  /** Primary display label (tier name) */
  label: string
  /** Secondary display label (response archetype) */
  sublabel: string
  /** Semantic response type forwarded to the parent on confirmation */
  responseType: ResponseType
}

export const TIER_STYLES: Record<TierKey, TierStyle> = {
  tier1: {
    accentColor: '#C45050',
    bgTint: 'rgba(196,80,80,0.07)',
    tagBg: 'rgba(196,80,80,0.12)',
    effectiveness: 'COUNTERPRODUCTIVE',
    label: 'Invalidating',
    sublabel: 'Invalidating · Antagonising',
    responseType: 'invalidating-antagonising',
  },
  tier2: {
    accentColor: '#C4882A',
    bgTint: 'rgba(196,136,42,0.06)',
    tagBg: 'rgba(196,136,42,0.12)',
    effectiveness: 'PARTIAL — NOT ENOUGH',
    label: 'Partial validation',
    sublabel: 'Partial Validation',
    responseType: 'partial',
  },
  tier3: {
    accentColor: '#3D6B65',
    bgTint: 'rgba(61,107,101,0.08)',
    tagBg: 'rgba(61,107,101,0.12)',
    effectiveness: 'OPTIMAL RESPONSE',
    label: 'Validating',
    sublabel: 'Full Validation',
    responseType: 'validating',
  },
}

/** Ordered tier array — used wherever tier iteration is needed */
export const TIERS: TierKey[] = ['tier1', 'tier2', 'tier3']

/** Contextual note shown beneath the instinct quote once a tier is selected */
export const INSTINCT_NOTES: Record<TierKey, string> = {
  tier1:
    'Your instinct moved toward confrontation. Notice the distance between that impulse and the validating response — closing that gap is precisely what this practice builds.',
  tier2:
    'Your instinct reached for partial validation — closer than antagonising, but safety must be established before any move toward problem-solving.',
  tier3:
    'Your instinct aligned with the validating response. That recognition is the foundation of clinical skill.',
}

/** Number of rarity pips per tier */
export const TIER_PIP_COUNT: Record<TierKey, 1 | 2 | 3> = {
  tier1: 1,
  tier2: 2,
  tier3: 3,
}