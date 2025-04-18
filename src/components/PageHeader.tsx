import React from "react"

interface PageHeaderProps {
  children?: any;
  title: string;
  description: string;
}

export function PageHeader({ children, title, description }: PageHeaderProps) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
} 