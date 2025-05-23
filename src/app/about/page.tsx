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
import { Blocks, MessageCircleHeart, Package, PartyPopper, ShieldPlus, ShieldCheck, Copy, Download, Share, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function AboutPage() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [currentMakerImage, setCurrentMakerImage] = useState(0)
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null)

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
      title: 'Banner LinkedIn',
      description: 'Para LinkedIn, Twitter, Facebook',
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
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
                  onClick={() => setCurrentMakerImage(currentMakerImage === 0 ? makerImages.length - 1 : currentMakerImage - 1)}
                >
                  <ChevronLeft size={20} className="text-white" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
                  onClick={() => setCurrentMakerImage(currentMakerImage === makerImages.length - 1 ? 0 : currentMakerImage + 1)}
                >
                  <ChevronRight size={20} className="text-white" />
                </Button>

                {/* Download button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white flex items-center gap-2"
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
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentMakerImage ? 'bg-white' : 'bg-white/50'
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
                <CardTitle className="text-2xl">Comparte la Comunidad</CardTitle>
              </CardHeader>
              <CardContent className="pt-1 pb-6 space-y-6">
                <p className="text-muted-foreground">
                  Product Makers crece cuando más makers se unen. Ayúdanos a expandir la comunidad compartiendo estos recursos.
                </p>
                
                {/* Textos para Compartir */}
                <div className="grid grid-cols-1 gap-4">
                  {shareTexts.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="relative bg-muted rounded p-3">
                        <p className="text-sm text-muted-foreground pr-24">
                          {item.text}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(item.text, item.id)}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center gap-2"
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
                      </div>
                    </div>
                  ))}
                </div>

                {/* Assets Visuales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Assets Visuales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {visualAssets.map((asset) => (
                      <div 
                        key={asset.id} 
                        className="border rounded-lg p-4 space-y-3 relative group"
                        onMouseEnter={() => setHoveredAsset(asset.id)}
                        onMouseLeave={() => setHoveredAsset(null)}
                      >
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer">
                          <Image
                            src={asset.src}
                            alt={asset.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="space-y-2">
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

                        {/* Tooltip Preview */}
                        {hoveredAsset === asset.id && (
                          <div className="absolute z-10 -top-2 -right-2 translate-x-full">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 max-w-xs">
                              <Image
                                src={asset.src}
                                alt={asset.title}
                                width={200}
                                height={150}
                                className="w-full h-auto rounded"
                              />
                              <div className="mt-2 text-xs">
                                <p className="font-medium">{asset.title}</p>
                                <p className="text-muted-foreground">{asset.dimensions}</p>
                              </div>
                            </div>
                            {/* Arrow pointing to the asset */}
                            <div className="absolute top-4 -left-2 w-4 h-4 bg-white border-l border-b border-gray-200 transform rotate-45"></div>
                          </div>
                        )}
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