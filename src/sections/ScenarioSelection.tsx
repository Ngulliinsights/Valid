import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import { DialogueStackPattern } from '../components/patterns'
import './ScenarioSelection.css'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type VerticalKey = 'anxiety' | 'depression' | 'altered-perception'
export type ComplexityLevel = 'Basic' | 'Intermediate' | 'Advanced' | 'Master'

export interface ScenarioSelection {
  mode: 'random' | 'targeted'
  vertical?: VerticalKey
  complexity?: ComplexityLevel
}

interface ScenarioSelectionProps {
  onBegin: (selection: ScenarioSelection) => void
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

interface VerticalConfig {
  key: VerticalKey
  register: string
  label: string
  description: string
  clinicalNote: string
  accentColor: string
  tagBg: string
  scenarioCount: number
}

const VERTICALS: VerticalConfig[] = [
  {
    key: 'anxiety',
    register: 'REGISTER 01',
    label: 'Anxiety & Spiral Thinking',
    description:
      'Panic, obsessive worry, avoidance, and the catastrophising loops that keep people stuck before a threat has materialised.',
    clinicalNote:
      'Instinct failure mode: rushing to reassurance before safety is established.',
    accentColor: '#7C9E8E',
    tagBg: 'rgba(124, 158, 142, 0.10)',
    scenarioCount: 20,
  },
  {
    key: 'depression',
    register: 'REGISTER 02',
    label: 'Depression & Withdrawal',
    description:
      'Low energy, social retreat, hopelessness, and the quiet signals that something serious is building beneath the surface.',
    clinicalNote:
      'Instinct failure mode: pivoting to problem-solving before emotional presence is established.',
    accentColor: '#8A8FC4',
    tagBg: 'rgba(138, 143, 196, 0.10)',
    scenarioCount: 20,
  },
  {
    key: 'altered-perception',
    register: 'REGISTER 03',
    label: 'Altered Perception',
    description:
      'Paranoia, grandiosity, psychosis, and the situations where shared reality has broken down — the hardest register for most supporters.',
    clinicalNote:
      'Instinct failure mode: either confronting the belief directly or endorsing it through false agreement.',
    accentColor: '#C4882A',
    tagBg: 'rgba(196, 136, 42, 0.10)',
    scenarioCount: 20,
  },
]

const COMPLEXITY_LEVELS: { level: ComplexityLevel; description: string }[] = [
  { level: 'Basic',        description: 'Single emotion · clear context · low ambiguity' },
  { level: 'Intermediate', description: 'Comorbid presentations · competing demands' },
  { level: 'Advanced',     description: 'Safety risk · treatment resistance · rupture' },
  { level: 'Master',       description: 'Multi-system complexity · institutional pressure' },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildSessionSummary(
  vertical: VerticalKey,
  complexity: ComplexityLevel | null,
): string {
  const config = VERTICALS.find((v) => v.key === vertical)!
  return complexity
    ? `${config.label} · ${complexity} complexity.`
    : `${config.label} · all complexity levels.`
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

// SVG chevron — avoids the cross-platform rendering variance of the ▼ glyph.
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={`w-3 h-3 shrink-0 transition-transform duration-300 chevron-icon ${open ? 'chevron-icon-open' : ''}`}
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <polyline points="2,4 6,8 10,4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function VerticalDropdown({
  labelId,
  selected,
  onSelect,
}: {
  /** ID of the visible label element above — wired to aria-labelledby. */
  labelId: string
  selected: VerticalKey | null
  onSelect: (key: VerticalKey | null) => void
}) {
  const [isOpen,      setIsOpen]      = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef    = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const triggerId      = useId()

  const filtered = VERTICALS.filter(
    (v) =>
      v.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedVertical = VERTICALS.find((v) => v.key === selected)

  const close = () => {
    setIsOpen(false)
    setSearchQuery('')
  }

  // Close on outside click. Separated from the focus effect below so each
  // effect has a single, clear responsibility.
  useEffect(() => {
    if (!isOpen) return
    function handleMouseDown(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [isOpen])

  // Focus the search input whenever the menu opens.
  useEffect(() => {
    if (isOpen) searchInputRef.current?.focus()
  }, [isOpen])

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
      <button
        id={triggerId}
        onClick={() => setIsOpen((prev) => !prev)}
        data-cursor-hover
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-labelledby={`${labelId} ${triggerId}`}
        className={`w-full text-left p-4 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember vertical-dropdown-trigger ${isOpen ? 'vertical-dropdown-trigger-open' : ''}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-cormorant font-semibold text-parchment">
              {selectedVertical ? selectedVertical.label : 'Select clinical register…'}
            </p>
            {selectedVertical && (
              <p className="font-dm text-xs text-drift/60 mt-1">
                {selectedVertical.scenarioCount} scenarios
              </p>
            )}
          </div>
          <span className="text-drift/50">
            <ChevronIcon open={isOpen} />
          </span>
        </div>
      </button>

      {/* Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden vertical-dropdown-menu"
          >
            {/* Search */}
            <div
              className="p-3 vertical-dropdown-search-input-wrapper"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search registers…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter clinical registers"
                className="w-full px-3 py-2 bg-transparent text-parchment placeholder:text-drift/40 font-dm text-sm focus:outline-none vertical-dropdown-search-input"
              />
            </div>

            {/* Options */}
            <div className="max-h-64 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((vertical) => {
                  const isSelected = selected === vertical.key
                  return (
                    <button
                      key={vertical.key}
                      role="option"
                      aria-selected={isSelected ? 'true' : 'false'}
                      onClick={() => {
                        onSelect(isSelected ? null : vertical.key)
                        close()
                      }}
                      type="button"
                      className={`w-full text-left px-4 py-3 transition-all duration-150 vertical-dropdown-option ${isSelected ? 'vertical-dropdown-option-selected' : ''}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p
                            className="font-cormorant font-semibold leading-tight"
                            style={{ color: isSelected ? vertical.accentColor : '#F2EDDF' }}
                          >
                            {vertical.label}
                          </p>
                          <p className="font-dm text-xs text-drift/60 mt-1 leading-relaxed">
                            {vertical.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div
                            className="mt-1 shrink-0 w-4 h-4 flex items-center justify-center"
                            style={{ backgroundColor: vertical.accentColor }}
                          >
                            <svg
                              viewBox="0 0 12 12"
                              fill="none"
                              className="w-2.5 h-2.5"
                              strokeWidth={2}
                              stroke="#1A1814"
                              aria-hidden="true"
                            >
                              <polyline
                                points="2,6 5,9 10,3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })
              ) : (
                <div className="p-4 text-center">
                  <p className="font-dm text-sm text-drift/60">
                    No registers match your search.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ComplexitySelector({
  selected,
  onSelect,
}: {
  selected: ComplexityLevel | null
  onSelect: (level: ComplexityLevel | null) => void
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="label-text text-drift/50 text-xs">COMPLEXITY</span>
        {selected && (
          <button
            onClick={() => onSelect(null)}
            className="font-dm text-[9px] uppercase tracking-[0.1em] text-drift/30 hover:text-drift/60 transition-colors"
            type="button"
          >
            clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {COMPLEXITY_LEVELS.map(({ level, description }) => {
          const isActive = selected === level
          return (
            <button
              key={level}
              onClick={() => onSelect(isActive ? null : level)}
              data-cursor-hover
              type="button"
              className={`text-left p-3 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ember complexity-selector-button ${isActive ? 'complexity-selector-button-active' : ''}`}
            >
              <p
                className="font-dm text-xs font-medium mb-0.5 transition-colors"
                style={{ color: isActive ? '#C4882A' : 'rgba(242,237,223,0.7)' }}
              >
                {level}
              </p>
              <p className="font-dm text-[9px] text-drift/40 leading-relaxed">
                {description}
              </p>
            </button>
          )
        })}
      </div>

      {!selected && (
        <p className="font-dm text-[9px] text-drift/30 leading-relaxed">
          No complexity selected — scenarios drawn randomly across all levels.
        </p>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function ScenarioSelection({ onBegin }: ScenarioSelectionProps) {
  const [selectedVertical,   setSelectedVertical]   = useState<VerticalKey | null>(null)
  const [selectedComplexity, setSelectedComplexity] = useState<ComplexityLevel | null>(null)

  // Stable ID for the visible label — threaded into VerticalDropdown's
  // aria-labelledby so the label is semantically bound to the control.
  const registerLabelId = useId()

  const handleRandom = () => onBegin({ mode: 'random' })

  const handleTargeted = () => {
    if (!selectedVertical) return
    onBegin({
      mode: 'targeted',
      vertical: selectedVertical,
      complexity: selectedComplexity ?? undefined,
    })
  }

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      <DialogueStackPattern />

      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10">
        <ValidLogo size="sm" color="parchment" />
      </div>

      <div className="relative z-[10] max-w-[1100px] mx-auto px-6 md:px-16 pb-24">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-ember" aria-hidden="true" />
            <span className="label-text text-ember">PHASE 00 · SESSION SETUP</span>
          </div>
          <h2
            className="font-cormorant font-medium text-parchment mb-4 leading-tight scenario-selection-header-title"
          >
            What do you want to practise?
          </h2>
          <p className="font-dm text-sm text-drift leading-relaxed max-w-lg">
            Target the clinical register where your instinct is weakest, or let the system
            draw from the full scenario pool. Deliberate practice only produces durable change
            when it targets a specific gap.
          </p>
        </motion.div>

        {/* Random path */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.1)}
          className="mb-10"
        >
          <button
            onClick={handleRandom}
            data-cursor-hover
            type="button"
            className="group w-full text-left transition-all duration-200 hover:brightness-105 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember random-scenario-button"
          >
            <div className="p-6 flex items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="font-cormorant font-semibold text-xl text-parchment">
                  Random scenario
                </p>
                <p className="font-dm text-xs text-drift/60 leading-relaxed">
                  Draw from the full scenario pool across all registers and complexity levels.
                  Best for spaced repetition and exposure to unfamiliar presentations.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-parchment/30 text-2xl transition-transform duration-200 group-hover:translate-x-1 shrink-0"
              >
                →
              </span>
            </div>
          </button>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.12)}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 h-px bg-drift/10" />
          <span className="font-dm text-[9px] uppercase tracking-[0.14em] text-drift/30">
            or target a specific register
          </span>
          <div className="flex-1 h-px bg-drift/10" />
        </motion.div>

        {/* Vertical selection dropdown */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.15)}
          className="mb-10"
        >
          {/*
           * <span> not <label> — <label> activates inputs/checkboxes/selects,
           * not buttons. The id is wired via aria-labelledby in VerticalDropdown.
           */}
          <span
            id={registerLabelId}
            className="label-text text-drift/50 block mb-3 text-xs"
          >
            SELECT CLINICAL REGISTER
          </span>
          <VerticalDropdown
            labelId={registerLabelId}
            selected={selectedVertical}
            onSelect={(key) => {
              setSelectedVertical(key)
              // Reset complexity so a stale selection from a previous register
              // doesn't silently carry forward.
              setSelectedComplexity(null)
            }}
          />
        </motion.div>

        {/* Complexity selector — only shown once a vertical is chosen */}
        <AnimatePresence>
          {selectedVertical && (
            <motion.div
              key="complexity"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-10"
            >
              <div
                className="p-6 complexity-selector-wrapper"
              >
                <ComplexitySelector
                  selected={selectedComplexity}
                  onSelect={setSelectedComplexity}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue — targeted */}
        <AnimatePresence>
          {selectedVertical && (
            <motion.div
              key="continue-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <p className="font-dm text-xs text-drift/40 leading-relaxed max-w-sm">
                {buildSessionSummary(selectedVertical, selectedComplexity)}
              </p>

              <button
                onClick={handleTargeted}
                data-cursor-hover
                type="button"
                className="group inline-flex items-center gap-3 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 hover:brightness-110 active:scale-[0.98] shrink-0"
              >
                BEGIN SESSION
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}