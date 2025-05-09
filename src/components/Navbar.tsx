'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Blocks, Menu, MessageCircleHeart, WandSparkles } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { UserMenu } from '@/components/UserMenu'
import DiscordLoginButton from '@/components/auth/discord-login-button'

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { status } = useSession()

  function toggleMenu() {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <LayoutContainer className="w-full h-16 flex flex-shrink-0 flex-row items-center justify-between md:grid md:grid-cols-3 gap-6">

        <Logo />

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

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="flex md:hidden"
            onClick={toggleMenu}
          >
            <Menu size={24} />
          </Button>

          {/* User Menu Component */}
          <UserMenu />

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
          {status === "authenticated" ? null : (
            <div className="flex flex-col gap-0.5 p-2">
              <DiscordLoginButton />
            </div>
          )}
        </div>
      )}
    </header>
  )
}     