import { motion } from 'framer-motion'
import type { Character } from '../App'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition } from '../lib/motion'

interface CharacterSelectionProps {
  characters: Character[]
  selectedCharacter: Character | null
  onSelect: (character: Character) => void
  onContinue: () => void
}

export default function CharacterSelection({
  characters,
  selectedCharacter,
  onSelect,
  onContinue,
}: CharacterSelectionProps) {
  return (
    <section className="min-h-screen bg-ground relative">
      {/* Top bar */}
      <div className="p-6 md:p-10">
        <ValidLogo size="sm" color="parchment" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-16 pb-16">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-12"
        >
          <span className="label-text text-tide block mb-4">
            PHASE 00 · CHARACTER SELECTION
          </span>
          <h2 className="font-cormorant font-medium text-parchment text-3xl md:text-4xl mb-4">
            Choose your clinical lens.
          </h2>
          <p className="font-dm text-drift text-base leading-relaxed max-w-lg">
            Each character provides a professional context that shapes how you
            approach every scenario.
          </p>
        </motion.div>

        {/* Character Cards */}
        <div
          role="radiogroup"
          aria-label="Select a character"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {characters.map((character, i) => {
            const isSelected = selectedCharacter?.id === character.id

            return (
              <motion.button
                key={character.id}
                role="radio"
                aria-checked={isSelected}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={fadeUpTransition(0.2 + i * 0.12)}
                data-cursor-hover
                onClick={() => onSelect(character)}
                className={[
                  'group relative text-left transition-all duration-300',
                  isSelected
                    ? 'border-l-[3px] border-l-tide'
                    : 'border-l-[3px] border-l-transparent hover:border-l-tide/60',
                ].join(' ')}
                style={{
                  backgroundColor: isSelected
                    ? 'rgba(61, 107, 101, 0.08)'
                    : 'transparent',
                }}
              >
                {/* Card container */}
                <div
                  className={[
                    'border transition-all duration-300 h-full',
                    isSelected
                      ? 'border-tide/50'
                      : 'border-tide/20 hover:border-tide/40',
                  ].join(' ')}
                  style={{
                    transform: isSelected ? 'translateY(-4px)' : undefined,
                  }}
                >
                  {/* Top accent */}
                  <div className="h-[3px] w-full bg-tide" />

                  {/* Portrait area */}
                  <div className="h-[200px] diagonal-hatch-bg relative flex items-center justify-center bg-ground/50">
                    <span
                      className="font-cormorant font-semibold text-6xl text-tide/20"
                      aria-hidden="true"
                    >
                      {character.initials}
                    </span>

                    {/* Subtle VALID watermark */}
                    <div className="absolute bottom-3 right-3 opacity-10" aria-hidden="true">
                      <svg width="20" height="30" viewBox="0 0 220 148" fill="none">
                        <path
                          d="M 98,10 C 38,38 38,110 98,138"
                          stroke="#F2EDDF"
                          strokeWidth="11"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 122,10 C 182,38 182,110 122,138"
                          stroke="#F2EDDF"
                          strokeWidth="11"
                          strokeLinecap="round"
                        />
                        <circle cx="110" cy="38" r="7" fill="#E8E0D0" />
                        <circle cx="110" cy="74" r="10" fill="#C05A2E" />
                        <circle cx="110" cy="110" r="10" fill="#7A9AAD" />
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="font-cormorant font-semibold text-xl text-parchment">
                      {character.name}
                    </h3>
                    <p className="label-text text-tide">{character.role}</p>
                    <p className="font-dm text-sm text-drift leading-relaxed">
                      {character.context}
                    </p>
                    <div className="pt-2">
                      <span className="inline-block bg-tide-pale/20 px-3 py-1.5 font-dm font-medium text-[10px] text-tide uppercase tracking-wider">
                        LEARNING EDGE: {character.learningEdge}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Continue */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition(0.6)}
          className="mt-12 flex justify-end"
        >
          <button
            onClick={onContinue}
            disabled={!selectedCharacter}
            data-cursor-hover
            aria-label={
              selectedCharacter
                ? `Continue as ${selectedCharacter.name}`
                : 'Select a character to continue'
            }
            className={[
              'inline-flex items-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.12em] px-8 py-4 transition-all duration-200',
              selectedCharacter
                ? 'bg-tide text-ground hover:bg-tide-pale'
                : 'bg-transparent text-drift border border-drift/30 cursor-not-allowed',
            ].join(' ')}
          >
            CONTINUE
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}