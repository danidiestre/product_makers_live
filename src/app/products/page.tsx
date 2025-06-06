import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { ProductsPageContent } from '@/components/ProductsPageContent'
import { getProductsStatic } from '@/app/products/actions'

export default async function Products() {
  // Cargar datos en el servidor (versión estática)
  const result = await getProductsStatic()
  const initialProducts = result.success ? result.data || [] : []

  return (
    <LayoutWrapper>
      {/* StreamCountdown banner */}
      <StreamCountdownBanner />
      <Navbar />
      <LayoutMain>
        <ProductsPageContent initialProducts={initialProducts} />
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
} 