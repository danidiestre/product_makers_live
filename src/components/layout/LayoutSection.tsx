import React from "react"
import { cn } from "@/lib/utils"

interface LayoutSectionProps {
  children: any;
  className?: string;
}

export function LayoutSection({ children, className }: LayoutSectionProps) {
  return (
    <section className={cn("py-12", className)}>
      {children}
    </section>
  )
} 