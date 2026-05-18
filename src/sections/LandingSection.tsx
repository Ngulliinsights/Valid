import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { blurIn } from '../lib/motion'

interface LandingSectionProps {
  onBegin: () => void
}

const LINE_1 = ['The', 'practiced', 'response']
const LINE_2 = ['that', 'holds', 'when', 'theory', 'fails.']
const LINE_2_ACCENT_START = 2 // words at index >= 2 get the gradient treatment

const gradientStyle: React.CSSProperties = {
  background: 'linear-gradient(90deg, #3D6B65 0%, #5A9A94 50%, #3D6B65 100%)',
  backgroundSize: '200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'sweep 4s ease-in-out infinite',
}

export default function LandingSection({ onBegin }: LandingSectionProps) {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center rule-matrix-bg overflow-hidden">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 md:p-10">
        <ValidLogo size="md" color="parchment" showTagline />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-16 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Hero heading */}
          <h1
            className="font-cormorant font-semibold text-parchment leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(40px, 7vw, 72px)' }}
          >
            {LINE_1.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                className="inline-block mr-[0.25em]"
                variants={blurIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease: 'easeInOut' }}
              >
                {word}
              </motion.span>
            ))}

            <br />

            {LINE_2.map((word, i) => {
              const isAccent = i >= LINE_2_ACCENT_START
              return (
                <motion.span
                  key={`l2-${i}`}
                  className={[
                    'inline-block mr-[0.25em]',
                    isAccent ? 'italic' : '',
                  ].join(' ')}
                  variants={blurIn}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + LINE_1.length * 0.08 + i * 0.08,
                    ease: 'easeInOut',
                  }}
                  style={isAccent ? gradientStyle : undefined}
                >
                  {word}
                </motion.span>
              )
            })}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-8 font-dm text-lg md:text-xl text-drift max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeInOut' }}
          >
            Master the clinical moment when theory fails.
          </motion.p>

          {/* Divider + CTA */}
          <motion.div
            className="mt-10 flex flex-col items-start gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeInOut' }}
          >
            <div className="w-16 h-0.5 bg-tide" aria-hidden="true" />
            <button
              onClick={onBegin}
              data-cursor-hover
              className="group inline-flex items-center gap-3 bg-tide text-ground font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 hover:bg-tide-pale transition-colors duration-200"
            >
              BEGIN SESSION
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-parchment/10" aria-hidden="true" />
    </section>
  )
}