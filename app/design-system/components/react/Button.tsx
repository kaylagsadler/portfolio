 'use client'

import { useState, useRef } from 'react'
import '../button.css'

interface ButtonProps {
  children: React.ReactNode
  iconRight?: React.ReactNode
  onClick?: () => void
  className?: string
  size?: 'small' | 'large'
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, iconRight, onClick, className, size = 'small', variant = 'primary' }: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const bubbleRef = useRef<HTMLSpanElement>(null)
  const [hovered, setHovered] = useState<boolean>(false)

  function getPos(e: React.MouseEvent) {
    const r = btnRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }

  function getSize(x: number, y: number): number {
    const w = btnRef.current!.offsetWidth
    const h = btnRef.current!.offsetHeight
    return Math.max(
      Math.hypot(x, y),
      Math.hypot(w - x, y),
      Math.hypot(x, h - y),
      Math.hypot(w - x, h - y)
    ) * 2.1
  }

  function handleEnter(e: React.MouseEvent) {
    const p = getPos(e)
    const size = getSize(p.x, p.y)
    bubbleRef.current!.style.width  = size + 'px'
    bubbleRef.current!.style.height = size + 'px'
    bubbleRef.current!.style.left   = p.x + 'px'
    bubbleRef.current!.style.top    = p.y + 'px'
    setHovered(true)
  }

  function handleLeave(e: React.MouseEvent) {
    const p = getPos(e)
    bubbleRef.current!.style.left = p.x + 'px'
    bubbleRef.current!.style.top  = p.y + 'px'
    setHovered(false)
  }

  const hasBubble = variant === 'primary'

  return (
    <button
      ref={btnRef}
      className={`button button-${variant} button-${size} ${hasBubble && hovered ? 'button--hovered' : ''} ${className ?? ''}`}
      onMouseEnter={hasBubble ? handleEnter : undefined}
      onMouseLeave={hasBubble ? handleLeave : undefined}
      onClick={onClick}
    >
      {hasBubble && <span ref={bubbleRef} className="button__bubble" />}
      <span className={`button__text button-${size}-default__label`}>
        {children}
      </span>
      {iconRight && (
        <span className={`button-${size}-default__icon`}>
          {iconRight}
        </span>
      )}
    </button>
  )
}
