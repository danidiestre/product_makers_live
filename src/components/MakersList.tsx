'use client'

import { useState, useEffect } from 'react'
import { MakerCard } from './MakerCard'
import { getAllMakers, getMakersByCategory } from '@/lib/data'
import { Maker } from '@/lib/types'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

type MakerCategory = 'Designer' | 'Developer' | 'Marketing' | 'Other' | 'All'
type SortOption = 'date' | 'name' | 'popularity'

interface MakersListProps {
  initialMakers: Maker[]
}

export function MakersList({ initialMakers }: MakersListProps) {
  const [selectedCategory, setSelectedCategory] = useState<MakerCategory>('All')
  const [sortBy, setSortBy] = useState<SortOption>('date')
  const [searchQuery, setSearchQuery] = useState('')
  const [displayedMakers, setDisplayedMakers] = useState(initialMakers)

  // Filter and sort makers when category, sort option, or search changes
  useEffect(() => {
    let filtered = [...initialMakers]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(maker => 
        maker.name.toLowerCase().includes(query) ||
        maker.role.toLowerCase().includes(query) ||
        maker.bio?.toLowerCase().includes(query)
      )
    }
    
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
  }, [selectedCategory, sortBy, searchQuery, initialMakers])

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
      {/* Search input */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search makers by name, role, or bio..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Most Recent</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {displayedMakers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedMakers.map((maker) => (
            <MakerCard key={maker.id} maker={maker} />
          ))}
        </div>
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