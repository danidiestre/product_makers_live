'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Blocks, LogIn, Menu, MessageCircleHeart, WandSparkles, User, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMenu } from '@/components/UserMenu'
import DiscordLoginButton from '@/components/auth/discord-login-button'
import MobileDiscordButton from '@/components/auth/mobile-discord-button'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  function toggleMenu() {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <LayoutContainer className="w-full h-16 flex flex-shrink-0 flex-row items-center justify-between md:grid md:grid-cols-3 gap-6">

        <div className="flex">
          <Link href="/" className="flex items-start justify-start gap-2">
            <div className="size-4 bg-brand-yellow mt-2"></div>
            <div className="flex flex-col -space-y-2 font-bold text-xl mb-0.5 text-foreground">
              <span>product</span>
              <span>makers</span>
            </div>
          </Link>
        </div>

        <Link href="/" className="hidden items-center justify-start gap-2 whitespace-nowrap">
          <div className="size-4 bg-brand-yellow"></div>
          <span className="font-bold text-base md:text-xl text-foreground mb-0.5">product makers</span>
        </Link>

        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products" className={navigationMenuTriggerStyle()}>
                  Productos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/makers" className={navigationMenuTriggerStyle()}>
                  Makers
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about" className={navigationMenuTriggerStyle()}>
                  Comunidad
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center justify-end gap-2">
          {/* Discord button - visible on both mobile and desktop */}
          <div className="hidden md:block">
            <DiscordLoginButton />
          </div>

          {/* User Menu Component */}
          <UserMenu />

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

      {/* Mobile menu */}
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
            <MobileDiscordButton onClose={() => setShowMobileMenu(false)} />
          </div>
        </div>
      )}
    </header>
  )
}     