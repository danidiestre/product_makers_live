import React from "react"
import { LayoutSection } from '@/components/layout/LayoutSection'
import { LayoutContainer } from '@/components/layout/LayoutContainer'

interface PageHeaderProps {
  children?: any;
  title: string;
}

export function PageHeader({ children, title }: PageHeaderProps) {
  return (
    <LayoutSection className="border-b py-0 bg-background">
      <LayoutContainer>
        <div className="w-full h-24 sm:h-20 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-6">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {children}
        </div>
      </LayoutContainer>
    </LayoutSection>
  )
} 