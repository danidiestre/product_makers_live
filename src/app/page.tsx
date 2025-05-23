import Script from 'next/script'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AppList } from '@/components/AppList'
import { WeeklyCountdown } from '@/components/WeeklyCountdown'
import { Flame } from 'lucide-react'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { PageHero } from '@/components/PageHero'
import { getTopProducts } from '@/app/products/actions'

export default async function Home() {
  // Cargar productos top para la página principal
  const result = await getTopProducts(10)
  const initialProducts = result.success ? result.data || [] : []

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

        {/* Hero Section */}
        <PageHero />

        {/* Product List Section */}
        <LayoutSection>
          <LayoutContainer>
            <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 id="featured-products-heading" className="text-base font-medium text-muted-foreground flex items-center justify-center sm:justify-start gap-2">
                <Flame size={20} className="text-red-600" />
                <span>Mejores productos de la semana</span>
              </h2>
              <WeeklyCountdown />
            </div>
            <AppList searchQuery="" limit={10} initialProducts={initialProducts} />
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper>
  )
} 