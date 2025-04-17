import React from "react"
import { cn } from "@/lib/utils"

interface LayoutSectionProps {
  children: any;
  className?: string;
  labelledby?: string;
}

export function LayoutSection({ children, className, labelledby }: LayoutSectionProps) {
  return (
    <section className={cn("py-12", className)} aria-labelledby={labelledby}>
      {children}
    </section>
  )
} 