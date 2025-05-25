import { FC } from 'react'
import { notFound } from 'next/navigation'
import { getMakerById } from '@/app/makers/actions'
import { getUserProducts } from '@/app/products/actions'
import { MakerProfileHero } from './MakerProfileHero'
import { MakerProfileProducts } from './MakerProfileProducts'

interface MakerProfileProps {
  makerId: string
}

export const MakerProfile: FC<MakerProfileProps> = async ({ makerId }) => {
  // Fetch maker data
  const makerResult = await getMakerById(makerId)
  if (!makerResult.success || !makerResult.data) {
    return notFound()
  }

  // Fetch maker's products
  const productsResult = await getUserProducts(makerId)
  const makerProducts = productsResult.success && productsResult.data ? productsResult.data : []

  return (
    <>
      <MakerProfileHero maker={makerResult.data} />
      <MakerProfileProducts
        maker={makerResult.data}
        products={makerProducts}
      />
    </>
  )
} 