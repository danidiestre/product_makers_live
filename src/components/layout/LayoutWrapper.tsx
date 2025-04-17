import React from "react"

interface LayoutWrapperProps {
  children: any;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-muted/40 dark:bg-background">
      {children}
    </div>
  )
} 