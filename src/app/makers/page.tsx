'use client'

import { Navbar } from '@/components/Navbar'
import { MakersList } from '@/components/MakersList'
import Footer from '@/components/Footer'
import { Search, LayoutList, LayoutGrid } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { PageHeader } from '@/components/PageHeader'
import { ViewType } from '@/lib/types'


export default function MakersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewType, setViewType] = useState<ViewType>('grid')

  return (
    <LayoutWrapper>
      {/* StreamCountdown banner */}
      <StreamCountdownBanner />
      <Navbar />
      <LayoutMain>
        <PageHeader title="Makers">
          <div className="w-full flex items-center justify-end gap-3">
            {/* Search bar */}
            <div className="w-full md:w-auto relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Busca a makers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[240px] pl-10"
              />
            </div>
            {/* View toggle */}
            <ToggleGroup
              type="single"
              value={viewType}
              defaultValue="grid"
              onValueChange={(value) => value && setViewType(value as ViewType)}
              className="border rounded-md gap-0 overflow-hidden divide-x h-10 flex-shrink-0"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="grid" aria-label="Cuadrícula" className="rounded-none">
                    <LayoutGrid className="size-5" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="bottom">Cuadrícula</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ToggleGroupItem value="list" aria-label="Lista" className="rounded-none">
                    <LayoutList className="size-5" />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent side="bottom">Lista</TooltipContent>
              </Tooltip>
            </ToggleGroup>
          </div>
        </PageHeader>
        {/* Makers List */}
        <LayoutSection>
          <LayoutContainer>
            <MakersList
              searchQuery={searchQuery}
              onResetSearch={() => setSearchQuery('')}
              viewType={viewType}
            />
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
} 