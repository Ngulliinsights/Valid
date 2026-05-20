import { useCallback, useMemo, useReducer } from 'react'

import LandingSection          from './sections/LandingSection'
import ScenarioSelection       from './sections/ScenarioSelection'
import Phase1Diagnostic        from './sections/Phase1Diagnostic'
import Phase2Response          from './sections/Phase2Response'
import Phase3Reflection        from './sections/Phase3Reflection'
import PracticeSessionComplete from './sections/PracticeSessionComplete'
import PracticeHistory         from './sections/PracticeHistory'

import { analyzeResponseType } from './lib/responseAnalysis'
import type { AnalysisResult } from './lib/responseAnalysis'
import { SCENARIOS } from './data/scenarios'
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

// ─── Phase ────────────────────────────────────────────────────────────────────

export type PracticePhase =
  | 'landing'
  | 'scenario-selection'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'complete'
  | 'history'

// ─── Constants ────────────────────────────────────────────────────────────────

const VERTICAL_KEYS: VerticalKey[]       = ['anxiety', 'depression', 'altered-perception']
const COMPLEXITY_POOL: ComplexityLevel[] = ['Basic', 'Intermediate', 'Advanced', 'Master']

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

// ─── State / Reducer ──────────────────────────────────────────────────────────

interface SessionState {
  phase: PracticePhase
  scenarioSelection: ScenarioSelectionState | null
  instinctText: string
  selectedResponseType: ResponseType | null
  instinctAnalysis: AnalysisResult | null
  reflections: Record<string, string> | null
}

type SessionAction =
  | { type: 'RESET' }
  | { type: 'SET_PHASE'; phase: PracticePhase }
  | { type: 'SET_SCENARIO_SELECTION'; selection: ScenarioSelectionState }
  | { type: 'SET_INSTINCT_TEXT'; text: string }
  | { type: 'SET_RESPONSE_TYPE'; responseType: ResponseType }
  | { type: 'SET_INSTINCT_ANALYSIS'; analysis: AnalysisResult | null }
  | { type: 'SET_REFLECTIONS'; reflections: Record<string, string> | null }

const INITIAL_STATE: SessionState = {
  phase: 'landing',
  scenarioSelection: null,
  instinctText: '',
  selectedResponseType: null,
  instinctAnalysis: null,
  reflections: null,
}

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'RESET':
      return INITIAL_STATE
    case 'SET_PHASE':
      return { ...state, phase: action.phase }
    case 'SET_SCENARIO_SELECTION':
      return { ...state, scenarioSelection: action.selection }
    case 'SET_INSTINCT_TEXT':
      return { ...state, instinctText: action.text }
    case 'SET_RESPONSE_TYPE':
      return { ...state, selectedResponseType: action.responseType }
    case 'SET_INSTINCT_ANALYSIS':
      return { ...state, instinctAnalysis: action.analysis }
    case 'SET_REFLECTIONS':
      return { ...state, reflections: action.reflections }
  }
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [state, dispatch] = useReducer(sessionReducer, INITIAL_STATE)
  const { phase, scenarioSelection, instinctText, selectedResponseType, instinctAnalysis, reflections } = state

  // ── Navigation helpers ──────────────────────────────────────────────────────

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goToPhase = useCallback(
    (next: PracticePhase) => {
      dispatch({ type: 'SET_PHASE', phase: next })
      scrollToTop()
    },
    [scrollToTop],
  )

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
    scrollToTop()
  }, [scrollToTop])

  // ── Phase transition handlers ───────────────────────────────────────────────

  const handleScenarioBegin = useCallback(
    (selection: ScenarioSelectionState) => {
      const resolved: ScenarioSelectionState =
        selection.mode === 'random'
          ? { ...selection, vertical: pick(VERTICAL_KEYS), complexity: pick(COMPLEXITY_POOL) }
          : { ...selection, complexity: selection.complexity ?? pick(COMPLEXITY_POOL) }

      dispatch({ type: 'SET_SCENARIO_SELECTION', selection: resolved })
      goToPhase('phase1')
    },
    [goToPhase],
  )

  const handlePhase1Continue = useCallback(() => {
    dispatch({ type: 'SET_INSTINCT_ANALYSIS', analysis: analyzeResponseType(instinctText) })
    goToPhase('phase2')
  }, [instinctText, goToPhase])

  const handleResponseTypeSelect = useCallback(
    (type: ResponseType) => {
      dispatch({ type: 'SET_RESPONSE_TYPE', responseType: type })
      goToPhase('phase3')
    },
    [goToPhase],
  )

  const handlePhase3Continue = useCallback(
    (refs: Record<string, string>) => {
      dispatch({ type: 'SET_REFLECTIONS', reflections: refs })
      goToPhase('complete')
    },
    [goToPhase],
  )

  const handleGoToHistory = useCallback(() => goToPhase('history'), [goToPhase])
  const handleGoToScenarioSelection = useCallback(() => goToPhase('scenario-selection'), [goToPhase])

  // ── Derived scenario data ───────────────────────────────────────────────────

  const { activeScenario, verticalKey, verticalLabel } = useMemo(() => {
    const vKey   = scenarioSelection?.vertical   ?? 'depression'
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

  // Fallback to 'partial' if the user somehow reaches 'complete' without selecting
  const activeResponseType: ResponseType = selectedResponseType ?? 'partial'

  const selectedResponseTier = useMemo(
    () => activeScenario.responses[RESPONSE_TIER_MAP[activeResponseType]],
    [activeScenario, activeResponseType],
  )

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-ground">
      {phase === 'landing' && (
        <LandingSection onBegin={handleGoToScenarioSelection} />
      )}

      {phase === 'scenario-selection' && (
        <ScenarioSelection
          onBegin={handleScenarioBegin}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'phase1' && (
        <Phase1Diagnostic
          scenario={activeScenario}
          instinctText={instinctText}
          onInstinctChange={(text) => dispatch({ type: 'SET_INSTINCT_TEXT', text })}
          onContinue={handlePhase1Continue}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'phase2' && (
        <Phase2Response
          scenario={activeScenario}
          instinctText={instinctText}
          instinctAnalysis={instinctAnalysis ?? undefined}
          onResponseTypeSelect={handleResponseTypeSelect}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'phase3' && (
        <Phase3Reflection
          scenario={activeScenario}
          onContinue={handlePhase3Continue}
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
          reflections={reflections ?? undefined}
          onPlayAnother={handleReset}
          onReviewHistory={handleGoToHistory}
          onReturnToHome={handleReset}
        />
      )}

      {phase === 'history' && (
        <PracticeHistory onReturn={handleReset} />
      )}
    </div>
  )
}