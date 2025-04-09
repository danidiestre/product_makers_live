'use client'

import { FC, useState } from 'react'
import { AppCard } from './AppCard'
import { CountdownTimer } from './CountdownTimer'
import { Filter, SortDesc, SortAsc, ThumbsUp, Clock } from 'lucide-react'
import clsx from 'clsx'
import { getAllApps } from '@/lib/data'
import { App } from '@/lib/types'

type SortKey = 'votes' | 'date'
type ViewMode = 'daily' | 'weekly' | 'alltime'

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
  const [apps] = useState<App[]>(getAllApps())
  
  // Sort apps based on current criteria
  const sortedApps = [...apps].sort((a, b) => {
    const modifier = sortAsc ? 1 : -1
    return sortKey === 'votes' 
      ? (a.votes - b.votes) * modifier
      : a.id.localeCompare(b.id) * modifier // Using ID as proxy for date in mock data
  })

  const timeRemaining = {
    hours: 8,
    minutes: 32,
    seconds: 15
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <h2 className="text-2xl font-bold text-gray-900">Featured Apps</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm p-1 rounded-lg">
              <button
                onClick={() => setSortKey('votes')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  sortKey === 'votes'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                Most Voted
              </button>
              <button
                onClick={() => setSortKey('date')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                  sortKey === 'date'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Clock className="h-4 w-4" />
                Latest
              </button>
            </div>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-2 rounded-lg bg-gray-100/80 backdrop-blur-sm text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Toggle sort direction"
            >
              {sortAsc ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
          <CountdownTimer className="sm:justify-end" />
          
          {/* Time period tabs */}
          <div className="flex p-1 bg-gray-100/80 backdrop-blur-sm rounded-lg">
            {['daily', 'weekly', 'all time'].map((period) => (
              <button
                key={period}
                onClick={() => setViewMode(period as ViewMode)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
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