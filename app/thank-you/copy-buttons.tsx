'use client'

import { useState } from 'react'

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className="ty-copy-btn" onClick={handleCopy}>
      {copied ? 'Copied!' : label}
    </button>
  )
}

export function ShareTextCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button className="ty-copy-btn ty-copy-btn-block" onClick={handleCopy}>
      {copied ? 'Copied!' : 'Copy share text'}
    </button>
  )
}
