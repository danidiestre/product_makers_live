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

  // Helper function to handle social URLs
  const getSocialUrl = (type: 'linkedin' | 'twitter' | 'github' | 'dribbble', value?: string): string => {
    if (!value) return '#'
    
    // If it's already a URL, return it as is
    if (value.startsWith('http://') || value.startsWith('https://')) {
      return value
    }

    // Remove @ if present
    const username = value.startsWith('@') ? value.slice(1) : value

    // Return the appropriate URL based on type
    switch (type) {
      case 'linkedin':
        return `https://linkedin.com/in/${username}`
      case 'twitter':
        return `https://x.com/${username}`
      case 'github':
        return `https://github.com/${username}`
      case 'dribbble':
        return `https://dribbble.com/${username}`
      default:
        return value
    }
  }

  // Get featured app from this maker or use a placeholder
  const featuredApp = getAllApps()
    .filter(app => app.makers?.some(m => m.name === name))
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))[0] || {
    id: 'placeholder',
    name: 'Product destacado'
  }

  const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4='

  return (
    <Card>
      <CardHeader className="gap-0 p-6">
        <div className="flex flex-col md:flex-row items-start gap-4 relative">
          <Avatar className="h-14 w-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border relative">
            <AvatarImage src={avatar} />
            <AvatarFallback className="text-xl bg-muted-foreground text-background">{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 gap-1">
            <CardTitle className="flex items-center gap-2 text-xl">
              {name}
              {isVerified && (
                <BadgeCheck size={20} className="text-brand-blue" aria-label="Verified Maker" />
              )}
            </CardTitle>
            <CardDescription>
              {bio}
            </CardDescription>
            {makerCategory && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                <Badge variant="secondary">{makerCategory}</Badge>
              </div>
            )}
          </div>
          {featuredApp && (
            <div className="absolute top-0 right-0 md:relative md:flex flex-shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/app/${featuredApp.id}`} className="group outline-none">
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
          )}
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-6 border-t py-4 px-6">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground cursor-default">
          <Tag size={16} />
          <span>{role}</span>
        </div>
        <div className="flex items-center gap-6">
          {website && (
            <LinkSocial
              href={website.startsWith('http') ? website : `https://${website}`}
              icon={<Globe size={16} />}
              name="Website"
            />
          )}
          {linkedin && (
            <LinkSocial
              href={getSocialUrl('linkedin', linkedin)}
              icon={<Linkedin size={16} />}
              name="Linkedin"
            />
          )}
          {twitter && (
            <LinkSocial
              href={getSocialUrl('twitter', twitter)}
              icon={<Twitter size={16} />}
              name="Twitter"
            />
          )}
          {dribbble && (
            <LinkSocial
              href={getSocialUrl('dribbble', dribbble)}
              icon={<Dribbble size={16} />}
              name="Dribbble"
            />
          )}
          {github && (
            <LinkSocial
              href={getSocialUrl('github', github)}
              icon={<Github size={16} />}
              name="Github"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  )
} 