'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkSocial } from '@/components/LinkSocial'
import { Github, Globe, Linkedin, Tag, Twitter } from 'lucide-react'
import { User } from '@prisma/client'
import Link from 'next/link'

interface MakerCardProps {
  maker: User
}

export const MakerCard: FC<MakerCardProps> = ({ maker }) => {
  const { id, name, role, image, bio, twitter, github, linkedin, website } = maker
  const router = useRouter()

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

  const handleCardClick = () => {
    router.push(`/maker/${id}`)
  }

  return (
    <div onClick={handleCardClick}>
      <Card className="cursor-pointer hover:border-foreground/20 transition-all">
        <CardHeader className="gap-0 p-6">
          <div className="flex flex-col md:flex-row items-start gap-4 relative">
            <Avatar className="size-14 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border relative">
              <AvatarImage src={image || undefined} />
              <AvatarFallback className="text-xl bg-muted-foreground text-background">{name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 gap-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                {name}
              </CardTitle>
              <CardDescription className="line-clamp-1">
                {bio ? bio : '...'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-6 border-t py-4 px-6">
          <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground cursor-default">
            <Tag size={16} />
            <span>{role ? role : '?'}</span>
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
                href={getSocialUrl('linkedin', linkedin)}
                icon={<Linkedin size={16} />}
                name="LinkedIn"
              />
            )}
            {twitter && (
              <LinkSocial
                href={getSocialUrl('twitter', twitter)}
                icon={<Twitter size={16} />}
                name="Twitter"
              />
            )}
            {github && (
              <LinkSocial
                href={getSocialUrl('github', github)}
                icon={<Github size={16} />}
                name="GitHub"
              />
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 