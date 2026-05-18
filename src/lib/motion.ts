import type { Variants } from 'framer-motion'

/** Standard fade-up entry used across every phase screen */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export const fadeUpTransition = (delay = 0) => ({
  duration: 0.6,
  delay,
  ease: 'easeInOut' as const,
})

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: { opacity: 1, filter: 'blur(0px)' },
}