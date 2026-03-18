import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const coluna = localFont({
  src: '../font/Coluna.otf',
  variable: '--font-coluna',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Emoji Smuggler',
  description: 'Hide secret messages in emojis using steganography',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={coluna.variable}>
      <body className={`font-mono antialiased dark`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
