import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import StreamCountdownBanner from '@/components/StreamCountdownBanner'
import { ProductsPageContent } from '@/components/ProductsPageContent'

export default function Products() {
  return (
    <LayoutWrapper>
      {/* StreamCountdown banner */}
      <StreamCountdownBanner />
      <Navbar />
      <LayoutMain>
        <ProductsPageContent />
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
} 