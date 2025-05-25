'use client'

import { FC } from 'react'
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { App } from '@/lib/types'
import { useVotes } from '@/hooks/useVotes'

interface AppProfileActionsProps {
  app: App
}

export const AppProfileActions: FC<AppProfileActionsProps> = ({ app }) => {
  const { votes, hasVoted, isLoading, toggleVote, error } = useVotes({
    productId: app.id,
    initialVotes: app.votes,
    initialHasVoted: app.initialHasVoted || false
  })

  const handleUpvote = async () => {
    await toggleVote()
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: app.name,
        text: app.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="w-full sm:w-auto flex items-center gap-2">
      {/* Upvote button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            onClick={handleUpvote}
            disabled={isLoading}
            className={`w-full sm:w-24 gap-2 ${hasVoted
              ? 'bg-brand-blue/10 hover:bg-brand-blue/20 dark:bg-brand-blue dark:hover:bg-brand-blue/90 text-brand-blue dark:text-white'
              : ''
              } ${isLoading ? 'opacity-50' : ''}`}
          >
            <ThumbsUp size={16} />
            <span>{votes}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {error ? error : hasVoted ? "Quitar el voto" : "Votar este producto"}
        </TooltipContent>
      </Tooltip>

      {/* Comments button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button asChild variant="secondary">
            <Link
              href="#comments"
              className="w-full sm:w-24 gap-2"
            >
              <MessageCircle size={16} />
              <span>{app.commentsCount}</span>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Ver comentarios
        </TooltipContent>
      </Tooltip>

      {/* Share button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            className="w-full sm:w-auto gap-2"
            onClick={handleShare}
          >
            <Share2 size={16} />
            <span>Compartir</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Comparte este producto
        </TooltipContent>
      </Tooltip>
    </div>
  )
} 