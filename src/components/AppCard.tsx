'use client'

import { FC, useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, Globe, Smartphone, Play, Github, ThumbsUp, CalendarIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { App, ExternalLinks } from '@/lib/types'
import { hasVotedToday, toggleVote } from '@/lib/utils'

// Extended App Card Props to include the additional fields from App profile
interface AppCardProps extends Omit<App, 'externalLinks' | 'makers'> {
  externalLinks?: ExternalLinks
  makers?: Array<{
    name: string
    role: string
    avatar: string
    joinedDate: string
  }>
  onUpvote?: () => void
  ranking?: number
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
  ranking,
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
    <Card data-testid={`app-card-${id}`}
    >
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start gap-4 pb-4 relative">
          <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border p-2 relative">
            <img src={imageUrl} alt={name} className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col flex-1 gap-1">
            <Link href={`/app/${id}`} className="inline-block truncate">
              <CardTitle className="flex items-center gap-2 text-xl">
                {ranking && (
                  <Badge variant="primary">#{ranking}</Badge>
                )}
                {name}
                {badges.includes('new') && (
                  <Badge variant="secondary" className="bg-brand-yellow text-foreground dark:text-background">NEW</Badge>
                )}
              </CardTitle>
            </Link>
            <CardDescription>
              <p className="line-clamp-1">{description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
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
            </CardDescription>
          </div>
          <div className="absolute top-0 right-0 md:relative md:flex flex-shrink-0">
            <div className="flex gap-2">
              <Link href={`/app/${id}#comments`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="w-14 h-14 flex flex-col items-center justify-center gap-1 rounded-md bg-muted hover:bg-muted/90 transition-all"
                      aria-label="View comments"
                    >
                      <MessageCircle size={20} className="text-muted-foreground" />
                      <span className="text-xs font-semibold text-muted-foreground">{commentsCount}</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    View comments
                  </TooltipContent>
                </Tooltip>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleUpvote}
                    className={`w-14 h-14 flex flex-col items-center justify-center gap-1 rounded-md transition-all ${hasVoted
                      ? 'bg-brand-blue/10 hover:bg-brand-blue/20'
                      : 'bg-muted hover:bg-muted/90'
                      }`}
                    aria-label={hasVoted ? "Remove upvote" : "Upvote"}
                  >
                    <ThumbsUp size={20} className={hasVoted ? 'text-brand-blue' : 'text-muted-foreground'} />
                    <span className={`text-xs font-semibold ${hasVoted ? 'text-brand-blue' : 'text-muted-foreground'}`}>{votes}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {hasVoted ? "Remove upvote" : "Upvote this app"}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between gap-6 border-t py-4 px-6">
        {makers.length > 0 && (
          <div className="flex items-center">
            <div className="flex -space-x-2 mr-2">
              {makers.slice(0, 3).map((m, i) => (
                <Avatar key={i} className="size-6 rounded-full overflow-hidden border-2 border-background">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback className="text-xs bg-muted-foreground text-background">{m.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              By {makers.map((m, i) => (
                <HoverCard key={i}>
                  <HoverCardTrigger>
                    <Link href={`/maker/${m.name.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-blue transition-colors">
                      {m.name}
                    </Link>
                    {i < makers.length - 1 ? ', ' : ''}
                  </HoverCardTrigger>
                  <HoverCardContent sideOffset={8}>
                    <div className="flex gap-3">
                      <Avatar className="size-10 rounded-md">
                        <AvatarImage src={m.avatar} />
                        <AvatarFallback>{m.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{m.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </span>
          </div>
        )}
        <div className="flex items-center gap-6">
          {externalLinks?.website && (
            <a
              href={externalLinks.website}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe size={16} />
              <span>Website</span>
            </a>
          )}
          {externalLinks?.github && (
            <a
              href={externalLinks.github}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </CardFooter>
    </Card >
  )
} 