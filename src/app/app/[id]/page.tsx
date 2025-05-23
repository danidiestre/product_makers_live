import { FC } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { getProductById } from '@/app/products/actions'
import { AppProfileHero } from '@/components/app-profile/hero'
import { AppProfileContent } from '@/components/app-profile/content'

interface AppProfilePageProps {
  params: { id: string }
}

const AppProfilePage: FC<AppProfilePageProps> = async ({ params }) => {
  const { id } = params

  const result = await getProductById(id)

  if (!result.success || !result.data) {
    return (
      <LayoutWrapper>
        <Navbar />
        <LayoutMain>
          <LayoutSection>
            <LayoutContainer>
              <h1 className="text-2xl font-bold text-foreground mb-2">Producto no encontrado</h1>
              <p className="mt-4 text-muted-foreground mb-4">El producto que estás buscando no existe o ha sido eliminado.</p>
              <Button asChild variant="secondary">
                <Link href="/" className="gap-2">
                  <ArrowLeft size={16} />
                  Back to home
                </Link>
              </Button>
            </LayoutContainer>
          </LayoutSection>
        </LayoutMain>
        <Footer />
      </LayoutWrapper>
    )
  }

  const app = result.data

  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        {/* App header - Hero section */}
        <LayoutSection className="border-b pt-6 pb-12 bg-background">
          <AppProfileHero app={app} />
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