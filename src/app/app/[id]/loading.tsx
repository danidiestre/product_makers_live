import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { AppProfilePageSkeleton } from '@/components/app-profile/skeleton'

export default function Loading() {
  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        <AppProfilePageSkeleton />
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
} 