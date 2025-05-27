'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AppCard } from '@/components/AppCard'
import { Telescope, Flame, Clock, MonitorSmartphone } from 'lucide-react'
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
import { EmptyState } from '@/components/EmptyState'

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

  // Determine click source based on context
  const getClickSource = () => {
    if (searchQuery) return "search" as const
    if (limit) return "featured" as const
    return "feed" as const
  }

  return (
    <div className="w-full grid gap-6">
      {searchQuery && (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-sm text-muted-foreground">
            Mostrando <span className="font-medium">{filteredApps.length}</span> resultados para "<span className="font-medium">{searchQuery}</span>"
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {!limit && (
        <div className="flex flex-row gap-4 items-center justify-between bg-background p-2 rounded-xl border">
          {/* Platform filter */}
          <div className="hidden md:flex flex-wrap gap-1">
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
          <div className="flex md:hidden">
            <Select
              value={platformFilter}
              onValueChange={(value) => {
                setPlatformFilter(value as PlatformFilter)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="gap-2 border-none">
                <MonitorSmartphone size={16} />
                <SelectValue placeholder="Plataformas" />
              </SelectTrigger>
              <SelectContent>
                {platformStats.map(({ id, label, count }) => (
                  <SelectItem key={id} value={id}>
                    <div className="flex items-center justify-between gap-2 font-medium">
                      {label}
                      <Badge variant="secondary" className="w-8">{count}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <SelectTrigger className="w-[140px] border-none">
                <SelectValue placeholder="Ordenar por..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="votes">
                  <div className="flex items-center gap-2 font-medium">
                    <Flame size={16} />
                    Populares
                  </div>
                </SelectItem>
                <SelectItem value="launchDate">
                  <div className="flex items-center gap-2 font-medium">
                    <Clock size={16} />
                    Recientes
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
              clickSource={getClickSource()}
              position={index + 1}
              totalProducts={displayApps.length}
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