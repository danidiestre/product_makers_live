import { FC } from 'react'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { MakerProfile } from '@/components/maker-profile'

interface MakerPageProps {
  params: { id: string }
}

const MakerPage: FC<MakerPageProps> = ({ params }) => {
  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        <MakerProfile makerId={params.id} />
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
}

export default MakerPage