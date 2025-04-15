'use client'

import { FC, useState, useEffect } from 'react'
import { AppCard } from './AppCard'
import { CountdownTimer } from './CountdownTimer'
import { Filter, SortDesc, SortAsc, ThumbsUp, Clock, Globe, Smartphone, Play, SlidersHorizontal, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import clsx from 'clsx'
import { getAllApps } from '@/lib/data'
import { App } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

type SortKey = 'votes' | 'name'
type ViewMode = 'daily' | 'weekly' | 'all time'
type PlatformFilter = 'all' | 'web' | 'ios' | 'android' | 'others'

const PRODUCTS_PER_PAGE = 8

const ViewTab: FC<{
  label: string
  active: boolean
  onClick: () => void
}> = ({ label, active, onClick }) => (
  <button
    className={clsx(
      'px-4 py-2 text-sm font-medium',
      active 
        ? 'border-b-2 border-blue-500 text-blue-600' 
        : 'text-gray-500 hover:text-gray-700'
    )}
    onClick={onClick}
  >
    {label}
  </button>
)

type AppListProps = {
  searchQuery: string
}

export const AppList: FC<AppListProps> = ({ searchQuery }) => {
  const [sortKey, setSortKey] = useState<SortKey>('votes')
  const [sortAsc, setSortAsc] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('daily')
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [apps] = useState<App[]>(getAllApps())
  
  // Filter apps based on platform and search query
  const filteredApps = apps.filter(app => {
    const matchesPlatform = platformFilter === 'all' ? true
      : platformFilter === 'web' ? app.externalLinks?.website
      : platformFilter === 'ios' ? app.externalLinks?.appStore
      : platformFilter === 'android' ? app.externalLinks?.playStore
      : !app.externalLinks?.website && !app.externalLinks?.appStore && !app.externalLinks?.playStore

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
    const modifier = sortAsc ? 1 : -1
    return sortKey === 'votes' 
      ? (a.votes - b.votes) * modifier
      : a.id.localeCompare(b.id) * modifier
  })

  // Calculate pagination
  const totalPages = Math.ceil(sortedApps.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedApps = sortedApps.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)

  // Calculate platform counts
  const platformStats = [
    { id: 'all', label: 'All', icon: <Filter className="h-3.5 w-3.5" />, count: apps.length },
    { id: 'web', label: 'Web', icon: <Globe className="h-3.5 w-3.5" />, count: apps.filter(app => app.externalLinks?.website).length },
    { id: 'ios', label: 'iOS', icon: <Smartphone className="h-3.5 w-3.5" />, count: apps.filter(app => app.externalLinks?.appStore).length },
    { id: 'android', label: 'Android', icon: <Play className="h-3.5 w-3.5" />, count: apps.filter(app => app.externalLinks?.playStore).length },
    { id: 'others', label: 'Others', icon: <Filter className="h-3.5 w-3.5" />, count: apps.filter(app => 
      !app.externalLinks?.website && 
      !app.externalLinks?.appStore && 
      !app.externalLinks?.playStore
    ).length }
  ]

  const timeRemaining = {
    hours: 8,
    minutes: 32,
    seconds: 15
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* Platform filter */}
        <div className="flex flex-wrap gap-2">
          {platformStats.map(({ id, label, icon, count }) => (
            <Button
              key={id}
              variant={platformFilter === id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setPlatformFilter(id as PlatformFilter)
                setCurrentPage(1) // Reset to first page when filter changes
              }}
              className={clsx(
                "transition-colors",
                platformFilter === id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}
            >
              <span className="flex items-center gap-1.5">
                {icon}
                {label} ({count})
              </span>
            </Button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <Select value={viewMode} onValueChange={(value: ViewMode) => {
          setViewMode(value)
          setCurrentPage(1) // Reset to first page when sort changes
        }}>
          <SelectTrigger className="w-8 h-8 p-0 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none [&>svg:last-child]:hidden">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Most Popular Today</SelectItem>
            <SelectItem value="weekly">Most Popular This Week</SelectItem>
            <SelectItem value="all time">Most Popular All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-4">
        {paginatedApps.length > 0 ? (
          <>
            {paginatedApps.map(app => (
              <AppCard 
                key={app.id}
                {...app}
                onUpvote={() => console.log(`Upvoted ${app.name}`)}
              />
            ))}

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
            <p className="text-gray-500">No products found for the current filter.</p>
            <button 
              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              onClick={() => {
                setSortKey('votes')
                setSortAsc(false)
                setViewMode('daily')
                setPlatformFilter('all')
                setCurrentPage(1)
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 