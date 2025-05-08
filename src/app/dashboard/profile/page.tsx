import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/app/dashboard/profile/actions'

import ProfileForm from '@/app/dashboard/profile/profile-form'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return <ProfileForm initialData={user} />
} 