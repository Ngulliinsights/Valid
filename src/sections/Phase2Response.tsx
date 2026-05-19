import { useState, useCallback, useMemo, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import { ContainmentPattern } from '../components/patterns'

import { TIER_STYLES, TIERS, INSTINCT_NOTES } from '../config/cardStyles'
import type { TierKey, ResponseType } from '../config/cardStyles'
import { BlindArt, TierArt, RarityPips } from '../components/ArtZones'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InstinctAnalysis {
  primaryType: ResponseType
  confidence: 'high' | 'moderate' | 'low'
  keywords: string[]
}

interface Phase2ResponseProps {
  scenario: ScenarioData
  instinctText: string
  instinctAnalysis?: InstinctAnalysis
  onResponseTypeSelect: (type: ResponseType) => void
  onReturnToHome?: () => void
}

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------

const FONT_LABEL: React.CSSProperties = {
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontSize: 7,
  fontWeight: 500,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
}

const FONT_QUOTE: React.CSSProperties = {
  fontFamily: 'Cormorant Garamond, Georgia, serif',
  fontStyle: 'italic',
}

const INNER_FRAME: React.CSSProperties = {
  position: 'absolute',
  inset: 5,
  borderRadius: 12,
  border: '0.5px solid rgba(242,237,223,0.06)',
  pointerEvents: 'none',
  zIndex: 2,
}

// ---------------------------------------------------------------------------
// Shuffle — Fisher-Yates (Durstenfeld), returns new array, never mutates
// ---------------------------------------------------------------------------

/**
 * Returns a new shuffled copy of `items`.
 * Uses Fisher-Yates (Durstenfeld) — O(n), unbiased.
 */
function fisherYatesShuffle<T>(items: readonly T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0  // bitwise floor — slightly faster than Math.floor
    // Destructure swap (no temp variable needed)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ---------------------------------------------------------------------------
// Motion variants
// ---------------------------------------------------------------------------

const CARD_HOVER_BASE = { y: -10, scale: 1.08, zIndex: 50 }
const CARD_HOVER_TRANSITION = { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }

/** Subtle per-slot tilt: slot 0 → right, slot 1 → neutral, slot 2 → left */
const TILT_BY_INDEX = [0.6, 0, -0.6] as const

const REVEAL_VARIANTS = {
  card:     { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 0.1 } },
  grid:     { initial: { opacity: 0, y: 20 },       animate: { opacity: 1, y: 0 },     transition: { duration: 0.4, delay: 0.2 } },
  instinct: { initial: { opacity: 0, y: 20 },       animate: { opacity: 1, y: 0 },     transition: { duration: 0.4, delay: 0.3 } },
  actions:  { initial: { opacity: 0, y: 20 },       animate: { opacity: 1, y: 0 },     transition: { duration: 0.4, delay: 0.4 } },
} as const

// ---------------------------------------------------------------------------
// BlindCardItem — Stage 1: text visible, tier identity hidden
// ---------------------------------------------------------------------------

interface BlindCardItemProps {
  responseText: string
  cardIndex: 0 | 1 | 2
  onClick: () => void
  delay: number
}

const BlindCardItem = memo(function BlindCardItem({
  responseText,
  cardIndex,
  onClick,
  delay,
}: BlindCardItemProps) {
  const tilt = TILT_BY_INDEX[cardIndex]
  const cardNumber = cardIndex + 1

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ ...CARD_HOVER_BASE, rotate: tilt, transition: CARD_HOVER_TRANSITION }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      type="button"
      aria-label={`Response option ${cardNumber}`}
      data-cursor-hover
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        textAlign: 'left',
      }}
    >
      {/* Physical depth shadow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -4,
          left: 8,
          right: 8,
          height: 8,
          borderRadius: '0 0 16px 16px',
          background: 'rgba(0,0,0,0.5)',
          filter: 'blur(3px)',
        }}
      />

      {/* Card surface */}
      <div
        style={{
          borderRadius: 16,
          border: '1px solid rgba(242,237,223,0.22)',
          backgroundColor: '#23211E',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 6px 16px rgba(0,0,0,0.5)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 390,
          position: 'relative',
        }}
      >
        <div aria-hidden="true" style={INNER_FRAME} />

        {/* "RESPONSE" label */}
        <div
          style={{
            ...FONT_LABEL,
            position: 'absolute',
            top: 9,
            left: 11,
            color: 'rgba(242,237,223,0.22)',
            zIndex: 3,
          }}
        >
          RESPONSE
        </div>

        {/* Card-number watermark */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 2,
            right: 9,
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 40,
            fontWeight: 600,
            color: 'rgba(242,237,223,0.05)',
            lineHeight: 1,
            zIndex: 3,
            userSelect: 'none',
          }}
        >
          {`0${cardNumber}`}
        </div>

        {/* Art zone */}
        <div
          style={{
            position: 'relative',
            height: 140,
            flexShrink: 0,
            backgroundColor: '#151311',
            overflow: 'hidden',
          }}
        >
          <BlindArt />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 44,
              background: 'linear-gradient(to top, #1C1A18, transparent)',
            }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            marginInline: 10,
            backgroundColor: 'rgba(242,237,223,0.08)',
            flexShrink: 0,
          }}
        />

        {/* Text body */}
        <div
          style={{
            flex: 1,
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'rgba(8,7,6,0.15)',
          }}
        >
          <blockquote
            style={{
              ...FONT_QUOTE,
              fontSize: 14.5,
              lineHeight: 1.75,
              color: 'rgba(242,237,223,0.82)',
              margin: 0,
              overflow: 'hidden',
              display: '-webkit-box' as React.CSSProperties['display'],
              WebkitLineClamp: 7,
              WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
            }}
          >
            &ldquo;{responseText}&rdquo;
          </blockquote>
        </div>

        {/* Footer */}
        <div
          style={{
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 13,
            borderTop: '0.5px solid rgba(242,237,223,0.07)',
            flexShrink: 0,
          }}
        >
          <span style={{ ...FONT_LABEL, color: 'rgba(242,237,223,0.2)' }}>TAP TO SELECT</span>
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              border: '0.5px solid rgba(242,237,223,0.15)',
            }}
          />
        </div>
      </div>
    </motion.button>
  )
})

