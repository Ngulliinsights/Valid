import { useCallback, useMemo, useReducer } from 'react'

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

const VERTICAL_KEYS: VerticalKey[]       = ['anxiety', 'depression', 'altered-perception']
const COMPLEXITY_POOL: ComplexityLevel[] = ['Intermediate', 'Advanced']

interface SessionState {
  phase: PracticePhase
  scenarioSelection: ScenarioSelectionState | null
  instinctText: string
  selectedResponseType: ResponseType | null
  instinctAnalysis: AnalysisResult | null
}

type SessionAction =
  | { type: 'reset' }
  | { type: 'setPhase'; phase: PracticePhase }
  | { type: 'setScenarioSelection'; selection: ScenarioSelectionState | null }
  | { type: 'setInstinctText'; text: string }
  | { type: 'setSelectedResponseType'; responseType: ResponseType }
  | { type: 'setInstinctAnalysis'; analysis: AnalysisResult | null }

const initialState: SessionState = {
  phase: 'landing',
  scenarioSelection: null,
  instinctText: '',
  selectedResponseType: null,
  instinctAnalysis: null,
}

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'setPhase':
      return { ...state, phase: action.phase }
    case 'setScenarioSelection':
      return { ...state, scenarioSelection: action.selection }
    case 'setInstinctText':
      return { ...state, instinctText: action.text }
    case 'setSelectedResponseType':
      return { ...state, selectedResponseType: action.responseType }
    case 'setInstinctAnalysis':
      return { ...state, instinctAnalysis: action.analysis }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(sessionReducer, initialState)
  const { phase, scenarioSelection, instinctText, selectedResponseType, instinctAnalysis } = state

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goToPhase = useCallback(
    (next: PracticePhase) => {
      dispatch({ type: 'setPhase', phase: next })
      scrollToTop()
    },
    [scrollToTop],
  )

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' })
    scrollToTop()
  }, [scrollToTop])

  const handlePhase1Continue = useCallback(() => {
    dispatch({ type: 'setInstinctAnalysis', analysis: analyzeResponseType(instinctText) })
    goToPhase('phase2')
  }, [instinctText, goToPhase])

  const { activeScenario, verticalKey, verticalLabel } = useMemo(() => {
    const vKey = scenarioSelection?.vertical ?? 'depression'
    const cLevel = scenarioSelection?.complexity ?? 'Intermediate'
    const complexityKey: 'intermediate' | 'advanced' =
      cLevel === 'Advanced' || cLevel === 'Master' ? 'advanced' : 'intermediate'

    const category = SCENARIOS[vKey] ?? SCENARIOS['depression']
    return {
      activeScenario: category[complexityKey] ?? category['intermediate'],
      verticalKey: vKey,
      verticalLabel: VERTICAL_LABELS[vKey] ?? 'General Practice',
    }
  }, [scenarioSelection])

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
            const finalSelection = { ...selection }
            if (selection.mode === 'random') {
              finalSelection.vertical = VERTICAL_KEYS[Math.floor(Math.random() * VERTICAL_KEYS.length)]
              finalSelection.complexity = COMPLEXITY_POOL[Math.floor(Math.random() * COMPLEXITY_POOL.length)]
            }
            dispatch({ type: 'setScenarioSelection', selection: finalSelection })
            goToPhase('phase1')
          }}
        />
      )}

      {phase === 'phase1' && (
        <Phase1Diagnostic
          scenario={activeScenario}
          instinctText={instinctText}
          onInstinctChange={(text) => dispatch({ type: 'setInstinctText', text })}
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
            dispatch({ type: 'setSelectedResponseType', responseType: type })
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

      {phase === 'history' && <PracticeHistory onReturn={handleReset} />}
    </div>
  )
}