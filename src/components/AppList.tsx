'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppCard } from '@/components/AppCard'
import { Telescope, Flame, Clock } from 'lucide-react'
import { App } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination'
import { useProductsWithVotes } from '@/hooks/useProductsWithVotes'
import { EmptyState } from './EmptyState'

type SortKey = 'votes' | 'launchDate'
type PlatformFilter = 'all' | 'web' | 'ios' | 'android' | 'others'

const PRODUCTS_PER_PAGE = 8

interface AppListProps {
  searchQuery: string;
  limit?: number;
  initialProducts?: App[];
  onResetSearch?: () => void;
}

export function AppList({ searchQuery, limit, initialProducts, onResetSearch }: AppListProps) {
  const [sortKey, setSortKey] = useState<SortKey>('votes')
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)

  // Usar el hook para combinar productos estáticos con información de votación
  const { products: apps, isLoadingVotes } = useProductsWithVotes({
    initialProducts: initialProducts || []
  })

  // Filter apps based on platform and search query
  const filteredApps = apps.filter(app => {
    const matchesPlatform = platformFilter === 'all' ? true
      : platformFilter === 'web' ? app.productType === 'WEB'
        : platformFilter === 'ios' ? app.productType === 'IOS'
          : platformFilter === 'android' ? app.productType === 'ANDROID'
            : app.productType === 'OTHERS'

    const searchTerm = searchQuery.toLowerCase()
    const matchesSearch = searchQuery === '' ? true
      : app.name.toLowerCase().includes(searchTerm) ||
      app.description.toLowerCase().includes(searchTerm) ||
      (app.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ?? false)

    return matchesPlatform && matchesSearch
  })

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  // Sort apps based on current criteria
  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortKey === 'votes') {
      // Para votos, queremos descendente (más votos primero)
      return b.votes - a.votes
    } else if (sortKey === 'launchDate') {
      // Para fechas, queremos descendente (más recientes primero)
      const dateA = new Date(a.launchDate).getTime()
      const dateB = new Date(b.launchDate).getTime()
      return dateB - dateA
    }
    return 0
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedApps.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedApps = sortedApps.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  // Calculate platform counts
  const platformStats = [
    { id: 'all', label: 'All', count: apps.length },
    { id: 'web', label: 'Web', count: apps.filter(app => app.productType === 'WEB').length },
    { id: 'ios', label: 'iOS', count: apps.filter(app => app.productType === 'IOS').length },
    { id: 'android', label: 'Android', count: apps.filter(app => app.productType === 'ANDROID').length },
    { id: 'others', label: 'Others', count: apps.filter(app => app.productType === 'OTHERS').length }
  ]

  // Display limited apps on home page, or all apps with pagination on products page
  const displayApps = limit ? sortedApps.slice(0, limit) : paginatedApps;

  const handleReset = () => {
    // Reset sort to default
    setSortKey('votes');
    // Reset platform filter to 'all'
    setPlatformFilter('all');
    // Reset to first page
    setCurrentPage(1);
    // If there's a search query reset handler, call it
    if (onResetSearch) {
      onResetSearch();
    }
  };

  return (
    <div className="w-full grid gap-6">
      {!limit && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-background p-2 rounded-xl border">
          {/* Platform filter */}
          <div className="flex flex-wrap gap-1">
            {platformStats.map(({ id, label, count }) => (
              <Button
                key={id}
                variant={platformFilter === id ? "secondary" : "ghost"}
                onClick={() => {
                  setPlatformFilter(id as PlatformFilter)
                  setCurrentPage(1) // Reset to first page when filter changes
                }}
                className="flex items-center gap-2 pr-2 rounded-lg"
              >
                {label}
                <Badge variant={platformFilter === id ? "secondary" : "secondary"} className="w-8">{count}</Badge>
              </Button>
            ))}
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2">
            <Select
              value={sortKey}
              onValueChange={(value) => {
                setSortKey(value as SortKey)
                setCurrentPage(1) // Reset to first page when sort changes
              }}
            >
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="votes">
                  <div className="flex items-center gap-2">
                    <Flame size={16} className="text-red-600" />
                    Más populares
                  </div>
                </SelectItem>
                <SelectItem value="launchDate">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    Más recientes
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {displayApps.length > 0 ? (
          displayApps.map((app, index) => (
            <AppCard
              key={app.id}
              {...app}
              ranking={limit ? index + 1 : undefined}
            />
          ))
        ) : (
          <EmptyState icon={<Telescope className="size-20 stroke-1" />} message="No se encontraron productos">
            <Button variant="secondary"
              onClick={handleReset}
            >
              Ver todos los productos
            </Button>
          </EmptyState>
        )}
      </div>

      {limit && sortedApps.length > limit && (
        <Button asChild variant="outline" size="lg" className="rounded-xl">
          <Link
            href="/products"
            className="gap-2"
          >
            <Telescope size={20} />
            Ver todos los productos
          </Link>
        </Button>
      )}

      {!limit && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((p) => Math.max(1, p - 1))
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
} 