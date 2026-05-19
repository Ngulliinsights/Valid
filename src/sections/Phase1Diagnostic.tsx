import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import { ClinicalSignalPattern } from '../components/patterns'

interface Phase1DiagnosticProps {
  scenario: ScenarioData
  instinctText: string
  onInstinctChange: (text: string) => void
  onContinue: () => void
  onReturnToHome?: () => void
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
      className="absolute inset-0 bg-ground flex items-center justify-center rounded-2xl border border-drift/10 overflow-hidden"
      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full p-4 pointer-events-none">
        {/* Intricate background starburst */}
        <g stroke="rgba(242,237,223,0.03)" strokeWidth="0.5">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24
            const rad = (angle * Math.PI) / 180
            const x = 200 + Math.cos(rad) * 300
            const y = 240 + Math.sin(rad) * 300
            return <line key={i} x1="200" y1="240" x2={x} y2={y} />
          })}
        </g>

        {/* Concentric detail rings for backdrop */}
        <g stroke="rgba(242,237,223,0.02)" strokeWidth="0.5">
          {Array.from({ length: 8 }).map((_, r) => {
            const radius = 50 + r * 30
            return <circle key={r} cx="200" cy="240" r={radius} fill="none" />
          })}
        </g>

        {/* Thin Gold Inner border */}
        <rect x="20" y="20" width="360" height="440" rx="10" stroke="rgba(196,136,42,0.22)" strokeWidth="1" fill="none" />
        <rect x="25" y="25" width="350" height="430" rx="8" stroke="rgba(242,237,223,0.06)" strokeWidth="0.5" fill="none" />

        {/* Intricate Corner Brackets */}
        <g stroke="rgba(196,136,42,0.4)" strokeWidth="1">
          <path d="M 32 32 L 48 32 M 32 32 L 32 48" />
          <path d="M 368 32 L 352 32 M 368 32 L 368 48" />
          <path d="M 32 448 L 48 448 M 32 448 L 32 432" />
          <path d="M 368 448 L 352 448 M 368 448 L 368 432" />
        </g>

        {/* Detailed Astrological Mandala */}
        <g stroke="rgba(242,237,223,0.08)" strokeWidth="0.75">
          <circle cx="200" cy="240" r="105" strokeDasharray="3 3" />
          <circle cx="200" cy="240" r="95" />
          <circle cx="200" cy="240" r="85" stroke="rgba(196,136,42,0.18)" />
        </g>

        {/* 12-point star bloom */}
        <g stroke="rgba(196,136,42,0.25)" strokeWidth="0.75">
          {Array.from({ length: 12 }).map((_, i) => {
            const a1 = (i * Math.PI * 2) / 12
            const a2 = ((i + 5) * Math.PI * 2) / 12
            const x1 = 200 + Math.cos(a1) * 95
            const y1 = 240 + Math.sin(a1) * 95
            const x2 = 200 + Math.cos(a2) * 95
            const y2 = 240 + Math.sin(a2) * 95
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </g>

        {/* Orbital outer pips */}
        <g fill="rgba(242,237,223,0.3)">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * Math.PI * 2) / 12
            const x = 200 + Math.cos(a) * 95
            const y = 240 + Math.sin(a) * 95
            return <circle key={i} cx={x} cy={y} r="2" />
          })}
        </g>

        {/* Core central branding */}
        <g transform="translate(90, 150) scale(1)">
          <path d="M 92 14 C 32 44, 32 116, 92 146 C 62 116, 62 44, 92 14 Z" fill="rgba(242,237,223,0.3)" />
          <path d="M 128 14 C 188 44, 188 116, 128 146 C 158 116, 158 44, 128 14 Z" fill="rgba(242,237,223,0.3)" />
          <circle cx="110" cy="38"  r="8.5" fill="rgba(242,237,223,0.4)" />
          <circle cx="110" cy="80"  r="11"  fill="rgba(196,136,42,0.6)" />
          <circle cx="110" cy="122" r="11"  fill="rgba(122,154,173,0.5)" />
        </g>
        
        {/* Label VALID watermark */}
        <text x="200" y="325" textAnchor="middle" className="font-cormorant font-semibold text-parchment/60 text-xl tracking-[0.25em]" fill="#F2EDDF">VALID</text>
      </svg>
    </div>
  )
}

export default function Phase1Diagnostic({
  scenario,
  instinctText,
  onInstinctChange,
  onContinue,
  onReturnToHome,
}: Phase1DiagnosticProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const { display: timerDisplay, isExpired, pct: timerPct } = useCountdown(TIMER_SECONDS)
  const handleFlip = useCallback(() => setIsFlipped((f) => !f), [])

  const handleHomeClick = () => {
    if (
      onReturnToHome &&
      window.confirm(
        'Exit this practice session? Your progress will not be saved.',
      )
    ) {
      onReturnToHome()
    }
  }

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <ClinicalSignalPattern />
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" onHomeClick={handleHomeClick} />
        <PhaseIndicator activePhase={1} />
      </div>

      <div className="relative z-[10] max-w-[1100px] mx-auto px-6 md:px-16 pb-20">

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
                className="relative bg-parchment shadow-[0_24px_70px_rgba(0,0,0,0.75)] rounded-2xl"
                style={{ minHeight: 480, transformStyle: 'preserve-3d' }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 p-7 flex flex-col rounded-2xl overflow-hidden border border-ground/5"
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
              <div className="relative rounded-xl overflow-hidden border border-drift/30 shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-ember/50" aria-hidden="true" />
                <textarea
                  id="instinct-input"
                  value={instinctText}
                  onChange={(e) => onInstinctChange(e.target.value)}
                  placeholder="Write exactly what you would say in this moment..."
                  className="w-full min-h-[160px] p-5 font-cormorant italic text-lg text-parchment placeholder:text-drift/35 resize-none focus:ring-1 focus:ring-ember/30 transition-all duration-200"
                  style={{
                    outline: 'none',
                    backgroundColor: '#23211E',
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
              className="p-4 rounded-xl border border-tide/30"
              style={{
                backgroundColor: 'rgba(61, 107, 101, 0.12)',
                borderLeft: '3px solid rgba(61, 107, 101, 0.55)',
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
                'group w-full inline-flex items-center justify-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.14em] px-8 py-4 transition-all duration-200 rounded-xl',
                instinctText.trim()
                  ? 'bg-ember text-ground hover:brightness-110 active:scale-[0.98]'
                  : 'text-drift/35 cursor-not-allowed',
              ].join(' ')}
              style={!instinctText.trim() ? { border: '1px solid rgba(154, 148, 136, 0.18)', backgroundColor: 'transparent', borderRadius: '12px' } : {}}
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
