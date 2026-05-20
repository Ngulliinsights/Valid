import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import { DialogueStackPattern } from '../components/patterns'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Phase3ReflectionProps {
  scenario: ScenarioData
  onContinue: (reflections: Record<string, string>) => void
  onReturnToHome?: () => void
}

interface ReflectionCriterion {
  key: string
  label: string
  weight: string
  prompt: string
  placeholder: string
  accentColor: string
  accentBorder: string
  accentBg: string
}

// ---------------------------------------------------------------------------
// Constants — defined outside component to avoid re-creation on every render
// ---------------------------------------------------------------------------

const REFLECTION_CRITERIA: ReflectionCriterion[] = [
  {
    key: 'therapeutic',
    label: 'Therapeutic Responsiveness',
    weight: '30%',
    prompt:
      "How well did your instinctive response meet the patient's emotional experience? Did you establish safety and presence before moving to assessment?",
    placeholder:
      'Reflect on whether your response prioritised emotional attunement over problem-solving…',
    accentColor: '#3D6B65',
    accentBorder: '3px solid rgba(61, 107, 101, 0.55)',
    accentBg: 'rgba(61, 107, 101, 0.08)',
  },
  {
    key: 'ethical',
    label: 'Ethical Considerations',
    weight: '30%',
    prompt:
      "Did your response respect the patient's autonomy and avoid imposing your own values? Were there boundary, confidentiality, or dual-relationship dynamics at play?",
    placeholder:
      "Consider power dynamics, informed consent, and whether your response honoured the patient's right to self-determination…",
    accentColor: '#8A8FC4',
    accentBorder: '3px solid rgba(138, 143, 196, 0.55)',
    accentBg: 'rgba(138, 143, 196, 0.08)',
  },
  {
    key: 'safety',
    label: 'Safety Assessment',
    weight: '20%',
    prompt:
      'Did you identify and address any immediate clinical risk? How did you balance safety concerns with preserving the therapeutic alliance?',
    placeholder:
      'Reflect on whether you assessed risk without creating defensiveness or rupturing the relationship…',
    accentColor: '#C45050',
    accentBorder: '3px solid rgba(196, 80, 80, 0.45)',
    accentBg: 'rgba(196, 80, 80, 0.06)',
  },
  {
    key: 'clinical',
    label: 'Clinical Logic',
    weight: '20%',
    prompt:
      'What clinical framework guided your response? Could you defend your reasoning to a supervisor or peer review panel?',
    placeholder:
      'Identify the theoretical model (DBT, MI, CBT, family systems) that informed your instinct, or note its absence…',
    accentColor: '#C4882A',
    accentBorder: '3px solid rgba(196, 136, 42, 0.45)',
    accentBg: 'rgba(196, 136, 42, 0.06)',
  },
]

const MIN_CRITERIA_TO_CONTINUE = 2

// ---------------------------------------------------------------------------
// CriterionCard
// ---------------------------------------------------------------------------

interface CriterionCardProps {
  criterion: ReflectionCriterion
  value: string
  onChange: (key: string, val: string) => void
  index: number
}

