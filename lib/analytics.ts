import { supabase } from './supabase'

export function trackEvent(eventName: string) {
  supabase
    .from('analytics_events')
    .insert([
      {
        event_name: eventName,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      },
    ])
    .then()
}
