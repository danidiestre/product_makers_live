import { FC } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { PageHeader } from '@/components/PageHeader'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutContainer } from '@/components/layout/LayoutContainer'

import { getProductById } from '@/app/products/actions'
import { getCurrentUser } from '@/app/dashboard/profile/actions'
import { EditProductForm } from '@/components/product-form/EditProductForm'

interface EditProductPageProps {
  params: { id: string }
}

const EditProductPage: FC<EditProductPageProps> = async ({ params }) => {
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
          <PageHeader title="Producto no encontrado" />
          <LayoutSection>
            <LayoutContainer>
              <h1 className="text-2xl font-bold text-foreground mb-2">Producto no encontrado</h1>
              <p className="mt-4 text-muted-foreground mb-4">El producto que estás buscando no existe o ha sido eliminado.</p>
              <Button asChild variant="secondary">
                <Link href="/products" className="gap-2">
                  <ArrowLeft size={16} />
                  Volver a productos
                </Link>
              </Button>
            </LayoutContainer>
          </LayoutSection>
        </LayoutMain>
        <Footer />
      </LayoutWrapper>
    )
  }

  const product = result.data

  // Check if current user owns this product
  const isOwner = Boolean(currentUser && product.makers && product.makers.some((maker: any) => maker.id === currentUser.id))

  if (!isOwner) {
    return (
      <LayoutWrapper>
        <Navbar />
        <LayoutMain>
          <PageHeader title="Acceso denegado" />
          <LayoutSection>
            <LayoutContainer>
              <h1 className="text-2xl font-bold text-foreground mb-2">No tienes permisos para editar este producto</h1>
              <p className="mt-4 text-muted-foreground mb-4">Solo el propietario del producto puede editarlo.</p>
              <Button asChild variant="secondary">
                <Link href="/products" className="gap-2">
                  <ArrowLeft size={16} />
                  Volver a productos
                </Link>
              </Button>
            </LayoutContainer>
          </LayoutSection>
        </LayoutMain>
        <Footer />
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        <PageHeader title="Editar producto" />
        <LayoutSection>
          <LayoutContainer>
            <EditProductForm product={product} productId={id} />
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
}

export default EditProductPage 