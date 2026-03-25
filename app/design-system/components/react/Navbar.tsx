'use client'

import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'
import Button from './Button'

import '../navbar.css'
import '../logo.css'
import '../nav-link.css'
import '../tooltip.css'

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <header className="navbar">
        <a className="logo" href="/" aria-label="k-s design home">
          <span className="logo__letters">
            <span className="logo__k">k</span>
            <span className="logo__dash">-</span>
            <span className="logo__s">s</span>
          </span>
          <span className="logo__suffix">. design</span>
        </a>

        <div className="navbar__right">
          <nav className="navbar__links" aria-label="Main navigation">
            <a className="nav-link" data-text="Work" href="#work">
              <span className="nav-link__label">Work</span>
            </a>

            <a className="nav-link" data-text="About" href="#about">
              <span className="nav-link__label">About</span>
            </a>

            <span className="tooltip-trigger">
              <a className="nav-link" data-text="Resume" href="/ResumeKaylaSadler.pdf" download="ResumeKaylaSadler.pdf">
                <span className="nav-link__label">Resume</span>
              </a>
              <span className="tooltip tooltip--caret-top" role="tooltip">
                <span className="tooltip__text">Downloads as a PDF</span>
                <span className="tooltip__icon">
                  <ArrowDownToLine size={12} />
                </span>
              </span>
            </span>
          </nav>

          <Button iconRight={<ArrowUpRight size={16} />}>Get in touch</Button>
        </div>
      </header>
    </div>
  )
}

