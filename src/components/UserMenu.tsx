'use client'

import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Settings, LogOut, Ellipsis, UserPen, UserCheck, FolderPlus } from 'lucide-react'
import { signOut } from "next-auth/react"
import Image from 'next/image'
import DiscordLoginButton from '@/components/auth/discord-login-button'

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
      <Button variant="ghost" size="icon">
        <Ellipsis className="animate-pulse" />
      </Button>
    )
  }

  if (status === "authenticated" && session?.user) {
    const avatarUrl = session.user.image || getDiscordAvatarUrl(session.user.id)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Avatar className="size-10">
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
        <DropdownMenuContent className="w-44" align="end" forceMount>
          {/* Banner o Color de Acento - No need for this */}
          {/* {!bannerError && (
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
          */}
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
              <UserCheck className="size-5" />
              <span>Mi cuenta</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="cursor-pointer flex items-center gap-2">
              <UserPen className="size-5" />
              <span>Editar perfil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/products/new" className="cursor-pointer flex items-center gap-2">
              <FolderPlus className="size-5" />
              <span>Añadir producto</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer flex items-center gap-2"
          >
            <LogOut className="size-5" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="hidden md:flex">
      <DiscordLoginButton />
    </div>
  )
} 