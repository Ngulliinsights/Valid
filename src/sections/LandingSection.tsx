import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { blurIn } from '../lib/motion'
import { EchoField, ThresholdPattern } from '../components/patterns'

interface LandingSectionProps {
  onBegin: () => void
}

const HERO_LINE1 = ['The', 'practiced']
const HERO_LINE2 = ['response']
const HERO_LINE3 = ['that', 'holds.']

const emberStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #C4882A 0%, #E0A84A 50%, #C4882A 100%)',
  backgroundSize: '200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'sweep 5s ease-in-out infinite',
}

const STATS = [
  { value: '60+',   label: 'CLINICAL SCENARIOS' },
  { value: '3',     label: 'PHASE METHODOLOGY' },
  { value: 'CE',    label: 'CREDIT ELIGIBLE' },
]

export default function LandingSection({ onBegin }: LandingSectionProps) {
  return (
    <section className="relative min-h-[100dvh] min-h-screen flex flex-col justify-center rule-matrix-bg overflow-hidden grain-overlay">
      <EchoField />
      <ThresholdPattern />
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex items-start justify-between relative z-[10]">
        <ValidLogo size="md" color="parchment" showTagline />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="hidden md:flex flex-col items-end gap-1 pt-1"
        >
          <span className="label-text text-drift/50">SCENARIO 07</span>
          <span className="label-text text-ember/70">SUICIDAL IDEATION</span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-16 w-full pt-24 pb-16">

        {/* Phase label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="w-6 h-px bg-ember" aria-hidden="true" />
          <span className="label-text text-ember">THERAPEUTIC CONNECTIONS · PROFESSIONAL EDITION</span>
        </motion.div>

        {/* Hero heading */}
        <h1
          className="font-cormorant font-semibold text-parchment leading-[1.0] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(60px, 9vw, 96px)' }}
        >
          {HERO_LINE1.map((word, i) => (
            <motion.span
              key={`l1-${i}`}
              className="inline-block mr-[0.22em]"
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.18 + i * 0.07, ease: 'easeOut' }}
            >
              {word}
            </motion.span>
          ))}

          <br />

          {HERO_LINE2.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              className="inline-block mr-[0.22em]"
              variants={blurIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.18 + HERO_LINE1.length * 0.07 + i * 0.07, ease: 'easeOut' }}
            >
              {word}
            </motion.span>
          ))}

          <br />

          {HERO_LINE3.map((word, i) => {
            const isAccent = i === HERO_LINE3.length - 1
            return (
              <motion.span
                key={`l3-${i}`}
                className={['inline-block mr-[0.22em]', isAccent ? 'italic' : ''].join(' ')}
                variants={blurIn}
                initial="hidden"
                animate="visible"
                transition={{
                  duration: 0.6,
                  delay: 0.18 + (HERO_LINE1.length + HERO_LINE2.length) * 0.07 + i * 0.07,
                  ease: 'easeOut',
                }}
                style={isAccent ? emberStyle : undefined}
              >
                {word}
              </motion.span>
            )
          })}
        </h1>

        {/* Subtitle — from the copy system gap claim */}
        <motion.p
          className="mt-10 font-dm text-base md:text-lg text-drift leading-[1.75] max-w-[500px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72, ease: 'easeOut' }}
        >
          Knowing what to say and being able to say it under pressure are two different skills. This trains the second one — before the moment that demands it.
        </motion.p>

        {/* CTA block */}
        <motion.div
          className="mt-10 flex flex-col items-start gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.90, ease: 'easeOut' }}
        >
          <div className="w-12 h-[2px] bg-ember" aria-hidden="true" />

          <button
            onClick={onBegin}
            data-cursor-hover
            className="group inline-flex items-center gap-3 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            BEGIN SESSION
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            >
              →
            </span>
          </button>

          <p className="font-dm text-xs text-drift/50 uppercase tracking-[0.12em]">
            SCENARIO 07 · SUICIDAL IDEATION · INTERMEDIATE · 35 MIN
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="mt-12 flex items-center gap-10 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.08, ease: 'easeOut' }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="font-cormorant font-semibold text-parchment/80 text-2xl md:text-3xl">
                {stat.value}
              </span>
              <span className="label-text text-drift/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-parchment/8" aria-hidden="true" />

      {/* Vertical ember rule — decorative */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 w-px h-32 hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(196,136,42,0.25), transparent)' }}
        aria-hidden="true"
      />
    </section>
  )
}
