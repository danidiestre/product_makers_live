import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/dashboard/profile/actions'
import DashboardContent from './DashboardContent'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return <DashboardContent user={user} />
}
