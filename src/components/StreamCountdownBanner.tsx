"use client"

import { useState, useEffect } from "react"
import { XIcon } from "lucide-react"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { LayoutContainer } from "@/components/layout/LayoutContainer"
import Countdown from "@/components/Countdown"
import { getNextTuesdayAt18CEST } from "@/lib/utils"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function StreamCountdownBanner() {

  const [isBannerDismissed, setIsBannerDismissed] = useLocalStorage('stream-banner-dismissed', false)
  const [nextLive, setNextLive] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const seconds = getNextTuesdayAt18CEST()
    setNextLive(seconds)
    setIsMounted(true)
  }, [])

  const handleCloseBanner = () => {
    setIsBannerDismissed(true)
  }

  if (isBannerDismissed || nextLive === null || !isMounted) return null

  return (
    <div className="w-full bg-foreground text-background py-4">
      <LayoutContainer className="flex-row items-start md:items-center gap-2 md:gap-2">
        <div className="flex grow gap-3 md:items-center">
          <div
            className="bg-[#f03] text-white hidden md:flex size-10 shrink-0 items-center justify-center rounded-md"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </div>
          <div className="flex grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">Estamos construyendo este site en directo!</p>
              <p className="text-muted/60 text-sm font-medium">
                Únete al siguiente stream de product makers.
              </p>
            </div>
            <div className="flex items-center gap-2 max-md:flex-wrap">
              <div className="h-10 bg-background/10 px-4 rounded-md flex items-center font-regular text-base text-background/80">
                <Countdown seconds={nextLive} />
              </div>
              <Button
                variant="default"
                size="default"
                asChild
                className="bg-background/10 hover:bg-background/20"
              >
                <Link
                  href="https://youtube.com/@productmakers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                  YouTube
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="group shrink-0 hover:text-background hover:bg-transparent"
          onClick={handleCloseBanner}
          aria-label="Close banner"
        >
          <XIcon
            size={20}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </LayoutContainer >
    </div >
  )
}
