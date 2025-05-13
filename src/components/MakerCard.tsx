'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from '@/components/ui/badge'
import { LinkSocial } from '@/components/LinkSocial'
import { BadgeCheck, Dribbble, Github, Globe, Linkedin, Tag, Twitter } from 'lucide-react'
import { User } from '@prisma/client'

interface MakerCardProps {
  maker: User
}

export const MakerCard: FC<MakerCardProps> = ({ maker }) => {
  const { name, role, image, bio, twitter, github, linkedin, website } = maker

  // Helper function to handle social URLs
  const getSocialUrl = (type: 'linkedin' | 'twitter' | 'github', value?: string | null): string => {
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
      default:
        return value
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar className="size-12 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border relative">
            <AvatarImage src={image || undefined} />
            <AvatarFallback className="text-xl bg-muted-foreground text-background">{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <CardTitle className="text-base">
              {name}
            </CardTitle>
            {bio && (
              <CardDescription className="pb-2">
                {bio}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t py-4">
        <Badge variant="secondary" className="font-normal">
          {role}
        </Badge>
        <div className="flex flex-wrap gap-2">
          {twitter && (
            <Tooltip>
              <TooltipTrigger asChild>
                <LinkSocial
                  href={getSocialUrl('twitter', twitter)}
                  icon={<Twitter size={16} />}
                  name="Twitter"
                />
              </TooltipTrigger>
              <TooltipContent>Twitter</TooltipContent>
            </Tooltip>
          )}
          {github && (
            <Tooltip>
              <TooltipTrigger asChild>
                <LinkSocial
                  href={getSocialUrl('github', github)}
                  icon={<Github size={16} />}
                  name="GitHub"
                />
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
          )}
          {linkedin && (
            <Tooltip>
              <TooltipTrigger asChild>
                <LinkSocial
                  href={getSocialUrl('linkedin', linkedin)}
                  icon={<Linkedin size={16} />}
                  name="LinkedIn"
                />
              </TooltipTrigger>
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>
          )}
          {website && (
            <Tooltip>
              <TooltipTrigger asChild>
                <LinkSocial
                  href={website}
                  icon={<Globe size={16} />}
                  name="Website"
                />
              </TooltipTrigger>
              <TooltipContent>Website</TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardFooter>
    </Card>
  )
} 