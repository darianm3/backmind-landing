'use client'

import { useState, useEffect, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Outer arc (backmind) - 3/4 circle from top */}
      <path d="M 50 12 A 38 38 0 1 1 12 50" fill="none" stroke="#2D4A6A" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="50" cy="12" r="7" fill="#2D4A6A"/>
      {/* Inner arc (conscious) - 3/4 circle from bottom */}
      <path d="M 50 76 A 26 26 0 1 1 76 50" fill="none" stroke="#4F7CAC" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="50" cy="76" r="7" fill="#4F7CAC"/>
      {/* Core */}
      <circle cx="50" cy="50" r="11" fill="#E8F0F8"/>
    </svg>
  )
}

function MicIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError('')

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("You're already on the list!")
        } else {
          setError('Something went wrong. Try again.')
        }
      } else {
        setSuccess(true)
        setEmail('')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="container">
          <a href="#" className="logo">
            <LogoMark size={32} className="logo-mark" />
            <span className="logo-wordmark">
              <span className="back">Back</span>
              <span className="mind">mind</span>
            </span>
          </a>
          <button className="nav-cta" onClick={scrollToWaitlist}>
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-content">
          <span className="hero-label">Identity-Based Growth</span>
          <h1>Your guide,<br />not your judge.</h1>
          <p className="hero-subtitle">
            The mind in the background helping you remember all the identities
            you&apos;re building — not just the goal you&apos;re focused on today.
          </p>
          <div className="hero-buttons">
            <button className="hero-cta-primary" onClick={scrollToWaitlist}>
              Join the Waitlist
              <span>→</span>
            </button>
            <a href="#how-it-works" className="hero-cta-secondary">
              See how it works
              <span className="arrow">↓</span>
            </a>
          </div>
        </div>
        <div className="hero-phone">
          <div className="phone-mockup-hero">
            <div className="phone-screen-hero">
              <div className="dynamic-island-hero" />
              <div className="app-header-hero">
                <div className="logo-container-hero">
                  <LogoMark size={28} className="logo-mark-hero" />
                  <span className="wordmark-hero">
                    <span className="wbh">Back</span>
                    <span className="wmh">mind</span>
                  </span>
                </div>
                <svg className="settings-icon-hero" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                </svg>
              </div>
              <div className="section-label-hero">Your Identities</div>
              <div className="identities-scroll-wrapper">
                <div className="identities-scroll-content">
                  <div className="identity-card-hero on-track">
                    <div className="id-header-hero">
                      <span className="id-emoji-hero">🏃</span>
                      <span className="id-name-hero">Runner</span>
                      <span className="id-status-hero status-green-hero">On Track</span>
                    </div>
                    <div className="habit-row-hero">
                      <span className="habit-name-hero">Morning run</span>
                      <div className="habit-bar-hero"><div className="habit-fill-hero green" style={{ width: '71%' }} /></div>
                      <span className="habit-count-hero">5/7</span>
                    </div>
                    <div className="habit-row-hero">
                      <span className="habit-name-hero">Stretch</span>
                      <div className="habit-bar-hero"><div className="habit-fill-hero green" style={{ width: '86%' }} /></div>
                      <span className="habit-count-hero">6/7</span>
                    </div>
                  </div>

                  <div className="identity-card-hero ahead">
                    <div className="id-header-hero">
                      <span className="id-emoji-hero">📚</span>
                      <span className="id-name-hero">Reader</span>
                      <span className="id-status-hero status-teal-hero">Ahead</span>
                    </div>
                    <div className="habit-row-hero">
                      <span className="habit-name-hero">Read 30 min</span>
                      <div className="habit-bar-hero"><div className="habit-fill-hero teal" style={{ width: '100%' }} /></div>
                      <span className="habit-count-hero">7/7</span>
                    </div>
                  </div>

                  <div className="identity-card-hero recoverable">
                    <div className="id-header-hero">
                      <span className="id-emoji-hero">🎸</span>
                      <span className="id-name-hero">Musician</span>
                      <span className="id-status-hero status-amber-hero">Recoverable</span>
                    </div>
                    <div className="habit-row-hero">
                      <span className="habit-name-hero">Practice</span>
                      <div className="habit-bar-hero"><div className="habit-fill-hero amber" style={{ width: '29%' }} /></div>
                      <span className="habit-count-hero">2/7</span>
                    </div>
                  </div>

                  <div className="identity-card-hero on-track">
                    <div className="id-header-hero">
                      <span className="id-emoji-hero">✍️</span>
                      <span className="id-name-hero">Writer</span>
                      <span className="id-status-hero status-green-hero">On Track</span>
                    </div>
                    <div className="habit-row-hero">
                      <span className="habit-name-hero">Journal</span>
                      <div className="habit-bar-hero"><div className="habit-fill-hero green" style={{ width: '57%' }} /></div>
                      <span className="habit-count-hero">4/7</span>
                    </div>
                  </div>

                  <div className="identity-card-hero ahead">
                    <div className="id-header-hero">
                      <span className="id-emoji-hero">🧘</span>
                      <span className="id-name-hero">Meditator</span>
                      <span className="id-status-hero status-teal-hero">Ahead</span>
                    </div>
                    <div className="habit-row-hero">
                      <span className="habit-name-hero">Meditate</span>
                      <div className="habit-bar-hero"><div className="habit-fill-hero teal" style={{ width: '86%' }} /></div>
                      <span className="habit-count-hero">6/7</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="voice-orb-hero">
                <MicIcon size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1 — THE PROBLEM */}
      <section className="dark" id="how-it-works">
        <div className="container">
          <div className="section-number">01 — The Problem</div>
          <h2>You&apos;re not lazy.<br />You&apos;re stretched across too many selves.</h2>
          <p>
            You want to be a runner, a reader, a better partner, a creative.
            But every habit app treats you like you only have <span className="highlight">one goal</span>.
          </p>
          <ul className="problem-list">
            <li>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>
              <div className="text">
                <strong>Goal apps fragment you.</strong> One app for fitness, another for reading, another for meditation. None see the whole picture.
              </div>
            </li>
            <li>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </div>
              <div className="text">
                <strong>Streaks punish bad days.</strong> Miss one day and your 47-day streak is gone. Now you feel worse than before you started.
              </div>
            </li>
            <li>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 15s1.5-2 4-2 4 2 4 2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <div className="text">
                <strong>No app knows how you actually feel.</strong> You check boxes, but nobody asks what kind of day you&apos;re having.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 2 — THE INSIGHT */}
      <section>
        <div className="container">
          <div className="section-number">02 — The Insight</div>
          <h2>You don&apos;t rise to the level of your goals. You fall to the level of your systems.</h2>
          <div className="two-col">
            <div className="col bad">
              <h3>Goal-Based</h3>
              <p>&ldquo;I want to run a marathon.&rdquo; — Focused on outcomes. Easy to abandon when life gets hard.</p>
            </div>
            <div className="col good">
              <h3>Identity-Based</h3>
              <p>&ldquo;I&apos;m becoming a runner.&rdquo; — Focused on who you&apos;re becoming. Every small action is a vote for that identity.</p>
            </div>
          </div>
          <p className="big-quote">
            Backmind doesn&apos;t track your goals.<br />
            It tracks <em>who you&apos;re becoming</em>.
          </p>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="dark">
        <div className="container">
          <div className="section-number">03 — How It Works</div>
          <h2>Talk to it like a friend.<br />It remembers like a system.</h2>
          <p>
            No forms. No checkboxes. Just tell Backmind about your day
            and it figures out which identities you showed up for.
          </p>
          <ul className="problem-list">
            <li>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </div>
              <div className="text">
                <strong>Voice-first logging.</strong> Just talk. &ldquo;I ran this morning and read for 20 minutes.&rdquo; Backmind maps it to your identities automatically.
              </div>
            </li>
            <li>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="text">
                <strong>Gentle nudges, not guilt trips.</strong> If your Musician identity is slipping, Backmind says &ldquo;Your guitar misses you&rdquo; — not &ldquo;You failed.&rdquo;
              </div>
            </li>
            <li>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div className="text">
                <strong>Bad day mode.</strong> Having a rough day? Backmind lowers the bar and reminds you that rest is part of the process.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* PRODUCT SECTION */}
      <div className="product-section" id="product">
        <div className="container wide">
          <div className="section-number">04 — The Product</div>
          <h2>Meet Backmind</h2>
          <p className="product-tagline">A quiet companion for the person you&apos;re becoming.</p>
          <p className="product-bridge">
            Three core screens. No clutter. Just the information you need
            to stay connected to every version of yourself.
          </p>

          <div className="screenshots-grid">
            {/* Screen 1: Dashboard */}
            <div className="screenshot-item">
              <div className="phone-mockup-ss">
                <div className="phone-screen-ss">
                  <div className="dynamic-island" />
                  <div className="app-header-ss">
                    <div className="logo-container-ss">
                      <LogoMark size={22} className="logo-mark-ss" />
                      <span className="wordmark-ss">
                        <span className="wb">Back</span>
                        <span className="wm">mind</span>
                      </span>
                    </div>
                  </div>
                  <div className="section-label-ss">Your Identities</div>

                  <div className="identity-card-ss on-track">
                    <div className="id-header-ss">
                      <span className="id-emoji">🏃</span>
                      <span className="id-name">Runner</span>
                      <span className="id-status status-green">On Track</span>
                    </div>
                    <div className="habit-row-ss">
                      <span className="habit-name-ss">Morning run</span>
                      <div className="habit-bar-ss"><div className="habit-fill-ss green" style={{ width: '71%' }} /></div>
                      <span className="habit-count-ss">5/7</span>
                    </div>
                  </div>

                  <div className="identity-card-ss ahead">
                    <div className="id-header-ss">
                      <span className="id-emoji">📚</span>
                      <span className="id-name">Reader</span>
                      <span className="id-status status-teal">Ahead</span>
                    </div>
                    <div className="habit-row-ss">
                      <span className="habit-name-ss">Read 30 min</span>
                      <div className="habit-bar-ss"><div className="habit-fill-ss teal" style={{ width: '100%' }} /></div>
                      <span className="habit-count-ss">7/7</span>
                    </div>
                  </div>

                  <div className="identity-card-ss recoverable">
                    <div className="id-header-ss">
                      <span className="id-emoji">🎸</span>
                      <span className="id-name">Musician</span>
                      <span className="id-status status-amber">Recoverable</span>
                    </div>
                    <div className="habit-row-ss">
                      <span className="habit-name-ss">Practice</span>
                      <div className="habit-bar-ss"><div className="habit-fill-ss amber" style={{ width: '29%' }} /></div>
                      <span className="habit-count-ss">2/7</span>
                    </div>
                  </div>

                  <div className="identity-card-ss on-track">
                    <div className="id-header-ss">
                      <span className="id-emoji">✍️</span>
                      <span className="id-name">Writer</span>
                      <span className="id-status status-green">On Track</span>
                    </div>
                    <div className="habit-row-ss">
                      <span className="habit-name-ss">Journal</span>
                      <div className="habit-bar-ss"><div className="habit-fill-ss green" style={{ width: '57%' }} /></div>
                      <span className="habit-count-ss">4/7</span>
                    </div>
                  </div>

                  <div className="voice-orb-ss">
                    <MicIcon size={20} />
                  </div>
                </div>
              </div>
              <h3>Identity Dashboard</h3>
              <p>See all the people you&apos;re becoming at a glance. No noise, just clarity.</p>
            </div>

            {/* Screen 2: Voice Logging */}
            <div className="screenshot-item">
              <div className="phone-mockup-ss">
                <div className="phone-screen-ss">
                  <div className="dynamic-island" />
                  <div className="voice-content-ss">
                    <div className="voice-heading-ss">How was your day?</div>
                    <div className="voice-orb-large-ss">
                      <MicIcon size={28} />
                    </div>
                    <div className="voice-transcript-ss">
                      &ldquo;I went for a run this morning and read for 20 minutes after lunch...&rdquo;
                    </div>
                    <div className="voice-detected-ss">
                      Detected: <span className="detected-identity-ss">🏃 Runner · 📚 Reader</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Voice Logging</h3>
              <p>Just talk about your day. Backmind connects the dots to your identities.</p>
            </div>

            {/* Screen 3: Notifications */}
            <div className="screenshot-item">
              <div className="phone-mockup-ss">
                <div className="phone-screen-ss notification-bg">
                  <div className="dynamic-island" />
                  <div className="lock-screen-ss">
                    <div className="lock-time-ss">
                      <div className="lock-date-ss">Wednesday, January 15</div>
                      <div className="lock-clock-ss">9:41</div>
                    </div>
                    <div className="notification-area-ss">
                      <div className="notification-card-ss">
                        <div className="notif-header-ss">
                          <LogoMark size={16} className="notif-icon-ss" />
                          <span className="notif-app-ss">Backmind</span>
                          <span className="notif-time-ss">2m ago</span>
                        </div>
                        <div className="notif-title-ss">Your guitar misses you 🎸</div>
                        <div className="notif-body-ss">
                          It&apos;s been 3 days since your last practice. Your <strong>Musician</strong> identity is still there when you&apos;re ready.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Gentle Nudges</h3>
              <p>Not guilt. Not streaks. Just a quiet reminder of who you said you wanted to be.</p>
            </div>
          </div>

          <div className="carousel-dots">
            <div className="carousel-dot active" />
            <div className="carousel-dot" />
            <div className="carousel-dot" />
          </div>
          <div className="swipe-hint">Swipe to explore →</div>

          <h3 className="guardrails-heading">Built with guardrails</h3>
          <div className="guardrails-grid-inline">
            <div className="guardrail-inline">
              <div className="guardrail-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <strong>Your data stays yours</strong>
                <p>Everything lives on your device. No social feeds, no comparisons.</p>
              </div>
            </div>
            <div className="guardrail-inline">
              <div className="guardrail-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <div>
                <strong>No streak shaming</strong>
                <p>Bad days don&apos;t erase progress. Your identity isn&apos;t a number.</p>
              </div>
            </div>
            <div className="guardrail-inline">
              <div className="guardrail-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="17" y1="11" x2="23" y2="11" />
                </svg>
              </div>
              <div>
                <strong>No social comparison</strong>
                <p>This is between you and you. No leaderboards, no followers.</p>
              </div>
            </div>
            <div className="guardrail-inline">
              <div className="guardrail-icon-svg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div>
                <strong>Bad day mode</strong>
                <p>Having a rough day? Backmind lowers expectations and leads with empathy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="light-accent">
        <div className="container wide">
          <div className="section-number">05 — Features</div>
          <h2>Everything you need.<br />Nothing you don&apos;t.</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </div>
              <h3>Voice-First Logging</h3>
              <p>Talk naturally about your day. No checkboxes, no forms — Backmind understands context.</p>
            </div>
            <div className="feature">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Multi-Identity Tracking</h3>
              <p>Runner, reader, partner, creative — see all the people you&apos;re becoming in one place.</p>
            </div>
            <div className="feature">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3>Smart Nudges</h3>
              <p>Contextual reminders that know when to encourage and when to give you space.</p>
            </div>
            <div className="feature">
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Empathy Engine</h3>
              <p>Bad days happen. Backmind adapts — lowering the bar, celebrating what you did manage, never shaming.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="final-cta" id="waitlist">
        <h2>Become an early believer.</h2>
        <p>
          Backmind is coming soon. Join the waitlist and be the first to
          meet the mind in the background.
        </p>

        {!success ? (
          <form className="waitlist-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        ) : (
          <div className="waitlist-success" style={{ display: 'flex' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        )}

        {error && <p className="waitlist-note" style={{ color: '#FCA5A5' }}>{error}</p>}
        {!success && <p className="waitlist-note">No spam. Just a heads up when we launch.</p>}

        <div className="founder-note">
          <p>
            I built Backmind because I kept losing sight of who I was becoming.
            Not because I lacked goals — but because I had too many versions of
            myself to keep track of. I needed something that could hold all of
            them gently. I hope it helps you too.
          </p>
          <div className="founder-name">— The Backmind Team</div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <a href="#" className="logo">
            <LogoMark size={28} className="logo-mark" />
            <span className="logo-wordmark">
              <span className="back">Back</span>
              <span className="mind">mind</span>
            </span>
          </a>
          <p>© {new Date().getFullYear()} Backmind. All rights reserved.</p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="sticky-cta" style={{ transform: showSticky ? 'translateY(0)' : 'translateY(100%)' }}>
        <button onClick={scrollToWaitlist}>Join the Waitlist</button>
      </div>
    </>
  )
}
