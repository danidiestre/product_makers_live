import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl lowercase text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 mt-1"></div>
            product makers
          </Link>
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