import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { CopyButton, ShareTextCopyButton } from './copy-buttons'
import { TrackThankYouView } from './track-view'

function LogoMark({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 50 12 A 38 38 0 1 1 12 50" fill="none" stroke="#2D2926" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="50" cy="12" r="7" fill="#2D2926"/>
      <path d="M 50 76 A 26 26 0 1 1 76 50" fill="none" stroke="#7A6E62" strokeWidth="6" strokeLinecap="round"/>
      <circle cx="50" cy="76" r="7" fill="#7A6E62"/>
      <circle cx="50" cy="50" r="11" fill="#E8E0D5"/>
    </svg>
  )
}

const FOUNDING_TOTAL = 200

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>
}) {
  const { email } = await searchParams

  if (!email) {
    redirect('/')
  }

  // Fetch user data by email
  const { data: user } = await supabase
    .from('subscribers')
    .select('id, email, referral_code, referral_count, beta_tester')
    .eq('email', email)
    .single()

  if (!user) {
    redirect('/')
  }

  // Fetch waitlist position and total count in parallel
  const [positionResult, countResult] = await Promise.all([
    supabase.rpc('get_waitlist_position', { user_id: user.id }),
    supabase.from('subscribers').select('id', { count: 'exact', head: true }),
  ])

  const position = positionResult.data
  const totalSignups = countResult.count ?? 0
  const isFoundingMember = position !== null && position <= FOUNDING_TOTAL
  const foundingSpotsRemaining = Math.max(0, FOUNDING_TOTAL - totalSignups)
  const referralCount = user.referral_count ?? 0

  const referralLink = `backmind.app/?ref=${user.referral_code}`
  const shareText = `I just locked in Founding Member pricing for @backmind_app — an AI accountability app that tracks who you're becoming, not just what you do. Grab a founding spot before they're gone: ${referralLink}`

  // Milestone definitions
  const milestones = [
    { count: 1, label: 'Move up the waitlist', achieved: referralCount >= 1 },
    { count: 3, label: 'Lock in Founding Member rate ($10/mo forever)', achieved: referralCount >= 3 },
    { count: 5, label: 'Founding rate + private founding community', achieved: referralCount >= 5 },
  ]

  return (
    <div className="ty-page">
      <TrackThankYouView />

      {/* NAV */}
      <nav>
        <div className="container">
          <Link href="/" className="logo">
            <LogoMark size={32} className="logo-mark" />
            <span className="logo-wordmark">
              <span className="back">Back</span>
              <span className="mind">mind</span>
            </span>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="ty-hero">
        <div className="container">
          <div className="ty-checkmark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="ty-heading">
            {isFoundingMember
              ? <>You&apos;re Founding Member #{position}</>
              : <>You&apos;re #{position ?? '?'} on the waitlist</>
            }
          </h1>
          <p className="ty-subtitle">You&apos;re in. Here&apos;s what happens next.</p>
        </div>
      </div>

      {/* PRICING CONFIRMATION */}
      <div className="ty-section">
        <div className="container">
          <div className="ty-card">
            <h2 className="ty-card-heading">
              {isFoundingMember ? 'Your rate: $10/month' : 'Standard rate: $15/month'}
            </h2>
            <p className="ty-card-description">
              {isFoundingMember
                ? 'Founding Member pricing — locked in forever.'
                : 'Refer 3 friends to lock in $10/month forever.'
              }
            </p>
            {!isFoundingMember && foundingSpotsRemaining > 0 && (
              <p className="ty-founding-remaining">
                {foundingSpotsRemaining} of {FOUNDING_TOTAL} founding spots remaining
              </p>
            )}
          </div>
        </div>
      </div>

      {/* REFERRAL MILESTONE TRACKER */}
      <div className="ty-section">
        <div className="container">
          <div className="ty-card">
            <h2 className="ty-card-heading">Referral milestones</h2>
            <p className="ty-card-description">
              {isFoundingMember
                ? 'Unlock more perks by sharing Backmind.'
                : 'Refer friends to claim a Founding Member spot.'
              }
            </p>

            <div className="ty-milestones">
              {milestones.map((m, i) => (
                <div key={i} className={`ty-milestone ${m.achieved ? 'achieved' : ''}`}>
                  <div className="ty-milestone-marker">
                    {m.achieved ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span>{m.count}</span>
                    )}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className={`ty-milestone-line ${milestones[i + 1].achieved ? 'achieved' : ''}`} />
                  )}
                  <div className="ty-milestone-label">
                    <span className="ty-milestone-count">{m.count} {m.count === 1 ? 'referral' : 'referrals'}</span>
                    <span className="ty-milestone-reward">{m.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="ty-milestone-current">
              {referralCount} / 5 referrals
            </div>
          </div>
        </div>
      </div>

      {/* REFERRAL SHARE BLOCK */}
      <div className="ty-section">
        <div className="container">
          <div className="ty-card">
            <h2 className="ty-card-heading">Share your link</h2>
            <p className="ty-card-description">Your friend gets a 14-day free trial + founding rate if they sign up within 72 hours.</p>

            <div className="ty-share-block">
              <label className="ty-label">Your referral link</label>
              <div className="ty-copy-row">
                <code className="ty-code">{referralLink}</code>
                <CopyButton text={referralLink} label="Copy link" />
              </div>
            </div>

            <div className="ty-share-block">
              <label className="ty-label">Pre-written tweet</label>
              <div className="ty-share-text-box">
                <p className="ty-share-text">{shareText}</p>
                <ShareTextCopyButton text={shareText} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT TO EXPECT */}
      <div className="ty-section">
        <div className="container">
          <div className="ty-card">
            <h2 className="ty-card-heading">What to expect</h2>
            <ul className="ty-expect-list">
              {user.beta_tester ? (
                <li>
                  <div className="ty-expect-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
                    </svg>
                  </div>
                  <span>You&apos;ll get TestFlight access soon — I&apos;m onboarding testers in small batches</span>
                </li>
              ) : (
                <li>
                  <div className="ty-expect-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <span>We&apos;ll email you when your spot opens</span>
                </li>
              )}
              <li>
                <div className="ty-expect-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <span>Expect an email from Darian within 24 hours</span>
              </li>
              <li>
                <div className="ty-expect-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span>
                  While you wait, follow the build journey:{' '}
                  <a href="https://x.com/darian_does" target="_blank" rel="noopener noreferrer" className="ty-social-link">
                    @darian_does on X
                  </a>
                  {' '}&middot;{' '}
                  <a href="https://tiktok.com/@darian_does" target="_blank" rel="noopener noreferrer" className="ty-social-link">
                    TikTok
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ACCOUNTABILITY PARTNER CTA */}
      <div className="ty-section">
        <div className="container">
          <div className="ty-card ty-partner-card">
            <h2 className="ty-card-heading">Know someone who&apos;d hold you accountable?</h2>
            <p className="ty-card-description">
              Backmind works better with a partner. Invite someone specific — it counts as a referral too.
            </p>
            <div className="ty-copy-row">
              <code className="ty-code">{referralLink}</code>
              <CopyButton text={referralLink} label="Copy link" />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <Link href="/" className="logo">
            <LogoMark size={28} className="logo-mark" />
            <span className="logo-wordmark">
              <span className="back">Back</span>
              <span className="mind">mind</span>
            </span>
          </Link>
          <p>&copy; {new Date().getFullYear()} Backmind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
