'use client'

import { useEffect, useRef, useState } from 'react'
import styles from '../logo-mark.module.css'

const PATH = 'M 14 10 L 34 10 Q 38 10 38 14 L 38 34 Q 38 38 34 38 L 14 38 Q 10 38 10 34 L 10 14 Q 10 10 14 10 Z'
const FILL_MAIN = 'var(--color-gray-900)'
const FILL_ACCENT = 'var(--color-teal-500)'

type Effect = {
  name: string
  render: (layer: SVGGElement, injectStyle: (css: string) => void) => void
}

function svgEl<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Record<string, string>
): SVGElementTagNameMap[K] {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

const SEQUENCE: Effect[] = [
  {
    name: 'offset duplicate',
    render(layer, injectStyle) {
      const ghost = svgEl('path', { d: PATH, opacity: '0' })
      const main  = svgEl('path', { d: PATH })
      ghost.style.fill = FILL_MAIN
      main.style.fill = FILL_MAIN
      layer.appendChild(ghost)
      layer.appendChild(main)
      injectStyle(`
        @keyframes _lm_shift { 0%{transform:translate(0,0)} 100%{transform:translate(-4px,-4px)} }
        @keyframes _lm_ghost { 0%{opacity:0;transform:translate(0,0)} 100%{opacity:0.37;transform:translate(4px,4px)} }
      `)
      main.style.cssText  += ';transform-box:fill-box;animation:_lm_shift 0.35s ease forwards'
      ghost.style.cssText += ';transform-box:fill-box;animation:_lm_ghost 0.35s ease forwards'
    },
  },
  {
    name: 'corner dots',
    render(layer, injectStyle) {
      injectStyle(`
        @keyframes _lm_cpop {
          0%  { transform:scale(0); opacity:0 }
          60% { transform:scale(1.3); opacity:1 }
          100%{ transform:scale(1); opacity:1 }
        }
      `)
      const corners = [
        { cx: '13', cy: '13', delay: '0s' },
        { cx: '35', cy: '13', delay: '0.07s' },
        { cx: '13', cy: '35', delay: '0.14s' },
        { cx: '35', cy: '35', delay: '0.21s' },
      ]
      corners.forEach(c => {
        const dot = svgEl('circle', { cx: c.cx, cy: c.cy, r: '3', opacity: '0' })
        dot.style.fill = FILL_MAIN
        dot.style.cssText = `transform-box:fill-box;transform-origin:${c.cx}px ${c.cy}px;animation:_lm_cpop 0.35s ease ${c.delay} forwards`
        layer.appendChild(dot)
      })
    },
  },
  {
    name: 'quadrant fill',
    render(layer, injectStyle) {
      const clipId = `_lm_qc_${Date.now()}`
      const clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
      clip.id = clipId
      const cp = svgEl('path', { d: PATH })
      clip.appendChild(cp)
      layer.appendChild(clip)
      const outline = svgEl('path', { d: PATH, fill: 'none', 'stroke-width': '1.5', opacity: '0.15' })
      outline.style.stroke = FILL_MAIN
      layer.appendChild(outline)
      injectStyle(`@keyframes _lm_qfade { from{opacity:0} to{opacity:1} }`)
      const quads = [{ x: '10', y: '10' }, { x: '24', y: '10' }, { x: '10', y: '24' }, { x: '24', y: '24' }]
      quads.forEach((q, i) => {
        const r = svgEl('rect', { x: q.x, y: q.y, width: '14', height: '14', 'clip-path': `url(#${clipId})` })
        r.style.fill = FILL_MAIN
        r.style.cssText = `opacity:0;animation:_lm_qfade 0.15s ease ${i * 0.1}s forwards`
        layer.appendChild(r)
      })
    },
  },
  {
    name: 'glitch',
    render(layer, injectStyle) {
      const ghost = svgEl('path', { d: PATH, opacity: '0' })
      const main  = svgEl('path', { d: PATH })
      ghost.style.fill = FILL_ACCENT
      main.style.fill = FILL_MAIN
      layer.appendChild(main)
      layer.appendChild(ghost)
      injectStyle(`
        @keyframes _lm_gl { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-3px,1px)} 40%{transform:translate(2px,-2px)} 60%{transform:translate(-2px,1px)} 80%{transform:translate(2px,0px)} }
        @keyframes _lm_gh { 0%,100%{opacity:0;transform:translate(0,0)} 20%,80%{opacity:0.55} 25%{transform:translate(3px,-1px)} 65%{transform:translate(-2px,2px)} }
      `)
      main.style.cssText  += ';transform-box:fill-box;animation:_lm_gl 0.35s ease infinite'
      ghost.style.cssText += ';transform-box:fill-box;animation:_lm_gh 0.35s ease infinite'
    },
  },
  {
    name: 'morph to circle',
    render(layer, injectStyle) {
      injectStyle(`@keyframes _lm_circ { 0%{rx:4;ry:4} 100%{rx:14;ry:14} }`)
      const r = svgEl('rect', { x: '10', y: '10', width: '28', height: '28', rx: '4', ry: '4' })
      r.style.fill = FILL_MAIN
      r.style.animation = '_lm_circ 0.35s ease forwards'
      layer.appendChild(r)
    },
  },
  {
    name: 'hollow',
    render(layer, injectStyle) {
      const main    = svgEl('path', { d: PATH })
      main.style.fill = FILL_MAIN
      const outline = svgEl('path', { d: PATH, fill: 'none', 'stroke-width': '2', opacity: '0' })
      outline.style.stroke = FILL_MAIN
      layer.appendChild(main)
      layer.appendChild(outline)
      injectStyle(`
        @keyframes _lm_drain  { 0%{opacity:1} 60%,100%{opacity:0} }
        @keyframes _lm_hollow { 0%,30%{opacity:0} 70%,100%{opacity:1} }
      `)
      main.style.animation    = '_lm_drain 0.45s ease forwards'
      outline.style.animation = '_lm_hollow 0.45s ease forwards'
    },
  },
  {
    name: '4 squares',
    render(layer, injectStyle) {
      injectStyle(`
        @keyframes _lm_s0 { 0%,100%{transform:translate(0px,0px)} 50%{transform:translate(-3px,-3px)} }
        @keyframes _lm_s1 { 0%,100%{transform:translate(0px,0px)} 50%{transform:translate(3px,-3px)} }
        @keyframes _lm_s2 { 0%,100%{transform:translate(0px,0px)} 50%{transform:translate(-3px,3px)} }
        @keyframes _lm_s3 { 0%,100%{transform:translate(0px,0px)} 50%{transform:translate(3px,3px)} }
      `)
      const positions = [{ x: 10, y: 10 }, { x: 25, y: 10 }, { x: 10, y: 25 }, { x: 25, y: 25 }]
      positions.forEach((p, i) => {
        const r = svgEl('rect', { x: String(p.x), y: String(p.y), width: '13', height: '13', rx: '3' })
        r.style.fill = FILL_MAIN
        r.style.cssText = `transform-box:fill-box;transform-origin:${p.x + 6}px ${p.y + 6}px;animation:_lm_s${i} 0.5s ease infinite`
        layer.appendChild(r)
      })
    },
  },
  {
    name: 'shake',
    render(layer, injectStyle) {
      injectStyle(`
        @keyframes _lm_shk {
          0%,100%{transform:translate(0px,0px) rotate(0deg)}
          20%{transform:translate(-2px,1px) rotate(-1.5deg)}
          40%{transform:translate(2px,-1px) rotate(1.5deg)}
          60%{transform:translate(-1px,2px) rotate(-0.5deg)}
          80%{transform:translate(1px,-2px) rotate(0.5deg)}
        }
      `)
      const main = svgEl('path', { d: PATH })
      main.style.fill = FILL_MAIN
      main.style.cssText += ';transform-origin:24px 24px;transform-box:fill-box;animation:_lm_shk 0.45s ease infinite'
      layer.appendChild(main)
    },
  },
]

export default function LogoMark({ visible }: { visible?: boolean }) {
  const layerRef   = useRef<SVGGElement>(null)
  const styleRef   = useRef<HTMLStyleElement | null>(null)
  const idxRef     = useRef(0)
  const [started, setStarted] = useState(false)
  const [ready, setReady] = useState(false)

  // inject / clear dynamic keyframe styles
  function injectStyle(css: string) {
    if (styleRef.current) styleRef.current.remove()
    const tag = document.createElement('style')
    tag.textContent = css
    document.head.appendChild(tag)
    styleRef.current = tag
  }

  function clearStyle() {
    if (styleRef.current) { styleRef.current.remove(); styleRef.current = null }
  }

  function drawResting() {
    if (!layerRef.current) return
    layerRef.current.innerHTML = ''
    const p = svgEl('path', { d: PATH })
    p.style.fill = FILL_MAIN
    layerRef.current.appendChild(p)
  }

  useEffect(() => {
    if (visible && !started) setStarted(true)
  }, [visible, started])

  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(t)
  }, [started])

  useEffect(() => {
    if (ready) drawResting()
  }, [ready])

  function handleEnter() {
    if (!ready || !layerRef.current) return
    layerRef.current.innerHTML = ''
    clearStyle()
    SEQUENCE[idxRef.current].render(layerRef.current, injectStyle)
  }

  function handleLeave() {
    if (!ready || !layerRef.current) return
    clearStyle()
    drawResting()
    idxRef.current = (idxRef.current + 1) % SEQUENCE.length
  }

  return (
    <div
      className={styles.logoMark}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label="Home"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 48 48"
        overflow="visible"
        aria-hidden="true"
      >
        {/* intro: fill fades in after stroke draws */}
        {started && !ready && (
          <>
            <path
              className={styles.introFill}
              d={PATH}
              style={{ fill: FILL_MAIN }}
            />
            <path
              className={styles.introStroke}
              d={PATH}
              fill="none"
              style={{ stroke: FILL_MAIN }}
              strokeWidth="2"
              strokeLinecap="butt"
              strokeLinejoin="round"
            />
          </>
        )}
        {/* hover layer — managed imperatively */}
        <g ref={layerRef} />
      </svg>
    </div>
  )
}