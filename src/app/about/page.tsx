'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ChevronDown } from 'lucide-react'
import Script from 'next/script'
import Image from 'next/image'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'

// Metadata is handled in metadata.ts in the same directory for Next.js 13+
// Cannot use export const metadata in client components

export default function AboutPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]) // First one open by default

  const toggleFaq = (index: number) => {
    setOpenFaqs(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  // FAQ items
  const faqItems = [
    {
      question: "¿Qué es Product Makers?",
      answer: "Product Makers es una comunidad hispanohablante para quienes crean productos digitales, donde se comparten experiencias reales y se ayuda a otros a construir productos viables desde cero."
    },
    {
      question: "¿Cuál es el objetivo principal de esta comunidad?",
      answer: <>
        <p className="text-gray-600 mb-3">
          Crear un espacio donde los makers puedan:
        </p>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Aprender unos de otros</li>
          <li>Compartir herramientas y procesos</li>
          <li>Recibir feedback en tiempo real</li>
          <li>Desarrollar productos reales, no solo ideas teóricas</li>
        </ul>
      </>
    },
    {
      question: "¿Qué define a un Product Maker?",
      answer: "Un Product Maker es alguien capaz de construir y lanzar productos digitales por su cuenta o en colaboración. No necesita ser experto en todo, pero entiende y participa en todo el proceso: ideación, diseño, desarrollo, validación, lanzamiento, etc."
    },
    {
      question: "¿A quién está dirigida esta comunidad?",
      answer: "Diseñadores, desarrolladores, PMs, indie hackers, CTOs, emprendedores y cualquier persona interesada en crear productos digitales, ya sea desde cero o dentro de una empresa."
    },
    {
      question: "¿Necesito conocimientos técnicos para participar?",
      answer: "No necesariamente. Aunque muchos miembros vienen del mundo del producto, cualquiera con ganas de aprender, compartir y construir es bienvenido."
    },
    {
      question: "¿Qué tipo de contenido se compartirá?",
      answer: <ul className="text-gray-600 list-disc pl-6 space-y-1">
        <li>Desarrollo de producto en público (building in public)</li>
        <li>Entrevistas y casos de estudio</li>
        <li>Charlas temáticas sobre UX, ASO, SEO, growth, etc.</li>
        <li>Comparación de flujos de trabajo</li>
        <li>Herramientas y metodologías (MVPs, MCPs, diseño a código, etc.)</li>
      </ul>
    },
    {
      question: "¿Dónde puedo seguir el contenido?",
      answer: "Todo el contenido se compartirá en el canal de YouTube de Product Makers. Los eventos se anunciarán en plataformas como LinkedIn e Instagram, y las inscripciones se harán a través de Luma."
    },
    {
      question: "¿Hay una plataforma para la comunidad?",
      answer: <>
        <p className="text-gray-600 mb-3">
          Sí, usamos Discord para:
        </p>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Compartir recursos</li>
          <li>Resolver dudas</li>
          <li>Recibir feedback</li>
          <li>Conectar con otros makers</li>
        </ul>
        <p className="text-gray-600 mt-3">
          También hemos creado un canal de voz como coworking virtual.
        </p>
      </>
    },
    {
      question: "¿Cuál es el espíritu de la comunidad?",
      answer: "Cero bullshit. Todo es real, práctico y basado en la experiencia. Queremos impulsarnos entre todos, colaborar y construir un ecosistema creativo sólido en el mundo hispanohablante."
    },
    {
      question: "¿Esto tiene fines comerciales?",
      answer: "No. El proyecto nació con el objetivo de crear valor y comunidad, sin intención inmediata de monetización. Si en algún momento hay patrocinadores, será sin comprometer la independencia ni la utilidad de la comunidad."
    },
    {
      question: "¿Cómo puedo participar?",
      answer: <ol className="text-gray-600 list-decimal pl-6 space-y-1">
        <li>Apúntate a los eventos vía Luma.</li>
        <li>Únete al Discord.</li>
        <li>Comparte tus proyectos, ideas y dudas.</li>
        <li>Suscríbete al canal de YouTube de Product Makers.</li>
      </ol>
    },
    {
      question: "¿Por qué en español?",
      answer: "Porque es el idioma natural del equipo organizador y del público objetivo. Queremos crear contenido de calidad y accesible para España y Latinoamérica."
    }
  ]

  // JSON-LD for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string'
          ? faq.answer
          : "See the Product Makers website for complete details."
      }
    }))
  };

  return (
    <LayoutWrapper>

      {/* Add JSON-LD for FAQ rich snippets */}
      <Script
        id="about-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* StreamCountdown banner */}
      <StreamCountdownBanner />

      <Navbar />

      <LayoutMain>

        <LayoutSection labelledby="about-title">
          <LayoutContainer>
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-4xl font-bold" id="about-title">¿Qué es Product Makers?</h1>
              <p className="text-xl text-muted-foreground">
                La comunidad de creadores de productos digitales.
              </p>
            </div>
          </LayoutContainer>
        </LayoutSection>

        <LayoutSection className="pt-0" labelledby="what-is">
          <LayoutContainer>
            {/* What we are */}
            <div className="w-full flex flex-col">
              <Image
                src="/assets/maker.png"
                alt="Product Maker Illustration"
                width={600}
                height={600}
                className="mx-auto mb-8"
              />
              <h2 className="text-2xl font-semibold mb-4" id="what-is">¿Cuál es el objetivo de esta comunidad?</h2>
              <p className="text-muted-foreground">
                Product Makers es una comunidad vibrante donde makers independientes, diseñadores y emprendedores se reúnen para mostrar sus productos, compartir conocimiento y apoyarse mutuamente en el camino de construir productos digitales exitosos.
              </p>
            </div>
          </LayoutContainer>
        </LayoutSection>

        {/* Vision */}
        <LayoutSection className="pt-0" aria-labelledby="vision">
          <LayoutContainer>
            <div className="w-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-4" id="vision">Nuestra visión</h2>
              <p className="text-muted-foreground">
                Imaginamos un mundo donde cualquier persona con una gran idea de producto tenga los recursos, el apoyo y la plataforma necesarios para hacerla realidad. Creemos en democratizar la creación de productos y en fomentar un entorno inclusivo donde los makers puedan crecer y prosperar.
              </p>
            </div>
          </LayoutContainer>
        </LayoutSection>

        {/* Mission */}
        <LayoutSection className="pt-0" aria-labelledby="mission">
          <LayoutContainer>
            <div className="w-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-4" id="mission">Nuestra misión</h2>
              <p className="text-muted-foreground mb-4">
                Nuestra misión es impulsar a la próxima generación de makers de producto a través de:
              </p>
              <ul className="text-muted-foreground list-disc pl-6 space-y-2">
                <li>Una plataforma para mostrar y descubrir productos innovadores</li>
                <li>El intercambio de conocimiento y la colaboración entre makers</li>
                <li>Una comunidad que celebra la creatividad y el espíritu emprendedor</li>
                <li>Recursos y herramientas que ayuden a los makers a tener éxito</li>
              </ul>
            </div>
          </LayoutContainer>
        </LayoutSection>

        {/* FAQ Section */}
        <LayoutSection className="pt-0" aria-labelledby="faqs">
          <LayoutContainer>
            <div className="w-full flex flex-col">
              <h2 className="text-2xl font-semibold mb-8" id="faqs">Preguntas frecuentes</h2>
              <div className="grid grid-cols-1 gap-2">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-background rounded-md border transition-shadow duration-300 ${openFaqs.includes(index)
                      ? 'border-border'
                      : 'border-border hover:border-foreground/20'
                      }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center w-full text-left py-4 px-6 pr-4 focus:outline-none"
                      aria-expanded={openFaqs.includes(index)}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-lg font-medium transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 ml-4 p-1 rounded-full transition-colors">
                        <ChevronDown
                          size={20}
                          aria-hidden="true"
                          className={`transition-transform duration-300 ${openFaqs.includes(index)
                            ? 'rotate-180 text-foreground'
                            : 'text-muted-foreground'
                            }`}
                        />
                      </div>
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaqs.includes(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="py-4 px-6 pt-0">
                        {typeof faq.answer === 'string'
                          ? <p className="text-muted-foreground">{faq.answer}</p>
                          : faq.answer
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain >

      <Footer />

    </LayoutWrapper >
  )
} 