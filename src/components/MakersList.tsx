'use client'

import { FC, useState, useEffect } from 'react'
import { MakerCard } from '@/components/MakerCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Role, User } from '@prisma/client'
import { getUsers, getUsersByRole } from '@/app/makers/actions'
import { LoadState } from '@/components/LoadState'
import { EmptyState } from '@/components/EmptyState'
import { ServerCrash, WandSparkles } from 'lucide-react'
import { MakerCardGrid } from './MakerCardGrid'
import { cn } from '@/lib/utils'
import { ViewType } from '@/lib/types'

const MAKERS_PER_PAGE = 20

type MakersListProps = {
  searchQuery: string;
  onResetSearch?: () => void;
  viewType: ViewType;
}

export const MakersList: FC<MakersListProps> = ({ searchQuery, onResetSearch, viewType }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<Role | 'All'>('All')
  const [allMakers, setAllMakers] = useState<User[]>([]) // Store ALL makers here
  const [filteredMakers, setFilteredMakers] = useState<User[]>([]) // Makers filtered by category
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch ALL makers on initial load
  useEffect(() => {
    const fetchMakers = async () => {
      setLoading(true)
      try {
        const result = await getUsers()
        if (result.success) {
          setAllMakers(result.data || [])
          setError(null)
        } else {
          setError(result.error || 'Failed to fetch makers')
          setAllMakers([])
        }
      } catch (err) {
        setError('Failed to fetch makers')
        setAllMakers([])
      }
      setLoading(false)
    }

    fetchMakers()
  }, [])

  // Filter makers based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredMakers(allMakers)
    } else {
      setFilteredMakers(allMakers.filter(maker => maker.role === selectedCategory))
    }
  }, [selectedCategory, allMakers])

  // Filter makers based on search query
  const searchedMakers = filteredMakers.filter(maker => {
    const searchTerm = searchQuery.toLowerCase()
    return searchQuery === '' ? true
      : (maker.name?.toLowerCase().includes(searchTerm) ||
        maker.role?.toLowerCase().includes(searchTerm) ||
        maker.bio?.toLowerCase().includes(searchTerm))
  })

  // Reset to first page when search query or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  // Calculate pagination
  const totalPages = Math.ceil(searchedMakers.length / MAKERS_PER_PAGE)
  const startIndex = (currentPage - 1) * MAKERS_PER_PAGE
  const paginatedMakers = searchedMakers.slice(startIndex, startIndex + MAKERS_PER_PAGE)

  // Calculate category counts from ALL makers
  const categories: (Role | 'All')[] = ['All', 'Developer', 'Designer', 'ProductManager', 'Marketer', 'Founder', 'Other']
  const categoryCounts = categories.map(category => ({
    name: category,
    count: category === 'All'
      ? allMakers.length
      : allMakers.filter(maker => maker.role === category).length
  }))

  const handleReset = () => {
    setSelectedCategory('All')
    setCurrentPage(1)
    if (onResetSearch) {
      onResetSearch()
    }
  }

  if (loading) {
    return <LoadState message="Cargando makers..." />
  }

  if (error) {
    return (
      <EmptyState icon={<ServerCrash className="size-20 stroke-1" />} message={error}>
        <Button
          variant="secondary"
          onClick={handleReset}
          className="mt-4"
        >
          Vuelve a probar
        </Button>
      </EmptyState>
    )
  }

  return (
    <div className="w-full grid gap-10">
      {/* Category filters and view toggle */}
      <div className="flex flex-row items-center justify-center">
        <div className="hidden md:flex flex-wrap gap-1">
          {categoryCounts.map(({ name, count }) => (
            <Button
              size="sm"
              key={name}
              variant={selectedCategory === name ? "secondary" : "ghost"}
              onClick={() => setSelectedCategory(name)}
              className={cn("flex items-center gap-1.5 px-2 font-semibold bg-transparent hover:bg-transparent border-none", selectedCategory === name ? "opacity-100" : "opacity-40")}
            >
              {name === 'ProductManager' ? 'Product Manager' : name} <Badge variant={selectedCategory === name ? "secondary" : "secondary"} className="px-1.5">{count}</Badge>
            </Button>
          ))}
        </div>

        <div className="flex md:hidden">
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as Role | 'All')}
          >
            <SelectTrigger className="gap-2 border-none bg-transparent">
              <SelectValue placeholder="Categorías" />
            </SelectTrigger>
            <SelectContent align="center">
              {categoryCounts.map(({ name, count }) => (
                <SelectItem key={name} value={name}>
                  <div className="w-full flex items-center gap-2 font-medium">
                    <span className="w-full">{name === 'ProductManager' ? 'Product Manager' : name}</span>
                    <Badge variant="secondary" className="w-8 mr-2 md:mr-0">{count}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Makers grid or list */}
      <div className={viewType === 'grid'
        ? "grid grid-cols-2 lg:grid-cols-4 gap-4"
        : "flex flex-col gap-4"
      }>
        {paginatedMakers.map((maker) => (
          viewType === 'grid'
            ? <MakerCardGrid key={maker.id} maker={maker} />
            : <MakerCard key={maker.id} maker={maker} />
        ))}
      </div>

      {/* Show message if no makers found */}
      {paginatedMakers.length === 0 && (
        <EmptyState icon={<WandSparkles className="size-20 stroke-1" />} message="No hay makers que coincidan con tu búsqueda.">
          <Button variant="secondary"
            onClick={handleReset}>
            Ver todos los makers
          </Button>
        </EmptyState>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
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