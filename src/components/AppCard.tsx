'use client'

import { FC } from 'react'
import { ChevronUp, Bookmark, Eye } from 'lucide-react'
import { Tooltip } from './Tooltip'
import clsx from 'clsx'

interface BadgeProps {
  type: 'new' | 'trending' | 'top'
  className?: string
}

const Badge: FC<BadgeProps> = ({ type, className }) => {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    trending: 'bg-orange-100 text-orange-800',
    top: 'bg-green-100 text-green-800',
  }

  const labels = {
    new: 'New',
    trending: 'Trending',
    top: 'Top of the Week',
  }

  return (
    <span className={clsx('text-xs font-medium px-2 py-0.5 rounded-full', colors[type], className)}>
      {labels[type]}
    </span>
  )
}

interface AppCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  votes: number
  badges?: Array<'new' | 'trending' | 'top'>
  onClick?: () => void
  onUpvote?: () => void
}

export const AppCard: FC<AppCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  votes,
  badges = [],
  onClick,
  onUpvote,
}) => {
  return (
    <div 
      className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
      data-testid={`app-card-${id}`}
    >
      <div className="flex-shrink-0 w-16 flex items-center justify-center bg-gray-50 p-2">
        <Tooltip content="Upvote this app">
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onUpvote?.()
            }}
            className="flex flex-col items-center space-y-1"
          >
            <ChevronUp className="h-5 w-5 text-gray-500 hover:text-blue-500" />
            <span className="text-sm font-medium">{votes}</span>
          </button>
        </Tooltip>
      </div>
      
      <div 
        className="flex-1 p-4 cursor-pointer" 
        onClick={onClick}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
            <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <div className="flex space-x-2 mt-1">
              {badges.map((badgeType) => (
                <Badge key={badgeType} type={badgeType} />
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
    </div>
  )
} 