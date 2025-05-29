'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkSocial } from '@/components/LinkSocial'
import { Github, Globe, Linkedin, Twitter } from 'lucide-react'
import { User } from '@prisma/client'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from './ui/badge'

interface MakerCardProps {
  maker: User
}

export const MakerCardGrid: FC<MakerCardProps> = ({ maker }) => {
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
        <CardHeader className="gap-0 p-6 pb-0">
          <div className="flex flex-col items-center gap-4 relative">
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="size-20 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center bg-background ring-1 ring-border relative">
                  <AvatarImage src={image || undefined} />
                  <AvatarFallback className="text-xl bg-muted-foreground text-background">{name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="max-w-48 py-2" side="top">
                <span className="line-clamp-5">{bio ? bio : '...'}</span>
              </TooltipContent>
            </Tooltip>
            <div className="flex flex-col items-center flex-1 gap-2">
              <CardTitle className="flex items-center gap-2 text-base line-clamp-1 text-center">
                {name}
              </CardTitle>
              <CardDescription className="line-clamp-1">
                <Badge variant="secondary">
                  {role ? (role === 'ProductManager' ? 'Product Manager' : role) : '?'}
                </Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex items-center justify-center gap-4 lg:gap-6 h-14 px-6">
          {website && (
            <LinkSocial
              href={website}
              icon={<Globe size={16} />}
            />
          )}
          {linkedin && (
            <LinkSocial
              href={getSocialUrl('linkedin', linkedin)}
              icon={<Linkedin size={16} />}
            />
          )}
          {twitter && (
            <LinkSocial
              href={getSocialUrl('twitter', twitter)}
              icon={<Twitter size={16} />}
            />
          )}
          {github && (
            <LinkSocial
              href={getSocialUrl('github', github)}
              icon={<Github size={16} />}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  )
} 