import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl lowercase text-white flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400"></div>
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
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild 
            className="lowercase text-white hover:text-white hover:bg-white/10"
          >
            <Link href="/login">login</Link>
          </Button>
          <Button 
            size="sm" 
            asChild 
            className="lowercase bg-white hover:bg-white/90 text-brand-blue"
          >
            <Link href="/signup">get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
} 