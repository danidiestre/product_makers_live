'use client'

import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { PageHeader } from '@/components/PageHeader'
import Faqs from '@/components/Faqs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Blocks, MessageCircleHeart, Package, PartyPopper, ShieldPlus, ShieldCheck } from 'lucide-react'

export default function AboutPage() {

  return (
    <LayoutWrapper>

      {/* StreamCountdown banner */}
      <StreamCountdownBanner />

      <Navbar />

      <LayoutMain>

        <PageHeader title="Comunidad" />

        <LayoutSection>
          <LayoutContainer className="grid grid-cols-1 gap-6">

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-balance">¿Cuál es el objetivo de esta comunidad?</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-6 space-y-2">
                <p className="text-muted-foreground text-balance">
                  Product Makers es una comunidad vibrante donde makers independientes, diseñadores y emprendedores se reúnen para mostrar sus productos, compartir conocimiento y apoyarse mutuamente en el camino de construir productos digitales exitosos.
                </p>
              </CardContent>
              <Image
                src="/assets/maker.png"
                alt="Product Maker Illustration"
                width={600}
                height={600}
                className="w-full"
              />
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Visión</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-6 space-y-4">
                <p className="text-muted-foreground">
                  Nuestra visión es el futuro de la próxima generación de makers de producto:
                </p>
                <ul className="text-sm font-medium text-muted-foreground text-balance list-none grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <li className="bg-muted rounded-lg p-6 flex flex-col gap-3">
                    <ShieldCheck size={48} strokeWidth={1} />
                    Imaginamos un mundo donde cualquier persona con una gran idea de producto tenga los recursos, el apoyo y la plataforma necesarios para hacerla realidad.
                  </li>
                  <li className="bg-muted rounded-lg p-6 flex flex-col gap-3">
                    <ShieldPlus size={48} strokeWidth={1} />
                    Creemos en democratizar la creación de productos y en fomentar un entorno inclusivo donde los makers puedan crecer y prosperar.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Misión</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-6 space-y-4">
                <p className="text-muted-foreground">
                  Nuestra misión es impulsar a la próxima generación de makers de producto a través de:
                </p>
                <ul className="text-sm font-medium text-muted-foreground text-balance list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <li className="bg-muted rounded-lg p-6 flex flex-col gap-3">
                    <Blocks size={48} strokeWidth={1} />
                    Una plataforma para mostrar y descubrir productos innovadores.
                  </li>
                  <li className="bg-muted rounded-lg p-6 flex flex-col gap-3">
                    <MessageCircleHeart size={48} strokeWidth={1} />
                    El intercambio de conocimiento y la mútua colaboración.
                  </li>
                  <li className="bg-muted rounded-lg p-6 flex flex-col gap-3">
                    <PartyPopper size={48} strokeWidth={1} />
                    Una comunidad que celebra la creatividad y el espíritu emprendedor.
                  </li>
                  <li className="bg-muted rounded-lg p-6 flex flex-col gap-3">
                    <Package size={48} strokeWidth={1} />
                    Recursos y herramientas que ayuden a los makers a tener éxito.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Preguntas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-1 space-y-2">
                <Faqs />
              </CardContent>
            </Card>

          </LayoutContainer>
        </LayoutSection>

      </LayoutMain >

      <Footer />

    </LayoutWrapper >
  )
} 