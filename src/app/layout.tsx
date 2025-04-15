import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'
import '@/styles/globals.css'

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap'
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://productmakers.ai'),
  title: {
    default: 'Product Makers - Discover Amazing Products Built by Indie Makers',
    template: '%s | Product Makers'
  },
  description: 'A community showcasing innovative apps and tools created by indie makers and small teams.',
  keywords: ['product makers', 'indie makers', 'product discovery', 'maker community'],
  authors: [{ name: 'Product Makers Team' }],
  creator: 'Product Makers',
  publisher: 'Product Makers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://productmakers.ai',
    siteName: 'Product Makers',
    title: 'Product Makers - Discover Amazing Products Built by Indie Makers',
    description: 'A community showcasing innovative apps and tools created by indie makers and small teams.',
    images: [
      {
        url: 'https://productmakers.ai/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@productmakers',
    site: '@productmakers',
    title: 'Product Makers - Discover Amazing Products Built by Indie Makers',
    description: 'A community showcasing innovative apps and tools created by indie makers and small teams.',
    images: [
      {
        url: 'https://productmakers.ai/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="canonical" href="https://productmakers.ai" />
      </head>
      <body className={manrope.className}>{children}</body>
    </html>
  )
} 