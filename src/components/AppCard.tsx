'use client'

import { FC } from 'react'
import { ChevronUp, MessageCircle, Globe, Smartphone, Play, Github, ExternalLink } from 'lucide-react'
import { Tooltip } from './Tooltip'
import clsx from 'clsx'
import Link from 'next/link'
import { App, ExternalLinks } from '@/lib/types'
import { hasVotedToday, toggleVote } from '@/lib/utils'
import { useState, useEffect } from 'react'

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

// Extended App Card Props to include the additional fields from App profile
interface AppCardProps extends Omit<App, 'externalLinks' | 'makers'> {
  externalLinks?: ExternalLinks
  makers?: Array<{
    name: string
    role: string
    avatar: string
  }>
  onUpvote?: () => void
}

export const AppCard: FC<AppCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  votes: initialVotes,
  badges = [],
  tags = [],
  commentsCount = 0,
  externalLinks,
  makers = [],
  onUpvote,
}) => {
  const [votes, setVotes] = useState(initialVotes)
  const [hasVoted, setHasVoted] = useState(false)
  
  useEffect(() => {
    setHasVoted(hasVotedToday(id))
  }, [id])

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newVoteState = toggleVote(id)
    setHasVoted(newVoteState)
    setVotes(prev => newVoteState ? prev + 1 : prev - 1)
    onUpvote?.()
  }

  return (
    <div 
      className="flex flex-col rounded-lg overflow-hidden bg-background ring-1 ring-black/[0.04] shadow-[0_1px_2px_0_rgb(0,0,0,0.03)] hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.02)] hover:ring-black/[0.08] transition-all duration-300"
      data-testid={`app-card-${id}`}
    >
      <div className="flex p-4">
        <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 mr-4 flex items-center justify-center bg-white ring-1 ring-black/[0.03] p-2 relative">
          <img src={imageUrl} alt={name} className="h-full w-full object-contain" />
          {badges.includes('new') && (
            <div className="absolute bottom-0 left-0 right-0 bg-brand-blue/90 text-white text-[10px] font-medium py-0.5 text-center">
              NEW
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <Link href={`/app/${id}`} className="inline-block">
                <h3 className="font-semibold text-gray-900 text-lg hover:text-brand-blue transition-colors">{name}</h3>
              </Link>
              
              {/* App Type Indicators */}
              <div className="flex flex-wrap gap-2 mt-2">
                {externalLinks?.website && (
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md flex items-center">
                    <Globe className="h-3 w-3 mr-1" />
                    Web
                  </span>
                )}
                {externalLinks?.appStore && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center">
                    <Smartphone className="h-3 w-3 mr-1" />
                    iOS
                  </span>
                )}
                {externalLinks?.playStore && (
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    Android
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2 mt-2">{description}</p>
              
              {/* Makers */}
              {makers.length > 0 && (
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2 mr-2">
                    {makers.slice(0, 3).map((maker, index) => (
                      <div key={index} className="h-5 w-5 rounded-full overflow-hidden border-2 border-white">
                        <img src={maker.avatar} alt={maker.name} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    By {makers.map((m, i) => (
                      <span key={i}>
                        <Link href={`/maker/${m.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-blue transition-colors">
                          {m.name}
                        </Link>
                        {i < makers.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <div className="flex gap-2">
                <Link href={`/app/${id}#comments`}>
                  <Tooltip content="View comments">
                    <button 
                      className="flex flex-col items-center py-2 px-3 rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
                      aria-label="View comments"
                    >
                      <MessageCircle className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-bold text-gray-800">{commentsCount}</span>
                    </button>
                  </Tooltip>
                </Link>
                <Tooltip content={hasVoted ? "Remove upvote" : "Upvote this app"}>
                  <button 
                    onClick={handleUpvote}
                    className={`flex flex-col items-center py-2 px-3 rounded-md border transition-all ${
                      hasVoted 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                    aria-label={hasVoted ? "Remove upvote" : "Upvote"}
                  >
                    <ChevronUp className={`h-5 w-5 ${hasVoted ? 'text-blue-500' : 'text-gray-500'}`} />
                    <span className={`text-sm font-bold ${hasVoted ? 'text-blue-600' : 'text-gray-800'}`}>{votes}</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/30 py-2 px-4 flex justify-between items-center border-t border-black/[0.03]">
        {/* External Links */}
        <div className="flex space-x-3">
          {externalLinks?.website && (
            <a 
              href={externalLinks.website} 
              className="flex items-center text-xs text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="h-3 w-3 mr-1" />
              <span>Website</span>
            </a>
          )}
          {externalLinks?.github && (
            <a 
              href={externalLinks.github} 
              className="flex items-center text-xs text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-3 w-3 mr-1" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
} 