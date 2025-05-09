'use client'

import { Navbar } from '@/components/Navbar'
import { MakersList } from '@/components/MakersList'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { PageHeader } from '@/components/PageHeader'

export default function MakersPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <LayoutWrapper>

      {/* StreamCountdown banner */}
      <StreamCountdownBanner />

      <Navbar />

      <LayoutMain>

        <PageHeader title="Makers">
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Busca a makers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[240px] pl-10"
            />
          </div>
        </PageHeader>

        {/* Makers List */}
        <LayoutSection>
          <LayoutContainer>
            <MakersList searchQuery={searchQuery} />
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper>
  )
} 