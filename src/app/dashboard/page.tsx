import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/dashboard/profile/actions'
import { getUserProducts } from '@/app/products/actions'
import DashboardContent from '@/app/dashboard/DashboardContent'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  // Cargar los productos del usuario en el servidor
  const userProductsResult = await getUserProducts(user.id)
  const userProducts = userProductsResult.success ? userProductsResult.data || [] : []

  return <DashboardContent user={user} userProducts={userProducts} />
}
