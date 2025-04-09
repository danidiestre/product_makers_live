'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FC, ReactNode, useState, useRef, useEffect } from 'react'

// Custom tooltip that appears below the element
interface BottomTooltipProps {
  content: string
  children: ReactNode
}

const BottomTooltip: FC<BottomTooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      const centerX = triggerRect.left + (triggerRect.width / 2)
      const bottom = triggerRect.bottom + 8 // Position below the element

      tooltipRef.current.style.setProperty('--tooltip-x', `${centerX}px`)
      tooltipRef.current.style.setProperty('--tooltip-y', `${bottom}px`)
    }
  }, [isVisible])

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          ref={tooltipRef}
          className="fixed transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap z-[100]" 
          style={{
            left: 'var(--tooltip-x, 50%)',
            top: 'var(--tooltip-y, 0)',
          }}
        >
          {content}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-full">
            <div className="border-4 border-transparent border-b-gray-900" />
          </div>
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <BottomTooltip content="LETS GO MAKERS!!">
            <Link href="/" className="font-bold text-xl lowercase text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 mt-1"></div>
              product makers
            </Link>
          </BottomTooltip>
          <nav className="hidden md:flex gap-6">
            <Link href="/about" className="text-white/80 hover:text-white transition-colors lowercase">
              about us
            </Link>
            <Link href="/products" className="text-white/80 hover:text-white transition-colors lowercase">
              products
            </Link>
            <Link href="/makers" className="text-white/80 hover:text-white transition-colors lowercase">
              makers
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            <Link href="/subscribe">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Subscribe
              </span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="bg-white text-gray-700 hover:bg-gray-100 border-none"
          >
            <Link href="/login">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" x2="3" y1="12" y2="12"/>
                </svg>
                Sign in
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 