'use client'

import { FC, useState, useEffect } from 'react'
import { ArrowLeft, Share2, ThumbsUp, MessageCircle, Github, Globe, LogIn, SquareArrowOutUpRight, Car } from 'lucide-react'
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Badge } from '@/components/ui/badge'

const AppProfilePage: FC = () => {
  const params = useParams()
  const id = params?.id as string
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)

  // Find the app from data service
  const app = getAppById(id)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!app) {
    return (
      <LayoutSection>
        <LayoutContainer>
          <h1 className="text-2xl font-bold text-foreground mb-2">Producto no encontrado</h1>
          <p className="mt-4 text-muted-foreground mb-4">El producto que estás buscando no existe o ha sido eliminado.</p>
          <Button asChild variant="secondary">
            <Link href="/" className="gap-2">
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </Button>
        </LayoutContainer>
      </LayoutSection>
    )
  }

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted)
    // In a real app, you would call an API to update the vote count
  }

  const styles = {
    card: "w-full bg-transparent border-none rounded-none gap-4",
    cardHeader: "p-0",
    cardTitle: "text-2xl font-semibold text-foreground",
    cardContent: "p-0 text-base font-medium text-muted-foreground",
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
                          <span>{app.externalLinks.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                        </Link>
                      </Button>
                    )}

                    <div className="w-full sm:w-auto flex items-center gap-2">
                      {/* Upvote button */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="secondary"
                            onClick={handleUpvote}
                            className={`w-full sm:w-24 gap-2 ${hasUpvoted
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
                              className="w-full sm:w-24 gap-2"
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

                    </div>

                    {/* Share button */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          className="w-full sm:w-auto gap-2"
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

            <div className="w-full flex flex-col gap-12">

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Makers</CardTitle>
                  <CardDescription>Creadores de {app.name}</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir el componente de MakerCard.tsx ###
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Producto</CardTitle>
                  <CardDescription>Imágenes y capturas de {app.name}</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {app.screenshots?.map((screenshot, index) => (
                      <div key={index} className="rounded-lg overflow-hidden ring-4 ring-border/50">
                        <img
                          src={screenshot}
                          alt={`${app.name} - Imagen ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Problema</CardTitle>
                  <CardDescription>Que pretende resolver el producto</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir Problema aquí ###
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Solución</CardTitle>
                  <CardDescription>Que aporta tu producto</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir Solución aquí ###
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Funcionalidades</CardTitle>
                  <CardDescription>Funcionalidades principales del producto</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir Funcionalidades aquí ###
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Monetización</CardTitle>
                  <CardDescription>Cómo monetiza el producto</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir Monetización aquí ###
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Roadmap</CardTitle>
                  <CardDescription>Que plan hay para el producto</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir Roadmap aquí ###
                </CardContent>
              </Card>

              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Tecnología</CardTitle>
                  <CardDescription>Herramientas usadas en el producto</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  ### Añadir Tecnología aquí ###
                </CardContent>
              </Card>

              {/* Comments section */}
              <hr className="border-t" />
              <Card className={styles.card}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>Comentarios ({app.commentsCount})</CardTitle>
                  <CardDescription>Opiniones de los miembros de la comunidad</CardDescription>
                </CardHeader>
                <CardContent className={styles.cardContent}>
                  {/* Go to Discord to comment */}
                  <div className="bg-border rounded-xl p-12">
                    <div className="text-center">
                      <MessageCircle size={48} className="stroke-[1.5px] text-foreground mx-auto mb-3" />
                      <h3 className="text-foreground text-xl font-medium mb-1">Únete a la conversación</h3>
                      <p className="text-foreground/60 font-medium text-sm mb-6">Entra en Discord para dejar un comentario</p>
                      <Button
                        variant="default"
                        asChild
                      >
                        <Link href="/login" className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                          </svg>
                          Accede a Discord
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* <section className="border-t pt-8" id="comments">
                <h2 className="text-xl font-semibold text-foreground mb-6">Comentarios ({app.commentsCount})</h2>
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
              </section> */}

            </div>

          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper >
  )
}

export default AppProfilePage 