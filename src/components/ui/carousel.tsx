'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  showArrows?: boolean
  showIndicators?: boolean
  autoPlay?: boolean
  interval?: number
  loop?: boolean
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({
    children,
    className,
    showArrows = true,
    showIndicators = true,
    autoPlay = false,
    interval = 5000,
    loop = true
  }, ref) => {
    const [activeIndex, setActiveIndex] = React.useState(0)
    const [touchStart, setTouchStart] = React.useState<number | null>(null)
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null)
    const slideCount = React.Children.count(children)

    // Auto play functionality
    React.useEffect(() => {
      if (!autoPlay) return

      const timer = setInterval(() => {
        handleNext()
      }, interval)

      return () => clearInterval(timer)
    }, [activeIndex, autoPlay, interval])

    const handlePrevious = () => {
      setActiveIndex((prev) => {
        if (prev === 0) {
          return loop ? slideCount - 1 : 0
        }
        return prev - 1
      })
    }

    const handleNext = () => {
      setActiveIndex((prev) => {
        if (prev === slideCount - 1) {
          return loop ? 0 : slideCount - 1
        }
        return prev + 1
      })
    }

    // Swipe functionality
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return

      const distance = touchStart - touchEnd
      const isLeftSwipe = distance > 50
      const isRightSwipe = distance < -50

      if (isLeftSwipe) {
        handleNext()
      }

      if (isRightSwipe) {
        handlePrevious()
      }

      setTouchStart(null)
      setTouchEnd(null)
    }

    return (
      <div
        className={cn("relative w-full overflow-hidden rounded-lg", className)}
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-slot="carousel"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>

        {showArrows && slideCount > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background/90 opacity-70 hover:opacity-100 md:left-5"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background/90 opacity-70 hover:opacity-100 md:right-5"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight className="size-6" />
            </Button>
          </>
        )}

        {showIndicators && slideCount > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {Array.from({ length: slideCount }).map((_, index) => (
              <button
                key={index}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  activeIndex === index
                    ? "bg-foreground"
                    : "bg-foreground/30 hover:bg-foreground/50"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

Carousel.displayName = "Carousel"

export { Carousel } 