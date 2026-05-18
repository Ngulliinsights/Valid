import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { SCENARIO_DATA } from '../App'

interface Phase1DiagnosticProps {
  scenario: typeof SCENARIO_DATA
  instinctText: string
  onInstinctChange: (text: string) => void
  onContinue: () => void
}

const TIMER_SECONDS = 5 * 60 // 5 minutes

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return
    const id = setInterval(() => setRemaining((r) => r - 1), 1_000)
    return () => clearInterval(id)
  }, [remaining])

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  return { display: `${mm}:${ss}`, isExpired: remaining === 0 }
}

/** Back face of the card — pure VALID branding mark */
function CardBack() {
  return (
    <div
      className="absolute inset-0 card-back-pattern bg-ground flex items-center justify-center"
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      aria-hidden="true"
    >
      <div className="text-center">
        <svg
          width="48"
          height="72"
          viewBox="0 0 220 148"
          fill="none"
          className="mx-auto mb-4 opacity-20"
        >
          <path
            d="M 98,10 C 38,38 38,110 98,138"
            stroke="#F2EDDF"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M 122,10 C 182,38 182,110 122,138"
            stroke="#F2EDDF"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <circle cx="110" cy="38" r="7" fill="#E8E0D0" />
          <circle cx="110" cy="74" r="10" fill="#C05A2E" />
          <circle cx="110" cy="110" r="10" fill="#7A9AAD" />
        </svg>
        <span className="font-cormorant font-semibold text-parchment/20 text-lg">VALID</span>
      </div>
    </div>
  )
}

export default function Phase1Diagnostic({
  scenario,
  instinctText,
  onInstinctChange,
  onContinue,
}: Phase1DiagnosticProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { display: timerDisplay, isExpired } = useCountdown(TIMER_SECONDS)

  const handleFlip = useCallback(() => setIsFlipped((f) => !f), [])

  return (
    <section className="min-h-screen bg-ground relative">
      {/* Top bar */}
      <div className="p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={1} />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-16 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-8"
        >
          <span className="label-text text-tide block mb-3">
            PHASE 01 · YOUR INSTINCT
          </span>
          <p className="font-dm text-sm md:text-base text-drift max-w-lg leading-relaxed mb-4">
            Before you see the structured responses, what would you say right
            now? Write your first instinct—this patient needs a response in the
            next few minutes.
          </p>
          <div className="flex items-center gap-4">
            <time
              aria-label="Time remaining"
              className={[
                'font-dm font-light text-sm tabular-nums transition-colors duration-500',
                isExpired ? 'text-over-g' : 'text-drift',
              ].join(' ')}
            >
              {timerDisplay}
            </time>
          </div>
        </motion.div>

        {/* Three-column layout: meta | card | spacer */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left metadata panel */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.15)}
            aria-label="Scenario metadata"
            className="hidden lg:flex flex-col gap-4 min-w-[140px] pt-8"
          >
            {(
              [
                ['COMPLEXITY', scenario.complexity],
                ['PATHWAY', scenario.pathway],
                ['LEVEL', scenario.level],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <span className="label-text text-drift/60 block mb-1">{label}</span>
                <span className="font-dm text-sm text-drift">{value}</span>
              </div>
            ))}
          </motion.aside>

          {/* Center: Scenario Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.2)}
            className="flex-1 flex flex-col items-center"
            style={{ perspective: 1200 }}
          >
            <div
              className="relative w-full max-w-[420px]"
              style={{ transformStyle: 'preserve-3d', transform: 'rotate(-1deg)' }}
            >
              {/* Flippable card */}
              <motion.div
                role="region"
                aria-label={isFlipped ? 'Card back' : 'Scenario card'}
                className="relative bg-parchment shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                style={{ minHeight: 500, transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 p-7 flex flex-col"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-tide" aria-hidden="true" />

                  <span className="font-dm font-medium uppercase tracking-[0.15em] text-[8px] text-tide mb-1">
                    THERAPEUTIC CONNECTIONS · PROFESSIONAL
                  </span>
                  <span className="font-dm font-normal uppercase tracking-[0.12em] text-[7px] text-drift mb-8">
                    {scenario.category} · SCENARIO {scenario.scenarioNumber} ·{' '}
                    {scenario.pathway}
                  </span>

                  <div className="flex-1 flex items-center">
                    <p className="scenario-text text-ground">
                      &ldquo;{scenario.scenarioText}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-ground/15">
                    <p className="font-dm font-medium uppercase tracking-[0.12em] text-[10px] text-ground">
                      FORMULATE YOUR CLINICAL RESPONSE. CONSIDER: ASSESSMENT,
                      ALLIANCE, TIME.
                    </p>
                  </div>
                </div>

                <CardBack />
              </motion.div>
            </div>

            {/* Flip control */}
            <button
              onClick={handleFlip}
              aria-pressed={isFlipped}
              aria-label={isFlipped ? 'Show scenario front' : 'Flip to card back'}
              className="mt-4 font-dm text-xs text-drift/50 hover:text-drift transition-colors underline underline-offset-2"
            >
              {isFlipped ? 'Show scenario' : 'View card back'}
            </button>
          </motion.div>

          {/* Right spacer */}
          <div className="hidden lg:block min-w-[140px]" aria-hidden="true" />
        </div>

        {/* Instinct Input */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.35)}
          className="mt-10 max-w-[420px] mx-auto"
        >
          <label
            htmlFor="instinct-input"
            className="label-text text-tide block mb-3"
          >
            YOUR INSTINCT
          </label>
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-tide" aria-hidden="true" />
            <textarea
              id="instinct-input"
              value={instinctText}
              onChange={(e) => onInstinctChange(e.target.value)}
              placeholder="Write exactly what you would say in this moment..."
              className="w-full min-h-[120px] bg-tide-pale/15 p-5 font-cormorant italic text-lg text-parchment placeholder:text-drift/40 resize-none border-none focus:ring-1 focus:ring-tide/40"
              style={{ outline: 'none' }}
            />
          </div>
        </motion.div>

        {/* Reveal button */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.45)}
          className="mt-8 max-w-[420px] mx-auto flex justify-end"
        >
          <button
            onClick={onContinue}
            disabled={!instinctText.trim()}
            data-cursor-hover
            className={[
              'inline-flex items-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 transition-all duration-200',
              instinctText.trim()
                ? 'bg-tide text-ground hover:bg-tide-pale'
                : 'bg-transparent text-drift/40 border border-drift/20 cursor-not-allowed',
            ].join(' ')}
          >
            REVEAL RESPONSE OPTIONS
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}