// ---------------------------------------------------------------------------
// SelectedTierCard — Stage 2: full expanded reveal
// ---------------------------------------------------------------------------

const SelectedTierCard = memo(function SelectedTierCard({
  tierKey,
  scenario,
}: {
  tierKey: TierKey
  scenario: ScenarioData
}) {
  const [mechanismOpen, setMechanismOpen] = useState(false)
  const style = TIER_STYLES[tierKey]
  const data = scenario.responses[tierKey]

  const toggleMechanism = useCallback(() => setMechanismOpen((p) => !p), [])

  return (
    <article
      style={{
        borderRadius: 16,
        border: `1px solid ${style.accentColor}60`,
        backgroundColor: '#262320',
        boxShadow: [
          `0 0 0 1px ${style.accentColor}18`,
          '0 32px 80px rgba(0,0,0,0.85)',
          '0 10px 24px rgba(0,0,0,0.55)',
        ].join(', '),
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        style={{ ...INNER_FRAME, borderRadius: 12, border: `0.5px solid ${style.accentColor}18` }}
      />

      {/* Art zone */}
      <div style={{ position: 'relative', height: 160, overflow: 'hidden', backgroundColor: '#121010' }}>
        <TierArt tier={tierKey} />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 60,
            background: 'linear-gradient(to top, #1C1A18, transparent)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 10, right: 10,
            ...FONT_LABEL,
            color: style.accentColor,
            backgroundColor: style.tagBg,
            padding: '4px 8px',
            zIndex: 3,
          }}
        >
          YOUR CHOICE
        </div>
      </div>

      {/* Accent rule */}
      <div style={{ height: 1, backgroundColor: style.accentColor, opacity: 0.5 }} />

      {/* Name banner */}
      <div style={{ padding: '12px 18px 10px', borderBottom: `0.5px solid ${style.accentColor}20` }}>
        <div style={{ ...FONT_LABEL, fontSize: 9, letterSpacing: '0.18em', color: style.accentColor, marginBottom: 3 }}>
          {data.label}
        </div>
        <div style={{ ...FONT_LABEL, fontSize: 8, letterSpacing: '0.12em', color: style.accentColor, opacity: 0.55 }}>
          {data.sublabel}
        </div>
      </div>

      {/* Quote */}
      <div
        style={{
          padding: '18px 18px 16px',
          backgroundColor: 'rgba(8,7,6,0.2)',
          borderBottom: `0.5px solid ${style.accentColor}15`,
        }}
      >
        <blockquote style={{ ...FONT_QUOTE, fontSize: 19, lineHeight: 1.8, color: 'rgba(242,237,223,0.9)', margin: 0 }}>
          &ldquo;{data.text}&rdquo;
        </blockquote>
      </div>

      {/* Mechanism accordion */}
      <div style={{ padding: '12px 18px' }}>
        <button
          onClick={toggleMechanism}
          type="button"
          aria-expanded={mechanismOpen}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <span style={{ ...FONT_LABEL, fontSize: 8, color: style.accentColor }}>
            {data.mechanism}
          </span>
          <span
            aria-hidden="true"
            style={{
              color: style.accentColor,
              fontSize: 11,
              fontFamily: 'DM Sans, Arial, sans-serif',
              display: 'inline-block',
              transition: 'transform 0.2s',
              transform: mechanismOpen ? 'rotate(180deg)' : 'none',
            }}
          >
            ↓
          </span>
        </button>

        <AnimatePresence initial={false}>
          {mechanismOpen && (
            <motion.p
              key="clinical-note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'DM Sans, Arial, sans-serif',
                fontSize: 13,
                lineHeight: 1.65,
                color: '#9A9488',
                margin: '10px 0 0',
                overflow: 'hidden',
              }}
            >
              {data.clinicalNote}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '8px 18px 10px',
          borderTop: `0.5px solid ${style.accentColor}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            ...FONT_LABEL,
            fontSize: 7,
            color: style.accentColor,
            backgroundColor: style.tagBg,
            padding: '3px 8px',
          }}
        >
          {style.effectiveness}
        </span>
        <RarityPips tier={tierKey} size={6} />
      </div>
    </article>
  )
})

// ---------------------------------------------------------------------------
// ContrastCard — Stage 2 comparison grid, compact
// ---------------------------------------------------------------------------

const ContrastCard = memo(function ContrastCard({
  tierKey,
  scenario,
  isSelected,
}: {
  tierKey: TierKey
  scenario: ScenarioData
  isSelected: boolean
}) {
  const style = TIER_STYLES[tierKey]
  const data = scenario.responses[tierKey]

  // Pre-compute repeated alpha values
  const dim = (a: string) => `rgba(242,237,223,${a})`
  const borderColor  = isSelected ? `${style.accentColor}60` : dim('0.14')
  const bgColor      = isSelected ? '#262320' : '#1E1C19'
  const labelColor   = isSelected ? style.accentColor : dim('0.28')
  const sublabColor  = isSelected ? style.accentColor : dim('0.18')
  const quoteColor   = isSelected ? dim('0.88') : dim('0.38')
  const footerBorder = isSelected ? `0.5px solid ${style.accentColor}18` : `0.5px solid ${dim('0.06')}`
  const tagBg        = isSelected ? style.tagBg : 'rgba(242,237,223,0.03)'
  const tagColor     = isSelected ? style.accentColor : dim('0.22')

  return (
    <article
      style={{
        borderRadius: 16,
        border: `1px solid ${borderColor}`,
        backgroundColor: bgColor,
        boxShadow: isSelected ? '0 16px 40px rgba(0,0,0,0.65)' : 'none',
        overflow: 'hidden',
        opacity: isSelected ? 1 : 0.38,
        position: 'relative',
        transition: 'opacity 0.3s',
      }}
    >
      {/* Art zone */}
      <div style={{ position: 'relative', height: 90, overflow: 'hidden', backgroundColor: '#111010' }}>
        {isSelected ? (
          <TierArt tier={tierKey} />
        ) : (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 11px, rgba(61,107,101,0.05) 11px, rgba(61,107,101,0.05) 12px)',
            }}
          />
        )}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: 30,
            background: `linear-gradient(to top, ${isSelected ? '#1C1A18' : '#171512'}, transparent)`,
          }}
        />
        {isSelected && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 7, right: 7,
              width: 6, height: 6,
              borderRadius: '50%',
              backgroundColor: style.accentColor,
            }}
          />
        )}
      </div>

      {isSelected && (
        <div style={{ height: 0.5, backgroundColor: style.accentColor, opacity: 0.4 }} />
      )}

      {/* Content */}
      <div style={{ padding: '10px 13px' }}>
        <div style={{ ...FONT_LABEL, fontSize: 8, letterSpacing: '0.14em', color: labelColor, marginBottom: 2 }}>
          {data.label}
        </div>
        <div style={{ ...FONT_LABEL, fontSize: 7, letterSpacing: '0.10em', color: sublabColor, opacity: 0.7, marginBottom: 9 }}>
          {data.sublabel}
        </div>
        <blockquote
          style={{
            ...FONT_QUOTE,
            fontSize: 13,
            lineHeight: 1.65,
            color: quoteColor,
            margin: '0 0 10px',
            overflow: 'hidden',
            display: '-webkit-box' as React.CSSProperties['display'],
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
          }}
        >
          &ldquo;{data.text}&rdquo;
        </blockquote>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '6px 13px 9px',
          borderTop: footerBorder,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ ...FONT_LABEL, fontSize: 7, letterSpacing: '0.10em', color: tagColor, backgroundColor: tagBg, padding: '2px 6px' }}>
          {style.effectiveness}
        </span>
        <RarityPips tier={tierKey} size={4} />
      </div>
    </article>
  )
})

// ---------------------------------------------------------------------------
// InstinctAside — displays the Phase 1 instinct response
// ---------------------------------------------------------------------------

const InstinctAside = memo(function InstinctAside({
  instinctText,
  instinctAnalysis,
  selectedTier,
}: {
  instinctText: string
  instinctAnalysis?: InstinctAnalysis
  selectedTier: TierKey | null
}) {
  return (
    <aside
      className="max-w-[900px] mx-auto"
      style={{
        borderLeft: '3px solid rgba(154,148,136,0.3)',
        backgroundColor: 'rgba(154,148,136,0.04)',
      }}
    >
      <div className="p-6">
        <span className="label-text text-drift block mb-3">YOUR PHASE 01 INSTINCT</span>

        <blockquote className="font-cormorant italic text-base text-parchment/60 leading-relaxed">
          &ldquo;{instinctText || 'No response recorded.'}&rdquo;
        </blockquote>

        {instinctAnalysis && instinctAnalysis.keywords.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" aria-label="Detected keywords">
            {instinctAnalysis.keywords.map((kw) => (
              <span
                key={kw}
                className="font-dm text-[10px] uppercase tracking-widest text-drift/40 border border-drift/15 px-2 py-0.5"
              >
                {kw}
              </span>
            ))}
          </div>
        )}

        {selectedTier && (
          <p className="mt-3 font-dm text-xs text-drift/40 leading-relaxed">
            {INSTINCT_NOTES[selectedTier]}
          </p>
        )}
      </div>
    </aside>
  )
})

// ---------------------------------------------------------------------------
// Stage 1 — Blind selection view
// ---------------------------------------------------------------------------

function BlindSelectionStage({
  scenario,
  instinctText,
  instinctAnalysis,
  onSelect,
}: {
  scenario: ScenarioData
  instinctText: string
  instinctAnalysis?: InstinctAnalysis
  onSelect: (tier: TierKey) => void
}) {
  const shuffledTiers = useMemo(() => fisherYatesShuffle(TIERS), [])

  return (
    <motion.div
      key="blind-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition()}
        className="mb-12"
      >
        <span className="label-text text-ember block mb-4">PHASE 02 · STRATEGIC CHOICE</span>
        <h2 className="font-cormorant font-medium text-parchment text-3xl md:text-4xl mb-3 leading-tight">
          Which response feels most validating?
        </h2>
        <p className="font-dm text-sm text-drift max-w-xl leading-relaxed">
          Read each response carefully. Trust your clinical instinct. Select the one you would use
          in this moment.
        </p>
        <p className="font-dm text-xs text-drift/50 max-w-xl leading-relaxed">
          In this exercise, the first card is usually invalidating and shuts down the feeling, the
          second card partially acknowledges the anxiety while still fixing it, and the third card
          aims to fully validate the emotion and create safety.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-start">
        {shuffledTiers.map((key, idx) => (
          <BlindCardItem
            key={key}
            responseText={scenario.responses[key].text}
            cardIndex={idx as 0 | 1 | 2}
            onClick={() => onSelect(key)}
            delay={0.2 + idx * 0.14}
          />
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(0.75)}
        className="mt-12"
      >
        <InstinctAside
          instinctText={instinctText}
          instinctAnalysis={instinctAnalysis}
          selectedTier={null}
        />
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Stage 2 — Reveal & clinical analysis view
// ---------------------------------------------------------------------------

function RevealAnalysisStage({
  scenario,
  instinctText,
  instinctAnalysis,
  selectedTier,
  onReconsider,
  onConfirm,
}: {
  scenario: ScenarioData
  instinctText: string
  instinctAnalysis?: InstinctAnalysis
  selectedTier: TierKey
  onReconsider: () => void
  onConfirm: () => void
}) {
  return (
    <motion.div
      key="reveal-analysis"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition()}
        className="mb-12"
      >
        <span className="label-text text-ember block mb-4">PHASE 02 · CLINICAL ANALYSIS</span>
        <h2 className="font-cormorant font-medium text-parchment text-3xl md:text-4xl mb-3 leading-tight">
          Your selection & why it matters.
        </h2>
        <p className="font-dm text-sm text-drift max-w-xl leading-relaxed">
          Here&rsquo;s the mechanism behind your choice and what makes it effective — or where we
          need to refine.
        </p>
      </motion.div>

      {/* Expanded selected card */}
      <motion.div {...REVEAL_VARIANTS.card} className="mb-10 max-w-2xl mx-auto">
        <SelectedTierCard tierKey={selectedTier} scenario={scenario} />
      </motion.div>

      {/* Contrast grid */}
      <motion.div {...REVEAL_VARIANTS.grid} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto">
        {TIERS.map((key) => (
          <ContrastCard
            key={key}
            tierKey={key}
            scenario={scenario}
            isSelected={key === selectedTier}
          />
        ))}
      </motion.div>

      {/* Instinct reference */}
      <motion.div {...REVEAL_VARIANTS.instinct} className="mb-10">
        <InstinctAside
          instinctText={instinctText}
          instinctAnalysis={instinctAnalysis}
          selectedTier={selectedTier}
        />
      </motion.div>

      {/* Actions */}
      <motion.div
        {...REVEAL_VARIANTS.actions}
        className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
      >
        <button
          onClick={onReconsider}
          type="button"
          data-cursor-hover
          className="inline-flex items-center justify-center gap-2 bg-ground text-parchment font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 border border-parchment/20 transition-all duration-200 hover:border-parchment/40 active:scale-[0.98]"
        >
          ← RECONSIDER
        </button>
        <button
          onClick={onConfirm}
          type="button"
          data-cursor-hover
          className="group inline-flex items-center gap-3 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-3 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          CONFIRM & REFLECT
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1.5"
          >
            →
          </span>
        </button>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

export default function Phase2Response({
  scenario,
  instinctText,
  instinctAnalysis,
  onResponseTypeSelect,
  onReturnToHome,
}: Phase2ResponseProps) {
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(null)

  const handleConfirm = useCallback(() => {
    if (selectedTier) onResponseTypeSelect(TIER_STYLES[selectedTier].responseType)
  }, [selectedTier, onResponseTypeSelect])

  const handleReconsider = useCallback(() => setSelectedTier(null), [])

  const handleHomeClick = useCallback(() => {
    if (
      onReturnToHome &&
      window.confirm('Exit this practice session? Your progress will not be saved.')
    ) {
      onReturnToHome()
    }
  }, [onReturnToHome])

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <ContainmentPattern />

      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" onHomeClick={handleHomeClick} />
        <PhaseIndicator activePhase={2} />
      </div>

      <div className="relative z-[10] max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <AnimatePresence mode="wait">
          {selectedTier === null ? (
            <BlindSelectionStage
              key="blind"
              scenario={scenario}
              instinctText={instinctText}
              instinctAnalysis={instinctAnalysis}
              onSelect={setSelectedTier}
            />
          ) : (
            <RevealAnalysisStage
              key="reveal"
              scenario={scenario}
              instinctText={instinctText}
              instinctAnalysis={instinctAnalysis}
              selectedTier={selectedTier}
              onReconsider={handleReconsider}
              onConfirm={handleConfirm}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}