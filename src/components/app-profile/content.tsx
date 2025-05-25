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
      {/* Makers Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Makers</CardTitle>
          <CardDescription>Creadores de {app.name}</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {app.makers?.map((maker, index) => (
              <div key={maker.id || index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={maker.avatar}
                    alt={maker.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{maker.name}</h4>
                    <p className="text-sm text-muted-foreground">{maker.role}</p>
                  </div>
                </div>
                {maker.bio && (
                  <p className="mt-2 text-sm text-muted-foreground">{maker.bio}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Screenshots */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Producto</CardTitle>
          <CardDescription>Imágenes y capturas de {app.name}</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.screenshots && app.screenshots.length > 0 ? (
            <div className="mt-2">
              <Carousel 
                className="border border-border/50 rounded-lg aspect-auto"
                showArrows={app.screenshots.length > 1}
                showIndicators={app.screenshots.length > 1}
              >
                {app.screenshots.map((screenshot, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-center p-4 cursor-pointer"
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
            </div>
          ) : (
            <p className="text-muted-foreground italic mt-2">No hay capturas disponibles</p>
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
              variant="outline" 
              size="icon" 
              className="absolute top-4 right-4 bg-background/20 hover:bg-background/40 rounded-full"
              onClick={closeFullscreen}
            >
              <X className="size-5" />
            </Button>
            
            {app.screenshots && app.screenshots.length > 1 && (
              <>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 rounded-full"
                  onClick={prevFullscreenImage}
                >
                  <ChevronLeft className="size-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 rounded-full"
                  onClick={nextFullscreenImage}
                >
                  <ChevronRight className="size-5" />
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
            <p className="mt-2">{app.problem}</p>
          ) : (
            <p className="text-muted-foreground italic mt-2">No hay información disponible</p>
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
            <p className="mt-2">{app.solution}</p>
          ) : (
            <p className="text-muted-foreground italic mt-2">No hay información disponible</p>
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
            <p className="mt-2">{app.features}</p>
          ) : (
            <p className="text-muted-foreground italic mt-2">No hay información disponible</p>
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
            <p className="mt-2">{app.monetization}</p>
          ) : (
            <p className="text-muted-foreground italic mt-2">No hay información disponible</p>
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
            <p className="mt-2">{app.roadmap}</p>
          ) : (
            <p className="text-muted-foreground italic mt-2">No hay información disponible</p>
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
            <p className="mt-2">{app.technology}</p>
          ) : (
            app.technologies ? (
              <div className="flex flex-wrap gap-2 mt-2">
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
              <p className="text-muted-foreground italic mt-2">No hay información disponible</p>
            )
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
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
    </div>
  )
} 