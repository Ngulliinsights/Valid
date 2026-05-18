interface Phase {
  num: string
  label: string
}

interface PhaseIndicatorProps {
  activePhase: number
}

const PHASES: Phase[] = [
  { num: '01', label: 'DIAGNOSTIC'  },
  { num: '02', label: 'ANALYSIS'    },
  { num: '03', label: 'INTEGRATION' },
]

interface PhaseNodeProps extends Phase {
  status: 'complete' | 'active' | 'upcoming'
}

function PhaseNode({ num, label, status }: PhaseNodeProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-7 h-7 flex items-center justify-center text-xs font-dm font-medium transition-all duration-300"
        style={{
          backgroundColor:
            status === 'complete' ? '#C4882A'
            : 'transparent',
          border:
            status === 'active'   ? '2px solid #C4882A'
            : status === 'complete' ? '2px solid #C4882A'
            : '1px solid rgba(154, 148, 136, 0.25)',
          color:
            status === 'complete' ? '#1A1814'
            : status === 'active'   ? '#C4882A'
            : 'rgba(154, 148, 136, 0.45)',
        }}
        aria-current={status === 'active' ? 'step' : undefined}
      >
        {status === 'complete' ? (
          <svg
            aria-hidden="true"
            viewBox="0 0 12 12"
            fill="none"
            className="w-3 h-3"
            strokeWidth={2}
            stroke="currentColor"
          >
            <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          num
        )}
      </div>

      <span
        className="font-dm text-[9px] tracking-[0.1em] uppercase transition-colors duration-300"
        style={{
          color:
            status === 'active'   ? '#C4882A'
            : status === 'complete' ? 'rgba(196, 136, 42, 0.55)'
            : 'rgba(154, 148, 136, 0.35)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

function PhaseDivider({ filled }: { filled: boolean }) {
  return (
    <div
      aria-hidden="true"
      className="w-8 h-px mx-1 mb-4 flex-shrink-0 transition-colors duration-500"
      style={{ backgroundColor: filled ? 'rgba(196, 136, 42, 0.35)' : 'rgba(154, 148, 136, 0.15)' }}
    />
  )
}

export default function PhaseIndicator({ activePhase }: PhaseIndicatorProps) {
  const clampedActive = Math.max(1, Math.min(activePhase, PHASES.length))

  return (
    <nav aria-label="Session progress">
      <ol className="flex items-center gap-0 list-none m-0 p-0">
        {PHASES.map((phase, i) => {
          const phaseNum = i + 1
          const status: PhaseNodeProps['status'] =
            phaseNum < clampedActive ? 'complete'
            : phaseNum === clampedActive ? 'active'
            : 'upcoming'

          return (
            <li key={phase.num} className="flex items-center">
              <PhaseNode {...phase} status={status} />
              {i < PHASES.length - 1 && (
                <PhaseDivider filled={phaseNum < clampedActive} />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
