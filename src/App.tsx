import { useState, useCallback } from 'react'

import LandingSection          from './sections/LandingSection'
import ScenarioSelection       from './sections/ScenarioSelection'
import Phase1Diagnostic        from './sections/Phase1Diagnostic'
import Phase2Response          from './sections/Phase2Response'
import Phase3Reflection        from './sections/Phase3Reflection'
import PracticeSessionComplete from './sections/PracticeSessionComplete'
import PracticeHistory         from './sections/PracticeHistory'
import CustomCursor            from './components/CustomCursor'
import { analyzeResponseType } from './lib/responseAnalysis'
import type { AnalysisResult } from './lib/responseAnalysis'
import type { ScenarioSelection as ScenarioSelectionState } from './sections/ScenarioSelection'

// ─── Types ────────────────────────────────────────────────────────────────────

export type PracticePhase =
  | 'landing'
  | 'scenario-selection'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'complete'
  | 'history'

export type ResponseType =
  | 'invalidating-antagonising'
  | 'invalidating-enabling'
  | 'partial'
  | 'validating'

export interface ResponseTier {
  label:        string
  sublabel:     string
  text:         string
  mechanism:    string
  clinicalNote: string
}

export interface ScenarioData {
  category:           string
  scenarioNumber:     string
  pathway:            string
  complexity:         string
  level:              string
  scenarioText:       string
  responses: {
    tier1: ResponseTier
    tier2: ResponseTier
    tier3: ResponseTier
  }
  reflectionQuestion: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Maps every ResponseType to its corresponding ScenarioData tier.
// Both invalidating subtypes map to tier1 — the distinction is surfaced
// in the analysis block, not in the scenario card architecture.
const RESPONSE_TIER_MAP: Record<ResponseType, keyof ScenarioData['responses']> = {
  'invalidating-antagonising': 'tier1',
  'invalidating-enabling':     'tier1',
  partial:                     'tier2',
  validating:                  'tier3',
}

// Human-readable labels for vertical keys — used as the session identity
// in PracticeEntry until the types/practice schema is updated.
// TODO: replace characterId/characterName in PracticeEntry with vertical/verticalLabel.
const VERTICAL_LABELS: Record<string, string> = {
  'anxiety':            'Anxiety & Spiral Thinking',
  'depression':         'Depression & Withdrawal',
  'altered-perception': 'Altered Perception',
  'random':             'General Practice',
}

// ─── Static scenario data ─────────────────────────────────────────────────────
// TODO: move to src/data/scenarios.ts once multiple scenarios are seeded.

export const SCENARIO_DATA: ScenarioData = {
  category:       'SUICIDAL IDEATION',
  scenarioNumber: '07',
  pathway:        'THERAPIST–CLIENT',
  complexity:     'INTERMEDIATE',
  level:          '2 OF 4',
  scenarioText:
    `A patient you've seen for eight months discloses passive suicidal ideation during a routine medication review. They say: "I just don't see the point in any of it anymore." You have eight minutes remaining in the session.`,
  responses: {
    tier1: {
      label:        'TIER 01 · THE WALL',
      sublabel:     'INVALIDATING — ANTAGONISING',
      text:
        `I need you to be honest with me — are you actually thinking about hurting yourself, or are you just having a bad day? Because we've talked about this before and I thought you were doing better.`,
      mechanism:    'MECHANISM: CONFRONTATION INCREASES ENTRENCHMENT',
      clinicalNote:
        'Direct challenge to altered perception registers as attack. DBT: logical challenge increases defensiveness, not reconsideration.',
    },
    tier2: {
      label:        'TIER 02 · THE BRIDGE',
      sublabel:     'PARTIAL RESPONSE',
      text:
        `It sounds like you're going through something really difficult right now. I'm glad you told me. Can you tell me more about what "not seeing the point" feels like for you?`,
      mechanism:    'MECHANISM: ACKNOWLEDGES, REDIRECTS TO ASSESSMENT',
      clinicalNote:
        'Acknowledges emotional experience but redirects toward problem-solving before safety is established. Better. Not enough.',
    },
    tier3: {
      label:        'TIER 03 · THE REACH',
      sublabel:     'VALIDATING RESPONSE',
      text:
        `That sounds terrifying — to feel like nothing has a point anymore. I'm right here with you. Before we go any further, I need to ask directly: are you safe right now? And I want you to know that whatever you say, we're going to face it together.`,
      mechanism:    'MECHANISM: MEETS, STAYS, OPENS SAFETY DIALOGUE',
      clinicalNote:
        'Meets the emotional experience without touching factual content. Safety assessment framed as care, not interrogation. Opens toward help.',
    },
  },
  reflectionQuestion:
    'How did your instinct compare to the Tier 03 response? What specifically did the validating response do that your instinct did not?',
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [phase,                setPhase]                = useState<PracticePhase>('landing')
  const [scenarioSelection,    setScenarioSelection]    = useState<ScenarioSelectionState | null>(null)
  const [instinctText,         setInstinctText]         = useState('')
  const [selectedResponseType, setSelectedResponseType] = useState<ResponseType | null>(null)
  const [instinctAnalysis,     setInstinctAnalysis]     = useState<AnalysisResult | null>(null)

  // Scroll-reset on every phase transition.
  const goToPhase = useCallback((next: PracticePhase) => {
    setPhase(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Full session reset — shared by "Play again" and "Return to start".
  const handleReset = useCallback(() => {
    setInstinctText('')
    setScenarioSelection(null)
    setSelectedResponseType(null)
    setInstinctAnalysis(null)
    goToPhase('landing')
  }, [goToPhase])

  // Analyse the instinct text once, on leaving Phase 1, so Phase 2 and
  // Phase 3 both receive the same result without re-computing it.
  const handlePhase1Continue = useCallback(() => {
    setInstinctAnalysis(analyzeResponseType(instinctText))
    goToPhase('phase2')
  }, [instinctText, goToPhase])

  // Derive the response tier card from the player's confirmed selection.
  // We require an explicit selection before entering Phase 3; if this is
  // somehow null at the complete screen, fall back defensively to partial
  // rather than indexing with undefined.
  const activeResponseType: ResponseType = selectedResponseType ?? 'partial'
  const selectedResponseTier = SCENARIO_DATA.responses[RESPONSE_TIER_MAP[activeResponseType]]

  // Session identity for PracticeEntry — vertical key + label.
  // TODO: update PracticeEntry type to replace characterId/characterName with vertical/verticalLabel.
  const verticalKey   = scenarioSelection?.vertical ?? 'random'
  const verticalLabel = VERTICAL_LABELS[verticalKey] ?? 'General Practice'

  return (
    <div className="min-h-screen bg-ground">
      <CustomCursor />

      {phase === 'landing' && (
        <LandingSection onBegin={() => goToPhase('scenario-selection')} />
      )}

      {phase === 'scenario-selection' && (
        <ScenarioSelection
          onBegin={(selection) => {
            setScenarioSelection(selection)
            goToPhase('phase1')
          }}
        />
      )}

      {phase === 'phase1' && (
        <Phase1Diagnostic
          scenario={SCENARIO_DATA}
          instinctText={instinctText}
          onInstinctChange={setInstinctText}
          onContinue={handlePhase1Continue}
        />
      )}

      {phase === 'phase2' && (
        <Phase2Response
          scenario={SCENARIO_DATA}
          instinctText={instinctText}
          instinctAnalysis={instinctAnalysis ?? undefined}
          onResponseTypeSelect={(type) => {
            setSelectedResponseType(type)
            goToPhase('phase3')
          }}
        />
      )}

      {phase === 'phase3' && (
        <Phase3Reflection
          scenario={SCENARIO_DATA}
          onContinue={() => goToPhase('complete')}
        />
      )}

      {phase === 'complete' && (
        <PracticeSessionComplete
          scenario={SCENARIO_DATA}
          characterId={verticalKey}
          characterName={verticalLabel}
          instinctiveResponse={instinctText}
          instinctAnalysis={instinctAnalysis}
          responseType={activeResponseType}
          selectedResponseTier={selectedResponseTier}
          onPlayAnother={handleReset}
          onReviewHistory={() => goToPhase('history')}
        />
      )}

      {phase === 'history' && (
        <PracticeHistory onReturn={handleReset} />
      )}
    </div>
  )
}