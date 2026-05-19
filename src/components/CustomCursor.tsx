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
  const rafRef = useRef<number | null>(null)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isPointerFine()) return

    const cursor = cursorRef.current
    if (!cursor) return

    setVisible(true)

    const getSize = () => (stateRef.current.isHovering ? 56 : 14)
    const getScale = () => (stateRef.current.isPressed ? 0.8 : 1)
    const getBorderColor = () => (stateRef.current.isHovering ? 'var(--tide)' : 'var(--parchment)')

    const updateCursorAppearance = () => {
      const size = getSize()
      const scale = getScale()

      cursor.style.width = `${size}px`
      cursor.style.height = `${size}px`
      cursor.style.borderColor = getBorderColor()
      cursor.style.transition = [
        'width var(--duration-medium) ease',
        'height var(--duration-medium) ease',
        'border-color var(--duration-medium) ease',
        'transform 80ms ease',
      ].join(', ')
      cursor.style.willChange = 'transform'
      cursor.style.transform = `translate(${posRef.current.x - size / 2}px, ${posRef.current.y - size / 2}px) scale(${scale})`
    }

    const onMouseMove = (event: MouseEvent) => {
      posRef.current.targetX = event.clientX
      posRef.current.targetY = event.clientY
    }

    const onMouseOver = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(HOVER_SELECTORS)) {
        stateRef.current.isHovering = true
        updateCursorAppearance()
      }
    }

    const onMouseOut = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(HOVER_SELECTORS)) {
        stateRef.current.isHovering = false
        updateCursorAppearance()
      }
    }

    const onMouseDown = () => {
      stateRef.current.isPressed = true
      updateCursorAppearance()
    }

    const onMouseUp = () => {
      stateRef.current.isPressed = false
      updateCursorAppearance()
    }

    const animate = () => {
      const pos = posRef.current
      pos.x = lerp(pos.x, pos.targetX, LERP_FACTOR)
      pos.y = lerp(pos.y, pos.targetY, LERP_FACTOR)

      const size = getSize()
      const scale = getScale()
      cursor.style.transform = `translate(${pos.x - size / 2}px, ${pos.y - size / 2}px) scale(${scale})`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: '1px solid var(--parchment)',
        backgroundColor: 'transparent',
      }}
    />
  )
}