import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Makers Directory - Product Makers',
  description: 'Browse through our community of makers - developers, designers, and marketers building innovative products.',
}

export default function MakersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 