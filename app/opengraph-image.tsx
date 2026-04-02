import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Backmind — Your guide, not your judge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OGImage() {
  const satoshiBold = await readFile(
    join(process.cwd(), 'public/fonts/satoshi-700.ttf')
  )
  const satoshiMedium = await readFile(
    join(process.cwd(), 'public/fonts/satoshi-500.ttf')
  )

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
          background: '#1A1714',
          gap: '36px',
        }}
      >
        {/* Logo */}
        <svg viewBox="0 0 100 100" width="140" height="140">
          <path
            d="M 50 12 A 38 38 0 1 1 12 50"
            fill="none"
            stroke="#E8E0D5"
            stroke-width="6"
            stroke-linecap="round"
          />
          <circle cx="50" cy="12" r="7" fill="#E8E0D5" />
          <path
            d="M 50 76 A 26 26 0 1 1 76 50"
            fill="none"
            stroke="#7A6E62"
            stroke-width="6"
            stroke-linecap="round"
          />
          <circle cx="50" cy="76" r="7" fill="#7A6E62" />
          <circle cx="50" cy="50" r="11" fill="#E8E0D5" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontFamily: 'Satoshi',
              fontWeight: 700,
              color: '#E8E0D5',
              letterSpacing: '-0.02em',
            }}
          >
            Back
          </span>
          <span
            style={{
              fontSize: '72px',
              fontFamily: 'Satoshi',
              fontWeight: 500,
              color: '#7A6E62',
              letterSpacing: '-0.02em',
            }}
          >
            mind
          </span>
        </div>

        {/* Tagline */}
        <span
          style={{
            fontSize: '28px',
            fontFamily: 'Satoshi',
            fontWeight: 500,
            color: '#9A9490',
            letterSpacing: '0.02em',
          }}
        >
          Your guide, not your judge.
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshiBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Satoshi',
          data: satoshiMedium,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  )
}
