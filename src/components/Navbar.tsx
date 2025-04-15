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
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  function toggleMenu() {
    setShowMobileMenu(!showMobileMenu)
    console.log("Menu toggled:", !showMobileMenu) // Debug log
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <BottomTooltip content="LETS GO MAKERS!!">
            <Link href="/" className="font-bold text-xl lowercase text-white flex items-center gap-2 whitespace-nowrap">
              <div className="w-3 h-3 bg-yellow-400 mt-1"></div>
              product makers
            </Link>
          </BottomTooltip>
          <nav className="hidden md:flex gap-6 ml-6">
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
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <a 
                href="https://youtube.com/@productmakers" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                YouTube
              </a>
            </Button>
          </div>
          
          {/* Discord button - visible on both mobile and desktop */}
          <div className="flex-shrink-0">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="bg-white text-gray-700 hover:bg-gray-100 border-none"
            >
              <a 
                href="https://discord.gg/productmakers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/>
                </svg>
                <span className="hidden md:inline">Join Discord</span>
                <span className="md:hidden">Discord</span>
              </a>
            </Button>
          </div>
          
          {/* Add Sign in button back for desktop */}
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="hidden md:flex bg-white text-gray-700 hover:bg-gray-100 border-none ml-2"
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
          
          {/* Simple hamburger button */}
          <div className="md:hidden p-2">
            <div 
              onClick={toggleMenu}
              className="cursor-pointer bg-white p-2 rounded-md shadow-sm"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" fill="black"/>
                <rect y="11" width="24" height="2" fill="black"/>
                <rect y="18" width="24" height="2" fill="black"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple mobile menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-brand-blue border-t border-white/10 absolute w-full z-50">
          <div className="p-4 flex flex-col space-y-3">
            <Link 
              href="/about" 
              className="text-white py-2 px-4 hover:bg-blue-600 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              About us
            </Link>
            <Link 
              href="/products" 
              className="text-white py-2 px-4 hover:bg-blue-600 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              Products  
            </Link>
            <Link 
              href="/makers" 
              className="text-white py-2 px-4 hover:bg-blue-600 rounded"
              onClick={() => setShowMobileMenu(false)}
            >
              Makers
            </Link>
            <div className="pt-3 border-t border-white/10 space-y-3">
              <a 
                href="https://youtube.com/@productmakers" 
                className="flex items-center gap-2 text-white py-2 px-4 hover:bg-blue-600 rounded"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMobileMenu(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                YouTube
              </a>
              <a 
                href="https://discord.gg/productmakers" 
                className="flex items-center gap-2 text-white py-2 px-4 hover:bg-blue-600 rounded"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMobileMenu(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/>
                </svg>
                Join Discord
              </a>
              
              {/* Sign in link added to mobile menu */}
              <Link 
                href="/login"
                className="flex items-center gap-2 text-white py-2 px-4 hover:bg-blue-600 rounded mt-3"
                onClick={() => setShowMobileMenu(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" x2="3" y1="12" y2="12"/>
                </svg>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}     