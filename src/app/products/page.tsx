'use client'

import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <LayoutWrapper>

      {/* StreamCountdown banner */}
      <StreamCountdownBanner />

      <Navbar />

      <LayoutMain>

        {/* Header */}
        <LayoutSection className="border-b py-6 bg-background">
          <LayoutContainer>
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              {/* Title and description */}
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-foreground">Productos</h1>
                <p className="text-sm text-muted-foreground">
                  Descubre los productos creados por makers
                </p>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Busca productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-[300px] pl-10"
                />
              </div>
            </div>
          </LayoutContainer>
        </LayoutSection>

        {/* Product List */}
        <LayoutSection>
          <LayoutContainer>
            <AppList searchQuery={searchQuery} />
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper>
  )
} 