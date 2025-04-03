'use client'

import { FC, useState } from 'react'
import { AppCard } from './AppCard'
import { CountdownTimer } from './CountdownTimer'
import { Filter, SortDesc, SortAsc } from 'lucide-react'
import clsx from 'clsx'

// Mock data for UI only
const MOCK_APPS = [
  {
    id: '1',
    name: 'Figma',
    description: 'Design, prototype, and gather feedback all in one place with Figma.',
    imageUrl: 'https://placehold.co/100',
    votes: 120,
    badges: ['trending'] as Array<'trending' | 'new' | 'top'>,
  },
  {
    id: '2',
    name: 'Notion',
    description: 'All-in-one workspace for notes, tasks, wikis, and databases.',
    imageUrl: 'https://placehold.co/100',
    votes: 85,
    badges: ['new'] as Array<'trending' | 'new' | 'top'>,
  },
  {
    id: '3',
    name: 'Linear',
    description: "The issue tracking tool you'll enjoy using.",
    imageUrl: 'https://placehold.co/100',
    votes: 210,
    badges: ['top'] as Array<'trending' | 'new' | 'top'>,
  },
  {
    id: '4',
    name: 'Raycast',
    description: 'Control your tools with a few keystrokes.',
    imageUrl: 'https://placehold.co/100',
    votes: 65,
  },
  {
    id: '5',
    name: 'Supabase',
    description: 'Open source Firebase alternative with authentication and database.',
    imageUrl: 'https://placehold.co/100',
    votes: 95,
    badges: ['new'] as Array<'trending' | 'new' | 'top'>,
  },
]

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
  
  // Sort apps based on current criteria
  const sortedApps = [...MOCK_APPS].sort((a, b) => {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Featured Apps</h2>
        <CountdownTimer 
          hours={timeRemaining.hours} 
          minutes={timeRemaining.minutes} 
          seconds={timeRemaining.seconds} 
        />
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex space-x-1 border-b">
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
        
        <div className="flex space-x-2">
          <button 
            className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-50"
            onClick={() => setSortKey('date')}
          >
            <Filter className="h-4 w-4 mr-1.5" />
            Date
          </button>
          <button 
            className="inline-flex items-center px-3 py-1.5 border rounded-md text-sm bg-white hover:bg-gray-50"
            onClick={() => setSortKey('votes')}
          >
            {sortAsc ? (
              <SortAsc className="h-4 w-4 mr-1.5" />
            ) : (
              <SortDesc className="h-4 w-4 mr-1.5" />
            )}
            Votes
            <span 
              className="ml-1 text-xs text-gray-500"
              onClick={(e) => {
                e.stopPropagation()
                setSortAsc(!sortAsc)
              }}
            >
              {sortAsc ? '(asc)' : '(desc)'}
            </span>
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedApps.length > 0 ? (
          sortedApps.map(app => (
            <AppCard 
              key={app.id}
              {...app}
              onClick={() => console.log(`View details for ${app.name}`)}
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