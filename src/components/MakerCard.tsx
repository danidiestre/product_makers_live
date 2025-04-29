'use client'

import { FC } from 'react'
import { Maker } from '@/lib/types'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import { LinkSocial } from '@/components/LinkSocial'
import { BadgeCheck, Dribbble, Github, Globe, Linkedin, Tag, Twitter } from 'lucide-react'
import { getAllApps } from '@/lib/data'

interface MakerCardProps {
  maker: Maker
}

export const MakerCard: FC<MakerCardProps> = ({ maker }) => {
  const { name, role, avatar, bio, twitter, dribbble, github, linkedin, website, makerCategory, isVerified } = maker

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
      <CardHeader className="gap-0 p-6">
        <div className="flex flex-col md:flex-row items-start gap-4 relative">
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
              <div className="flex flex-wrap gap-1 mt-3">
                {makerCategory && (
                  <Badge variant="secondary">{makerCategory}</Badge>
                )}
              </div>
            </CardDescription>
          </div>
          <div className="absolute top-0 right-0 md:relative md:flex flex-shrink-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/app/${featuredApp.id}`} className="group" legacyBehavior>
                  <div className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border p-0 relative">
                    <img
                      src={placeholderImage}
                      alt="Featured App"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                Producto destacado
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-6 border-t py-4 px-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground cursor-default">
          <Tag size={16} />
          <span>{role}</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {website && (
            <LinkSocial
              href={website}
              icon={<Globe size={16} />}
              name="Website"
            />
          )}
          {linkedin && (
            <LinkSocial
              href={`https://linkedin.com/in/${linkedin}`}
              icon={<Linkedin size={16} />}
              name="Linkedin"
            />
          )}
          {twitter && (
            <LinkSocial
              href={`https://twitter.com/${twitter}`}
              icon={<Twitter size={16} />}
              name="Twitter"
            />
          )}
          {dribbble && (
            <LinkSocial
              href={`https://dribbble.com/${dribbble}`}
              icon={<Dribbble size={16} />}
              name="Dribbble"
            />
          )}
          {github && (
            <LinkSocial
              href={`https://github.com/${github}`}
              icon={<Github size={16} />}
              name="Github"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
} 