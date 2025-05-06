'use client'

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, User, Settings, LogOut } from 'lucide-react'
import { signOut } from "next-auth/react"
import Image from 'next/image'

export function UserMenu() {
  const { data: session, status } = useSession()
  const [imageError, setImageError] = useState(false)
  const [bannerError, setBannerError] = useState(false)

  // console.log("session", session)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const getInitials = (name?: string | null) => {
    if (!name) return '??'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Obtener la URL del avatar de Discord usando el ID del usuario
  const getDiscordAvatarUrl = (userId: string) => {
    // Si no hay ID de usuario, retornar undefined
    if (!userId) return undefined

    // Usar el avatar por defecto de Discord basado en el ID de usuario
    const discriminator = parseInt(userId) % 5
    return `https://cdn.discordapp.com/embed/avatars/${discriminator}.png`
  }

  // Convertir el color de acento hexadecimal a un estilo CSS
  const getAccentColorStyle = (accentColor?: number | null) => {
    if (!accentColor) return undefined
    return { backgroundColor: `#${accentColor.toString(16).padStart(6, '0')}` }
  }

  if (status === "loading") {
    return (
      <Button variant="ghost" size="icon" className="relative size-8">
        <Avatar className="size-8">
          <AvatarFallback className="animate-pulse">...</AvatarFallback>
        </Avatar>
      </Button>
    )
  }

  if (status === "authenticated" && session?.user) {
    const avatarUrl = session.user.image || getDiscordAvatarUrl(session.user.id)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative size-8">
            <Avatar className="size-8">
              {!imageError && avatarUrl ? (
                <AvatarImage
                  src={avatarUrl}
                  alt={session.user.name || 'Avatar del usuario'}
                  onError={() => setImageError(true)}
                />
              ) : null}
              <AvatarFallback>{getInitials(session.user.name)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          {/* Banner o Color de Acento */}
          {!bannerError && (
            session.user.banner ? (
              <div className="relative w-full h-24 rounded-t-md overflow-hidden">
                <Image
                  src={session.user.banner}
                  alt="Banner del usuario"
                  fill
                  className="object-cover"
                  onError={() => setBannerError(true)}
                  priority
                />
              </div>
            ) : session.user.accentColor ? (
              <div
                className="w-full h-24 rounded-t-md"
                style={getAccentColorStyle(session.user.accentColor)}
              />
            ) : null
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer flex items-center">
              <User className="mr-2 size-4" />
              <span className="">{`${session.user.name ? session.user.name?.charAt(0).toUpperCase() + session.user.name?.slice(1) : 'User'} profile`}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 size-4" />
              <span>Ajustes</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer text-red-600 focus:text-red-600 flex items-center"
          >
            <LogOut className="mr-2 size-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      {/* We no longer show the sign in button */}
    </>
  )
} 