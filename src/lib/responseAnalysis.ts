/**
 * Response Type Analysis
 * Analyzes clinician's Phase 1 instinctive response and classifies it
 * across the response spectrum: antagonising → enabling → partial → validating
 */

export type ResponseType = 'invalidating-antagonising' | 'invalidating-enabling' | 'partial' | 'validating'

export interface AnalysisResult {
  primaryType: ResponseType
  confidence: 'high' | 'moderate' | 'low'
  keywords: string[]
  scores: Record<ResponseType, number>
}

// Clinical language patterns for each response type
const PATTERN_KEYWORDS: Record<ResponseType, string[]> = {
  'invalidating-antagonising': [
    'why',
    'should',
    'need to',
    'have to',
    'must',
    'just',
    'stop',
    'settle down',
    'calm down',
    'get over',
    'move on',
    'pull yourself together',
    'be stronger',
    'toughen up',
    'deal with it',
    'face reality',
  ],
  'invalidating-enabling': [
    'of course',
    "you're right",
    'i agree',
    "that's valid",
    'makes sense',
    'absolutely',
    'i understand why',
    "it's okay to",
    'you should',
    'go ahead',
  ],
  partial: [
    'but',
    'however',
    'though',
    'understand your feelings',
    'that makes sense, but',
    "your feelings are valid, but",
    'i hear you, but',
    "that's understandable",
    'i see what you mean',
    'i get it',
  ],
  validating: [
    'stay',
    'here',
    'with you',
    'present',
    'feel',
    'safe',
    'supported',
    'what comes next',
    'help',
    'can we',
    "let's",
    'together',
    'not alone',
    "i'm here",
    'open to',
    'explore',
  ],
}

/**
 * Analyzes instinct text and classifies response type
 * @param text - The clinician's Phase 1 instinctive response
 * @returns Analysis result with primary type and confidence level
 */
export function analyzeResponseType(text: string): AnalysisResult {
  if (!text || text.trim().length === 0) {
    return {
      primaryType: 'partial',
      confidence: 'low',
      keywords: [],
      scores: {
        'invalidating-antagonising': 0,
        'invalidating-enabling': 0,
        partial: 0.3,
        validating: 0.2,
      },
    }
  }

  const lowerText = text.toLowerCase()
  const scores: Record<ResponseType, number> = {
    'invalidating-antagonising': 0,
    'invalidating-enabling': 0,
    partial: 0,
    validating: 0,
  }

  const matchedKeywords: string[] = []

  // Score based on keyword matches
  Object.entries(PATTERN_KEYWORDS).forEach(([responseType, keywords]) => {
    keywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        scores[responseType as ResponseType] += 1
        if (!matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword)
        }
      }
    })
  })

  // Normalize scores by pattern count to account for different pattern set sizes
  Object.keys(scores).forEach((type) => {
    const patternCount = PATTERN_KEYWORDS[type as ResponseType].length
    scores[type as ResponseType] = scores[type as ResponseType] / patternCount
  })

  // Determine primary type (highest score)
  const primaryType = (
    Object.entries(scores).reduce((prev, current) =>
      current[1] > prev[1] ? current : prev,
    )[0] as ResponseType
  ) || 'partial'

  // Determine confidence based on score distribution
  const maxScore = Math.max(...Object.values(scores))
  const secondMaxScore = Math.max(
    ...Object.values(scores).filter((s) => s !== maxScore),
  )
  const scoreGap = maxScore - secondMaxScore

  let confidence: 'high' | 'moderate' | 'low' = 'low'
  if (scoreGap > 0.3) {
    confidence = 'high'
  } else if (scoreGap > 0.1) {
    confidence = 'moderate'
  }

  return {
    primaryType,
    confidence,
    keywords: matchedKeywords,
    scores,
  }
}
