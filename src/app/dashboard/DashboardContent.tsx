'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserPen, FolderOpen, FolderPlus } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout/LayoutWrapper'
import { LayoutMain } from '@/components/layout/LayoutMain'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { PageHeader } from '@/components/PageHeader'
import { MakerCard } from '@/components/MakerCard'
import { User } from '@prisma/client'
import { AppCard } from '@/components/AppCard'
import { App } from '@/lib/types'

interface DashboardContentProps {
  user: User
  userProducts: App[]
}

export default function DashboardContent({ user, userProducts }: DashboardContentProps) {
  // Transform user data into Maker type
  const maker = {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    banner: user.banner,
    accentColor: user.accentColor,
    role: user.role,
    bio: user.bio,
    twitter: user.twitter,
    github: user.github,
    linkedin: user.linkedin,
    website: user.website,
  }

  return (
    <LayoutWrapper>
      <Navbar />

      <LayoutMain>
        <PageHeader title="Mi cuenta">
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/dashboard/profile" className="flex gap-2">
                <UserPen className="size-5" />
                Editar perfil
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/product/new" className="flex gap-2">
                <FolderPlus className="size-5" />
                Añadir producto
              </Link>
            </Button>
          </div>
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
                  {userProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {userProducts.map((product) => (
                        <div key={product.id} className="relative">
                          <AppCard
                            {...product}
                          />
                          <div className="absolute bottom-2 right-6">
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/dashboard/product/${product.id}/edit`}>
                                Editar
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center gap-2 h-72 text-sm font-semibold bg-muted rounded-md text-muted-foreground/50">
                      <FolderOpen size={64} className="stroke-1" />
                      No has publicado ningún producto
                    </div>
                  )}
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