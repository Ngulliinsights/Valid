import { useState, useCallback } from 'react'

import LandingSection     from './sections/LandingSection'
import CharacterSelection from './sections/CharacterSelection'
import Phase1Diagnostic   from './sections/Phase1Diagnostic'
import Phase2Response     from './sections/Phase2Response'
import Phase3Reflection   from './sections/Phase3Reflection'
import SessionComplete    from './sections/SessionComplete'
import CustomCursor       from './components/CustomCursor'

// ─── Types ────────────────────────────────────────────────────────────────────
// Move to `src/types.ts` once the surface grows beyond a single scenario.

export type GamePhase =
  | 'landing'
  | 'character'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'complete'

export interface Character {
  id:           string
  name:         string
  role:         string
  context:      string
  learningEdge: string
  initials:     string
}

export interface ResponseTier {
  label:        string
  sublabel:     string
  text:         string
  mechanism:    string
  clinicalNote: string
}

export interface ScenarioData {
  category:       string
  scenarioNumber: string
  pathway:        string
  complexity:     string
  level:          string
  scenarioText:   string
  responses: {
    tier1: ResponseTier
    tier2: ResponseTier
    tier3: ResponseTier
  }
  reflectionQuestion: string
}

export interface ScoreData {
  therapeuticResponse: number
  relationalClinical:  number
  culturalAwareness:   number
  safetyAssessment:    number
  total:               number
  milestone:           string | null
}

// ─── Static data ──────────────────────────────────────────────────────────────
// TODO: extract to `src/data/characters.ts` and `src/data/scenarios.ts`
// once multiple scenarios are added so App stays free of domain data.

export const CHARACTERS: Character[] = [
  {
    id:           'chen',
    name:         'Dr. Sarah Chen',
    role:         'CLINICAL PSYCHOLOGIST',
    context:      'Outpatient practice, 12 years. Anxiety and depression specializations.',
    learningEdge: 'SAFETY ASSESSMENT',
    initials:     'SC',
  },
  {
    id:           'rivera',
    name:         'Marcus Rivera',
    role:         'PSYCHIATRIC NURSE PRACTITIONER',
    context:      'Emergency and inpatient settings. Crisis stabilization focus.',
    learningEdge: 'THERAPEUTIC ALLIANCE UNDER PRESSURE',
    initials:     'MR',
  },
  {
    id:           'osei',
    name:         'Dr. Amara Osei',
    role:         'LICENSED CLINICAL SOCIAL WORKER',
    context:      'Community mental health, family systems. Trauma-informed care specialist.',
    learningEdge: 'CULTURAL RESPONSIVENESS',
    initials:     'AO',
  },
]

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

export const SCORE_DATA: ScoreData = {
  therapeuticResponse: 85,
  relationalClinical:  78,
  culturalAwareness:   72,
  safetyAssessment:    90,
  total:               81,
  milestone:           'INSTINCT UPDATED',
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [phase,             setPhase]             = useState<GamePhase>('landing')
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [instinctText,      setInstinctText]      = useState('')

  // Scroll-reset on every phase transition.
  const goToPhase = useCallback((next: GamePhase) => {
    setPhase(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Full session reset — shared by "Play again" and "Return to start".
  const handleReset = useCallback(() => {
    setInstinctText('')
    setSelectedCharacter(null)
    goToPhase('landing')
  }, [goToPhase])

  return (
    // bg-ground is defined in globals.css — one shade deeper than
    // --background, creating a recessed stage for raised card surfaces.
    <div className="min-h-screen bg-ground">
      <CustomCursor />

      {phase === 'landing' && (
        <LandingSection onBegin={() => goToPhase('character')} />
      )}

      {phase === 'character' && (
        <CharacterSelection
          characters={CHARACTERS}
          selectedCharacter={selectedCharacter}
          onSelect={setSelectedCharacter}
          onContinue={() => goToPhase('phase1')}
        />
      )}

      {phase === 'phase1' && (
        <Phase1Diagnostic
          scenario={SCENARIO_DATA}
          instinctText={instinctText}
          onInstinctChange={setInstinctText}
          onContinue={() => goToPhase('phase2')}
        />
      )}

      {phase === 'phase2' && (
        <Phase2Response
          scenario={SCENARIO_DATA}
          instinctText={instinctText}
          onContinue={() => goToPhase('phase3')}
        />
      )}

      {phase === 'phase3' && (
        <Phase3Reflection
          scenario={SCENARIO_DATA}
          score={SCORE_DATA}
          onContinue={() => goToPhase('complete')}
        />
      )}

      {phase === 'complete' && (
        <SessionComplete
          onPlayAgain={handleReset}
          onReturn={handleReset}
        />
      )}
    </div>
  )
}