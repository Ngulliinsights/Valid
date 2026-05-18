import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition, blurIn } from '../lib/motion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface SessionCompleteProps {
  onPlayAgain: () => void
  onReturn: () => void
}

interface ConfettiLineConfig {
  id: number
  delay: number
  left: string
  height: number
  duration: number
  opacity: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CONFETTI_COUNT = 18
const TAGLINE = "The next time a patient discloses something like this, your instinct will be different."

const HEADING = {
  line1: 'Session',
  line2: 'complete.',
} as const

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Seeded random-ish spread — avoids re-generating on every render */
function buildConfettiLines(): ConfettiLineConfig[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => {
    const rand = (seed: number) => ((Math.sin(i * 9.301 + seed * 7.919) + 1) / 2)
    return {
      id: i,
      delay: rand(1) * 3,
      left: `${rand(2) * 100}%`,
      height: 20 + rand(3) * 25,
      duration: 3 + rand(4) * 2,
      opacity: 0.15 + rand(5) * 0.15,
    }
  })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ConfettiLine({ delay, left, height, duration, opacity }: Omit<ConfettiLineConfig, 'id'>) {
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 w-px bg-tide"
      style={{
        left,
        height: `${height}px`,
        opacity,
        animation: `fall ${duration}s ease-in ${delay}s forwards`,
        willChange: 'transform, opacity',
      }}
    />
  )
}

function Divider() {
  return (
    <motion.div
      role="separator"
      aria-hidden="true"
      className="mx-auto w-16 h-px bg-tide my-8"
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ ...fadeUpTransition(0.75), ease: 'easeOut' }}
      style={{ transformOrigin: 'left center' }}
    />
  )
}

function ActionButtons({ onPlayAgain, onReturn }: SessionCompleteProps) {
  return (
    <motion.div
      className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={fadeUpTransition(1.2)}
    >
      <button
        onClick={onPlayAgain}
        data-cursor-hover
        type="button"
        className="group inline-flex items-center gap-3 bg-tide text-ground font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 transition-colors duration-200 hover:bg-tide-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tide"
      >
        Play Another Scenario
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </button>

      <button
        onClick={onReturn}
        data-cursor-hover
        type="button"
        className="inline-flex items-center gap-3 bg-transparent text-parchment font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 border border-parchment/25 transition-colors duration-200 hover:border-parchment/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment/50"
      >
        Return to Dashboard
      </button>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SessionComplete({ onPlayAgain, onReturn }: SessionCompleteProps) {
  const prefersReduced = useReducedMotion()
  const [confettiLines] = useState<ConfettiLineConfig[]>(buildConfettiLines)

  // Announce completion to screen readers
  useEffect(() => {
    document.title = 'Session Complete — Valid'
  }, [])

  const wordDelay = (lineOffset: number, wordIndex: number) =>
    fadeUpTransition(0.2 + lineOffset * 0.08 + wordIndex * 0.08)

  return (
    <section
      className="min-h-screen bg-ground relative flex flex-col"
      aria-labelledby="session-complete-heading"
    >
      {/* Live region for assistive tech */}
      <p role="status" className="sr-only">
        Session complete. Well done.
      </p>

      {/* Confetti — suppressed for reduced-motion preference */}
      {!prefersReduced && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          {confettiLines.map((line) => (
            <ConfettiLine key={line.id} {...line} />
          ))}
        </div>
      )}

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-16 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="text-center max-w-2xl"
        >
          {/* Heading */}
          <h1
            id="session-complete-heading"
            className="font-cormorant font-semibold text-parchment leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(40px, 7vw, 64px)' }}
          >
            <motion.span
              className="inline-block mr-[0.25em]"
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={wordDelay(0, 0)}
            >
              {HEADING.line1}
            </motion.span>

            <br />

            <motion.span
              className="inline-block italic text-tide"
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={wordDelay(1, 0)}
            >
              {HEADING.line2}
            </motion.span>
          </h1>

          <Divider />

          {/* Tagline */}
          <motion.p
            className="font-cormorant italic text-lg md:text-xl text-parchment/70 leading-relaxed max-w-lg mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(1.0)}
          >
            {TAGLINE}
          </motion.p>

          <ActionButtons onPlayAgain={onPlayAgain} onReturn={onReturn} />
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <motion.footer
        className="relative z-10 border-t border-parchment/8 py-6 px-6 md:px-10"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={fadeUpTransition(1.4)}
      >
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <ValidLogo size="sm" color="parchment" />

          <span className="font-dm text-xs text-drift text-center">
            &copy; 2026 Valid. A skill-building system for real-life moments.
          </span>

          <p className="font-dm font-medium text-[10px] text-tide uppercase tracking-wider text-center md:text-right">
            If someone you know is in crisis:{' '}
            <a
              href="tel:988"
              className="underline underline-offset-2 hover:text-tide-pale transition-colors duration-150"
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