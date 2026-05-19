import { useEffect, useRef, useState } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const LERP_FACTOR    = 0.15
const SIZE_DEFAULT   = 14
const SIZE_HOVERING  = 56
const HOVER_SELECTORS = 'button, a, [role="button"], [data-cursor-hover]'

// ─── Utilities ────────────────────────────────────────────────────────────────

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const isPointerFine = () => window.matchMedia('(pointer: fine)').matches

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null)
  const hovering   = useRef(false)
  const pressed    = useRef(false)
  const pos        = useRef({ x: -100, y: -100, tx: -100, ty: -100 })
  const rafRef     = useRef<number | null>(null)

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!isPointerFine()) return

    const cursor = cursorRef.current
    if (!cursor) return

    // Set transition once — only size, border-color, and transform need it.
    cursor.style.transition = [
      `width   var(--duration-medium, 200ms) ease`,
      `height  var(--duration-medium, 200ms) ease`,
      `border-color var(--duration-medium, 200ms) ease`,
      `transform 80ms ease`,
    ].join(', ')

    setVisible(true)

    // ── Helpers ──────────────────────────────────────────────────────────────

    const applySize = () => {
      const size = hovering.current ? SIZE_HOVERING : SIZE_DEFAULT
      cursor.style.width        = `${size}px`
      cursor.style.height       = `${size}px`
      cursor.style.borderColor  = hovering.current ? 'var(--tide)' : 'var(--parchment)'
    }

    // ── Animation loop ───────────────────────────────────────────────────────

    const animate = () => {
      const p    = pos.current
      p.x        = lerp(p.x, p.tx, LERP_FACTOR)
      p.y        = lerp(p.y, p.ty, LERP_FACTOR)
      const size = hovering.current ? SIZE_HOVERING : SIZE_DEFAULT
      const scale = pressed.current ? 0.8 : 1
      cursor.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px) scale(${scale})`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    // ── Event handlers ───────────────────────────────────────────────────────

    const onMouseMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX
      pos.current.ty = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTORS)) {
        hovering.current = true
        applySize()
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(HOVER_SELECTORS)) {
        hovering.current = false
        applySize()
      }
    }

    const onMouseDown = () => { pressed.current = true  }
    const onMouseUp   = () => { pressed.current = false }

    window.addEventListener('mousemove',   onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout',  onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup',   onMouseUp)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove',   onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup',   onMouseUp)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full"
      style={{
        width:           `${SIZE_DEFAULT}px`,
        height:          `${SIZE_DEFAULT}px`,
        border:          '1px solid var(--parchment)',
        backgroundColor: 'transparent',
        willChange:      'transform',
      }}
    />
  )
}