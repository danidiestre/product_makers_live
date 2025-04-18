import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const items = [
  {
    id: "1",
    title: "¿Qué es Product Makers?",
    content:
      "Product Makers es una comunidad hispanohablante para quienes crean productos digitales, donde se comparten experiencias reales y se ayuda a otros a construir productos viables desde cero.",
  },
  {
    id: "2",
    title: "¿Cuál es el objetivo principal de esta comunidad?",
    content:
      "Crear un espacio donde los makers puedan: Aprender unos de otros, compartir herramientas y procesos, recibir feedback en tiempo real y desarrollar productos reales, no solo ideas teóricas.",
  },
  {
    id: "3",
    title: "¿Qué define a un Product Maker?",
    content:
      "Un Product Maker es alguien capaz de construir y lanzar productos digitales por su cuenta o en colaboración. No necesita ser experto en todo, pero entiende y participa en todo el proceso: ideación, diseño, desarrollo, validación, lanzamiento, etc.",
  },
  {
    id: "4",
    title: "¿A quién está dirigida esta comunidad?",
    content:
      "Diseñadores, desarrolladores, PMs, indie hackers, CTOs, emprendedores y cualquier persona interesada en crear productos digitales, ya sea desde cero o dentro de una empresa.",
  },
  {
    id: "5",
    title: "¿Necesito conocimientos técnicos para participar?",
    content:
      "No necesariamente. Aunque muchos miembros vienen del mundo del producto, cualquiera con ganas de aprender, compartir y construir es bienvenido.",
  },
  {
    id: "6",
    title: "¿Qué tipo de contenido se compartirá?",
    content:
      "Desarrollo de producto en público (building in public), entrevistas y casos de estudio, charlas temáticas (UX, ASO, SEO, growth, etc.), comparación de flujos de trabajo, herramientas y metodologías (MVPs, MCPs, diseño a código, etc.)",
  },
  {
    id: "7",
    title: "¿Dónde puedo seguir el contenido?",
    content:
      "Todo el contenido se compartirá en el canal de YouTube de Product Makers. Los eventos se anunciarán en plataformas como LinkedIn e Instagram, y las inscripciones se harán a través de Luma.",
  },
  {
    id: "8",
    title: "¿Hay una plataforma para la comunidad?",
    content:
      "Sí, usamos Discord para: Compartir recursos, resolver dudas, recibir feedback y conectar con otros makers. También hemos creado un canal de voz como coworking virtual.",
  },
  {
    id: "9",
    title: "¿Cuál es el espíritu de la comunidad?",
    content:
      "Cero bullshit. Todo es real, práctico y basado en la experiencia. Queremos impulsarnos entre todos, colaborar y construir un ecosistema creativo sólido en el mundo hispanohablante.",
  },
  {
    id: "10",
    title: "¿Esto tiene fines comerciales?",
    content:
      "No. El proyecto nació con el objetivo de crear valor y comunidad, sin intención inmediata de monetización. Si en algún momento hay patrocinadores, será sin comprometer la independencia ni la utilidad de la comunidad.",
  },
  {
    id: "11",
    title: "¿Cómo puedo participar?",
    content:
      "Apúntate a los eventos vía Luma. Únete al Discord. Comparte tus proyectos, ideas y dudas. Suscríbete al canal de YouTube de Product Makers.",
  },
  {
    id: "12",
    title: "¿Por qué en español?",
    content:
      "Porque es el idioma natural del equipo organizador y del público objetivo. Queremos crear contenido de calidad y accesible para España y Latinoamérica.",
  },
]

export default function Faqs() {
  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item) => (
        <AccordionItem value={item.id} key={item.id} className="py-2">
          <AccordionTrigger className="py-2 text-base leading-6 hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground pb-2">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
