import { useState } from 'react'
import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import { ContainmentPattern } from '../components/patterns'

interface Phase2ResponseProps {
  scenario: ScenarioData
  instinctText: string
  onContinue: () => void
}

type TierKey = 'tier1' | 'tier2' | 'tier3'

interface TierStyle {
  accentColor: string
  borderStyle: string
  bgTint: string
  effectiveness: string
  offset: string
  tagBg: string
}

const TIER_STYLES: Record<TierKey, TierStyle> = {
  tier1: {
    accentColor: '#C45050',
    borderStyle: 'solid',
    bgTint: 'rgba(196, 80, 80, 0.07)',
    effectiveness: 'COUNTERPRODUCTIVE',
    offset: 'lg:translate-y-3',
    tagBg: 'rgba(196, 80, 80, 0.12)',
  },
  tier2: {
    accentColor: '#C4882A',
    borderStyle: 'dashed',
    bgTint: 'rgba(196, 136, 42, 0.06)',
    effectiveness: 'PARTIAL — NOT ENOUGH',
    offset: '',
    tagBg: 'rgba(196, 136, 42, 0.12)',
  },
  tier3: {
    accentColor: '#3D6B65',
    borderStyle: 'solid',
    bgTint: 'rgba(61, 107, 101, 0.08)',
    effectiveness: 'OPTIMAL RESPONSE',
    offset: 'lg:-translate-y-3',
    tagBg: 'rgba(61, 107, 101, 0.12)',
  },
}

const TIERS: TierKey[] = ['tier1', 'tier2', 'tier3']

export default function Phase2Response({
  scenario,
  instinctText,
  onContinue,
}: Phase2ResponseProps) {
  const [expandedMechanism, setExpandedMechanism] = useState<TierKey | null>(null)

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <ContainmentPattern />
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={2} />
      </div>

      <div className="relative z-[10] max-w-[1200px] mx-auto px-6 md:px-10 pb-16">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-12"
        >
          <span className="label-text text-ember block mb-4">
            PHASE 02 · STRUCTURED CHOICE ANALYSIS
          </span>
          <h2 className="font-cormorant font-medium text-parchment text-3xl md:text-4xl mb-3 leading-tight">
            Your instinct vs. the response spectrum.
          </h2>
          <p className="font-dm text-sm text-drift max-w-xl leading-relaxed">
            Three responses that represent the full range of human instinct — from counterproductive to optimal. Understand the mechanism, not just the answer.
          </p>
        </motion.div>

        {/* Response Cards — dark professional theme */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-4 items-start">
          {TIERS.map((key, i) => {
            const style = TIER_STYLES[key]
            const data  = scenario.responses[key]
            const isExpanded = expandedMechanism === key

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className={style.offset}
              >
                <article
                  className="relative h-full flex flex-col overflow-hidden"
                  style={{
                    backgroundColor: '#1C1A18',
                    borderLeft: `3px ${style.borderStyle} ${style.accentColor}`,
                    background: `linear-gradient(135deg, ${style.bgTint} 0%, #1C1A18 60%)`,
                  }}
                >
                  {/* Top accent rule */}
                  <div
                    className="h-[2px] w-full"
                    style={{ backgroundColor: style.accentColor, opacity: 0.6 }}
                    aria-hidden="true"
                  />
                  {/* Ghost tier number — watermark */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 right-4 font-cormorant font-semibold leading-none select-none pointer-events-none tabular-nums"
                    style={{ fontSize: 78, color: style.accentColor, opacity: 0.07 }}
                  >
                    {`0${i + 1}`}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Tier header */}
                    <header className="mb-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className="label-text"
                          style={{ color: style.accentColor }}
                        >
                          {data.label}
                        </span>
                        <span
                          className="font-dm text-[9px] font-medium uppercase tracking-[0.1em] px-2 py-0.5 shrink-0"
                          style={{
                            color: style.accentColor,
                            backgroundColor: style.tagBg,
                          }}
                        >
                          {style.effectiveness}
                        </span>
                      </div>
                      <span
                        className="font-dm text-[9px] uppercase tracking-[0.12em] block"
                        style={{ color: style.accentColor, opacity: 0.6 }}
                      >
                        {data.sublabel}
                      </span>
                    </header>

                    {/* Response text */}
                    <blockquote className="flex-1 font-cormorant italic text-lg leading-[1.75] text-parchment/90 mb-6">
                      &ldquo;{data.text}&rdquo;
                    </blockquote>

                    {/* Mechanism — expandable */}
                    <footer className="mt-auto">
                      <div
                        className="pt-4"
                        style={{ borderTop: `1px solid ${style.accentColor}20` }}
                      >
                        <button
                          onClick={() => setExpandedMechanism(isExpanded ? null : key)}
                          className="w-full text-left group flex items-center justify-between gap-2"
                          aria-expanded={isExpanded}
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
                              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                            aria-hidden="true"
                          >
                            ↓
                          </span>
                        </button>

                        {isExpanded && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 font-dm text-xs text-drift leading-relaxed"
                          >
                            {data.clinicalNote}
                          </motion.p>
                        )}
                      </div>
                    </footer>
                  </div>
                </article>
              </motion.div>
            )
          })}
        </div>

        {/* Your Instinct panel */}
        <motion.aside
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.75)}
          aria-label="Your Phase 01 instinct"
          className="mt-10 max-w-[900px] mx-auto"
          style={{
            borderLeft: '3px solid rgba(154, 148, 136, 0.3)',
            backgroundColor: 'rgba(154, 148, 136, 0.04)',
          }}
        >
          <div className="p-6">
            <span className="label-text text-drift block mb-3">
              YOUR PHASE 01 INSTINCT
            </span>
            <blockquote className="font-cormorant italic text-base text-parchment/60 leading-relaxed">
              &ldquo;{instinctText || 'No response recorded.'}&rdquo;
            </blockquote>
            <p className="mt-3 font-dm text-xs text-drift/40 leading-relaxed">
              Where does your instinct sit on the spectrum above? Recognising the pattern is the first step.
            </p>
          </div>
        </motion.aside>

        {/* Continue */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.9)}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={onContinue}
            data-cursor-hover
            className="group inline-flex items-center gap-3 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            PROCEED TO REFLECTION
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            >
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
