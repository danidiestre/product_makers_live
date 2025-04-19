'use client'

import { FC, useState, useEffect } from 'react'
import { MakerCard } from './MakerCard'
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
import { getAllMakers } from '@/lib/data'
import { Maker } from '@/lib/types'

const MAKERS_PER_PAGE = 12

type MakersListProps = {
  searchQuery: string
}

export const MakersList: FC<MakersListProps> = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [makers] = useState<Maker[]>(getAllMakers())

  // Filter makers based on category and search query
  const filteredMakers = makers.filter(maker => {
    const matchesCategory = selectedCategory === 'All' || maker.category === selectedCategory

    const searchTerm = searchQuery.toLowerCase()
    const matchesSearch = searchQuery === '' ? true
      : maker.name.toLowerCase().includes(searchTerm) ||
      maker.role.toLowerCase().includes(searchTerm) ||
      maker.bio.toLowerCase().includes(searchTerm) ||
      maker.category.toLowerCase().includes(searchTerm)

    return matchesCategory && matchesSearch
  })

  // Reset to first page when search query or category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Calculate pagination
  const totalPages = Math.ceil(filteredMakers.length / MAKERS_PER_PAGE)
  const startIndex = (currentPage - 1) * MAKERS_PER_PAGE
  const paginatedMakers = filteredMakers.slice(startIndex, startIndex + MAKERS_PER_PAGE)

  // Calculate category counts
  const categories = ['All', 'Developer', 'Designer', 'Marketing', 'Other']
  const categoryCounts = categories.map(category => ({
    name: category,
    count: category === 'All'
      ? makers.length
      : makers.filter(maker => maker.category === category).length
  }))

  return (
    <div className="w-full grid gap-6">
      {/* Category filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-background p-2 rounded-xl border">
        <div className="flex flex-wrap gap-1">
          {categoryCounts.map(({ name, count }) => (
            <Button
              key={name}
              variant={selectedCategory === name ? "secondary" : "ghost"}
              onClick={() => setSelectedCategory(name)}
              className="flex items-center gap-2 pr-2 rounded-lg"
            >
              {name} <Badge variant={selectedCategory === name ? "secondary" : "secondary"} className="w-8">{count}</Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Makers grid */}
      <div className="grid grid-cols-1 gap-4">
        {paginatedMakers.map((maker) => (
          <MakerCard key={maker.id} maker={maker} />
        ))}
      </div>

      {/* Show message if no makers found */}
      {paginatedMakers.length === 0 && (
        <div className="text-center py-12 bg-background rounded-lg">
          <p className="text-muted-foreground">No makers found for the current filters.</p>
          <Button variant="secondary"
            onClick={() => {
              setSelectedCategory('All')
            }}
          >
            Reset filters
          </Button>
        </div>
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