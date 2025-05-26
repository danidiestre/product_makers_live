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
import { Button } from "@/components/ui/button"
import { Blocks, MessageCircleHeart, Package, PartyPopper, ShieldPlus, ShieldCheck, Copy, Download, Share, Check, ChevronLeft, ChevronRight, ExternalLink, SquareArrowOutUpRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function AboutPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [currentMakerImage, setCurrentMakerImage] = useState(0)

  const makerImages = [
    {
      src: '/assets/maker.png',
      alt: 'Product Maker Illustration 1'
    },
    {
      src: '/assets/maker2.png',
      alt: 'Product Maker Illustration 2'
    },
    {
      src: '/assets/maker3.png',
      alt: 'Product Maker Illustration 3'
    },
    {
      src: '/assets/maker4.png',
      alt: 'Product Maker Illustration 4'
    }
  ]

  const shareTexts = [
    {
      id: 'short',
      title: 'Para Twitter/X',
      text: 'Únete a #ProductMakers: comunidad en español donde pros de producto de todas las áreas llevamos ideas a lanzamientos reales. ¿Te apuntas? 💡🤝 #Makers\n\nÚnete en https://www.productmakers.ai/ y Discord: https://discord.com/invite/PnBJNwDW77'
    },
    {
      id: 'medium',
      title: 'Para LinkedIn',
      text: 'Si trabajas en producto (diseño, negocio, datos, tech… ¡lo que sea!) y quieres llevar ideas a productos reales de principio a fin, pásate por Product Makers. Ya somos cientos compartiendo retos, recursos y apoyo. ¿Te unes?\n\nÚnete en https://www.productmakers.ai/ y Discord: https://discord.com/invite/PnBJNwDW77'
    },
    {
      id: 'long',
      title: 'Para Blog/Newsletter',
      text: 'Descubrí Product Makers y me enganché: una comunidad en español donde makers, diseñadores y emprendedores construimos productos digitales paso a paso, en directo y con apoyo mutuo.\nSi buscas inspiración, feedback y compañeros de viaje para tu próximo proyecto, échale un vistazo y súmate. ¡Nos vemos dentro! 🚀\n\nÚnete en https://www.productmakers.ai/ y Discord: https://discord.com/invite/PnBJNwDW77'
    }
  ]

  const visualAssets = [
    {
      id: 'linkedin',
      title: 'Banner',
      description: 'Para Linkedin, Twitter, Facebook',
      dimensions: '1200x630px',
      src: '/assets/social_assets/linkedin.png'
    },
    {
      id: 'story',
      title: 'Story Vertical',
      description: 'Para Instagram Stories, TikTok',
      dimensions: '1080x1920px',
      src: '/assets/social_assets/story.png'
    },
    {
      id: 'logo_big',
      title: 'Logo Grande',
      description: 'Para posts, presentaciones',
      dimensions: 'Alta resolución',
      src: '/assets/social_assets/logo_big.png'
    },
    {
      id: 'logo_blue',
      title: 'Logo Azul',
      description: 'Para firmas, avatares',
      dimensions: 'Versión compacta',
      src: '/assets/social_assets/logo_blue.png'
    }
  ]

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(id)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }

  const downloadAsset = (src: string, filename: string) => {
    const link = document.createElement('a')
    link.href = src
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
                  Product Makers es el punto de encuentro para profesionales de producto: makers independientes, diseñadores, desarrolladores y emprendedores que quieren llevar sus ideas de principio a fin. Aquí mostramos lo que construimos, compartimos conocimiento y nos apoyamos mutuamente para convertir cada proyecto en un producto digital de éxito.
                </p>
              </CardContent>
              <div className="relative group">
                <Image
                  src={makerImages[currentMakerImage].src}
                  alt={makerImages[currentMakerImage].alt}
                  width={600}
                  height={600}
                  className="w-full"
                />

                {/* Navigation arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/0 hover:bg-white/30 transition-all"
                  onClick={() => setCurrentMakerImage(currentMakerImage === 0 ? makerImages.length - 1 : currentMakerImage - 1)}
                >
                  <ChevronLeft size={20} className="text-white" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/0 hover:bg-white/30 transition-all"
                  onClick={() => setCurrentMakerImage(currentMakerImage === makerImages.length - 1 ? 0 : currentMakerImage + 1)}
                >
                  <ChevronRight size={20} className="text-white" />
                </Button>

                {/* Download button */}
                <Button
                  variant="default"
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm border border-white/0 hover:bg-white/30 text-white flex items-center gap-2"
                  onClick={() => downloadAsset(makerImages[currentMakerImage].src, `maker-illustration-${currentMakerImage + 1}.png`)}
                >
                  <Download size={16} />
                  Descargar
                </Button>

                {/* Image indicator dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {makerImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentMakerImage ? 'bg-white' : 'bg-white/50'
                        }`}
                      onClick={() => setCurrentMakerImage(index)}
                    />
                  ))}
                </div>
              </div>
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
                    Imaginamos un mundo donde cualquier persona apasionada por crear productos digitales tenga los recursos, el apoyo y la plataforma necesarios para convertir sus ideas en realidad.
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
                <CardTitle className="text-2xl">Únete a Nuestros Canales</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-6 space-y-4">
                <p className="text-muted-foreground">
                  Conecta con la comunidad Product Makers a través de nuestros principales canales de comunicación.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Discord Card */}
                  <div className="bg-muted rounded-lg p-6 flex flex-col gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">Discord</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Únete a conversaciones diarias, comparte tu progreso y conecta con otros makers en tiempo real.
                      </p>
                    </div>
                    <Button
                      asChild
                      size="default"
                      className="bg-[#5865F2] hover:bg-[#5865F2] text-white font-medium border-0 w-full"
                    >
                      <Link
                        href="https://discord.com/invite/PnBJNwDW77"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                        </svg>
                        <span>Únete al Discord</span>
                      </Link>
                    </Button>
                  </div>

                  {/* YouTube Card */}
                  <div className="bg-muted rounded-lg p-6 flex flex-col gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">YouTube</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Aprende con tutoriales, participa en streams en vivo y descubre casos de éxito de otros makers.
                      </p>
                    </div>
                    <Button
                      asChild
                      size="default"
                      className="bg-[#FF0000] hover:bg-[#FF0000] text-white font-medium border-0 w-full"
                    >
                      <Link
                        href="https://www.youtube.com/@productmakers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        <span>Ver en YouTube</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Comparte la Comunidad</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-6 space-y-6">
                <p className="text-muted-foreground">
                  Product Makers crece cuando más makers se unen. Ayúdanos a expandir la comunidad compartiendo estos recursos.
                </p>
                {/* Textos para Compartir */}
                <div className="grid grid-cols-1 gap-4">
                  {shareTexts.map((item) => (
                    <div key={item.id} className="bg-muted rounded-lg px-6 py-5 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(item.text, item.id)}
                        className="absolute top-2 right-2 flex items-center gap-2"
                      >
                        {copiedText === item.id ? (
                          <>
                            <Check size={16} />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            Copiar
                          </>
                        )}
                      </Button>
                      <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-medium">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Assets Visuales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Assets Visuales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {visualAssets.map((asset) => (
                      <div key={asset.id} className="bg-muted rounded-lg p-4 space-y-3">
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={asset.src}
                            alt={asset.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h4 className="font-medium">{asset.title}</h4>
                          <p className="text-xs text-muted-foreground">{asset.description}</p>
                          <p className="text-xs font-mono text-muted-foreground">{asset.dimensions}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadAsset(asset.src, `product-makers-${asset.id}.png`)}
                            className="w-full flex items-center gap-2"
                          >
                            <Download size={16} />
                            Descargar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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