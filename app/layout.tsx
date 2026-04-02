import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Gochi_Hand } from 'next/font/google'
import './globals.css'

const satoshi = localFont({
  src: [
    { path: '../public/fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/satoshi-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/satoshi-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

const gochiHand = Gochi_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gochi-hand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Backmind — Your guide, not your judge',
  description: 'The mind in the background helping you remember all the identities you\'re building, not just the goal you\'re focused on today.',
  metadataBase: new URL('https://backmind.app'),
  alternates: {
    canonical: '/',
  },
  keywords: ['habit tracker', 'identity-based habits', 'habit app', 'voice habit tracker', 'personal development', 'self improvement app', 'ADHD habit tracker', 'building blocks and guardrails'],
  openGraph: {
    title: 'Backmind — Your guide, not your judge',
    description: 'The mind in the background helping you remember all the identities you\'re building, not just the goal you\'re focused on today.',
    url: 'https://backmind.app',
    siteName: 'Backmind',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Backmind — Identity-based habit tracking',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backmind — Your guide, not your judge',
    description: 'The mind in the background helping you remember all the identities you\'re building, not just the goal you\'re focused on today.',
    images: ['/opengraph-image.png'],
  },
  other: {
    'theme-color': '#1A1714',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${satoshi.variable} ${gochiHand.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'Backmind',
                  url: 'https://backmind.app',
                  description: 'Identity-based habit tracking — your second mind for who you\'re becoming.',
                },
                {
                  '@type': 'SoftwareApplication',
                  name: 'Backmind',
                  applicationCategory: 'HealthApplication',
                  operatingSystem: 'iOS',
                  description: 'The mind in the background helping you remember all the identities you\'re building, not just the goal you\'re focused on today.',
                  offers: {
                    '@type': 'Offer',
                    price: '10.00',
                    priceCurrency: 'USD',
                    description: 'Founding member rate — 30-day free trial included',
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
