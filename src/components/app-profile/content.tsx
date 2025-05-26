'use client'

import { FC, useState } from 'react'
import { MessageCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Carousel } from '@/components/ui/carousel'
import { App } from '@/lib/types'
import { MakerCard } from '../MakerCard'
import { Role } from '@prisma/client'

interface AppProfileContentProps {
  app: App
}

export const AppProfileContent: FC<AppProfileContentProps> = ({ app }) => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)

  const styles = {
    card: "w-full bg-transparent border-none rounded-none gap-4",
    cardHeader: "p-0",
    cardTitle: "text-2xl font-semibold text-foreground",
    cardContent: "p-0 text-base font-medium text-muted-foreground",
  }

  const openFullscreen = (index: number) => {
    if (app.screenshots && app.screenshots.length > 0) {
      setFullscreenIndex(index)
      setFullscreenImage(app.screenshots[index])
    }
  }

  const closeFullscreen = () => {
    setFullscreenImage(null)
  }

  const nextFullscreenImage = () => {
    if (!app.screenshots) return
    const newIndex = (fullscreenIndex + 1) % app.screenshots.length
    setFullscreenIndex(newIndex)
    setFullscreenImage(app.screenshots[newIndex])
  }

  const prevFullscreenImage = () => {
    if (!app.screenshots) return
    const newIndex = fullscreenIndex === 0 ? app.screenshots.length - 1 : fullscreenIndex - 1
    setFullscreenIndex(newIndex)
    setFullscreenImage(app.screenshots[newIndex])
  }

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Product Screenshots */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Producto</CardTitle>
          <CardDescription>Imágenes y capturas de {app.name}</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.screenshots && app.screenshots.length > 0 ? (
            <Carousel
              className="border border-border bg-white rounded-xl aspect-auto"
              showArrows={app.screenshots.length > 1}
              showIndicators={app.screenshots.length > 1}
            >
              {app.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => openFullscreen(index)}
                >
                  <img
                    src={screenshot}
                    alt={`${app.name} - Imagen ${index + 1}`}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p className="text-muted-foreground italic">No hay capturas disponibles</p>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={closeFullscreen}>
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullscreenImage}
              alt={`${app.name} - Imagen de pantalla completa`}
              className="max-w-full max-h-full object-contain p-4"
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 rounded-full"
              onClick={closeFullscreen}
            >
              <X className="size-5" />
            </Button>

            {app.screenshots && app.screenshots.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 rounded-full"
                  onClick={prevFullscreenImage}
                >
                  <ChevronLeft className="size-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 rounded-full"
                  onClick={nextFullscreenImage}
                >
                  <ChevronRight className="size-6" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                  <span className="text-white/90 bg-background/20 px-2 py-1 rounded text-sm">
                    {fullscreenIndex + 1} / {app.screenshots.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Problem Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Problema</CardTitle>
          <CardDescription>Que pretende resolver el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.problem ? (
            <p>{app.problem}</p>
          ) : (
            <p className="text-muted-foreground italic">No hay información disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Solution Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Solución</CardTitle>
          <CardDescription>Que aporta tu producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.solution ? (
            <p>{app.solution}</p>
          ) : (
            <p className="text-muted-foreground italic">No hay información disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Funcionalidades</CardTitle>
          <CardDescription>Funcionalidades principales del producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.features ? (
            <p>{app.features}</p>
          ) : (
            <p className="text-muted-foreground italic">No hay información disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Monetization Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Monetización</CardTitle>
          <CardDescription>Cómo monetiza el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.monetization ? (
            <p>{app.monetization}</p>
          ) : (
            <p className="text-muted-foreground italic">No hay información disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Roadmap Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Roadmap</CardTitle>
          <CardDescription>Que plan hay para el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.roadmap ? (
            <p>{app.roadmap}</p>
          ) : (
            <p className="text-muted-foreground italic">No hay información disponible</p>
          )}
        </CardContent>
      </Card>

      {/* Technology Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Tecnología</CardTitle>
          <CardDescription>Herramientas usadas en el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.technology ? (
            <p>{app.technology}</p>
          ) : (
            app.technologies ? (
              <div className="flex flex-wrap gap-2">
                {app.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No hay información disponible</p>
            )
          )}
        </CardContent>
      </Card>

      {/* Makers Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Makers</CardTitle>
          <CardDescription>Creadores de {app.name}</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className="grid grid-cols-1 gap-4">
            {app.makers?.map((maker, index) => (
              <MakerCard
                key={maker.id || index}
                maker={{
                  ...maker,
                  image: maker.avatar ?? null,
                  name: maker.name ?? null,
                  id: maker.id,
                  role: (maker.role as Role) ?? null,
                  email: (maker as any).email ?? null,
                  emailVerified: (maker as any).emailVerified ?? null,
                  banner: (maker as any).banner ?? null,
                  accentColor: (maker as any).accentColor ?? null,
                  bio: maker.bio ?? null,
                  github: (maker as any).github ?? null,
                  twitter: (maker as any).twitter ?? null,
                  linkedin: (maker as any).linkedin ?? null,
                  website: (maker as any).website ?? null,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section - Commented out for first version */}
      {/*
      <hr className="border-t" />
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Comentarios ({app.commentsCount})</CardTitle>
          <CardDescription>Opiniones de los miembros de la comunidad</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className="bg-border rounded-xl p-12">
            <div className="text-center">
              <MessageCircle size={48} className="stroke-[1.5px] text-foreground mx-auto mb-3" />
              <h3 className="text-foreground text-xl font-medium mb-1">Únete a la conversación</h3>
              <p className="text-foreground/60 font-medium text-sm mb-6">Entra en Discord para dejar un comentario</p>
              <Button asChild variant="secondary">
                <Link href="https://discord.gg/productmakers" target="_blank" className="gap-2">
                  <MessageCircle size={16} />
                  Accede a Discord
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      */}
    </div>
  )
} 