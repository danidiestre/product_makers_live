import React from "react"
import Link from "next/link"
import { getRandomProductAndMaker, getHeroCounts } from '@/app/products/actions'
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export async function PageHero() {
  // Get random product and maker from database
  const randomDataResult = await getRandomProductAndMaker()
  const countsResult = await getHeroCounts()

  const randomApp = randomDataResult.success ? randomDataResult.data?.product : null
  const randomMaker = randomDataResult.success ? randomDataResult.data?.maker : null
  
  const totalMakers = countsResult.success ? countsResult.data?.totalMakers || 0 : 0
  const totalApps = countsResult.success ? countsResult.data?.totalProducts || 0 : 0

  return (
    <LayoutSection className="border-b bg-background">
      <LayoutContainer>
        <h1 id="hero-heading" className="text-4xl md:text-6xl text-foreground text-balance text-center font-semibold inline-flex items-center justify-center flex-wrap gap-1 lg:gap-4">
          <span>Descubre</span>
          <div className="hidden lg:flex">
            {randomApp?.imageUrl && (
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>
                  <Avatar className="size-14 rounded-lg bg-background ring-1 ring-border p-0 cursor-pointer">
                    <AvatarImage src={randomApp.imageUrl} />
                    <AvatarFallback className="text-4xl bg-background text-muted-foreground rounded-md">{randomApp.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent side="right" sideOffset={-61} className="w-auto max-w-80 pr-4">
                  <Link href={`/app/${randomApp.id}`} className="flex gap-3">
                    <Avatar className="size-10 rounded-md bg-background ring-1 ring-border p-0 cursor-pointer">
                      <AvatarImage src={randomApp.imageUrl} />
                      <AvatarFallback>{randomApp.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold line-clamp-1">{randomApp.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {randomApp.tagline}
                      </p>
                    </div>
                  </Link>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <span>productos</span>
          <span>creados por</span>
          <div className="hidden lg:flex">
            {randomMaker?.avatar && (
              <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger>
                  <Avatar className="size-14 rounded-lg bg-background ring-1 ring-border p-0 cursor-pointer">
                    <AvatarImage src={randomMaker.avatar} />
                    <AvatarFallback className="text-4xl bg-background text-muted-foreground rounded-md">{randomMaker.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent side="right" sideOffset={-61} className="w-auto max-w-64 pr-4">
                  <Link href={`/maker/${randomMaker.id}`} className="flex gap-3">
                    <Avatar className="size-10 rounded-md bg-background ring-1 ring-border p-0 cursor-pointer">
                      <AvatarImage src={randomMaker.avatar} />
                      <AvatarFallback>{randomMaker.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold line-clamp-1">{randomMaker.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {randomMaker.role}
                      </p>
                    </div>
                  </Link>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          <span>makers</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground text-balance font-medium text-center">
          La comunidad hispana de {totalMakers} makers creando {totalApps} productos digitales
        </p>
      </LayoutContainer>
    </LayoutSection>
  )
} 