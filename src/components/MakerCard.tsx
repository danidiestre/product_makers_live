'use client'

import { FC } from 'react'
import { Maker } from '@/lib/types'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheck, Github, Globe, Linkedin, Tag, Twitter } from 'lucide-react'
import { getAllApps } from '@/lib/data'

interface MakerCardProps {
  maker: Maker
}

export const MakerCard: FC<MakerCardProps> = ({ maker }) => {
  const { name, role, avatar, bio, twitter, github, linkedin, website, makerCategory, isVerified } = maker

  // Get featured app from this maker or use a placeholder
  const featuredApp = getAllApps()
    .filter(app => app.makers?.some(m => m.name === name))
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))[0] || {
    id: 'placeholder',
    name: 'Featured App'
  }

  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4='

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start gap-4 pb-4 relative">
          <Avatar className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border relative">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-xs bg-muted-foreground text-background">{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 gap-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              {name}
              {isVerified && (
                <BadgeCheck size={20} className="text-brand-blue" aria-label="Verified Maker" />
              )}
            </CardTitle>
            <CardDescription>
              <p className="line-clamp-1">{bio}</p>
              {/* Maker Category Badge */}
              <div className="flex flex-wrap gap-2 mt-3">
                {makerCategory && (
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-md ${makerCategory === 'Designer' ? 'bg-purple-100 text-purple-700' :
                    makerCategory === 'Developer' ? 'bg-blue-100 text-blue-700' :
                      makerCategory === 'Marketing' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                    }`}>
                    {makerCategory}
                  </span>
                )}
              </div>
            </CardDescription>
          </div>
          <div className="absolute top-0 right-0 md:relative md:flex flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/app/${featuredApp.id}`} className="group">
                  <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border p-2 relative">
                    <img
                      src={placeholderImage}
                      alt="Featured App"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                Featured App
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between gap-6 border-t py-4 px-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground cursor-default">
          <Tag size={16} />
          <span>{role}</span>
        </div>
        <div className="flex items-center gap-6">
          {website && (
            <a
              href={website}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe size={16} />
              <span>Website</span>
            </a>
          )}
          {twitter && (
            <a
              href={`https://twitter.com/${twitter}`}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={16} />
              <span>Twitter</span>
            </a>
          )}
          {linkedin && (
            <a
              href={`https://linkedin.com/in/${linkedin}`}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
          )}
          {github && (
            <a
              href={`https://github.com/${github}`}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-brand-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
} 