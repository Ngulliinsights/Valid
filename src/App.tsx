import { useState, useCallback, useMemo } from 'react'

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
import { SCENARIOS } from './data/scenarios'

// Centralized configurations, types, and mappings
import { RESPONSE_TIER_MAP, VERTICAL_LABELS } from './config/scenarioConfig'
import type {
  ScenarioSelection as ScenarioSelectionState,
  ResponseType,
  ScenarioData,
  ResponseTier,
  VerticalKey,
  ComplexityLevel,
} from './config/scenarioConfig'
export type { ScenarioData, ResponseTier }

export type PracticePhase =
  | 'landing'
  | 'scenario-selection'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'complete'
  | 'history'

// ─── App ──────────────────────────────────────────────────────────────────────

const VERTICAL_KEYS: VerticalKey[]     = ['anxiety', 'depression', 'altered-perception']
const COMPLEXITY_POOL: ComplexityLevel[] = ['Intermediate', 'Advanced']

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

  // Derive scenario data from the current selection. Memoised so these
  // lookups don't re-run on every unrelated state update.
  const { activeScenario, verticalKey, verticalLabel } = useMemo(() => {
    const vKey  = scenarioSelection?.vertical   ?? 'depression'
    const cLevel = scenarioSelection?.complexity ?? 'Intermediate'
    const complexityKey: 'intermediate' | 'advanced' =
      cLevel === 'Advanced' || cLevel === 'Master' ? 'advanced' : 'intermediate'

    const category = SCENARIOS[vKey] ?? SCENARIOS['depression']
    return {
      activeScenario: category[complexityKey] ?? category['intermediate'],
      verticalKey:    vKey,
      verticalLabel:  VERTICAL_LABELS[vKey] ?? 'General Practice',
    }
  }, [scenarioSelection])

  // Derive the response tier card from the player's confirmed selection.
  const activeResponseType: ResponseType = selectedResponseType ?? 'partial'
  const selectedResponseTier = useMemo(
    () => activeScenario.responses[RESPONSE_TIER_MAP[activeResponseType]],
    [activeScenario, activeResponseType],
  )

  return (
    <div className="min-h-screen bg-ground">
      <CustomCursor />

      {phase === 'landing' && (
        <LandingSection onBegin={() => goToPhase('scenario-selection')} />
      )}

      {phase === 'scenario-selection' && (
        <ScenarioSelection
          onReturnToHome={handleReset}
          onBegin={(selection) => {
            let finalSelection = { ...selection }
            if (selection.mode === 'random') {
              finalSelection.vertical   = VERTICAL_KEYS[Math.floor(Math.random() * VERTICAL_KEYS.length)]
              finalSelection.complexity = COMPLEXITY_POOL[Math.floor(Math.random() * COMPLEXITY_POOL.length)]
            }
            setScenarioSelection(finalSelection)
            goToPhase('phase1')
          }}
        />
      )}

      {phase === 'phase1' && (
        <Phase1Diagnostic
          scenario={activeScenario}
          instinctText={instinctText}
          onInstinctChange={setInstinctText}
          onContinue={handlePhase1Continue}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'phase2' && (
        <Phase2Response
          scenario={activeScenario}
          instinctText={instinctText}
          instinctAnalysis={instinctAnalysis ?? undefined}
          onResponseTypeSelect={(type) => {
            setSelectedResponseType(type)
            goToPhase('phase3')
          }}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'phase3' && (
        <Phase3Reflection
          scenario={activeScenario}
          onContinue={() => goToPhase('complete')}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'complete' && (
        <PracticeSessionComplete
          scenario={activeScenario}
          characterId={verticalKey}
          characterName={verticalLabel}
          instinctiveResponse={instinctText}
          instinctAnalysis={instinctAnalysis}
          responseType={activeResponseType}
          selectedResponseTier={selectedResponseTier}
          onPlayAnother={handleReset}
          onReviewHistory={() => goToPhase('history')}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'history' && (
        <PracticeHistory onReturn={handleReset} />
      )}
    </div>
  )
}