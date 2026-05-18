// ─── Types ────────────────────────────────────────────────────────────────────

interface Phase {
  num: string
  label: string
}

interface PhaseIndicatorProps {
  /** 1-based index of the currently active phase */
  activePhase: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PHASES: Phase[] = [
  { num: '01', label: 'DIAGNOSTIC'  },
  { num: '02', label: 'ANALYSIS'    },
  { num: '03', label: 'INTEGRATION' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

interface PhaseNodeProps extends Phase {
  status: 'complete' | 'active' | 'upcoming'
}

function PhaseNode({ num, label, status }: PhaseNodeProps) {
  const nodeStyles = {
    complete: 'bg-tide text-ground border-tide',
    active:   'bg-transparent text-tide border-tide border-2',
    upcoming: 'bg-transparent text-drift border-drift/30 border',
  } satisfies Record<PhaseNodeProps['status'], string>

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`
          w-7 h-7 flex items-center justify-center
          text-xs font-dm font-medium
          transition-all duration-300
          ${nodeStyles[status]}
        `}
        aria-current={status === 'active' ? 'step' : undefined}
      >
        {status === 'complete' ? (
          // Checkmark for completed phases — communicates state beyond color alone
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
        className={`
          font-dm text-[9px] tracking-[0.1em] uppercase
          transition-colors duration-300
          ${status === 'active' ? 'text-tide' : status === 'complete' ? 'text-tide/60' : 'text-drift/40'}
        `}
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
      className={`
        w-8 h-px mx-1 mb-4 flex-shrink-0
        transition-colors duration-500
        ${filled ? 'bg-tide/40' : 'bg-drift/20'}
      `}
    />
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

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