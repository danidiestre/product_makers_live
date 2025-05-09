import React from "react"
import Link from 'next/link'

export function Logo() {
  return (
    <div className="flex">
      <Link href="/" className="flex items-start justify-start gap-2 outline-none">
        <div className="size-4 bg-brand-yellow mt-2"></div>
        <div className="flex flex-col -space-y-2 font-bold text-xl mb-0.5 text-foreground">
          <span>product</span>
          <span>makers</span>
        </div>
      </Link>
    </div>
  )
} 