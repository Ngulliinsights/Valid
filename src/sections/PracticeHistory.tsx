import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import {
  getPracticeHistory,
  calculatePracticePattern,
  generateCEHours,
  calculateValidatingResponseRate,
} from '../lib/practiceJournal'

interface PracticeHistoryProps {
  onReturn: () => void
}

export default function PracticeHistory({ onReturn }: PracticeHistoryProps) {
  const history = getPracticeHistory()
  const pattern = calculatePracticePattern()
  const ceHours = generateCEHours()
  const validatingRate = calculateValidatingResponseRate()

  // ---------------------------------------------------------------------------
  // Export
  // ---------------------------------------------------------------------------

  const handleExport = () => {
    const lines = [
      'VALID PRACTICE JOURNAL',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      'SUMMARY STATISTICS',
      '━'.repeat(51),
      `Total Scenarios Practiced: ${pattern.totalAttempts}`,
      `CE Hours Earned: ${ceHours.toFixed(2)}`,
      `Validating Response Rate: ${validatingRate}%`,
      '',
      'RESPONSE PATTERN',
      '━'.repeat(51),
      `Validating Responses: ${pattern.byResponseType.validating}`,
      `Partial Responses: ${pattern.byResponseType.partial}`,
      `Invalidating (Enabling): ${pattern.byResponseType['invalidating-enabling']}`,
      `Invalidating (Antagonising): ${pattern.byResponseType['invalidating-antagonising']}`,
      '',
      'LEARNING PATTERNS',
      '━'.repeat(51),
      `Strongest Category: ${pattern.strongestCategory ?? 'N/A'}`,
      `Developing Category: ${pattern.developingCategory ?? 'N/A'}`,
      '',
      'PRACTICE ENTRIES',
      '━'.repeat(51),
      ...history.flatMap((entry) => [
        '',
        `Date: ${new Date(entry.timestamp).toLocaleString()}`,
        `Scenario #${entry.scenarioNumber} — ${entry.category} (${entry.complexity})`,
        entry.instinctAnalysis
          ? `Instinct Analysis: ${entry.instinctAnalysis.primaryType} (${entry.instinctAnalysis.confidence} confidence)`
          : 'Instinct Analysis: Not captured',
        `Phase 2 Selection: ${entry.responseType}`,
        entry.reflections
          ? `Reflections:\n${Object.entries(entry.reflections)
              .map(([k, v]) => `  - ${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`)
              .join('\n')}`
          : 'Reflections: Not captured',
        '─'.repeat(51),
      ]),
    ]

    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `VALID_Practice_Journal_${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // ---------------------------------------------------------------------------
  // Response distribution bar config
  // ---------------------------------------------------------------------------

  const responseRows = [
    {
      label: 'Validating',
      count: pattern.byResponseType.validating,
      barClass: 'bg-teal-900/40',
      textClass: 'text-tide',
    },
    {
      label: 'Partial',
      count: pattern.byResponseType.partial,
      barClass: 'bg-amber-900/40',
      textClass: 'text-amber-200',
    },
    {
      label: 'Invalidating (Enabling)',
      count: pattern.byResponseType['invalidating-enabling'],
      barClass: 'bg-orange-900/40',
      textClass: 'text-orange-200',
    },
    {
      label: 'Invalidating (Antagonising)',
      count: pattern.byResponseType['invalidating-antagonising'],
      barClass: 'bg-red-900/40',
      textClass: 'text-red-200',
    },
  ]

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10 flex items-center justify-between">
        <ValidLogo size="sm" color="parchment" onHomeClick={onReturn} />
        <button
          onClick={onReturn}
          data-cursor-hover
          className="text-drift/60 hover:text-parchment text-sm uppercase tracking-wide transition-colors"
        >
          Close
        </button>
      </div>

      {/* Body */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-2 border-b border-drift/20 pb-8">
            <span className="label-text text-ember">PRACTICE JOURNAL</span>
            <h1 className="font-cormorant font-semibold text-parchment text-4xl">
              Your Learning Path
            </h1>
          </div>

          {history.length === 0 ? (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center py-12 space-y-4"
            >
              <p className="text-drift/60 text-lg">No practice sessions yet.</p>
              <button
                onClick={onReturn}
                data-cursor-hover
                className="inline-block bg-ember text-ground px-6 py-3 font-dm font-medium text-sm uppercase tracking-[0.14em] hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Begin Your First Practice Session
              </button>
            </motion.div>
          ) : (
            <>
              {/* Summary Cards */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={fadeUpTransition(0.2)}
                className="grid md:grid-cols-4 gap-4"
              >
                <div className="bg-ground/90 border border-drift/35 p-4 space-y-1 rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
                  <p className="label-text text-drift/60 text-xs">TOTAL SCENARIOS</p>
                  <p className="font-cormorant text-parchment text-2xl font-semibold">
                    {pattern.totalAttempts}
                  </p>
                </div>
                <div className="bg-ground/90 border border-drift/35 p-4 space-y-1 rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
                  <p className="label-text text-drift/60 text-xs">CE HOURS EARNED</p>
                  <p className="font-cormorant text-parchment text-2xl font-semibold">
                    {ceHours.toFixed(2)}
                  </p>
                </div>
                <div className="bg-ground/90 border border-drift/35 p-4 space-y-1 rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
                  <p className="label-text text-drift/60 text-xs">VALIDATING RESPONSES</p>
                  <p className="font-cormorant text-tide text-2xl font-semibold">
                    {validatingRate}%
                  </p>
                </div>
                <div className="bg-ground/90 border border-drift/35 p-4 space-y-1 rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.45)]">
                  <p className="label-text text-drift/60 text-xs">STRONGEST AREA</p>
                  <p className="font-cormorant text-parchment text-sm font-semibold">
                    {pattern.strongestCategory ?? '—'}
                  </p>
                </div>
              </motion.div>

              {/* Response Distribution */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={fadeUpTransition(0.3)}
                className="bg-ground/90 border border-drift/35 p-6 space-y-4 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              >
                <h3 className="font-medium text-parchment uppercase tracking-wide text-sm">
                  Response Pattern
                </h3>
                <div className="space-y-3">
                  {responseRows.map(({ label, count, barClass, textClass }) => {
                    const pct =
                      pattern.totalAttempts > 0
                        ? (count / pattern.totalAttempts) * 100
                        : 0
                    return (
                      <div key={label} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-drift/70">{label}</span>
                            <span className={`${textClass} font-medium`}>{count}</span>
                          </div>
                          <div className="h-2 bg-drift/20 overflow-hidden rounded-full">
                            <div
                              className={`h-full ${barClass} transition-all duration-500 rounded-full`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Practice Log */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={fadeUpTransition(0.4)}
                className="space-y-4"
              >
                <h3 className="font-medium text-parchment uppercase tracking-wide text-sm">
                  Practice Log
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {history
                    .slice()
                    .reverse()
                    .map((entry) => {
                      const getBadgeColor = (type: string) => {
                        switch (type) {
                          case 'invalidating-antagonising':
                            return 'bg-red-950/40 text-red-200'
                          case 'invalidating-enabling':
                            return 'bg-orange-950/40 text-orange-200'
                          case 'partial':
                            return 'bg-amber-950/40 text-amber-200'
                          case 'validating':
                            return 'bg-teal-950/40 text-teal-200'
                          default:
                            return 'bg-drift/20 text-drift'
                        }
                      }

                      return (
                        <div
                          key={entry.id}
                          className="bg-ground/90 border border-drift/35 p-4 space-y-3 rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm text-drift/60">
                                {new Date(entry.timestamp).toLocaleString()}
                              </p>
                              <p className="font-medium text-parchment">
                                Scenario {entry.scenarioNumber} · {entry.category}
                              </p>
                            </div>
                          </div>

                          {/* Instinct Analysis (what their response revealed) */}
                          {entry.instinctAnalysis && (
                            <div className="text-xs space-y-1 pl-3 border-l-2 border-drift/40">
                              <p className="font-medium text-drift/80">Your Instinct Revealed:</p>
                              <p className="text-drift/70">
                                <span className="font-medium">{entry.instinctAnalysis.primaryType}</span>
                                {' '}
                                <span className="text-drift/60">({entry.instinctAnalysis.confidence} confidence)</span>
                              </p>
                              {entry.instinctAnalysis.keywords.length > 0 && (
                                <p className="text-drift/60">
                                  Keywords: {entry.instinctAnalysis.keywords.slice(0, 3).join(', ')}
                                  {entry.instinctAnalysis.keywords.length > 3
                                    ? ` +${entry.instinctAnalysis.keywords.length - 3}`
                                    : ''}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Phase 2 Selection (which tier they chose) */}
                          <div className="flex items-center justify-between gap-3 pt-1">
                            <span className="text-xs text-drift/60">You Selected:</span>
                            <span
                              className={`label-text px-2 py-1 text-xs uppercase tracking-wide rounded-md whitespace-nowrap ${
                                getBadgeColor(entry.responseType)
                              }`}
                            >
                              {entry.responseType}
                            </span>
                          </div>

                          {/* Reflections */}
                          {entry.reflections && Object.keys(entry.reflections).length > 0 && (
                            <div className="text-xs text-drift/60 pt-2 border-t border-drift/20">
                              <p className="font-medium text-parchment mb-2">Reflections:</p>
                              <div className="space-y-1">
                                {Object.entries(entry.reflections).slice(0, 2).map(([key, value]) => (
                                  <p key={key} className="text-drift/50">
                                    <span className="text-parchment/70 capitalize">{key}:</span> {value.substring(0, 60)}...
                                  </p>
                                ))}
                                {Object.keys(entry.reflections).length > 2 && (
                                  <p className="text-drift/30">+{Object.keys(entry.reflections).length - 2} more reflections</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </motion.div>

              {/* Export / Return */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={fadeUpTransition(0.5)}
                className="flex gap-3"
              >
                <button
                  onClick={handleExport}
                  data-cursor-hover
                  className="flex-1 border border-drift/40 text-parchment font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 transition-all duration-200 hover:bg-drift/10 active:scale-[0.98] rounded-xl"
                >
                  Export as Document
                </button>
                <button
                  onClick={onReturn}
                  data-cursor-hover
                  className="flex-1 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 transition-all duration-200 hover:brightness-110 active:scale-[0.98] rounded-xl"
                >
                  Return
                </button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}