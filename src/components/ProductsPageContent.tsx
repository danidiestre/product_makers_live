'use client'

import { Search, Plus } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AppList } from '@/components/AppList'
import { PageHeader } from '@/components/PageHeader'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { App } from '@/lib/types'

interface ProductsPageContentProps {
  initialProducts: App[]
}

export function ProductsPageContent({ initialProducts }: ProductsPageContentProps) {
  const [searchQuery, setSearchQuery] = useState('')

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
              onChange={(e) => setSearchQuery(e.target.value)}
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
          <AppList searchQuery={searchQuery} onResetSearch={() => setSearchQuery('')} initialProducts={initialProducts} />
        </LayoutContainer>
      </LayoutSection>
    </>
  )
} 