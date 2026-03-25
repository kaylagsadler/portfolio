'use client'

import { useState, useEffect } from 'react'

export function usePageVisible() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (document.visibilityState === 'visible') {
      setVisible(true)
    } else {
      const handler = () => {
        if (document.visibilityState === 'visible') {
          setVisible(true)
          document.removeEventListener('visibilitychange', handler)
        }
      }
      document.addEventListener('visibilitychange', handler)
      return () => document.removeEventListener('visibilitychange', handler)
    }
  }, [])

  return visible
}
