import React from "react"
import { cn } from "@/lib/utils"

interface LayoutContainerProps {
  children: any;
  className?: string;
}

export function LayoutContainer({ children, className }: LayoutContainerProps) {
  return (
    <div className={cn("container max-w-screen-lg flex flex-col items-center gap-6 md:gap-8 px-4 md:px-6", className)}>
      {children}
    </div>
  )
} 