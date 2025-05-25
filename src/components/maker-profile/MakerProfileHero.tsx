'use client'

import { FC } from 'react'
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

interface MakerProfileHeroProps {
  maker: User
}

export const MakerProfileHero: FC<MakerProfileHeroProps> = ({ maker }) => {
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
            <h1 className="text-3xl font-bold text-foreground mb-2">{maker.name}</h1>
            <p className="text-base text-foreground mb-4 line-clamp-1">{maker.role}</p>
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
              {maker.email && (
                <LinkSocial
                  href={`mailto:${maker.email}`}
                  icon={<Mail size={16} />}
                  name="Email"
                />
              )}
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