function CriterionCard({ criterion, value, onChange, index }: CriterionCardProps) {
  const [isFocused, setIsFocused] = useState(false)

  const wordCount = useMemo(
    () => value.split(/\s+/).filter(Boolean).length,
    [value],
  )

  const isFilled = value.trim().length > 0

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={fadeUpTransition(0.15 + index * 0.1)}
      className="rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
      style={{
        backgroundColor: isFocused ? criterion.accentBg : 'rgba(26, 24, 20, 0.6)',
        border: isFocused
          ? `1px solid ${criterion.accentColor}44`
          : '1px solid rgba(154, 148, 136, 0.15)',
        borderLeft: criterion.accentBorder,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-dm text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: criterion.accentColor }}
          >
            {criterion.label}
          </span>
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isFilled && (
                <motion.span
                  key="filled-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: criterion.accentColor }}
                />
              )}
            </AnimatePresence>
            <span className="font-dm text-[9px] uppercase tracking-[0.1em] text-drift/40">
              Weight: {criterion.weight}
            </span>
          </div>
        </div>

        {/* Guiding prompt */}
        <p className="font-dm text-sm text-drift/70 leading-relaxed">
          {criterion.prompt}
        </p>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(criterion.key, e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={criterion.placeholder}
          aria-label={criterion.label}
          className="w-full min-h-[108px] p-4 bg-ground/60 border border-drift/20 text-parchment placeholder:text-drift/30 font-cormorant italic text-base leading-relaxed resize-none rounded-xl focus:outline-none focus:ring-1 transition-all duration-200"
          style={
            {
              '--tw-ring-color': criterion.accentColor,
            } as React.CSSProperties
          }
        />

        {/* Word counter — only visible when text is present */}
        <AnimatePresence>
          {isFilled && (
            <motion.div
              key="word-count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-end"
            >
              <span className="font-dm text-[9px] text-drift/30 uppercase tracking-[0.1em]">
                {wordCount} {wordCount === 1 ? 'word' : 'words'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// CompletionIndicator
// ---------------------------------------------------------------------------

interface CompletionIndicatorProps {
  filled: number
  total: number
}

function CompletionIndicator({ filled, total }: CompletionIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5" role="progressbar" aria-valuenow={String(filled)} aria-valuemax={String(total)}>
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor:
                i < filled ? '#3D6B65' : 'rgba(154, 148, 136, 0.2)',
              scale: i === filled - 1 ? [1, 1.35, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <span className="font-dm text-[10px] text-drift/40 uppercase tracking-[0.1em]">
        {filled} of {total} criteria addressed
      </span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Phase3Reflection
// ---------------------------------------------------------------------------

export default function Phase3Reflection({
  scenario,
  onContinue,
  onReturnToHome,
}: Phase3ReflectionProps) {
  const [responses, setResponses] = useState<Record<string, string>>(
    () => Object.fromEntries(REFLECTION_CRITERIA.map((c) => [c.key, ''])),
  )

  // Stable handler — avoids re-creating on every render
  const handleChange = useCallback((key: string, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }))
  }, [])

  const filledCount = useMemo(
    () => REFLECTION_CRITERIA.filter((c) => responses[c.key]?.trim().length > 0).length,
    [responses],
  )

  const canContinue = filledCount >= MIN_CRITERIA_TO_CONTINUE

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
      <DialogueStackPattern />

      {/* Top bar */}
      <header className="relative z-10 p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" onHomeClick={handleHomeClick} />
        <PhaseIndicator activePhase={3} />
      </header>

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-16 pb-20">
        <div className="space-y-8">

          {/* Phase label + heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition()}
            className="space-y-4"
          >
            <span className="label-text text-ember">PHASE 03 · REFLECTIVE INTEGRATION</span>
            <h2 className="font-cormorant font-semibold text-parchment text-3xl md:text-4xl leading-tight">
              Articulate your clinical reasoning.
            </h2>
            <p className="font-dm text-sm text-drift leading-relaxed max-w-xl">
              Review your instinctive response against four clinical criteria. This structured
              self-confrontation is the mechanism that converts pattern recognition into durable
              competence. Address at least two criteria to continue.
            </p>
          </motion.div>

          {/* Scenario meta strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.08)}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-drift/50 font-dm border-b border-drift/15 pb-5"
          >
            <span>{scenario.category}</span>
            <span className="text-drift/20" aria-hidden="true">·</span>
            <span>Scenario #{scenario.scenarioNumber}</span>
            <span className="text-drift/20" aria-hidden="true">·</span>
            <span>{scenario.complexity}</span>
            <span className="text-drift/20" aria-hidden="true">·</span>
            <span>{scenario.pathway}</span>
          </motion.div>

          {/* Guiding question */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.12)}
            className="bg-tide/10 border border-tide/55 p-6 space-y-3 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
          >
            <p className="label-text text-tide">GUIDING QUESTION</p>
            <blockquote className="font-cormorant italic text-parchment text-lg leading-relaxed">
              &ldquo;{scenario.reflectionQuestion}&rdquo;
            </blockquote>
          </motion.div>

          {/* Four-criteria cards */}
          <div className="space-y-5">
            {REFLECTION_CRITERIA.map((criterion, i) => (
              <CriterionCard
                key={criterion.key}
                criterion={criterion}
                value={responses[criterion.key]}
                onChange={handleChange}
                index={i}
              />
            ))}
          </div>

          {/* Footer: completion + CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.6)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4"
          >
            <CompletionIndicator filled={filledCount} total={REFLECTION_CRITERIA.length} />

            <button
              onClick={() => onContinue(responses)}
              disabled={!canContinue}
              data-cursor-hover
              className={[
                'group inline-flex items-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 rounded-xl shrink-0',
                canContinue
                  ? 'bg-ember text-ground hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember focus-visible:outline-offset-2'
                  : 'text-drift/35 cursor-not-allowed border border-drift/18 bg-transparent',
              ].join(' ')}
            >
              Complete Practice Session
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              >
                →
              </span>
            </button>
          </motion.div>

          {/* Disclaimer */}
          <p className="font-dm text-[10px] text-drift/30 leading-relaxed text-center pt-2">
            This is a structured training tool, not a replacement for clinical supervision.
            There are no single right answers — the value is in the honesty of your reflection.
          </p>
        </div>
      </div>
    </section>
  )
}