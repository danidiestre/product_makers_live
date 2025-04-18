'use client'

import { FC, useState, useEffect } from 'react'
import { ArrowLeft, Share2, ThumbsUp, MessageSquare, Calendar, ExternalLink, Code, Github, Globe, Smartphone, Play, LogIn } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getAppById } from '@/lib/data'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { FeaturedBadge } from '@/components/FeaturedBadge'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'

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

  // Background pattern style for when there's no cover image
  const patternStyle = {
    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)`,
    backgroundSize: '24px 24px',
  }

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
        <LayoutSection className="border-b pt-6 pb-12 bg-muted/40 dark:bg-background">
          <LayoutContainer>
            {/* Breadcrumb */}
            <div className="w-full flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">
                {app.name}
              </span>
            </div>

            <div className="w-full flex items-start gap-6">
              <div className="h-24 w-24 rounded-xl overflow-hidden flex-shrink-0 bg-background shadow-lg border p-3 flex items-center justify-center">
                <img src={app.imageUrl} alt={app.name} className="h-full w-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {app.badges?.map((badge) => (
                    <span
                      key={badge}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge === 'new' ? 'bg-blue-100 text-blue-800' :
                        badge === 'trending' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}
                    >
                      {badge === 'new' ? 'New' :
                        badge === 'trending' ? 'Trending' :
                          'Top of the Week'}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl font-bold text-foreground">{app.name}</h1>

                {/* Makers */}
                <div className="flex items-center mt-2 mb-3">
                  <div className="flex -space-x-2 mr-3">
                    {app.makers?.slice(0, 3).map((maker, index) => (
                      <div key={index} className="h-7 w-7 rounded-full overflow-hidden border-2 border-white">
                        <img src={maker.avatar} alt={maker.name} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    By {app.makers?.map(m => m.name).join(', ')}
                  </span>
                </div>

                {/* App type and description */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {app.externalLinks?.appStore && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center">
                      <Smartphone className="h-3 w-3 mr-1" />
                      iOS
                    </span>
                  )}
                  {app.externalLinks?.playStore && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md flex items-center">
                      <Play className="h-3 w-3 mr-1" />
                      Android
                    </span>
                  )}
                  {app.externalLinks?.website && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      Web
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>

                {/* External links */}
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {app.externalLinks?.website && (
                      <a
                        href={app.externalLinks.website}
                        className="flex items-center text-sm text-gray-600 hover:text-brand-blue"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    )}
                    {app.externalLinks?.github && (
                      <a
                        href={app.externalLinks.github}
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    )}
                  </div>

                  {/* Main CTAs */}
                  <div className="flex items-center gap-2">
                    {/* Visit project button */}
                    {app.externalLinks?.website && (
                      <a
                        href={app.externalLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Link Proyecto</span>
                      </a>
                    )}

                    {/* Comments button */}
                    <Link
                      href="#comments"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200"
                    >
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span>{app.commentsCount}</span>
                    </Link>

                    {/* Upvote button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={handleUpvote}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${hasUpvoted
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                            }`}
                        >
                          <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'text-blue-600' : 'text-gray-500'}`} />
                          <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {hasUpvoted ? "Remove upvote" : "Upvote this app"}
                      </TooltipContent>
                    </Tooltip>

                    {/* Share button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
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
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200"
                        >
                          <Share2 className="h-4 w-4 text-gray-500" />
                          <span>Compartir</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Share this app
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
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-foreground">Discussion</h2>
                    <span className="bg-muted/40 text-muted-foreground px-2 py-1 rounded-md text-sm">
                      {app.commentsCount} comments
                    </span>
                  </div>

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
                  <div className="border rounded-lg p-6 bg-muted/40">
                    <div className="text-center">
                      <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <h3 className="text-muted-foreground font-medium mb-2">Únete a la conversación</h3>
                      <p className="text-muted-foreground text-sm mb-4">Inicia sesión para dejar un comentario</p>
                      <Button
                        variant="secondary"
                        asChild
                      >
                        <Link href="/login" className="flex items-center gap-2">
                          <LogIn size={20} />
                          Inicia sesión para comentar
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
                          <div className="h-12 w-12 rounded-full overflow-hidden">
                            <img src={maker.avatar} alt={maker.name} className="h-full w-full object-cover" />
                          </div>
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
                    <div className="divide-y divide-border">
                      {/* Launch date */}
                      <div className="p-6">
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
                      </div>

                      {/* Downloads */}
                      {app.metrics.downloads && (
                        <div className="p-6">
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
                        </div>
                      )}

                      {/* Active Users */}
                      {app.metrics.activeUsers && (
                        <div className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                              <MessageSquare className="h-5 w-5 text-brand-blue" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Usuarios activos</p>
                              <p className="text-base font-medium text-foreground">
                                {app.metrics.activeUsers.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Average Rating */}
                      {app.metrics.avgRating && (
                        <div className="p-6">
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