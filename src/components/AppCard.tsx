'use client'

import { FC } from 'react'
import { ChevronUp, MessageCircle } from 'lucide-react'
import { Tooltip } from './Tooltip'
import clsx from 'clsx'
import Link from 'next/link'

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

interface TagProps {
  label: string
}

const Tag: FC<TagProps> = ({ label }) => (
  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
    {label}
  </span>
)

interface AppCardProps {
  id: string
  name: string
  description: string
  imageUrl: string
  votes: number
  badges?: Array<'new' | 'trending' | 'top'>
  tags?: string[]
  commentsCount?: number
  onUpvote?: () => void
}

export const AppCard: FC<AppCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  votes,
  badges = [],
  tags = [],
  commentsCount = 0,
  onUpvote,
}) => {
  return (
    <div 
      className="flex flex-col border rounded-lg overflow-hidden hover:border-blue-500 transition-all bg-white"
      data-testid={`app-card-${id}`}
    >
      <Link 
        href={`/app/${id}`}
        className="flex p-4 cursor-pointer" 
      >
        <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 mr-4 flex items-center justify-center bg-gray-100">
          <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{description}</p>
              <div className="flex flex-wrap mt-3 gap-2">
                {badges.map((badgeType) => (
                  <Badge key={badgeType} type={badgeType} />
                ))}
                {tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Tooltip content="Upvote this app">
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    onUpvote?.()
                  }}
                  className="flex flex-col items-center bg-gray-50 py-2 px-3 rounded-md hover:bg-gray-100 border border-gray-200"
                  aria-label="Upvote"
                >
                  <ChevronUp className="h-5 w-5 text-gray-500 hover:text-blue-500" />
                  <span className="text-sm font-bold text-gray-800">{votes}</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </Link>
      <div className="bg-gray-50 py-2 px-4 flex justify-between items-center border-t border-gray-100">
        <div className="flex space-x-2 text-xs text-gray-500">
          #{id}
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MessageCircle className="h-4 w-4 mr-1" />
          <span>{commentsCount}</span>
        </div>
      </div>
    </div>
  )
} 