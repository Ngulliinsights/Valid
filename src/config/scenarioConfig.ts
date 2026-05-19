export type VerticalKey = 'anxiety' | 'depression' | 'altered-perception'
export type ComplexityLevel = 'Basic' | 'Intermediate' | 'Advanced' | 'Master'

export interface ScenarioSelection {
  mode: 'random' | 'targeted'
  vertical?: VerticalKey
  complexity?: ComplexityLevel
}

export interface VerticalConfig {
  key: VerticalKey
  register: string
  label: string
  description: string
  clinicalNote: string
  accentColor: string
  tagBg: string
  scenarioCount: number
}

export const VERTICALS: VerticalConfig[] = [
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

export const COMPLEXITY_LEVELS: { level: ComplexityLevel; description: string }[] = [
  { level: 'Basic',        description: 'Single emotion · clear context · low ambiguity' },
  { level: 'Intermediate', description: 'Comorbid presentations · competing demands' },
  { level: 'Advanced',     description: 'Safety risk · treatment resistance · rupture' },
  { level: 'Master',       description: 'Multi-system complexity · institutional pressure' },
]

export function buildSessionSummary(
  vertical: VerticalKey,
  complexity: ComplexityLevel | null,
): string {
  const config = VERTICALS.find((v) => v.key === vertical)!
  return complexity
    ? `${config.label} · ${complexity} complexity.`
    : `${config.label} · all complexity levels.`
}

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

export const RESPONSE_TIER_MAP: Record<ResponseType, keyof ScenarioData['responses']> = {
  'invalidating-antagonising': 'tier1',
  'invalidating-enabling':     'tier1',
  partial:                     'tier2',
  validating:                  'tier3',
}

export const VERTICAL_LABELS: Record<string, string> = {
  'anxiety':            'Anxiety & Spiral Thinking',
  'depression':         'Depression & Withdrawal',
  'altered-perception': 'Altered Perception',
  'random':             'General Practice',
}

