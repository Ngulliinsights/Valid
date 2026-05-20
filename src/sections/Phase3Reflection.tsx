import { useState } from 'react'
import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import { DialogueStackPattern } from '../components/patterns'

interface Phase3ReflectionProps {
  scenario: ScenarioData
  onContinue: () => void
  onReturnToHome?: () => void
}

// ---------------------------------------------------------------------------
// Four-Criteria Reflection Model
// ---------------------------------------------------------------------------

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

const REFLECTION_CRITERIA: ReflectionCriterion[] = [
  {
    key: 'therapeutic',
    label: 'THERAPEUTIC RESPONSIVENESS',
    weight: '30%',
    prompt:
      'How well did your instinctive response meet the patient\'s emotional experience? Did you establish safety and presence before moving to assessment?',
    placeholder:
      'Reflect on whether your response prioritised emotional attunement over problem-solving…',
    accentColor: '#3D6B65',
    accentBorder: '3px solid rgba(61, 107, 101, 0.55)',
    accentBg: 'rgba(61, 107, 101, 0.08)',
  },
  {
    key: 'ethical',
    label: 'ETHICAL CONSIDERATIONS',
    weight: '30%',
    prompt:
      'Did your response respect the patient\'s autonomy and avoid imposing your own values? Were there boundary, confidentiality, or dual-relationship dynamics at play?',
    placeholder:
      'Consider power dynamics, informed consent, and whether your response honoured the patient\'s right to self-determination…',
    accentColor: '#8A8FC4',
    accentBorder: '3px solid rgba(138, 143, 196, 0.55)',
    accentBg: 'rgba(138, 143, 196, 0.08)',
  },
  {
    key: 'safety',
    label: 'SAFETY ASSESSMENT',
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
    label: 'CLINICAL LOGIC',
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

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CriterionCard({
  criterion,
  value,
  onChange,
  index,
}: {
  criterion: ReflectionCriterion
  value: string
  onChange: (val: string) => void
  index: number
}) {
  const [isFocused, setIsFocused] = useState(false)

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
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      <div className="p-6 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <span
            className="font-dm text-[10px] font-medium uppercase tracking-[0.14em]"
            style={{ color: criterion.accentColor }}
          >
            {criterion.label}
          </span>
          <span className="font-dm text-[9px] uppercase tracking-[0.1em] text-drift/40">
            Weight: {criterion.weight}
          </span>
        </div>

        {/* Guiding prompt */}
        <p className="font-dm text-sm text-drift/70 leading-relaxed">
          {criterion.prompt}
        </p>

        {/* Textarea */}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={criterion.placeholder}
          className="w-full min-h-[100px] p-4 bg-ground/60 border border-drift/20 text-parchment placeholder:text-drift/30 font-cormorant italic text-base leading-relaxed resize-none rounded-xl focus:outline-none focus:ring-1 transition-all duration-200"
          style={{
            focusRingColor: criterion.accentColor,
          }}
        />

        {/* Word counter */}
        {value.trim() && (
          <div className="flex justify-end">
            <span className="font-dm text-[9px] text-drift/30 uppercase tracking-[0.1em]">
              {value.split(' ').filter(Boolean).length} words
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function CompletionIndicator({ filled, total }: { filled: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i < filled ? '#3D6B65' : 'rgba(154, 148, 136, 0.2)',
            }}
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
// Main component
// ---------------------------------------------------------------------------

export default function Phase3Reflection({ scenario, onContinue, onReturnToHome }: Phase3ReflectionProps) {
  const [responses, setResponses] = useState<Record<string, string>>(
    Object.fromEntries(REFLECTION_CRITERIA.map((c) => [c.key, ''])),
  )

  const filledCount = REFLECTION_CRITERIA.filter(
    (c) => responses[c.key]?.trim().length > 0,
  ).length

  const canContinue = filledCount >= 2

  const handleChange = (key: string, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }))
  }

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
      <DialogueStackPattern />
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" onHomeClick={handleHomeClick} />
        <PhaseIndicator activePhase={3} />
      </div>

      <div className="relative z-[10] max-w-[900px] mx-auto px-6 md:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
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

          {/* Scenario context strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.08)}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-drift/50 font-dm border-b border-drift/15 pb-5"
          >
            <span>{scenario.category}</span>
            <span className="text-drift/20">·</span>
            <span>Scenario #{scenario.scenarioNumber}</span>
            <span className="text-drift/20">·</span>
            <span>{scenario.complexity}</span>
            <span className="text-drift/20">·</span>
            <span>{scenario.pathway}</span>
          </motion.div>

          {/* Scenario Reflection Question */}
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

          {/* Four-criteria reflection cards */}
          <div className="space-y-5">
            {REFLECTION_CRITERIA.map((criterion, i) => (
              <CriterionCard
                key={criterion.key}
                criterion={criterion}
                value={responses[criterion.key]}
                onChange={(val) => handleChange(criterion.key, val)}
                index={i}
              />
            ))}
          </div>

          {/* Completion indicator + Continue */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.6)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4"
          >
            <CompletionIndicator filled={filledCount} total={REFLECTION_CRITERIA.length} />

            <button
              onClick={onContinue}
              disabled={!canContinue}
              data-cursor-hover
              className={[
                'group inline-flex items-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 rounded-xl shrink-0',
                canContinue
                  ? 'bg-ember text-ground hover:brightness-110 active:scale-[0.98]'
                  : 'text-drift/35 cursor-not-allowed border border-drift/18 bg-transparent',
              ].join(' ')}
            >
              COMPLETE PRACTICE SESSION
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
        </motion.div>
      </div>
    </section>
  )
}
