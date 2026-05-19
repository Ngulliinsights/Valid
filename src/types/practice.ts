/**
 * Practice Journal Types
 * Tracks clinician responses across scenarios for pattern analysis
 */

export interface PracticeEntry {
  id: string
  timestamp: number
  characterId: string
  characterName: string
  scenarioNumber: string
  category: string
  complexity: string
  
  // Phase 1: Clinician's instinctive response
  instinctiveResponse: string
  responseType: 'invalidating-antagonising' | 'invalidating-enabling' | 'partial' | 'validating'
  
  // Phase 3: Behavioral commitment
  behavioralCommitment: string
  
  // Metadata
  completedAt: number
}

export interface PracticePattern {
  totalAttempts: number
  byResponseType: {
    'invalidating-antagonising': number
    'invalidating-enabling': number
    partial: number
    validating: number
  }
  byCategory: Record<string, number>
  byComplexity: Record<string, number>
  strongestCategory: string | null
  developingCategory: string | null
}

export interface CEDocumentation {
  clinicianName: string
  startDate: number
  endDate: number
  totalHours: number
  scenariosPracticed: string[]
  certificateNumber: string
}
