'use client'

import Link from "next/link";
import React from "react"

interface LinkSocialProps {
  href: string;
  icon: React.ReactNode;
  name: string;
}

export function LinkSocial({ href, icon, name }: LinkSocialProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground outline-none focus-visible:text-foreground"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
    >
      {icon}
      <span>{name}</span>
    </Link>
  )
} 