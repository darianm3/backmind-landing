'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function TrackThankYouView() {
  useEffect(() => {
    trackEvent('thank_you_view')
  }, [])

  return null
}
