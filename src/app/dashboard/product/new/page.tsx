import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { PageHeader } from '@/components/PageHeader'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutContainer } from '@/components/layout/LayoutContainer'

import { CreateProductForm } from '@/components/product-form/CreateProductForm'

export default function NewProduct() {
  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        <PageHeader title="Añadir producto" />
        <LayoutSection>
          <LayoutContainer>
            <CreateProductForm />
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
}