'use client'

import { FC } from 'react'
import { FolderOpen } from 'lucide-react'
import { User } from '@prisma/client'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { LayoutSection } from '@/components/layout/LayoutSection'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AppCard } from '@/components/AppCard'
import { App } from '@/lib/types'

interface MakerProfileProductsProps {
  maker: User
  products: App[]
}

export const MakerProfileProducts: FC<MakerProfileProductsProps> = ({ maker, products }) => {
  const styles = {
    card: "w-full bg-transparent border-none rounded-none gap-4",
    cardHeader: "p-0",
    cardTitle: "text-2xl font-semibold text-foreground",
    cardContent: "p-0 text-base font-medium text-muted-foreground",
  }

  return (
    <LayoutSection>
      <LayoutContainer>
        <div className="w-full flex flex-col gap-12">
          <Card className={styles.card}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Productos</CardTitle>
              <CardDescription>Productos creados por {maker.name}</CardDescription>
            </CardHeader>
            <CardContent className={`${styles.cardContent} mt-4`}>
              {products.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {products.map((product) => (
                    <AppCard
                      key={product.id}
                      {...product}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center gap-2 h-72 text-sm font-semibold bg-muted rounded-md text-muted-foreground/50">
                  <FolderOpen size={64} className="stroke-1" />
                  No ha publicado ningún producto
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </LayoutContainer>
    </LayoutSection>
  )
} 