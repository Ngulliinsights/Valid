import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import type { AnalysisResult } from '../lib/responseAnalysis'
import { ContainmentPattern } from '../components/patterns'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TierKey = 'tier1' | 'tier2' | 'tier3'
type ResponseType = 'invalidating-antagonising' | 'invalidating-enabling' | 'partial' | 'validating'

interface Phase2ResponseProps {
  scenario: ScenarioData
  instinctText: string
  instinctAnalysis?: AnalysisResult
  onResponseTypeSelect: (type: ResponseType) => void
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

interface TierStyle {
  accentColor: string
  borderStyle: 'solid' | 'dashed'
  bgTint: string
  effectiveness: string
  tagBg: string
  responseType: ResponseType
}

const TIER_STYLES: Record<TierKey, TierStyle> = {
  tier1: {
    accentColor: '#C45050',
    borderStyle: 'solid',
    bgTint: 'rgba(196, 80, 80, 0.07)',
    effectiveness: 'COUNTERPRODUCTIVE',
    tagBg: 'rgba(196, 80, 80, 0.12)',
    responseType: 'invalidating-antagonising',
  },
  tier2: {
    accentColor: '#C4882A',
    borderStyle: 'dashed',
    bgTint: 'rgba(196, 136, 42, 0.06)',
    effectiveness: 'PARTIAL — NOT ENOUGH',
    tagBg: 'rgba(196, 136, 42, 0.12)',
    responseType: 'partial',
  },
  tier3: {
    accentColor: '#3D6B65',
    borderStyle: 'solid',
    bgTint: 'rgba(61, 107, 101, 0.08)',
    effectiveness: 'OPTIMAL RESPONSE',
    tagBg: 'rgba(61, 107, 101, 0.12)',
    responseType: 'validating',
  },
}

const TIERS: TierKey[] = ['tier1', 'tier2', 'tier3']

// Contextual note shown beneath the instinct block, based on what the player chose
const INSTINCT_NOTES: Record<TierKey, string> = {
  tier1:
    'Your instinct moved toward confrontation. Notice the distance between that impulse and the validating response — closing that gap is exactly what this practice builds.',
  tier2:
    'Your instinct reached for partial validation — closer than antagonising, but safety needs to be established before moving toward problem-solving.',
  tier3:
    'Your instinct aligned with the validating response. That recognition is the foundation of clinical skill.',
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Expanded card shown after selection in Stage 2 */
function SelectedTierCard({
  tierKey,
  scenario,
}: {
  tierKey: TierKey
  scenario: ScenarioData
}) {
  const [mechanismExpanded, setMechanismExpanded] = useState(false)
  const style = TIER_STYLES[tierKey]
  const data = scenario.responses[tierKey]

  return (
    <article
      className="relative flex flex-col overflow-hidden p-8"
      style={{
        backgroundColor: '#1C1A18',
        borderLeft: `3px ${style.borderStyle} ${style.accentColor}`,
        background: `linear-gradient(135deg, ${style.bgTint} 0%, #1C1A18 60%)`,
        border: `1px solid ${style.accentColor}20`,
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full mb-6"
        style={{ backgroundColor: style.accentColor, opacity: 0.6 }}
        aria-hidden="true"
      />

      {/* Label row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="label-text" style={{ color: style.accentColor }}>
            {data.label}
          </span>
          <span
            className="font-dm text-[9px] uppercase tracking-[0.12em] block mt-1"
            style={{ color: style.accentColor, opacity: 0.6 }}
          >
            {data.sublabel}
          </span>
        </div>
        <span
          className="font-dm text-[9px] font-medium uppercase tracking-[0.1em] px-3 py-1.5 shrink-0"
          style={{ color: style.accentColor, backgroundColor: style.tagBg }}
        >
          YOUR CHOICE
        </span>
      </div>

      {/* Response text */}
      <blockquote className="font-cormorant italic text-xl leading-[1.8] text-parchment/90 mb-8">
        &ldquo;{data.text}&rdquo;
      </blockquote>

      {/* Mechanism toggle */}
      <div className="pt-6" style={{ borderTop: `1px solid ${style.accentColor}20` }}>
        <button
          onClick={() => setMechanismExpanded((prev) => !prev)}
          className="w-full text-left flex items-center justify-between gap-2 mb-3"
          aria-expanded={mechanismExpanded}
          type="button"
        >
          <span
            className="font-dm font-medium uppercase tracking-[0.1em] text-[9px]"
            style={{ color: style.accentColor }}
          >
            {data.mechanism}
          </span>
          <span
            className="font-dm text-[11px] transition-transform duration-200"
            style={{
              color: style.accentColor,
              transform: mechanismExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            aria-hidden="true"
          >
            ↓
          </span>
        </button>

        <AnimatePresence>
          {mechanismExpanded && (
            <motion.p
              key="clinical-note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="font-dm text-sm text-drift leading-relaxed overflow-hidden"
            >
              {data.clinicalNote}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}

/** Compact card used in the contrast grid */
function ContrastCard({
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

  return (
    <article
      className="relative flex flex-col overflow-hidden p-6"
      style={{
        opacity: isSelected ? 1 : 0.5,
        backgroundColor: isSelected ? '#1C1A18' : '#2A2825',
        borderLeft: `2px ${isSelected ? style.borderStyle : 'solid'} ${
          isSelected ? style.accentColor : 'rgba(242, 237, 223, 0.1)'
        }`,
        background: isSelected
          ? `linear-gradient(135deg, ${style.bgTint} 0%, #1C1A18 60%)`
          : 'rgba(42, 40, 37, 0.6)',
        border: isSelected
          ? `1px solid ${style.accentColor}20`
          : '1px solid rgba(242, 237, 223, 0.08)',
      }}
    >
      {isSelected && (
        <div
          className="absolute top-3 right-3 w-2 h-2 rounded-full"
          style={{ backgroundColor: style.accentColor }}
          aria-hidden="true"
        />
      )}

      <div className="mb-4">
        <h4
          className="label-text text-xs mb-1"
          style={{ color: isSelected ? style.accentColor : 'rgba(242, 237, 223, 0.4)' }}
        >
          {data.label}
        </h4>
        <p
          className="font-dm text-[11px] uppercase tracking-[0.1em]"
          style={{
            color: isSelected ? style.accentColor : 'rgba(242, 237, 223, 0.3)',
            opacity: 0.7,
          }}
        >
          {data.sublabel}
        </p>
      </div>

      <blockquote
        className="font-cormorant italic text-sm leading-relaxed mb-4"
        style={{ color: isSelected ? '#F2EDDF' : 'rgba(242, 237, 223, 0.5)' }}
      >
        &ldquo;{data.text}&rdquo;
      </blockquote>

      <span
        className="font-dm text-[8px] font-medium uppercase tracking-[0.1em] px-2 py-1 w-fit"
        style={{
          color: isSelected ? style.accentColor : 'rgba(242, 237, 223, 0.4)',
          backgroundColor: isSelected ? style.tagBg : 'rgba(242, 237, 223, 0.04)',
        }}
      >
        {style.effectiveness}
      </span>
    </article>
  )
}

/** Instinct block — shared between both stages */
function InstinctAside({
  instinctText,
  selectedTier,
}: {
  instinctText: string
  selectedTier: TierKey | null
}) {
  return (
    <aside
      className="max-w-[900px] mx-auto"
      style={{
        borderLeft: '3px solid rgba(154, 148, 136, 0.3)',
        backgroundColor: 'rgba(154, 148, 136, 0.04)',
      }}
    >
      <div className="p-6">
        <span className="label-text text-drift block mb-3">YOUR PHASE 01 INSTINCT</span>
        <blockquote className="font-cormorant italic text-base text-parchment/60 leading-relaxed">
          &ldquo;{instinctText || 'No response recorded.'}&rdquo;
        </blockquote>
        {selectedTier && (
          <p className="mt-3 font-dm text-xs text-drift/40 leading-relaxed">
            {INSTINCT_NOTES[selectedTier]}
          </p>
        )}
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Phase2Response({
  scenario,
  instinctText,
  onResponseTypeSelect,
}: Phase2ResponseProps) {
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(null)

  const handleConfirm = () => {
    if (selectedTier) onResponseTypeSelect(TIER_STYLES[selectedTier].responseType)
  }

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <ContainmentPattern />

      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={2} />
      </div>

      <div className="relative z-[10] max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        <AnimatePresence mode="wait">
          {/* ----------------------------------------------------------------
              STAGE 1 — BLIND SELECTION
          ---------------------------------------------------------------- */}
          {!selectedTier ? (
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
                  Read each response carefully. Trust your clinical instinct. Select the one you would
                  use in this moment.
                </p>
              </motion.div>

              {/* Blind response cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-4 items-start">
                {TIERS.map((key, idx) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + idx * 0.14, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedTier(key)}
                    data-cursor-hover
                    className="relative text-left h-full transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                    type="button"
                    aria-label={`Response option ${idx + 1}`}
                  >
                    <article
                      className="relative h-full flex flex-col overflow-hidden p-8"
                      style={{
                        backgroundColor: '#2A2825',
                        border: '1px solid rgba(242, 237, 223, 0.15)',
                      }}
                    >
                      {/* Watermark number */}
                      <div
                        aria-hidden="true"
                        className="absolute top-3 right-4 font-cormorant font-semibold leading-none select-none pointer-events-none tabular-nums"
                        style={{ fontSize: 48, color: 'rgba(242, 237, 223, 0.08)' }}
                      >
                        {`0${idx + 1}`}
                      </div>

                      <blockquote className="font-cormorant italic text-lg leading-[1.75] text-parchment/85 flex-1">
                        &ldquo;{scenario.responses[key].text}&rdquo;
                      </blockquote>

                      <div className="mt-6 pt-4 border-t border-parchment/10">
                        <span className="font-dm text-[9px] uppercase tracking-[0.1em] text-parchment/40">
                          Click to select
                        </span>
                      </div>
                    </article>
                  </motion.button>
                ))}
              </div>

              {/* Instinct reminder */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={fadeUpTransition(0.75)}
                className="mt-10"
              >
                <InstinctAside instinctText={instinctText} selectedTier={null} />
              </motion.div>
            </motion.div>

          ) : (
          /* ----------------------------------------------------------------
              STAGE 2 — REVEAL & CLINICAL ANALYSIS
          ---------------------------------------------------------------- */
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
                  Here's the mechanism behind your choice and what makes it effective — or where we
                  need to refine.
                </p>
              </motion.div>

              {/* Selected response — expanded */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-10 max-w-2xl mx-auto"
              >
                <SelectedTierCard tierKey={selectedTier} scenario={scenario} />
              </motion.div>

              {/* Contrast grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto"
              >
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mb-10"
              >
                <InstinctAside instinctText={instinctText} selectedTier={selectedTier} />
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <button
                  onClick={() => setSelectedTier(null)}
                  data-cursor-hover
                  type="button"
                  className="inline-flex items-center justify-center gap-2 bg-ground text-parchment font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 border border-parchment/20 transition-all duration-200 hover:border-parchment/40 active:scale-[0.98]"
                >
                  ← RECONSIDER
                </button>
                <button
                  onClick={handleConfirm}
                  data-cursor-hover
                  type="button"
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
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}