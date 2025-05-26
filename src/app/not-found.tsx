import { ServerCrash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { EmptyState } from '@/components/EmptyState'

export default async function NotFoundPage() {
  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        <LayoutSection>
          <LayoutContainer>
            <EmptyState icon={<ServerCrash className="size-20 stroke-1" />} message="Página no encontrada">
              <p className="text-muted-foreground text-sm -mt-2 mb-4">La página que estás buscando no existe o ha sido eliminada.</p>
              <Button asChild variant="secondary">
                <Link href="/">
                  Volver al inicio
                </Link>
              </Button>
            </EmptyState>
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
}