import { useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface CursorState {
  isHovering: boolean
  isPressed: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const LERP_FACTOR = 0.15
const HOVER_SELECTORS = ['[data-cursor-hover]', 'button', 'a', '[role="button"]'].join(',')

// ─── Utilities ────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function isPointerFine(): boolean {
  return window.matchMedia('(pointer: fine)').matches
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<CursorState>({ isHovering: false, isPressed: false })
  const posRef = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 })
  const rafRef = useRef<number>(0)

  // React state only for visibility / initial touch check — not for per-frame updates
  const [visible, setVisible] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>({ isHovering: false, isPressed: false })

  useEffect(() => {
    if (!isPointerFine()) return

    const cursor = cursorRef.current
    if (!cursor) return

    setVisible(true)

    // ── Helpers ──────────────────────────────────────────────────────────────

    const updateState = (next: Partial<CursorState>) => {
      stateRef.current = { ...stateRef.current, ...next }
      setCursorState({ ...stateRef.current })
    }

    const getSize = () => (stateRef.current.isHovering ? 56 : 14)

    // ── Handlers ─────────────────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX
      posRef.current.targetY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTORS)) {
        updateState({ isHovering: true })
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTORS)) {
        updateState({ isHovering: false })
      }
    }

    const onMouseDown = () => updateState({ isPressed: true })
    const onMouseUp   = () => updateState({ isPressed: false })

    // ── RAF loop ─────────────────────────────────────────────────────────────

    const animate = () => {
      const pos = posRef.current
      pos.x = lerp(pos.x, pos.targetX, LERP_FACTOR)
      pos.y = lerp(pos.y, pos.targetY, LERP_FACTOR)

      const half = getSize() / 2
      cursor.style.transform = `translate(${pos.x - half}px, ${pos.y - half}px)`

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
    // No deps — effect runs once; inner state accessed via refs
  }, [])

  if (!visible) return null

  const { isHovering, isPressed } = cursorState
  const size = isHovering ? 56 : 14

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid ${isHovering ? 'var(--tide)' : 'var(--parchment)'}`,
        backgroundColor: 'transparent',
        scale: isPressed ? '0.8' : '1',
        transition: [
          'width var(--duration-medium) ease',
          'height var(--duration-medium) ease',
          'border-color var(--duration-medium) ease',
          'scale 80ms ease',
        ].join(', '),
        willChange: 'transform',
      }}
    />
  )
}