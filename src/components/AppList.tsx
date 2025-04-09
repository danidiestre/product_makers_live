'use client'

import { FC, useState } from 'react'
import { AppCard } from './AppCard'
import { CountdownTimer } from './CountdownTimer'
import { Filter, SortDesc, SortAsc, ThumbsUp, Clock, Globe, Smartphone, Play } from 'lucide-react'
import clsx from 'clsx'
import { getAllApps } from '@/lib/data'
import { App } from '@/lib/types'

type SortKey = 'votes' | 'date'
type ViewMode = 'daily' | 'weekly' | 'all time'
type PlatformFilter = 'all' | 'web' | 'ios' | 'android'

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

export const AppList: FC = () => {
  const [sortKey, setSortKey] = useState<SortKey>('votes')
  const [sortAsc, setSortAsc] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('daily')
  const [platformFilter, setPlatformFilter] = useState<PlatformFilter>('all')
  const [apps] = useState<App[]>(getAllApps())
  
  // Filter apps based on platform
  const filteredApps = apps.filter(app => {
    if (platformFilter === 'all') return true
    if (platformFilter === 'web') return app.externalLinks?.website
    if (platformFilter === 'ios') return app.externalLinks?.appStore
    if (platformFilter === 'android') return app.externalLinks?.playStore
    return true
  })
  
  // Sort apps based on current criteria
  const sortedApps = [...filteredApps].sort((a, b) => {
    const modifier = sortAsc ? 1 : -1
    return sortKey === 'votes' 
      ? (a.votes - b.votes) * modifier
      : a.id.localeCompare(b.id) * modifier
  })

  const timeRemaining = {
    hours: 8,
    minutes: 32,
    seconds: 15
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        {/* Platform filter */}
        <div className="flex p-0.5 bg-gray-100/80 backdrop-blur-sm rounded-lg">
          <button
            onClick={() => setPlatformFilter('all')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
              platformFilter === 'all'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            All
          </button>
          <button
            onClick={() => setPlatformFilter('web')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
              platformFilter === 'web'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            Web
          </button>
          <button
            onClick={() => setPlatformFilter('ios')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
              platformFilter === 'ios'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            iOS
          </button>
          <button
            onClick={() => setPlatformFilter('android')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
              platformFilter === 'android'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            Android
          </button>
        </div>

        {/* Time period tabs */}
        <div className="flex p-0.5 bg-gray-100/80 backdrop-blur-sm rounded-lg">
          {['daily', 'weekly', 'all time'].map((period) => (
            <button
              key={period}
              onClick={() => setViewMode(period as ViewMode)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                viewMode === period
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-4">
        {sortedApps.length > 0 ? (
          sortedApps.map(app => (
            <AppCard 
              key={app.id}
              {...app}
              onUpvote={() => console.log(`Upvoted ${app.name}`)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No apps found for the current filter.</p>
            <button 
              className="mt-4 text-sm text-blue-600 hover:text-blue-800"
              onClick={() => {
                setSortKey('votes')
                setSortAsc(false)
                setViewMode('daily')
                setPlatformFilter('all')
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