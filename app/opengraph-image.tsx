import { ImageResponse } from 'next/og'

export const alt = 'Backmind — Your guide, not your judge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          gap: '32px',
        }}
      >
        <svg viewBox="0 0 100 100" width="160" height="160">
          <path
            d="M 50 12 A 38 38 0 1 1 12 50"
            fill="none"
            stroke="#2D4A6A"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cx="50" cy="12" r="5" fill="#2D4A6A" />
          <path
            d="M 50 76 A 26 26 0 1 1 76 50"
            fill="none"
            stroke="#4F7CAC"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cx="50" cy="76" r="5" fill="#4F7CAC" />
          <circle cx="50" cy="50" r="9" fill="#E8F0F8" />
        </svg>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0px',
          }}
        >
          <span
            style={{
              fontSize: '64px',
              fontWeight: 500,
              color: '#f1f5f9',
              letterSpacing: '-0.02em',
            }}
          >
            Back
          </span>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 300,
              color: '#94a3b8',
              letterSpacing: '-0.02em',
            }}
          >
            mind
          </span>
        </div>
        <span
          style={{
            fontSize: '28px',
            fontWeight: 400,
            color: '#64748b',
            letterSpacing: '0.02em',
          }}
        >
          Your guide, not your judge.
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
