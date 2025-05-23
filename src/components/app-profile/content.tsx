import { FC } from 'react'
import { MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { App } from '@/lib/types'

interface AppProfileContentProps {
  app: App
}

export const AppProfileContent: FC<AppProfileContentProps> = ({ app }) => {
  const styles = {
    card: "w-full bg-transparent border-none rounded-none gap-4",
    cardHeader: "p-0",
    cardTitle: "text-2xl font-semibold text-foreground",
    cardContent: "p-0 text-base font-medium text-muted-foreground",
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

      {/* Problem Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Problema</CardTitle>
          <CardDescription>Que pretende resolver el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          ### Añadir Problema aquí ###
        </CardContent>
      </Card>

      {/* Solution Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Solución</CardTitle>
          <CardDescription>Que aporta tu producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          ### Añadir Solución aquí ###
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Funcionalidades</CardTitle>
          <CardDescription>Funcionalidades principales del producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          ### Añadir Funcionalidades aquí ###
        </CardContent>
      </Card>

      {/* Monetization Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Monetización</CardTitle>
          <CardDescription>Cómo monetiza el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          ### Añadir Monetización aquí ###
        </CardContent>
      </Card>

      {/* Roadmap Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Roadmap</CardTitle>
          <CardDescription>Que plan hay para el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          ### Añadir Roadmap aquí ###
        </CardContent>
      </Card>

      {/* Technology Section */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <CardTitle className={styles.cardTitle}>Tecnología</CardTitle>
          <CardDescription>Herramientas usadas en el producto</CardDescription>
        </CardHeader>
        <CardContent className={styles.cardContent}>
          {app.technologies ? (
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
            '### Añadir Tecnología aquí ###'
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