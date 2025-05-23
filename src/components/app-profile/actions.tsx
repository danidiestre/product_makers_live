'use client'

import { FC, useState } from 'react'
import { ThumbsUp, MessageCircle, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import { App } from '@/lib/types'

interface AppProfileActionsProps {
  app: App
}

export const AppProfileActions: FC<AppProfileActionsProps> = ({ app }) => {
  const [hasUpvoted, setHasUpvoted] = useState(false)

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted)
    // In a real app, you would call an API to update the vote count
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
            className={`w-full sm:w-24 gap-2 ${hasUpvoted
              ? 'bg-brand-blue/10 hover:bg-brand-blue/20 dark:bg-brand-blue dark:hover:bg-brand-blue/90 text-brand-blue dark:text-white'
              : ''
              }`}
          >
            <ThumbsUp size={16} />
            <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {hasUpvoted ? "Quitar el voto" : "Votar este producto"}
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