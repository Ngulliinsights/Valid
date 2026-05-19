import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { blurIn } from '../lib/motion'
import { EchoField, ThresholdPattern } from '../components/patterns'
import cardImage from '../../images/Clinical scenario card on textured surface.webp'

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

      {/* Main content split layout on desktop */}
      <div className="relative z-10 max-w-[1150px] mx-auto px-6 md:px-16 w-full pt-28 pb-16 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Text & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
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
            style={{ fontSize: 'clamp(54px, 8vw, 84px)' }}
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

          {/* Subtitle */}
          <motion.p
            className="mt-8 font-dm text-base text-drift leading-[1.75] max-w-[500px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: 'easeOut' }}
          >
            Knowing what to say and being able to say it under pressure are two different skills. This trains the second one — before the moment that demands it.
          </motion.p>

          {/* CTA block */}
          <motion.div
            className="mt-8 flex flex-col items-start gap-4"
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
            className="mt-10 flex items-center gap-10 md:gap-16"
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

        {/* Right Column: Tactile Card Product Mockup */}
        <motion.div
          className="hidden lg:flex lg:col-span-5 justify-center pl-8"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="relative group max-w-[360px] w-full">
            {/* Ambient gold glow backplate */}
            <div 
              className="absolute -inset-3 rounded bg-gradient-to-tr from-ember/15 via-amber-700/5 to-transparent blur-2xl opacity-60 group-hover:opacity-90 transition duration-700" 
              aria-hidden="true"
            />
            
            {/* Tactile picture frame with drop shadow */}
            <div className="relative bg-ground border border-parchment/10 p-4 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:border-ember/25 group-hover:shadow-[0_36px_72px_-12px_rgba(196,136,42,0.15)]">
              <div className="overflow-hidden border border-parchment/5 bg-ground/50">
                <img 
                  src={cardImage} 
                  alt="VALID physical clinical scenario card preview" 
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-[1.02]"
                  loading="eager"
                />
              </div>
              
              {/* Refined asset micro-labels */}
              <div className="mt-3.5 flex items-center justify-between text-[9px] tracking-[0.16em] font-dm text-drift/45 uppercase">
                <span>tactile card system</span>
                <span className="text-ember font-medium">product preview</span>
              </div>
            </div>
          </div>
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
