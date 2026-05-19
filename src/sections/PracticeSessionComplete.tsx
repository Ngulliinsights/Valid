import { useState } from 'react'
import { motion } from 'framer-motion'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import type { ScenarioData, ResponseTier } from '../App'
import type { PracticeEntry } from '../types/practice'
import type { AnalysisResult } from '../lib/responseAnalysis'
import { savePracticeEntry } from '../lib/practiceJournal'
import reflectionImage from '../../images/The space between knowing and responding.webp'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ResponseType = 'invalidating-antagonising' | 'invalidating-enabling' | 'partial' | 'validating'

interface PracticeSessionCompleteProps {
  scenario: ScenarioData
  characterId: string
  characterName: string
  instinctiveResponse: string
  instinctAnalysis?: AnalysisResult | null
  responseType: ResponseType
  selectedResponseTier: ResponseTier
  onPlayAnother: () => void
  onReviewHistory: () => void
  onReturnToHome?: () => void
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RESPONSE_TYPE_LABELS: Record<ResponseType, string> = {
  'invalidating-antagonising': 'Invalidating — Antagonising',
  'invalidating-enabling': 'Invalidating — Enabling',
  partial: 'Partial',
  validating: 'Validating',
}

const BADGE_CLASSES: Record<ResponseType, string> = {
  'invalidating-antagonising': 'bg-red-950/40 text-red-200',
  'invalidating-enabling': 'bg-orange-950/40 text-orange-200',
  partial: 'bg-amber-950/40 text-amber-200',
  validating: 'bg-teal-950/40 text-teal-200',
}

// Both invalidating subtypes share the same red accent in the analysis block
const ANALYSIS_STYLES: Record<ResponseType, { bg: string; borderLeft: string }> = {
  'invalidating-antagonising': {
    bg: 'rgba(196, 80, 80, 0.08)',
    borderLeft: '3px solid #C45050',
  },
  'invalidating-enabling': {
    bg: 'rgba(196, 80, 80, 0.08)',
    borderLeft: '3px solid #C45050',
  },
  partial: {
    bg: 'rgba(196, 136, 42, 0.06)',
    borderLeft: '3px solid #C4882A',
  },
  validating: {
    bg: 'rgba(61, 107, 101, 0.08)',
    borderLeft: '3px solid #3D6B65',
  },
}

// null = omit qualifier; string = shown in parentheses after the pattern label
const CONFIDENCE_QUALIFIERS: Record<string, string | null> = {
  high: null,
  medium: 'indicative read',
  low: 'preliminary read',
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function InstinctAnalysisBlock({ analysis }: { analysis: AnalysisResult }) {
  const style = ANALYSIS_STYLES[analysis.primaryType]
  const qualifier = CONFIDENCE_QUALIFIERS[analysis.confidence] ?? null
  const displayed = analysis.keywords.slice(0, 3)
  const extra = analysis.keywords.length - displayed.length

  return (
    <div
      className="p-6 rounded-sm space-y-3"
      style={{ backgroundColor: style.bg, borderLeft: style.borderLeft }}
    >
      <p className="font-dm text-xs uppercase tracking-[0.12em] text-ember font-medium">
        Analysis of Your Phase 01 Response
      </p>
      <p className="text-sm text-parchment/80 leading-relaxed">
        Your instinct aligned with the{' '}
        <span className="font-medium text-parchment">
          {RESPONSE_TYPE_LABELS[analysis.primaryType]}
        </span>{' '}
        response pattern
        {qualifier && <span className="text-drift/60"> ({qualifier})</span>}.
      </p>
      {displayed.length > 0 && (
        <p className="text-xs text-drift/70 leading-relaxed">
          Detected clinical language:{' '}
          <span className="text-drift">
            {displayed.join(', ')}
            {extra > 0 && ` +${extra} more`}
          </span>
        </p>
      )}
    </div>
  )
}

function ContrastText({ type }: { type: ResponseType }) {
  const copy: Record<ResponseType, { className: string; text: string }> = {
    'invalidating-antagonising': {
      className: 'text-drift/80',
      text: 'Your instinct moved toward confrontation. The validating response stays in the emotional experience without touching the factual content — preventing defensiveness and keeping the therapeutic relationship intact.',
    },
    'invalidating-enabling': {
      className: 'text-drift/80',
      text: 'Your instinct agreed with the distorted perception. The validating response acknowledges the emotional experience while declining to endorse the belief — the deeper act of respect.',
    },
    partial: {
      className: 'text-drift/80',
      text: 'Your instinct acknowledged the feeling but pivoted too quickly to problem-solving. The validating response establishes safety and therapeutic presence before moving toward assessment.',
    },
    validating: {
      className: 'text-teal-200',
      text: 'Your instinctive response aligned with validation principles. You met the emotional experience, stayed present, and opened toward help.',
    },
  }

  const { className, text } = copy[type]
  return <p className={`${className} leading-relaxed`}>{text}</p>
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PracticeSessionComplete({
  scenario,
  characterId,
  characterName,
  instinctiveResponse,
  instinctAnalysis,
  responseType,
  selectedResponseTier,
  onPlayAnother,
  onReviewHistory,
  onReturnToHome,
}: PracticeSessionCompleteProps) {
  const [commitment, setCommitment] = useState('')
  const [commitmentError, setCommitmentError] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveToJournal = () => {
    if (!commitment.trim()) {
      setCommitmentError(true)
      return
    }

    const entry: PracticeEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: Date.now(),
      characterId,
      characterName,
      scenarioNumber: scenario.scenarioNumber,
      category: scenario.category,
      complexity: scenario.complexity,
      instinctiveResponse,
      instinctAnalysis: instinctAnalysis
        ? {
            primaryType: instinctAnalysis.primaryType,
            confidence: instinctAnalysis.confidence,
            keywords: instinctAnalysis.keywords,
          }
        : undefined,
      responseType,
      behavioralCommitment: commitment,
      completedAt: Date.now(),
    }

    savePracticeEntry(entry)
    setSaved(true)
  }

  return (
    <section className="min-h-screen bg-ground relative overflow-hidden grain-overlay">
      {/* Top bar */}
      <div className="relative z-[10] p-6 md:p-10">
        <ValidLogo size="sm" color="parchment" onHomeClick={onReturnToHome} />
      </div>

      {/* Body */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-4 border-b border-drift/20 pb-8">
            <span className="label-text text-ember">PRACTICE SESSION COMPLETE</span>
            <h1 className="font-cormorant font-semibold text-parchment text-3xl md:text-4xl">
              Response Analysis
            </h1>
            <p className="text-drift/70">
              Scenario {scenario.scenarioNumber} · {scenario.category} · {scenario.complexity}
            </p>
          </div>

          {/* Instinct analysis — only rendered when available */}
          {instinctAnalysis && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.15)}
            >
              <InstinctAnalysisBlock analysis={instinctAnalysis} />
            </motion.div>
          )}

          {/* Response comparison */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Instinctive response */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.2)}
              className="space-y-3 bg-ground border border-drift/20 p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="label-text text-drift/60">YOUR INSTINCTIVE RESPONSE</span>
                <span
                  className={`label-text px-2 py-1 text-xs uppercase tracking-wide rounded ${BADGE_CLASSES[responseType]}`}
                >
                  {RESPONSE_TYPE_LABELS[responseType]}
                </span>
              </div>
              <p className="text-parchment/90 leading-relaxed italic">{instinctiveResponse}</p>
            </motion.div>

