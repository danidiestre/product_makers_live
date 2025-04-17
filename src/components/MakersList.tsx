'use client'

import { FC, useState, useEffect } from 'react'
import { MakerCard } from './MakerCard'
import { Button } from '@/components/ui/button'
import { getAllMakers } from '@/lib/data'
import { Maker } from '@/lib/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

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
      <div className="flex flex-wrap gap-2">
        {categoryCounts.map(({ name, count }) => (
          <Button
            key={name}
            variant={selectedCategory === name ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(name)}
            className={clsx(
              "transition-colors",
              selectedCategory === name ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            )}
          >
            {name} ({count})
          </Button>
        ))}
      </div>

      {/* Makers grid */}
      <div className="grid grid-cols-1 gap-6">
        {paginatedMakers.map((maker) => (
          <MakerCard key={maker.id} maker={maker} />
        ))}
      </div>

      {/* Show message if no makers found */}
      {paginatedMakers.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No makers found for the current filters.</p>
          <button
            className="mt-4 text-sm text-blue-600 hover:text-blue-800"
            onClick={() => {
              setSelectedCategory('All')
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={clsx(
                  "min-w-[2rem]",
                  currentPage === page ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
} 