import { FC } from 'react'
import { ServerCrash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { getProductById } from '@/app/products/actions'
import { getCurrentUser } from '@/app/dashboard/profile/actions'
import { AppProfileHero } from '@/components/app-profile/hero'
import { AppProfileContent } from '@/components/app-profile/content'
import { EmptyState } from '@/components/EmptyState'

interface AppProfilePageProps {
  params: { id: string }
}

const AppProfilePage: FC<AppProfilePageProps> = async ({ params }) => {
  const { id } = params

  const [result, currentUser] = await Promise.all([
    getProductById(id),
    getCurrentUser()
  ])

  if (!result.success || !result.data) {
    return (
      <LayoutWrapper>
        <Navbar />
        <LayoutMain>
          <LayoutSection>
            <LayoutContainer>
              <EmptyState icon={<ServerCrash className="size-20 stroke-1" />} message="Producto no encontrado">
                <p className="text-muted-foreground text-sm -mt-2 mb-4">El producto que estás buscando no existe o ha sido eliminado.</p>
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

  const app = result.data

  // Check if current user owns this product
  const isOwner = Boolean(currentUser && app.makers && app.makers.some(maker => maker.id === currentUser.id))

  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        {/* App header - Hero section */}
        <LayoutSection className="border-b pt-6 pb-12 bg-background">
          <AppProfileHero app={app} isOwner={isOwner} />
        </LayoutSection>

        {/* Main content */}
        <LayoutSection>
          <LayoutContainer>
            <AppProfileContent app={app} />
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
}

export default AppProfilePage 