'use client'

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
import { User } from '@prisma/client'

interface DashboardContentProps {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  // Transform user data into Maker type
  const maker = {
    id: user.id,
    name: user.name || 'Nombre',
    role: user.role || 'Other',
    avatar: user.image || '/users/user-default.png',
    bio: user.bio || '...',
    twitter: user.twitter || undefined,
    github: user.github || undefined,
    linkedin: user.linkedin || undefined,
    website: user.website || undefined,
    isVerified: false,
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