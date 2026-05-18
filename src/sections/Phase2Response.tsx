import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { SCENARIO_DATA } from '../App'

interface Phase2ResponseProps {
  scenario: typeof SCENARIO_DATA
  instinctText: string
  onContinue: () => void
}

type TierKey = 'tier1' | 'tier2' | 'tier3'

interface TierStyle {
  accent: string
  label: string
  bg: string
  effectiveness: string
  offset: string
}

const TIER_STYLES: Record<TierKey, TierStyle> = {
  tier1: {
    accent: '#C45050',
    label: '#C45050',
    bg: '#F5EDED',
    effectiveness: '← Less effective',
    offset: 'lg:mt-6',
  },
  tier2: {
    accent: '#3D6B65',
    label: '#3D6B65',
    bg: '#E8F0EE',
    effectiveness: '← Partial response',
    offset: 'lg:mt-0',
  },
  tier3: {
    accent: '#4A8C6A',
    label: '#4A8C6A',
    bg: '#EBF4EF',
    effectiveness: '← Optimal →',
    offset: 'lg:-mt-6',
  },
}

const TIERS: TierKey[] = ['tier1', 'tier2', 'tier3']

export default function Phase2Response({
  scenario,
  instinctText,
  onContinue,
}: Phase2ResponseProps) {
  return (
    <section className="min-h-screen bg-ground relative">
      {/* Top bar */}
      <div className="p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={2} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-10 text-center"
        >
          <span className="label-text text-tide block mb-3">
            PHASE 02 · STRUCTURED CHOICE ANALYSIS
          </span>
          <h2 className="font-cormorant font-medium text-parchment text-3xl md:text-4xl">
            Your instinct vs. the skilled response.
          </h2>
        </motion.div>

        {/* Response Cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5"
          style={{ perspective: 1200 }}
        >
          {TIERS.map((key, i) => {
            const style = TIER_STYLES[key]
            const data = scenario.responses[key]

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className={style.offset}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <article
                  className="group relative h-full transition-all duration-300 hover:-translate-y-2"
                  data-cursor-hover
                >
                  <div
                    className="h-full p-6 flex flex-col"
                    style={{
                      backgroundColor: style.bg,
                      borderLeft: `3px solid ${style.accent}`,
                    }}
                  >
                    {/* Tier labels */}
                    <header className="mb-4">
                      <span
                        className="label-text block mb-1"
                        style={{ color: style.label }}
                      >
                        {data.label}
                      </span>
                      <span
                        className="font-dm font-medium uppercase tracking-[0.12em] text-[9px] block mb-2"
                        style={{ color: style.label, opacity: 0.6 }}
                      >
                        {data.sublabel}
                      </span>
                      <span
                        className="font-dm uppercase tracking-[0.1em] text-[7px] block"
                        style={{ color: style.label, opacity: 0.45 }}
                        aria-label={`Effectiveness: ${style.effectiveness}`}
                      >
                        {style.effectiveness}
                      </span>
                    </header>

                    {/* Response text */}
                    <blockquote className="flex-1 font-cormorant italic text-lg leading-[1.7] text-ground">
                      &ldquo;{data.text}&rdquo;
                    </blockquote>

                    {/* Clinical mechanism */}
                    <footer className="mt-6 pt-4 border-t border-ground/10">
                      <span
                        className="font-dm font-medium uppercase tracking-[0.1em] text-[9px] block mb-2"
                        style={{ color: style.label }}
                      >
                        {data.mechanism}
                      </span>
                      <p className="font-dm text-xs text-ground/60 leading-relaxed">
                        {data.clinicalNote}
                      </p>
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
          transition={fadeUpTransition(0.8)}
          aria-label="Your Phase 01 instinct"
          className="mt-10 border-l-[3px] border-l-tide bg-tide/5 p-6 max-w-[900px] mx-auto"
        >
          <span className="label-text text-tide block mb-3">
            YOUR PHASE 01 INSTINCT
          </span>
          <blockquote className="font-cormorant italic text-base text-parchment/70 leading-relaxed">
            &ldquo;{instinctText || 'No response recorded.'}&rdquo;
          </blockquote>
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
            className="inline-flex items-center gap-3 bg-tide text-ground font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 hover:bg-tide-pale transition-colors duration-200"
          >
            PROCEED TO REFLECTION
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}