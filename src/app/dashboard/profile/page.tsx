import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/app/dashboard/profile/actions'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProfileForm from '@/app/dashboard/profile/profile-form'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserCheck } from 'lucide-react'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <LayoutWrapper>
      <Navbar />
      <LayoutMain>
        <PageHeader title="Editar perfil">
          <Button asChild variant="outline">
            <Link href="/dashboard" className="flex gap-2">
              <UserCheck className="size-5" />
              Mi cuenta
            </Link>
          </Button>
        </PageHeader>
        <LayoutSection>
          <LayoutContainer>
            <ProfileForm initialData={user} />
          </LayoutContainer>
        </LayoutSection>
      </LayoutMain>
      <Footer />
    </LayoutWrapper>
  )
}
