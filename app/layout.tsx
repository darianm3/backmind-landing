import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Backmind — Your guide, not your judge',
  description: 'The mind in the background helping you remember all the identities you\'re building, not just the goal you\'re focused on today.',
  metadataBase: new URL('https://backmind.app'),
  other: {
    'theme-color': '#0f172a',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