            {/* Validating response */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.3)}
              className="space-y-3 bg-teal-950/15 border border-tide/40 p-6"
            >
              <span className="label-text text-tide">VALIDATING RESPONSE</span>
              <p className="text-parchment/90 leading-relaxed italic">{selectedResponseTier.text}</p>
              <div className="pt-3 border-t border-tide/20 space-y-2">
                <p className="text-xs uppercase tracking-wide text-tide/70 font-medium">
                  {selectedResponseTier.mechanism}
                </p>
                <p className="text-xs text-drift/60 leading-relaxed">
                  {selectedResponseTier.clinicalNote}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Clinical contrast */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.4)}
            className="bg-amber-950/10 border border-amber-900/30 p-6 space-y-3"
          >
            <h3 className="font-medium text-parchment uppercase tracking-wide text-sm">
              What the validating response does differently
            </h3>
            <ContrastText type={responseType} />
          </motion.div>

          {/* Behavioural commitment & Reflection Canvas Split Grid */}
          <div className="grid md:grid-cols-12 gap-6 items-stretch">
            
            {/* Commitment Form Box */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.5)}
              className="space-y-4 md:col-span-7 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <label htmlFor="commitment" className="label-text text-ember">
                  BEHAVIORAL COMMITMENT FOR YOUR NEXT ENCOUNTER
                </label>
                <p className="text-xs text-drift/60">
                  What specific change will you carry forward when facing a similar clinical situation?
                </p>
              </div>
              <textarea
                id="commitment"
                value={commitment}
                onChange={(e) => {
                  setCommitment(e.target.value)
                  if (commitmentError && e.target.value.trim()) setCommitmentError(false)
                }}
                placeholder="E.g., 'I will acknowledge the emotional experience first, before moving to safety assessment.' or 'I will resist the urge to correct the belief and instead validate the fear beneath it.'"
                className={`w-full bg-ground border text-parchment placeholder-drift/40 p-4 font-dm text-sm focus:outline-none focus:ring-1 resize-none h-[116px] transition-colors ${
                  commitmentError
                    ? 'border-red-500/60 focus:border-red-400 focus:ring-red-400/30'
                    : 'border-drift/30 focus:border-ember focus:ring-ember'
                }`}
              />
              {commitmentError && (
                <p className="text-xs text-red-400">
                  Please articulate a specific behavioral commitment before saving.
                </p>
              )}
            </motion.div>

            {/* Ambient Reflection Canvas */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={fadeUpTransition(0.55)}
              className="hidden md:flex md:col-span-5 flex-col bg-ground border border-drift/20 p-4 justify-between"
            >
              <div className="overflow-hidden border border-parchment/5 bg-ground/50 flex-1 flex items-center justify-center">
                <img 
                  src={reflectionImage} 
                  alt="Ambient reflection art: The space between knowing and responding" 
                  className="w-full h-full object-cover max-h-[120px] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[8px] tracking-[0.15em] font-dm text-drift/40 uppercase">
                <span>Lived Experience Art</span>
                <span className="text-tide/70">Reflection Anchor</span>
              </div>
            </motion.div>

          </div>

          {/* Actions */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={fadeUpTransition(0.6)}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <button
              onClick={handleSaveToJournal}
              disabled={saved}
              data-cursor-hover
              type="button"
              className="flex-1 bg-tide text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:brightness-110 active:scale-[0.98]"
            >
              {saved ? '✓ Saved to Journal' : 'Save to Practice Journal'}
            </button>

            <button
              onClick={onReviewHistory}
              data-cursor-hover
              type="button"
              className="flex-1 border border-drift/40 text-parchment font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 transition-all duration-200 hover:bg-drift/10 active:scale-[0.98]"
            >
              View History
            </button>

            <button
              onClick={onPlayAnother}
              data-cursor-hover
              type="button"
              className="flex-1 bg-ember text-ground font-dm font-medium text-sm uppercase tracking-[0.14em] px-6 py-3 transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Practice Another
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}