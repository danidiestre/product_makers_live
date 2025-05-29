import { FC } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { LayoutSection } from '@/components/layout/LayoutSection'

export const AppProfileHeroSkeleton: FC = () => {
  return (
    <LayoutContainer>
      {/* Breadcrumb Skeleton */}
      <div className="w-full flex items-center justify-start gap-2">
        <Skeleton className="h-4 w-12" />
        <span className="bg-accent">/</span>
        <Skeleton className="h-4 w-20" />
        <span className="bg-accent">/</span>
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="w-full flex flex-col md:flex-row items-start gap-6">
        {/* App Image Skeleton */}
        <Skeleton className="size-28 rounded-xl flex-shrink-0" />

        <div className="flex-1 space-y-4">
          {/* Title, Tagline, Makers */}
          <div className="">
            <Skeleton className="h-9 w-80 max-w-full mb-2" />
            <Skeleton className="h-6 w-64 max-w-full mb-3" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-xl" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Skeleton className="h-10 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  )
}

export const AppProfileContentSkeleton: FC = () => {
  const styles = {
    card: "w-full bg-transparent border-none rounded-none gap-4",
    cardHeader: "p-0",
  }

  return (
    <div className="w-full flex flex-col gap-12">
      {/* Makers Section Skeleton */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-48" />
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Screenshots Skeleton */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className="space-y-2">
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-5 w-52" />
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden ring-4 ring-border/50">
              <Skeleton className="w-full h-80" />
            </div>
            <div className="rounded-lg overflow-hidden ring-4 ring-border/50">
              <Skeleton className="w-full h-64" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Sections Skeleton */}
      {[
        { title: 'Problema', desc: 'Que pretende resolver el producto' },
        { title: 'Solución', desc: 'Que aporta tu producto' },
        { title: 'Funcionalidades', desc: 'Funcionalidades principales del producto' },
        { title: 'Monetización', desc: 'Cómo monetiza el producto' },
        { title: 'Roadmap', desc: 'Que plan hay para el producto' }
      ].map((section) => (
        <Card key={section.title} className={styles.card}>
          <CardHeader className={styles.cardHeader}>
            <div className="space-y-2">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-5 w-64" />
            </div>
          </CardHeader>
          <CardContent className="p-0 mt-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Technology Section Skeleton */}
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-5 w-56" />
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-7 w-20 rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section Skeleton - Commented out for first version */}
      {/*
      <hr className="border-t" />
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-72" />
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-6">
          <div className="bg-border rounded-xl p-12">
            <div className="text-center space-y-6">
              <Skeleton className="size-12 rounded-full mx-auto" />
              <Skeleton className="h-6 w-64 mx-auto" />
              <Skeleton className="h-4 w-80 mx-auto" />
              <Skeleton className="h-11 w-40 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
      */}
    </div>
  )
}

export const AppProfilePageSkeleton: FC = () => {
  return (
    <>
      {/* Hero Section Skeleton */}
      <LayoutSection className="border-b pt-6 pb-12 bg-background">
        <AppProfileHeroSkeleton />
      </LayoutSection>

      {/* Content Section Skeleton */}
      <LayoutSection className="py-12 h-dvh">
        <LayoutContainer>
          {/* Main Content Skeleton hidden because it does not match with current content and maybe we don't need that much detail */}
          <div className="hidden">
            <AppProfileContentSkeleton />
          </div>
        </LayoutContainer>
      </LayoutSection>
    </>
  )
} 