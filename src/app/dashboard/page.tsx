'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserPen, FolderOpen } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import { MakerCard } from '@/components/MakerCard'

export default function DashboardPage() {
  const { data: session } = useSession()

  // Transform session data into Maker type
  const maker = {
    id: (session?.user as any)?.id?.toString() || '',
    name: session?.user?.name || 'Nombre',
    role: (session?.user as any)?.role || 'Other',
    avatar: session?.user?.image || '/users/user-default.png',
    bio: (session?.user as any)?.bio || '...',
    twitter: (session?.user as any)?.twitter || undefined,
    dribbble: (session?.user as any)?.dribbble || undefined,
    github: (session?.user as any)?.github || undefined,
    linkedin: (session?.user as any)?.linkedin || undefined,
    website: (session?.user as any)?.website || undefined,
    makerCategory: (session?.user as any)?.makerCategory || undefined,
    isVerified: (session?.user as any)?.isVerified || false,
    category: (session?.user as any)?.category || '',
    joinedDate: (session?.user as any)?.joinedDate || null,
    followers: (session?.user as any)?.followers || 0
  }

  return (

    <LayoutWrapper>

      <Navbar />

      <LayoutMain>

        <PageHeader title="Mi cuenta">
          <Button asChild variant="outline">
            <Link href="/dashboard/profile" className="flex gap-2">
              <UserPen className="size-5" />
              Editar perfil
            </Link>
          </Button>
        </PageHeader>

        <LayoutSection>
          <LayoutContainer>
            <div className="w-full flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tu perfil</CardTitle>
                  <CardDescription>
                    Tu perfil público
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-6">
                  <MakerCard maker={maker} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tus productos</CardTitle>
                  <CardDescription>
                    Tus aportes a la comunidad
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex flex-col gap-6">
                  <div className="w-full flex flex-col items-center justify-center gap-2 h-72 text-sm font-semibold bg-muted rounded-md text-muted-foreground/50">
                    <FolderOpen size={64} className="stroke-1" />
                    No has publicado ningún producto
                  </div>
                </CardContent>
              </Card>
            </div>
          </LayoutContainer>
        </LayoutSection>

      </LayoutMain>

      <Footer />

    </LayoutWrapper>
  )
}
