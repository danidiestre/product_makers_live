'use client'

import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import StreamCountdown from '@/components/StreamCountdown'
import { WeeklyCountdown } from '@/components/WeeklyCountdown'
import Script from 'next/script'

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
    <div className="flex min-h-screen flex-col">
      {/* Add JSON-LD for SEO */}
      <Script 
        id="product-makers-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Gradient background wrapper */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-[#F8F9FF] pointer-events-none" />
      
      {/* Subtle mesh gradient overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(at 100% 0%, rgb(124 58 237 / 0.15) 0px, transparent 50%),
                           radial-gradient(at 0% 0%, rgb(37 99 235 / 0.1) 0px, transparent 50%),
                           radial-gradient(at 100% 100%, rgb(236 72 153 / 0.1) 0px, transparent 50%),
                           radial-gradient(at 0% 100%, rgb(234 179 8 / 0.1) 0px, transparent 50%)`
        }}
      />

      <div className="relative">
        <Navbar />
        <main className="flex-1">
          {/* StreamCountdown banner */}
          <StreamCountdown />
          
          {/* Hero Section with semantic HTML5 elements */}
          <section className="pt-8 pb-12 border-b border-gray-100" aria-labelledby="hero-heading">          
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 id="hero-heading" className="text-4xl md:text-5xl text-gray-900 mb-5">
                  descubre los <span className="font-bold">productos</span> creados por <span className="font-bold">makers</span>
                </h1>
                <p className="text-lg text-gray-600">
                  product makers es la comunidad hispana de makers de productos digitales.
                </p>
              </div>
            </div>
          </section>
          
          {/* Product List Section with semantic elements */}
          <section id="featured-apps" aria-labelledby="featured-products-heading" className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h2 id="featured-products-heading" className="text-lg font-medium text-gray-900 flex items-center gap-2 whitespace-nowrap mx-auto sm:mx-0">
                🔥 <span className="text-gray-600">Mejores productos de la semana</span>
              </h2>
              <div className="overflow-x-auto pb-1 mx-auto sm:mx-0">
                <WeeklyCountdown />
              </div>
            </div>
            <AppList searchQuery="" limit={10} />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
} 