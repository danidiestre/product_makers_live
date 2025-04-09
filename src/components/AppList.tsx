'use client'

import { FC, useState } from 'react'
import { AppCard } from './AppCard'
import { CountdownTimer } from './CountdownTimer'
import { Filter, SortDesc, SortAsc } from 'lucide-react'
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Featured Apps</h2>
        <CountdownTimer 
          hours={timeRemaining.hours} 
          minutes={timeRemaining.minutes} 
          seconds={timeRemaining.seconds} 
        />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex border-b w-full sm:w-auto overflow-x-auto pb-px">
          <ViewTab 
            label="Daily" 
            active={viewMode === 'daily'} 
            onClick={() => setViewMode('daily')} 
          />
          <ViewTab 
            label="Weekly" 
            active={viewMode === 'weekly'} 
            onClick={() => setViewMode('weekly')} 
          />
          <ViewTab 
            label="All Time" 
            active={viewMode === 'alltime'} 
            onClick={() => setViewMode('alltime')} 
          />
        </div>
        
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button 
            className={clsx(
              "inline-flex items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50 transition-colors",
              sortKey === 'date' ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white"
            )}
            onClick={() => setSortKey('date')}
          >
            <Filter className="h-4 w-4 mr-1.5" />
            Date
          </button>
          <button 
            className={clsx(
              "inline-flex items-center px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50 transition-colors",
              sortKey === 'votes' ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white"
            )}
            onClick={() => {
              if (sortKey === 'votes') {
                setSortAsc(!sortAsc)
              } else {
                setSortKey('votes')
                setSortAsc(false)
              }
            }}
          >
            {sortAsc ? (
              <SortAsc className="h-4 w-4 mr-1.5" />
            ) : (
              <SortDesc className="h-4 w-4 mr-1.5" />
            )}
            Votes
          </button>
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