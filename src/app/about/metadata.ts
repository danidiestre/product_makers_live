import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Product Makers - Our Mission, Vision and Community',
  description: 'Learn about Product Makers, a vibrant community platform where indie makers showcase their products, share knowledge, and support each other in building successful digital products.',
  keywords: 'about product makers, maker community, product makers mission, indie makers, what is product makers, startup community',
  alternates: {
    canonical: 'https://productmakers.ai/about',
  },
  openGraph: {
    type: 'website',
    url: 'https://productmakers.ai/about',
    title: 'About Product Makers - Our Mission and Community',
    description: 'Learn about our mission, vision, and the makers who form our vibrant community.',
    siteName: 'Product Makers',
    images: [
      {
        url: 'https://productmakers.ai/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Product Makers Community - About Us'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Product Makers - Our Mission and Community',
    description: 'Learn more about the Product Makers community and our mission to empower indie makers.',
    images: ['https://productmakers.ai/about-twitter-image.jpg'],
    creator: '@productmakers'
  }
} 