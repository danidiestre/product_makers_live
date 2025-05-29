'use client'

import { Search, Plus, Flame, Clock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AppList } from '@/components/AppList'
import { PageHeader } from '@/components/PageHeader'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { App } from '@/lib/types'
import { useAnalytics } from '@/hooks/useAnalytics'
import { SortKey } from '@/lib/types'

interface ProductsPageContentProps {
  initialProducts: App[]
}

export function ProductsPageContent({ initialProducts }: ProductsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('votes')
  const { trackSearch } = useAnalytics()
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  // Filter products based on search query
  const filteredProducts = searchQuery
    ? initialProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : initialProducts

  // Track search with debounce
  useEffect(() => {
    if (searchQuery.trim()) {
      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }

      // Set new timeout to track search after user stops typing
      searchTimeoutRef.current = setTimeout(() => {
        trackSearch({
          search_term: searchQuery.trim(),
          results_count: filteredProducts.length,
          search_source: "header"
        })
      }, 1000) // 1 second debounce
    }

    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, filteredProducts.length, trackSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleResetSearch = () => {
    setSearchQuery('')
    setSortKey('votes') // Reset sort to default when clearing search
  }

  return (
    <>
      <PageHeader title="Productos">
        <div className="w-full flex items-center justify-end gap-3">
          {/* Search bar */}
          <div className="w-full md:w-auto relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Busca productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-[240px] pl-10"
            />
          </div>
          {/* Sort control */}
          <ToggleGroup
            type="single"
            value={sortKey}
            defaultValue="votes"
            onValueChange={(value) => value && setSortKey(value as SortKey)}
            className="border rounded-md gap-0 overflow-hidden divide-x h-10 flex-shrink-0"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="votes" aria-label="Populares" className="rounded-none">
                  <Flame className="size-5" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="bottom">Populares</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem value="launchDate" aria-label="Recientes" className="rounded-none">
                  <Clock className="size-5" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="bottom">Recientes</TooltipContent>
            </Tooltip>
          </ToggleGroup>
          {/* Add product button, hidden for now */}
          <Button asChild variant="default" className="gap-2 hidden">
            <Link href="/dashboard/product/new">
              <Plus size={16} />
              Añadir producto
            </Link>
          </Button>
        </div>
      </PageHeader>

      {/* Product List */}
      <LayoutSection>
        <LayoutContainer>
          <AppList
            searchQuery={searchQuery}
            sortKey={sortKey}
            onResetSearch={handleResetSearch}
            initialProducts={initialProducts}
          />
        </LayoutContainer>
      </LayoutSection>
    </>
  )
} 