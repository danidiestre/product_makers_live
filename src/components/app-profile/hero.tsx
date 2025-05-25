import { FC } from 'react'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { App } from '@/lib/types'
import { AppProfileActions } from './actions'

interface AppProfileHeroProps {
  app: App
}

export const AppProfileHero: FC<AppProfileHeroProps> = ({ app }) => {
  return (
    <LayoutContainer>
      {/* Breadcrumb */}
      <Breadcrumb className="w-full items-start mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">Productos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{app.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full flex flex-col md:flex-row items-start gap-6">
        <div className="size-28 rounded-xl overflow-hidden flex-shrink-0 bg-background border p-0 flex items-center justify-center">
          <img src={app.imageUrl} alt={app.name} className="h-full w-full object-contain" />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">{app.name}</h1>
          <p className="text-base text-foreground mb-3 line-clamp-1">{app.tagline}</p>

          {/* Makers */}
          <div className="flex items-center mb-4">
            <div className="flex -space-x-2 mr-2">
              {app.makers?.slice(0, 3).map((m, i) => (
                <Avatar key={i} className="size-6 rounded-full overflow-hidden border-2 border-background">
                  <AvatarImage src={m.avatar} />
                  <AvatarFallback className="text-xs bg-muted-foreground text-background">{m.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Creado por {app.makers?.map(m => m.name).join(', ')}
            </span>
          </div>

          {/* App type and description */}
          <div className="flex flex-wrap gap-1 mb-4">
            {app.badges?.includes('top') && (
              <Badge variant="top">Top</Badge>
            )}
            {app.badges?.includes('trending') && (
              <Badge variant="trending">Popular</Badge>
            )}
            {app.badges?.includes('new') && (
              <Badge variant="new">Novedad</Badge>
            )}
            {app.externalLinks?.website && (
              <Badge variant="secondary">Web</Badge>
            )}
            {app.externalLinks?.appStore && (
              <Badge variant="secondary">iOS</Badge>
            )}
            {app.externalLinks?.playStore && (
              <Badge variant="secondary">Android</Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-6">{app.description}</p>

          <div className="flex flex-col md:flex-row">
            {/* Main CTAs */}
            <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2">
              {/* Visit project button */}
              {app.externalLinks?.website && (
                <Button asChild variant="default">
                  <Link
                    href={app.externalLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2 pl-3 w-full sm:w-auto"
                  >
                    <SquareArrowOutUpRight size={16} />
                    <span className="truncate max-w-[150px] sm:max-w-[220px] md:max-w-[250px]">
                      {app.externalLinks.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </span>
                  </Link>
                </Button>
              )}

              <AppProfileActions app={app} />
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  )
} 