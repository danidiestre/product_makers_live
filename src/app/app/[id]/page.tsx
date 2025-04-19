'use client'

import { FC, useState, useEffect } from 'react'
import { ArrowLeft, Share2, ThumbsUp, MessageCircle, Calendar, Github, Globe, LogIn, SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getAppById } from '@/lib/data'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FeaturedBadge } from '@/components/FeaturedBadge'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Badge } from '@/components/ui/badge'
import { LinkSocial } from '@/components/LinkSocial'

const AppProfilePage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)

  // Find the app from data service
  const app = getAppById(id as string)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!app) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground">App not found</h1>
        <p className="mt-4 text-muted-foreground">The app you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="mt-6 inline-flex items-center text-brand-blue hover:text-brand-blue/80">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
    )
  }

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted)
    // In a real app, you would call an API to update the vote count
  }

  return (
    <LayoutWrapper>

      <Navbar />

      <LayoutMain>
        {/* App header - Hero section */}
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
                    <Link href="/products">Productos</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{app.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="w-full flex items-start gap-6">

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
                    <Badge variant="top" className="mr-2">Top</Badge>
                  )}
                  {app.badges?.includes('trending') && (
                    <Badge variant="trending" className="mr-2">Trending</Badge>
                  )}
                  {app.badges?.includes('new') && (
                    <Badge variant="new" className="mr-2">Novedad</Badge>
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

                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 text-balance">{app.description}</p>

                <div className="flex flex-col">

                  {/* External links HIDDEN FOR NOW AS MAYBE THEY BELONG TO SOMEWHERE ELSE */}
                  <div className="hidden flex-wrap gap-3 mb-4">
                    {app.externalLinks?.website && (
                      <LinkSocial
                        href={app.externalLinks.website}
                        icon={<Globe size={16} />}
                        name="Website"
                      />
                    )}
                    {app.externalLinks?.github && (
                      <LinkSocial
                        href={app.externalLinks.github}
                        icon={<Github size={16} />}
                        name="GitHub"
                      />
                    )}
                  </div>

                  {/* Main CTAs */}
                  <div className="flex items-center gap-2">
                    {/* Visit project button */}
                    {app.externalLinks?.website && (
                      <Button asChild variant="default">
                        <Link
                          href={app.externalLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-2 pl-3"
                        >
                          <SquareArrowOutUpRight size={16} />
                          <span>{app.externalLinks.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                        </Link>
                      </Button>
                    )}

                    {/* Upvote button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          onClick={handleUpvote}
                          className={`gap-2 ${hasUpvoted
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
                            className="gap-2"
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
                          className="gap-2"
                          onClick={() => {
                            if (navigator.share) {
                              navigator.share({
                                title: app.name,
                                text: app.description,
                                url: window.location.href,
                              })
                            } else {
                              navigator.clipboard.writeText(window.location.href)
                            }
                          }}
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
                </div>
              </div>
            </div>
          </LayoutContainer>
        </LayoutSection>

        {/* Main content */}
        <LayoutSection>
          <LayoutContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column */}
              <div className="md:col-span-2">
                {/* Description */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Sobre {app.name}</h2>
                  <div className="space-y-6">
                    <div className="bg-muted/40 rounded-lg border p-4">
                      <div className="flex gap-4">
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Problema</h4>
                          <p className="text-sm text-muted-foreground">Los usuarios luchan con [problema específico] que conduce a [resultado negativo].</p>
                        </div>
                        <div className="border-l"></div>
                        <div>
                          <h4 className="font-medium text-foreground mb-2">Solución</h4>
                          <p className="text-sm text-muted-foreground">Ofrecemos [solución clave] que ayuda a los usuarios a [alcanzar el resultado deseado].</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{app.description}</p>
                  </div>
                </section>

                {/* Screenshots */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Capturas de pantalla</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {app.screenshots?.map((screenshot, index) => (
                      <div key={index} className="rounded-lg overflow-hidden border shadow-sm">
                        <img
                          src={screenshot}
                          alt={`${app.name} screenshot ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Comments section */}
                <section className="mt-12 border-t pt-8" id="comments">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Comentarios ({app.commentsCount})</h2>

                  {/* Example Comments */}
                  <div className="space-y-6 mb-8">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                          <img src="https://avatars.githubusercontent.com/u/1234567" alt="User avatar" className="h-full w-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Sarah Chen</span>
                          <span className="text-sm text-muted-foreground">hace 2 días</span>
                        </div>
                        <p className="text-muted-foreground">¡Este es exactamente lo que estaba buscando! El diseño es tan limpio y fácil de usar. ¿Has considerado agregar atajos de teclado para usuarios avanzados?</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                          <img src="https://avatars.githubusercontent.com/u/7654321" alt="User avatar" className="h-full w-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">Alex Rivera</span>
                          <span className="text-sm text-muted-foreground">hace 1 día</span>
                        </div>
                        <p className="text-muted-foreground">¡Gran trabajo en esto! Estoy curioso por el stack tecnológico que usaste. ¿Alguna idea de hacerlo de código abierto?</p>
                      </div>
                    </div>
                  </div>

                  {/* Sign in to comment prompt */}
                  <div className="border rounded-lg p-12">
                    <div className="text-center">
                      <MessageCircle size={48} className="stroke-[1.5px] text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-muted-foreground text-xl font-medium mb-1">Únete a la conversación</h3>
                      <p className="text-muted-foreground font-medium text-sm mb-6">Inicia sesión para dejar un comentario</p>
                      <Button
                        variant="secondary"
                        asChild
                      >
                        <Link href="/login" className="flex items-center gap-2">
                          <LogIn size={20} />
                          Inicia sesión
                        </Link>
                      </Button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div>
                {/* App makers */}
                <section className="mb-6 bg-background rounded-lg border overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold text-foreground">Conoce a los makers</h3>
                  </div>
                  <div className="divide-y divide-border">
                    {app.makers?.map((maker, index) => (
                      <div key={index} className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="size-12 rounded-full overflow-hidden border-2 border-background">
                            <AvatarImage src={maker.avatar} />
                            <AvatarFallback className="text-xl bg-muted-foreground text-background">{maker.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-foreground">{maker.name}</h4>
                                <p className="text-sm text-muted-foreground">{maker.role}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                {maker.twitter && (
                                  <a
                                    href={`https://twitter.com/${maker.twitter}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                  </a>
                                )}
                                {maker.github && (
                                  <a
                                    href={`https://github.com/${maker.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                                  >
                                    <Github className="w-5 h-5" />
                                  </a>
                                )}
                                {maker.website && (
                                  <a
                                    href={maker.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-brand-blue transition-colors"
                                  >
                                    <Globe className="w-5 h-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                            {maker.bio && (
                              <p className="mt-2 text-sm text-muted-foreground">{maker.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Featured Badge */}
                <section className="mb-6 bg-background rounded-lg border overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold text-foreground">Badge Destacado</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-center">
                      <FeaturedBadge />
                    </div>
                  </div>
                </section>

                {/* Release Information */}
                <section className="mb-6 bg-background rounded-lg border overflow-hidden">
                  <div className="px-6 py-4 border-b">
                    <h3 className="font-semibold text-foreground">Información de lanzamiento</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                        <Calendar className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lanzamiento inicial</p>
                        <p className="text-base font-medium text-foreground">
                          {new Date(app.launchDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Metrics */}
                {app.metrics && (
                  <section className="mb-6 bg-background rounded-lg border overflow-hidden">
                    <div className="px-6 py-4 border-b">
                      <h3 className="font-semibold text-foreground">Métricas</h3>
                    </div>
                    <div className="flex flex-col p-6 gap-6">
                      {/* Launch date */}
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                          <Calendar className="h-5 w-5 text-brand-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Fecha de lanzamiento</p>
                          <p className="text-base font-medium text-foreground">
                            {new Date(app.launchDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      {/* Downloads */}
                      {app.metrics.downloads && (
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                            <ArrowLeft className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Descargas</p>
                            <p className="text-base font-medium text-foreground">
                              {app.metrics.downloads.toLocaleString()}
                            </p>
                          </div>
                        </div>

                      )}

                      {/* Active Users */}
                      {app.metrics.activeUsers && (
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                            <MessageCircle className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Usuarios activos</p>
                            <p className="text-base font-medium text-foreground">
                              {app.metrics.activeUsers.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Average Rating */}
                      {app.metrics.avgRating && (
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                            <ThumbsUp className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Puntuación promedio</p>
                            <p className="text-base font-medium text-foreground">
                              {app.metrics.avgRating}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper >
  )
}

export default AppProfilePage 