import React from "react"

interface LayoutMainProps {
  children: any;
}

export function LayoutMain({ children }: LayoutMainProps) {
  return (
    <div className="flex-1">
      {children}
    </div>
  )
} 