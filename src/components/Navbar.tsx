'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Blocks, LogIn, Menu, MessageCircleHeart, WandSparkles } from 'lucide-react'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  function toggleMenu() {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <LayoutContainer className="w-full h-16 flex flex-shrink-0 flex-row items-center justify-between md:grid md:grid-cols-3 gap-6">

        <Link href="/" className="flex items-center justify-center size-10 rounded-md bg-secondary border border-secondary overflow-hidden relative transition-colors">
          <span className="w-[28px] h-1 bg-foreground absolute top-[7px] left-[5px]" />
          <span className="font-extrabold text-xl text-foreground mt-2.5">PM</span>
        </Link>

        {/* Previous version with full text, no hidden */}
        <Link href="/" className="hidden items-center justify-start gap-2 whitespace-nowrap">
          <div className="w-4 h-4 bg-brand-yellow"></div>
          <span className="font-bold text-base md:text-xl text-foreground mb-0.5">product makers</span>
        </Link>

        <nav className="hidden md:flex items-center justify-center gap-8">
          <Link href="/products" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Productos
          </Link>
          <Link href="/makers" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Makers
          </Link>
          <Link href="/about" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            Comunidad
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-2">

          {/* Youtube button - visible only on desktop */}
          <Button
            variant="ghost"
            size="default"
            asChild
            className="hidden"
          >
            <Link
              href="https://youtube.com/@productmakers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
              YouTube
            </Link>
          </Button>

          {/* Discord button - visible on both mobile and desktop */}
          <Button
            variant="secondary"
            size="default"
            asChild
            className="bg-[#5865F2] hover:bg-[#5865F2]/90 text-white"
          >
            <Link
              href="https://discord.com/invite/PnBJNwDW77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"></path>
              </svg>
              <span className="hidden md:inline">Únete a Discord</span>
              <span className="md:hidden">Discord</span>
            </Link>
          </Button>

          {/* Add Sign in button back for desktop */}
          <Button
            variant="secondary"
            size="icon"
            asChild
            className="hidden md:flex"
          >
            <Link href="/login" className="flex items-center gap-2">
              <LogIn size={20} />
              <span className="hidden">Inicia sesión</span>
            </Link>
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex md:hidden"
            onClick={toggleMenu}
          >
            <Menu size={24} />
          </Button>

        </div>
      </LayoutContainer>

      {/* Mobile menu ##### PENDING TO POLISH */}
      {showMobileMenu && (
        <div className="md:hidden bg-background border-y absolute w-full z-50 divide-y">
          <div className="flex flex-col gap-0.5 p-2">
            <Link
              href="/products"
              className="flex items-center gap-2.5 font-medium text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              <Blocks size={20} />
              Productos
            </Link>
            <Link
              href="/makers"
              className="flex items-center gap-2.5 font-medium text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              <WandSparkles size={20} />
              Makers
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2.5 font-medium text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              <MessageCircleHeart size={20} />
              Comunidad
            </Link>
          </div>
          <div className="flex flex-col gap-0.5 p-2">
            <Link
              href="https://youtube.com/@productmakers"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-medium text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
              YouTube
            </Link>
            <Link
              href="https://discord.com/invite/PnBJNwDW77"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 font-medium text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"></path>
              </svg>
              <span className="hidden md:inline">Únete a Discord</span>
              <span className="md:hidden">Discord</span>
            </Link>

            {/* Sign in link added to mobile menu */}
            <Link
              href="/login"
              className="flex items-center gap-2.5 font-medium text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground rounded-md"
              onClick={() => setShowMobileMenu(false)}
            >
              <LogIn size={20} />
              Inicia sesión
            </Link>
          </div>
        </div>
      )
      }
    </header >
  )
}     