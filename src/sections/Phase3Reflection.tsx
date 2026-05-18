import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData, ScoreData } from '../App'
import { FractureGrid } from '../components/patterns'

interface Phase3ReflectionProps {
  scenario: ScenarioData
  score: ScoreData
  onContinue: () => void
}

interface ScoreCategory {
  label: string
  value: number
  color: string
}

const SCORE_CATEGORIES = (score: ScoreData): ScoreCategory[] => [
  { label: 'THERAPEUTIC RESPONSE', value: score.therapeuticResponse, color: '#4A8C6A' },
  { label: 'RELATIONAL / CLINICAL', value: score.relationalClinical,  color: '#3D6B65' },
  { label: 'CULTURAL AWARENESS',   value: score.culturalAwareness,    color: '#3D6B65' },
  { label: 'SAFETY ASSESSMENT',    value: score.safetyAssessment,     color: '#C4882A' },
]

function AnimatedCounter({ target, duration = 800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let current = 0
    const step = target / (duration / 16)
    const id = setInterval(() => {
      current += step
      if (current >= target) {
        setCount(target)
        clearInterval(id)
      } else {
        setCount(Math.round(current))
      }
    }, 16)
    return () => clearInterval(id)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}</span>
}

function ScoreBar({ label, value, color, delay }: ScoreCategory & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between items-baseline mb-2">
        <span className="label-text text-drift/70">{label}</span>
        <span className="font-cormorant text-lg text-parchment/80 tabular-nums">{value}</span>
      </div>
      <div
        className="h-px relative overflow-hidden"
        style={{ backgroundColor: 'rgba(242, 237, 223, 0.08)' }}
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: color, height: '1px' }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${value}%` } : { width: '0%' }}
          transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

export default function Phase3Reflection({ scenario, score, onContinue }: Phase3ReflectionProps) {
  const [reflectionText, setReflectionText]   = useState('')
  const [commitmentText, setCommitmentText]   = useState('')
  const categories = SCORE_CATEGORIES(score)

  const canContinue = reflectionText.trim().length > 0

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <FractureGrid />
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={3} />
      </div>

      <div className="relative z-[10] max-w-[1100px] mx-auto px-6 md:px-16 pb-20">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-12"
        >
          <span className="label-text text-ember block mb-4">
            PHASE 03 · REFLECTIVE INTEGRATION
          </span>
          <blockquote
            className="font-cormorant italic text-parchment/70 leading-snug max-w-2xl"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
          >
            &ldquo;The gap between your instinct and the optimal response — that&rsquo;s where learning lives.&rdquo;
          </blockquote>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">

          {/* Left — Reflection */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.15)}
            className="flex flex-col gap-7"
          >
            {/* Reflection prompt */}
            <div
              className="relative"
              style={{
                borderLeft: '3px solid #C4882A',
                backgroundColor: 'rgba(196, 136, 42, 0.05)',
              }}
            >
              <div className="p-6">
                <span className="label-text text-ember block mb-3">REFLECTION PROMPT</span>
                <p className="font-cormorant italic text-lg md:text-xl text-parchment/85 leading-relaxed">
                  {scenario.reflectionQuestion}
                </p>
              </div>
            </div>

            {/* Reflection textarea */}
            <div>
              <label htmlFor="reflection-input" className="label-text text-drift block mb-3">
                YOUR REFLECTION
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-ember/40" aria-hidden="true" />
                <textarea
                  id="reflection-input"
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="What did you notice about the difference between your instinct and the validating response?"
                  className="w-full min-h-[120px] p-5 font-cormorant italic text-lg text-parchment placeholder:text-drift/35 resize-none focus:ring-1 focus:ring-ember/30 transition-all duration-200"
                  style={{
                    outline: 'none',
                    backgroundColor: 'rgba(196, 136, 42, 0.04)',
                    border: 'none',
                  }}
                />
              </div>
            </div>

            {/* Behavioral commitment */}
            <div>
              <label htmlFor="commitment-input" className="label-text text-drift block mb-3">
                BEHAVIORAL COMMITMENT <span className="text-drift/40 normal-case font-dm font-normal tracking-normal text-[10px]">(optional)</span>
              </label>
              <p className="font-dm text-xs text-drift/50 mb-3 leading-relaxed">
                Name one specific thing you will do differently in your next session.
              </p>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-drift/20" aria-hidden="true" />
                <textarea
                  id="commitment-input"
                  value={commitmentText}
                  onChange={(e) => setCommitmentText(e.target.value)}
                  placeholder="Next time a patient discloses passive ideation, I will..."
                  className="w-full min-h-[80px] p-5 font-dm text-sm text-parchment/80 placeholder:text-drift/30 resize-none focus:ring-1 focus:ring-drift/20 transition-all duration-200"
                  style={{
                    outline: 'none',
                    backgroundColor: 'rgba(154, 148, 136, 0.04)',
                    border: 'none',
                  }}
                />
              </div>
            </div>

            {/* Milestone badge */}
            {score.milestone && (
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                role="status"
                aria-live="polite"
                style={{
                  borderLeft: '3px solid #4A8C6A',
                  backgroundColor: 'rgba(74, 140, 106, 0.07)',
                }}
                className="p-4"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-over-g shrink-0" aria-hidden="true" />
                  <span className="label-text text-over-g">{score.milestone}</span>
                </div>
                <span className="font-dm text-xs text-drift pl-[18px]">
                  Your Phase 01 instinct improved by 2 or more tiers on this scenario.
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Right — Score */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.28)}
          >
            <div
              style={{
                border: '1px solid rgba(154, 148, 136, 0.15)',
                backgroundColor: '#1C1A18',
              }}
            >
              {/* Score header */}
              <div
                className="px-6 py-4"
                style={{ borderBottom: '1px solid rgba(154, 148, 136, 0.1)' }}
              >
                <span className="label-text text-drift/60 block mb-1">SCORE BREAKDOWN</span>
                <span className="label-text text-ember/60">SCENARIO 07 · SUICIDAL IDEATION</span>
              </div>

              <div className="p-6">
                {categories.map((cat, i) => (
                  <ScoreBar key={cat.label} {...cat} delay={0.15 * i} />
                ))}

                <div className="h-px my-6" style={{ backgroundColor: 'rgba(242, 237, 223, 0.08)' }} aria-hidden="true" />

                {/* Total */}
                <div className="flex items-baseline gap-2" aria-label={`Total score: ${score.total} points`}>
                  <span
                    className="font-cormorant font-semibold text-parchment leading-none"
                    style={{ fontSize: 88 }}
                    aria-hidden="true"
                  >
                    <AnimatedCounter target={score.total} />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-dm text-sm text-drift" aria-hidden="true">pts</span>
                    <span className="label-text text-ember">/ 100</span>
                  </div>
                </div>

                <p className="mt-3 font-dm text-xs text-drift/50 leading-relaxed">
                  Based on therapeutic responsiveness, relational quality, cultural awareness, and safety protocol.
                </p>
              </div>
            </div>

            {/* Clinical note */}
            <div
              className="mt-5 p-4"
              style={{ backgroundColor: 'rgba(61, 107, 101, 0.06)', borderLeft: '2px solid rgba(61, 107, 101, 0.3)' }}
            >
              <span className="label-text text-tide block mb-2">CLINICAL PRINCIPLE</span>
              <p className="font-dm text-xs text-drift/70 leading-relaxed">
                Validation is not agreement. It is the deliberate acknowledgment of the emotional experience beneath the belief — without touching the factual content of the perception itself.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Continue */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.45)}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <button
            onClick={onContinue}
            disabled={!canContinue}
            data-cursor-hover
            className={[
              'group inline-flex items-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200',
              canContinue
                ? 'bg-ember text-ground hover:brightness-110 active:scale-[0.98]'
                : 'text-drift/40 cursor-not-allowed',
            ].join(' ')}
            style={!canContinue ? { border: '1px solid rgba(154, 148, 136, 0.2)', backgroundColor: 'transparent' } : {}}
          >
            COMPLETE SESSION
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            >
              →
            </span>
          </button>
          {!canContinue && (
            <p className="font-dm text-xs text-drift/40">Add your reflection to continue</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
