import type { PracticeEntry, PracticePattern } from '../types/practice'

const STORAGE_KEY = 'valid_practice_journal'

// ---------------------------------------------------------------------------
// CE hours per scenario, weighted by clinical complexity
// ---------------------------------------------------------------------------
const CE_HOURS_BY_COMPLEXITY: Record<string, number> = {
  Basic: 0.25,
  Intermediate: 0.30,
  Advanced: 0.40,
  Master: 0.50,
}

// ---------------------------------------------------------------------------
// Persistence helpers
// ---------------------------------------------------------------------------

export function savePracticeEntry(entry: PracticeEntry): void {
  const entries = getPracticeHistory()
  entries.push(entry)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function getPracticeHistory(): PracticeEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? (JSON.parse(data) as PracticeEntry[]) : []
  } catch {
    return []
  }
}

export function getRecentEntries(n: number): PracticeEntry[] {
  return getPracticeHistory().slice(-n)
}

export function deleteEntry(id: string): void {
  const entries = getPracticeHistory().filter((e) => e.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY)
}

// ---------------------------------------------------------------------------
// Computed metrics
// ---------------------------------------------------------------------------

export function generateCEHours(): number {
  return getPracticeHistory().reduce((total, entry) => {
    const hours = CE_HOURS_BY_COMPLEXITY[entry.complexity] ?? 0.25
    return total + hours
  }, 0)
}

export function calculateValidatingResponseRate(): number {
  const entries = getPracticeHistory()
  if (entries.length === 0) return 0
  const validating = entries.filter((e) => e.responseType === 'validating').length
  return Math.round((validating / entries.length) * 100)
}

// ---------------------------------------------------------------------------
// Pattern analysis
// ---------------------------------------------------------------------------

export function calculatePracticePattern(): PracticePattern {
  const entries = getPracticeHistory()

  const pattern: PracticePattern = {
    totalAttempts: entries.length,
    byResponseType: {
      'invalidating-antagonising': 0,
      'invalidating-enabling': 0,
      partial: 0,
      validating: 0,
    },
    byCategory: {},
    byComplexity: {},
    strongestCategory: null,
    developingCategory: null,
  }

  // Accumulate raw counts
  entries.forEach((entry) => {
    pattern.byResponseType[entry.responseType]++
    pattern.byCategory[entry.category] = (pattern.byCategory[entry.category] ?? 0) + 1
    pattern.byComplexity[entry.complexity] = (pattern.byComplexity[entry.complexity] ?? 0) + 1
  })

  // Identify strongest / developing categories by validating-response rate
  // Require at least 2 attempts in a category before drawing conclusions
  const MIN_ATTEMPTS = 2

  type CategoryStat = { category: string; rate: number }

  const categoryStats: CategoryStat[] = Object.keys(pattern.byCategory)
    .filter((cat) => (pattern.byCategory[cat] ?? 0) >= MIN_ATTEMPTS)
    .map((cat) => {
      const total = pattern.byCategory[cat] ?? 0
      const validCount = entries.filter(
        (e) => e.category === cat && e.responseType === 'validating',
      ).length
      return { category: cat, rate: validCount / total }
    })
    .sort((a, b) => b.rate - a.rate)

  if (categoryStats.length > 0) {
    pattern.strongestCategory = categoryStats[0].category
    pattern.developingCategory = categoryStats[categoryStats.length - 1].category
  }

  return pattern
}