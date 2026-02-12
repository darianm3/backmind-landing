import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="140"
          height="140"
        >
          <path
            d="M 50 12 A 38 38 0 1 1 12 50"
            fill="none"
            stroke="#2D4A6A"
            stroke-width="6"
            stroke-linecap="round"
          />
          <circle cx="50" cy="12" r="7" fill="#2D4A6A" />
          <path
            d="M 50 76 A 26 26 0 1 1 76 50"
            fill="none"
            stroke="#4F7CAC"
            stroke-width="6"
            stroke-linecap="round"
          />
          <circle cx="50" cy="76" r="7" fill="#4F7CAC" />
          <circle cx="50" cy="50" r="11" fill="#E8F0F8" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
