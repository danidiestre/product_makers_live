'use client'

import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppList } from '@/components/AppList'
import { WeeklyCountdown } from '@/components/WeeklyCountdown'
import { Blocks, Flame, WandSparkles } from 'lucide-react'
import Script from 'next/script'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'

export default function Home() {
  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Product Makers",
    "url": "https://productmakers.ai",
    "description": "A community showcasing innovative apps and tools created by indie makers and small teams.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://productmakers.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <LayoutWrapper>

      {/* Add JSON-LD for SEO */}
      <Script
        id="product-makers-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* StreamCountdown banner */}
      <StreamCountdownBanner />

      <Navbar />

      <LayoutMain>

        {/* Hero Section with semantic HTML5 elements */}
        <LayoutSection className="border-b bg-background">
          <LayoutContainer>
            <h1 id="hero-heading" className="text-4xl md:text-6xl text-foreground text-balance text-center font-semibold inline-flex items-center justify-center flex-wrap gap-2 lg:gap-4">
              <span>Descubre los</span>
              <div className="w-14 h-14 bg-brand-blue rounded-md hidden lg:flex" />
              <span>productos</span>
              <span>creados por</span>
              <div className="w-14 h-14 bg-brand-yellow rounded-md hidden lg:flex" />
              <span>makers</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground text-balance font-medium text-center">
              La comunidad hispana de creadores de productos digitales.
            </p>
          </LayoutContainer>
        </LayoutSection>

        {/* Product List Section with semantic elements */}
        <LayoutSection>
          <LayoutContainer>
            <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 id="featured-products-heading" className="text-base font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                <Flame size={20} className="text-red-600" />
                <span>Mejores productos de la semana</span>
              </h2>
              <WeeklyCountdown />
            </div>
            <AppList searchQuery="" limit={10} />
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper>
  )
} 