'use client'

import { Search, Plus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AppList } from '@/components/AppList'
import { PageHeader } from '@/components/PageHeader'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { App } from '@/lib/types'
import { useAnalytics } from '@/hooks/useAnalytics'

interface ProductsPageContentProps {
  initialProducts: App[]
}

export function ProductsPageContent({ initialProducts }: ProductsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
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

  return (
    <>
      <PageHeader title="Productos">
        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Busca productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-[240px] pl-10"
            />
          </div>
          {/* Add product button */}
          <Button asChild variant="default" className="gap-2 hidden sm:flex">
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
            onResetSearch={() => setSearchQuery('')}
            initialProducts={initialProducts}
          />
        </LayoutContainer>
      </LayoutSection>
    </>
  )
} 