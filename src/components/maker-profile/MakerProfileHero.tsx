'use client'

import { FC, useEffect } from 'react'
import Link from 'next/link'
import { Github, Globe, Linkedin, Mail, Twitter } from 'lucide-react'
import { User } from '@prisma/client'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { LayoutSection } from '@/components/layout/LayoutSection'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { LinkSocial } from '@/components/LinkSocial'
import { useAnalytics } from '@/hooks/useAnalytics'
import { Badge } from '../ui/badge'

interface MakerProfileHeroProps {
  maker: User
}

export const MakerProfileHero: FC<MakerProfileHeroProps> = ({ maker }) => {
  const { trackUserProfileView } = useAnalytics()

  useEffect(() => {
    // Track user profile view when component mounts
    trackUserProfileView({
      viewed_user_id: maker.id,
      viewed_user_name: maker.name || 'Unknown',
      view_source: "profile_click",
      tab_viewed: "products", // Default tab
      is_own_profile: false // Could be dynamic if we pass current user
    })
  }, [maker.id, maker.name, trackUserProfileView])

  return (
    <LayoutSection className="border-b pt-6 pb-12 bg-background">
      <LayoutContainer>
        {/* Breadcrumb */}
        <Breadcrumb className="w-full items-start">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/makers">Makers</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{maker.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="w-full flex flex-col md:flex-row items-start gap-6">
          <div className="size-28 rounded-xl overflow-hidden flex-shrink-0 bg-background border p-0 flex items-center justify-center">
            <img src={maker.image || undefined} alt={maker.name || 'Maker'} className="h-full w-full object-contain" />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-3">{maker.name}</h1>
            <Badge variant="outline" className="mb-4">
              {maker.role === 'ProductManager' ? 'Product Manager' : maker.role}
            </Badge>
            <p className="text-sm text-muted-foreground mb-6">{maker.bio}</p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-6">
              {maker.website && (
                <LinkSocial
                  href={maker.website}
                  icon={<Globe size={16} />}
                  name="Website"
                />
              )}
              {/*
              {maker.email && (
                <LinkSocial
                  href={`mailto:${maker.email}`}
                  icon={<Mail size={16} />}
                  name="Email"
                />
              )}
              */}
              {maker.linkedin && (
                <LinkSocial
                  href={maker.linkedin}
                  icon={<Linkedin size={16} />}
                  name="Linkedin"
                />
              )}
              {maker.twitter && (
                <LinkSocial
                  href={maker.twitter}
                  icon={<Twitter size={16} />}
                  name="Twitter"
                />
              )}
              {maker.github && (
                <LinkSocial
                  href={maker.github}
                  icon={<Github size={16} />}
                  name="Github"
                />
              )}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </LayoutSection>
  )
} 