import { motion } from 'framer-motion'
import type { Character } from '../App'
import ValidLogo from '../components/ValidLogo'
import { fadeUp, fadeUpTransition } from '../lib/motion'
import { DialogueStackPattern } from '../components/patterns'

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
    <section className="min-h-screen bg-ground relative overflow-hidden">
      <DialogueStackPattern />
      {/* Top bar */}
      <div className="p-6 md:p-10">
        <ValidLogo size="sm" color="parchment" />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-16 pb-20">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={fadeUpTransition()}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-ember" aria-hidden="true" />
            <span className="label-text text-ember">PHASE 00 · CLINICAL LENS SELECTION</span>
          </div>
          <h2
            className="font-cormorant font-medium text-parchment mb-4 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
          >
            Choose your clinical lens.
          </h2>
          <p className="font-dm text-sm text-drift leading-relaxed max-w-lg">
            Each character provides a professional context and a specific learning edge — shaping how you approach every scenario. The gap you close depends on which lens you bring.
          </p>
        </motion.div>

        {/* Character Cards */}
        <div
          role="radiogroup"
          aria-label="Select a clinical lens"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
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
                transition={fadeUpTransition(0.18 + i * 0.12)}
                data-cursor-hover
                onClick={() => onSelect(character)}
                className="group relative text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                <div
                  className="h-full flex flex-col transition-all duration-300"
                  style={{
                    borderTop:    `1px solid ${isSelected ? 'rgba(196,136,42,0.45)' : 'rgba(154,148,136,0.15)'}`,
                    borderRight:  `1px solid ${isSelected ? 'rgba(196,136,42,0.45)' : 'rgba(154,148,136,0.15)'}`,
                    borderBottom: `1px solid ${isSelected ? 'rgba(196,136,42,0.45)' : 'rgba(154,148,136,0.15)'}`,
                    borderLeft:   `3px solid ${isSelected ? '#C4882A' : 'rgba(196,136,42,0.2)'}`,
                    backgroundColor: isSelected ? 'rgba(196,136,42,0.05)' : '#1C1A18',
                    transform: isSelected ? 'translateY(-4px)' : undefined,
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="h-[2px] w-full transition-all duration-300"
                    style={{ backgroundColor: isSelected ? '#C4882A' : 'rgba(196, 136, 42, 0.25)' }}
                    aria-hidden="true"
                  />

                  {/* Portrait area */}
                  <div
                    className="h-[180px] relative flex items-center justify-center diagonal-hatch-bg"
                    style={{ backgroundColor: 'rgba(26, 24, 20, 0.6)' }}
                  >
                    <span
                      className="font-cormorant font-semibold text-7xl transition-all duration-300"
                      aria-hidden="true"
                      style={{ color: isSelected ? 'rgba(196, 136, 42, 0.2)' : 'rgba(154, 148, 136, 0.12)' }}
                    >
                      {character.initials}
                    </span>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center"
                        style={{ backgroundColor: '#C4882A' }}
                      >
                        <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5" strokeWidth={2} stroke="#1A1814">
                          <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    <h3 className="font-cormorant font-semibold text-xl text-parchment">
                      {character.name}
                    </h3>
                    <p
                      className="label-text transition-colors duration-200"
                      style={{ color: isSelected ? '#C4882A' : '#9A9488' }}
                    >
                      {character.role}
                    </p>
                    <p className="font-dm text-xs text-drift/70 leading-relaxed">
                      {character.context}
                    </p>
                    <div className="mt-auto pt-2">
                      <span
                        className="inline-block px-2.5 py-1 font-dm font-medium text-[9px] uppercase tracking-[0.12em] transition-all duration-200"
                        style={{
                          color: isSelected ? '#C4882A' : '#9A9488',
                          backgroundColor: isSelected ? 'rgba(196, 136, 42, 0.1)' : 'rgba(154, 148, 136, 0.08)',
                        }}
                      >
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
          transition={fadeUpTransition(0.55)}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="font-dm text-xs text-drift/40 leading-relaxed max-w-sm">
            {selectedCharacter
              ? `Continuing as ${selectedCharacter.name} — ${selectedCharacter.role.toLowerCase()}.`
              : 'Select a clinical lens to continue.'}
          </p>

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
              'group inline-flex items-center gap-3 font-dm font-medium text-sm uppercase tracking-[0.14em] px-9 py-4 transition-all duration-200 shrink-0',
              selectedCharacter
                ? 'bg-ember text-ground hover:brightness-110 active:scale-[0.98]'
                : 'text-drift/40 cursor-not-allowed',
            ].join(' ')}
            style={!selectedCharacter ? { border: '1px solid rgba(154, 148, 136, 0.2)', backgroundColor: 'transparent' } : {}}
          >
            CONTINUE
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1.5"
            >
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
