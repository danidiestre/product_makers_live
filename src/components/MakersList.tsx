'use client'

import { useState, useEffect } from 'react'
import { MakerCard } from './MakerCard'
import { getAllMakers, getMakersByCategory } from '@/lib/data'
import { Maker } from '@/lib/types'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

type MakerCategory = 'Designer' | 'Developer' | 'Marketing' | 'Other' | 'All'
type SortOption = 'date' | 'name' | 'popularity'

interface MakersListProps {
  initialMakers: Maker[]
}

const MAKERS_PER_PAGE = 12

export function MakersList({ initialMakers }: MakersListProps) {
  const [selectedCategory, setSelectedCategory] = useState<MakerCategory>('All')
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [displayedMakers, setDisplayedMakers] = useState(initialMakers)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter and sort makers when category or sort option changes
  useEffect(() => {
    let filtered = [...initialMakers]
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(maker => maker.category === selectedCategory)
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'popularity':
        filtered.sort((a, b) => (b.followers || 0) - (a.followers || 0))
        break
    }
    
    setDisplayedMakers(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, sortBy, initialMakers])

  // Calculate pagination
  const totalPages = Math.ceil(displayedMakers.length / MAKERS_PER_PAGE)
  const startIndex = (currentPage - 1) * MAKERS_PER_PAGE
  const paginatedMakers = displayedMakers.slice(startIndex, startIndex + MAKERS_PER_PAGE)

  // Calculate category counts
  const categoryStats = [
    { id: 'All', label: 'All', count: initialMakers.length },
    { id: 'Designer', label: 'Designers', count: initialMakers.filter(m => m.category === 'Designer').length },
    { id: 'Developer', label: 'Developers', count: initialMakers.filter(m => m.category === 'Developer').length },
    { id: 'Marketing', label: 'Marketing', count: initialMakers.filter(m => m.category === 'Marketing').length },
    { id: 'Other', label: 'Other', count: initialMakers.filter(m => m.category === 'Other').length }
  ]

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categoryStats.map(({ id, label, count }) => (
            <Button
              key={id}
              variant={selectedCategory === id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(id as MakerCategory)}
              className={clsx(
                "transition-colors",
                selectedCategory === id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              {label} ({count})
            </Button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
          <SelectTrigger className="w-8 h-8 p-0 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none [&>svg:last-child]:hidden">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Most Recent</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {paginatedMakers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6">
            {paginatedMakers.map((maker) => (
              <MakerCard key={maker.id} maker={maker} />
            ))}
          </div>

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
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-2">No makers found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  )
} 