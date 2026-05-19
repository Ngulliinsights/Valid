import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import PhaseIndicator from '../components/PhaseIndicator'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData } from '../App'
import { DialogueStackPattern } from '../components/patterns'

interface Phase3ReflectionProps {
  scenario: ScenarioData
  onContinue: () => void
}

export default function Phase3Reflection({ scenario, onContinue }: Phase3ReflectionProps) {
  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <DialogueStackPattern />
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" />
        <PhaseIndicator activePhase={3} />
      </div>

      <div className="relative z-[10] max-w-[900px] mx-auto px-6 md:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
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
              What will you carry forward?
            </h2>
          </motion.div>

          {/* Reflection Prompt */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.2)}
            className="bg-teal-950/15 border border-tide/40 p-8 space-y-4"
          >
            <p className="label-text text-tide">REFLECTION QUESTION</p>
            <blockquote className="font-cormorant italic text-parchment text-xl leading-relaxed">
              "{scenario.reflectionQuestion}"
            </blockquote>
            <p className="text-drift/70 text-sm leading-relaxed">
              This is not a test. There is no single right answer. The value is in the honesty of your reflection.
            </p>
          </motion.div>

          {/* Clinical Context */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.3)}
            className="space-y-3 border-b border-drift/20 pb-6"
          >
            <p className="label-text text-drift/60">SCENARIO CONTEXT</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-drift/60 text-xs uppercase tracking-wide mb-1">Category</p>
                <p className="text-parchment">{scenario.category}</p>
              </div>
              <div>
                <p className="text-drift/60 text-xs uppercase tracking-wide mb-1">Complexity</p>
                <p className="text-parchment">{scenario.complexity}</p>
              </div>
              <div>
                <p className="text-drift/60 text-xs uppercase tracking-wide mb-1">Pathway</p>
                <p className="text-parchment">{scenario.pathway}</p>
              </div>
              <div>
                <p className="text-drift/60 text-xs uppercase tracking-wide mb-1">Scenario Number</p>
                <p className="text-parchment">#{scenario.scenarioNumber}</p>
              </div>
            </div>
          </motion.div>

          {/* Continue Button */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.4)}
            className="flex justify-center pt-6"
          >
            <button
              onClick={onContinue}
              data-cursor-hover
              className="group inline-flex items-center gap-3 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
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
        </motion.div>
      </div>
    </section>
  )
}
