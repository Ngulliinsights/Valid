import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { SCENARIO_DATA, ScoreData } from '../App'

interface Phase3ReflectionProps {
  scenario: typeof SCENARIO_DATA
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
  { label: 'RELATIONAL / CLINICAL', value: score.relationalClinical, color: '#3D6B65' },
  { label: 'CULTURAL AWARENESS',   value: score.culturalAwareness,   color: '#3D6B65' },
  { label: 'SAFETY ASSESSMENT',    value: score.safetyAssessment,    color: '#4A8C6A' },
]

// ---------------------------------------------------------------------------
// AnimatedCounter
// ---------------------------------------------------------------------------
function AnimatedCounter({
  target,
  duration = 600,
}: {
  target: number
  duration?: number
}) {
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

// ---------------------------------------------------------------------------
// ScoreBar
// ---------------------------------------------------------------------------
function ScoreBar({
  label,
  value,
  color,
  delay,
}: ScoreCategory & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="label-text text-drift">{label}</span>
        <span className="font-cormorant text-xl text-parchment">{value}</span>
      </div>
      <div
        className="h-0.5 bg-parchment/10 relative overflow-hidden"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="absolute inset-y-0 left-0"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${value}%` } : { width: '0%' }}
          transition={{ duration: 0.8, delay, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Phase3Reflection
// ---------------------------------------------------------------------------
export default function Phase3Reflection({
  scenario,
  score,
  onContinue,
}: Phase3ReflectionProps) {
  const [reflectionText, setReflectionText] = useState('')
  const categories = SCORE_CATEGORIES(score)

  return (
    <section className="min-h-screen bg-ground relative">
      {/* Top bar */}
      <div className="p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={3} />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-16 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-10"
        >
          <span className="label-text text-tide block mb-4">
            PHASE 03 · REFLECTIVE INTEGRATION
          </span>
          <blockquote className="font-cormorant italic text-tide text-2xl md:text-3xl max-w-lg leading-snug">
            &ldquo;The gap between your instinct and the optimal response—that&rsquo;s
            where learning happens.&rdquo;
          </blockquote>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left — Reflection */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.15)}
          >
            {/* Reflection prompt */}
            <div className="border border-tide/30 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-tide" aria-hidden="true" />
              <div className="p-6">
                <p className="font-cormorant italic text-lg md:text-xl text-parchment leading-relaxed">
                  {scenario.reflectionQuestion}
                </p>
              </div>
            </div>

            {/* Reflection input */}
            <div className="mt-6">
              <label
                htmlFor="reflection-input"
                className="label-text text-tide block mb-3"
              >
                YOUR REFLECTION
              </label>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-tide" aria-hidden="true" />
                <textarea
                  id="reflection-input"
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="What did you notice about the difference between your instinct and the validating response?"
                  className="w-full min-h-[120px] bg-tide-pale/15 p-5 font-cormorant italic text-lg text-parchment placeholder:text-drift/40 resize-none border-none focus:ring-1 focus:ring-tide/40"
                  style={{ outline: 'none' }}
                />
              </div>
            </div>

            {/* Milestone badge */}
            {score.milestone && (
              <motion.div
                className="mt-6 border-l-[3px] border-l-over-g bg-tide-pale/10 p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                role="status"
                aria-live="polite"
              >
                <span className="label-text text-over-g block mb-1">
                  {score.milestone}
                </span>
                <span className="font-dm text-xs text-drift">
                  Phase One response improved by 2+ tiers
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Right — Score */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.25)}
          >
            <div className="border border-tide/20 p-6">
              <span className="label-text text-tide block mb-6">
                SCORE BREAKDOWN
              </span>

              {categories.map((cat, i) => (
                <ScoreBar key={cat.label} {...cat} delay={0.1 * i} />
              ))}

              <div className="h-px bg-parchment/10 my-6" aria-hidden="true" />

              {/* Total score */}
              <div
                className="flex items-baseline gap-2"
                aria-label={`Total score: ${score.total} points`}
              >
                <span
                  className="font-cormorant font-semibold text-parchment"
                  style={{ fontSize: 96 }}
                  aria-hidden="true"
                >
                  <AnimatedCounter target={score.total} />
                </span>
                <span className="font-dm font-light text-base text-drift" aria-hidden="true">
                  pts
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Continue */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.4)}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={onContinue}
            data-cursor-hover
            className="inline-flex items-center gap-3 bg-tide text-ground font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 hover:bg-tide-pale transition-colors duration-200"
          >
            COMPLETE SESSION
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}