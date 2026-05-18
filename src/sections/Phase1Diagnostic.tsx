import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'

interface Phase1DiagnosticProps {
  scenario: ScenarioData
  instinctText: string
  onInstinctChange: (text: string) => void
  onContinue: () => void
}

const TIMER_SECONDS = 5 * 60

function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return
    const id = setInterval(() => setRemaining((r) => r - 1), 1_000)
    return () => clearInterval(id)
  }, [remaining])

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  const pct = ((seconds - remaining) / seconds) * 100
  return { display: `${mm}:${ss}`, isExpired: remaining === 0, pct }
}

function CardBack() {
  return (
    <div
      className="absolute inset-0 bg-ground card-back-pattern flex items-center justify-center"
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      aria-hidden="true"
    >
      <div className="text-center opacity-20">
        <svg width="52" height="78" viewBox="0 0 220 160" fill="none" className="mx-auto mb-4">
          <path d="M 92 14 C 32 44, 32 116, 92 146 C 62 116, 62 44, 92 14 Z" fill="#F2EDDF" />
          <path d="M 128 14 C 188 44, 188 116, 128 146 C 158 116, 158 44, 128 14 Z" fill="#F2EDDF" />
          <circle cx="110" cy="38"  r="8.5" fill="#E8E0D0" />
          <circle cx="110" cy="80"  r="11"  fill="#C4882A" />
          <circle cx="110" cy="122" r="11"  fill="#7A9AAD" />
        </svg>
        <span className="font-cormorant font-semibold text-parchment text-xl tracking-[0.2em]">VALID</span>
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
  const { display: timerDisplay, isExpired, pct: timerPct } = useCountdown(TIMER_SECONDS)
  const handleFlip = useCallback(() => setIsFlipped((f) => !f), [])

  return (
    <section className="min-h-screen bg-ground relative">
      {/* Top bar */}
      <div className="p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={1} />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-16 pb-20">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-ember" aria-hidden="true" />
            <span className="label-text text-ember">PHASE 01 · YOUR INSTINCT</span>
          </div>
          <p className="font-dm text-sm text-drift max-w-lg leading-relaxed">
            Before you see the structured responses, write your first instinct. This patient needs a response right now — what do you say?
          </p>
        </motion.div>

        {/* Layout: meta | card | input */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* Left metadata panel */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.12)}
            aria-label="Scenario metadata"
            className="hidden lg:flex flex-col gap-5 min-w-[140px] pt-6"
          >
            {(
              [
                ['COMPLEXITY', scenario.complexity],
                ['PATHWAY',    scenario.pathway],
                ['LEVEL',      scenario.level],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <span className="label-text text-drift/50 block mb-1">{label}</span>
                <span className="font-dm text-xs text-drift">{value}</span>
              </div>
            ))}

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(154, 148, 136, 0.12)' }}>
              <span className="label-text text-drift/50 block mb-2">TIME REMAINING</span>
              <time
                aria-label="Time remaining"
                className="font-cormorant text-2xl tabular-nums transition-colors duration-500"
                style={{ color: isExpired ? '#C45050' : '#9A9488' }}
              >
                {timerDisplay}
              </time>
              {/* Progress bar */}
              <div
                className="mt-2 h-px w-full"
                style={{ backgroundColor: 'rgba(154, 148, 136, 0.15)' }}
              >
                <div
                  className="h-px transition-all duration-1000"
                  style={{
                    width: `${timerPct}%`,
                    backgroundColor: isExpired ? '#C45050' : '#C4882A',
                  }}
                />
              </div>
            </div>
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
            {/* Mobile timer */}
            <div className="lg:hidden mb-4 flex items-center gap-3 self-start">
              <span className="label-text text-drift/50">TIME</span>
              <time
                className="font-cormorant text-xl tabular-nums"
                style={{ color: isExpired ? '#C45050' : '#9A9488' }}
              >
                {timerDisplay}
              </time>
            </div>

            {/* Flippable card */}
            <div
              className="relative w-full max-w-[400px]"
              style={{ transformStyle: 'preserve-3d', transform: 'rotate(-0.8deg)' }}
            >
              <motion.div
                role="region"
                aria-label={isFlipped ? 'Card back' : 'Scenario card'}
                className="relative bg-parchment shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                style={{ minHeight: 480, transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 p-7 flex flex-col"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Tide accent bar for Professional */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-tide" aria-hidden="true" />

                  <span className="font-dm font-medium uppercase tracking-[0.15em] text-[8px] text-tide mb-1">
                    THERAPEUTIC CONNECTIONS · PROFESSIONAL
                  </span>
                  <span className="font-dm font-normal uppercase tracking-[0.11em] text-[7px] text-drift mb-7">
                    {scenario.category} · SCENARIO {scenario.scenarioNumber} · {scenario.pathway}
                  </span>

                  <div className="flex-1 flex items-center">
                    <p className="font-cormorant italic text-ground leading-[1.75]" style={{ fontSize: 19 }}>
                      &ldquo;{scenario.scenarioText}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 pt-4" style={{ borderTop: '1px solid rgba(26, 24, 20, 0.12)' }}>
                    <p className="font-dm font-medium uppercase tracking-[0.11em] text-[9px] text-ground/60">
                      FORMULATE YOUR CLINICAL RESPONSE — CONSIDER: ASSESSMENT, ALLIANCE, TIME.
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
              className="mt-4 font-dm text-[11px] text-drift/40 hover:text-drift/70 transition-colors duration-150 uppercase tracking-[0.1em]"
            >
              {isFlipped ? '← Show scenario' : 'View card back →'}
            </button>
          </motion.div>

          {/* Right: Instinct Input */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.32)}
            className="w-full lg:min-w-[280px] lg:max-w-[320px] flex flex-col gap-6"
          >
            <div>
              <label htmlFor="instinct-input" className="label-text text-drift/70 block mb-3">
                YOUR INSTINCT
              </label>
              <p className="font-dm text-xs text-drift/40 mb-3 leading-relaxed">
                Write exactly what you would say to this patient in the next 60 seconds. Unfiltered.
              </p>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-ember/50" aria-hidden="true" />
                <textarea
                  id="instinct-input"
                  value={instinctText}
                  onChange={(e) => onInstinctChange(e.target.value)}
                  placeholder="Write exactly what you would say in this moment..."
                  className="w-full min-h-[160px] p-5 font-cormorant italic text-lg text-parchment placeholder:text-drift/35 resize-none focus:ring-1 focus:ring-ember/30 transition-all duration-200"
                  style={{
                    outline: 'none',
                    backgroundColor: 'rgba(196, 136, 42, 0.04)',
                    border: 'none',
                  }}
                />
                {instinctText.trim() && (
                  <div className="absolute bottom-3 right-3">
                    <span className="font-dm text-[9px] text-drift/30 uppercase tracking-[0.1em]">
                      {instinctText.split(' ').filter(Boolean).length} words
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Clinical reminder */}
            <div
              className="p-4"
              style={{
                backgroundColor: 'rgba(61, 107, 101, 0.06)',
                borderLeft: '2px solid rgba(61, 107, 101, 0.25)',
              }}
            >
              <span className="label-text text-tide/70 block mb-2">REMINDER</span>
              <p className="font-dm text-xs text-drift/60 leading-relaxed">
                There are no wrong answers here. The diagnostic response surfaces your instinct before the structured options. That gap is the learning.
              </p>
            </div>

            {/* Reveal button */}
            <button
              onClick={onContinue}
              disabled={!instinctText.trim()}
              data-cursor-hover
              className={[
                'group w-full inline-flex items-center justify-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.14em] px-8 py-4 transition-all duration-200',
                instinctText.trim()
                  ? 'bg-ember text-ground hover:brightness-110 active:scale-[0.98]'
                  : 'text-drift/35 cursor-not-allowed',
              ].join(' ')}
              style={!instinctText.trim() ? { border: '1px solid rgba(154, 148, 136, 0.18)', backgroundColor: 'transparent' } : {}}
            >
              REVEAL RESPONSE OPTIONS
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              >
                →
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
