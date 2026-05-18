import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition, blurIn } from '../lib/motion'
import { EchoField } from '../components/patterns'

interface SessionCompleteProps {
  onPlayAgain: () => void
  onReturn:    () => void
}

interface ConfettiLineConfig {
  id:       number
  delay:    number
  left:     string
  height:   number
  duration: number
  opacity:  number
  color:    string
}

const COLORS = ['#C4882A', '#3D6B65', '#F2EDDF', '#C4882A', '#9A9488']

function buildConfettiLines(): ConfettiLineConfig[] {
  return Array.from({ length: 22 }, (_, i) => {
    const rand = (seed: number) => ((Math.sin(i * 9.301 + seed * 7.919) + 1) / 2)
    return {
      id:       i,
      delay:    rand(1) * 3.5,
      left:     `${rand(2) * 100}%`,
      height:   16 + rand(3) * 28,
      duration: 3.5 + rand(4) * 2.5,
      opacity:  0.12 + rand(5) * 0.18,
      color:    COLORS[i % COLORS.length],
    }
  })
}

function ConfettiLine({ delay, left, height, duration, opacity, color }: Omit<ConfettiLineConfig, 'id'>) {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 w-px"
      style={{
        left,
        height:    `${height}px`,
        opacity,
        backgroundColor: color,
        animation: `fall ${duration}s ease-in ${delay}s forwards`,
        willChange: 'transform, opacity',
      }}
    />
  )
}

const SUMMARY_ITEMS = [
  { label: 'SCENARIO',    value: '07' },
  { label: 'CATEGORY',    value: 'SUICIDAL IDEATION' },
  { label: 'SCORE',       value: '81' },
  { label: 'COMPLEXITY',  value: 'INTERMEDIATE' },
]

export default function SessionComplete({ onPlayAgain, onReturn }: SessionCompleteProps) {
  const prefersReduced = useReducedMotion()
  const [confettiLines] = useState<ConfettiLineConfig[]>(buildConfettiLines)

  useEffect(() => {
    document.title = 'Session Complete — Valid'
  }, [])

  return (
    <section
      className="min-h-screen bg-ground relative flex flex-col rule-matrix-bg overflow-hidden"
      aria-labelledby="session-complete-heading"
    >
      <p role="status" className="sr-only">Session complete. Well done.</p>
      <EchoField className="opacity-50" />

      {/* Confetti lines */}
      {!prefersReduced && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          {confettiLines.map((line) => (
            <ConfettiLine key={line.id} {...line} />
          ))}
        </div>
      )}

      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10">
        <ValidLogo size="sm" color="parchment" />
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 relative z-10 py-16">
        <div className="text-center max-w-2xl w-full">

          {/* Phase label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-6 h-px bg-ember" aria-hidden="true" />
            <span className="label-text text-ember">SESSION COMPLETE</span>
            <div className="w-6 h-px bg-ember" aria-hidden="true" />
          </motion.div>

          {/* Heading */}
          <h1
            id="session-complete-heading"
            className="font-cormorant font-semibold text-parchment leading-[1.02] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(52px, 8vw, 80px)' }}
          >
            <motion.span
              className="inline-block mr-[0.22em]"
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.2)}
            >
              Your instinct
            </motion.span>

            <br />

            <motion.span
              className="inline-block italic"
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.38)}
              style={{
                background: 'linear-gradient(90deg, #C4882A 0%, #E0A84A 50%, #C4882A 100%)',
                backgroundSize: '200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'sweep 5s ease-in-out infinite',
              }}
            >
              has shifted.
            </motion.span>
          </h1>

          {/* Divider */}
          <motion.div
            className="mx-auto h-[2px] bg-ember my-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 48, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
            aria-hidden="true"
          />

          {/* Tagline */}
          <motion.p
            className="font-cormorant italic text-parchment/65 leading-relaxed max-w-lg mx-auto"
            style={{ fontSize: 'clamp(17px, 2.2vw, 21px)' }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.9)}
          >
            The next time a patient discloses something like this, your response will come from a different place.
          </motion.p>

          {/* Session summary strip */}
          <motion.div
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-px mx-auto max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            style={{ backgroundColor: 'rgba(154, 148, 136, 0.12)' }}
          >
            {SUMMARY_ITEMS.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center gap-1.5 py-4 px-3"
                style={{ backgroundColor: '#1A1814' }}
              >
                <span className="label-text text-drift/50">{label}</span>
                <span className="font-cormorant font-semibold text-parchment/80 text-lg">{value}</span>
              </div>
            ))}
          </motion.div>

          {/* Actions */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(1.3)}
          >
            <button
              onClick={onPlayAgain}
              data-cursor-hover
              type="button"
              className="group inline-flex items-center gap-3 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
            >
              Play Another Scenario
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1.5"
              >
                →
              </span>
            </button>

            <button
              onClick={onReturn}
              data-cursor-hover
              type="button"
              className="inline-flex items-center gap-3 bg-transparent text-parchment/70 font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 hover:text-parchment focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment/40"
              style={{ border: '1px solid rgba(242, 237, 223, 0.15)' }}
            >
              Start Over
            </button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 py-6 px-6 md:px-10"
        style={{ borderTop: '1px solid rgba(242, 237, 223, 0.07)' }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(1.5)}
      >
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-dm text-xs text-drift/40">
            &copy; 2026 Valid · A precision skill-building system for mental health response
          </span>

          <p className="font-dm font-medium text-[10px] text-ember/60 uppercase tracking-wider text-center">
            If someone you know is in crisis:{' '}
            <a
              href="tel:988"
              className="underline underline-offset-2 hover:text-ember transition-colors duration-150"
              aria-label="Call or text 988, the Suicide and Crisis Lifeline"
            >
              988 Suicide &amp; Crisis Lifeline
            </a>
          </p>
        </div>
      </motion.footer>
    </section>
  )
}
