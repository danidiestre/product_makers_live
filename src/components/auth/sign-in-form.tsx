'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useAuth } from "@/lib/auth"

interface SignInFormProps {
  onRegisterClick: () => void
}

export function SignInForm({ onRegisterClick }: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithDiscord } = useAuth()

  const handleDiscordLogin = async () => {
    try {
      setIsLoading(true)
      await signInWithDiscord()
    } catch (error) {
      console.error("Error signing in with Discord:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Hola de nuevo maker</h1>
        <h2 className="text-muted-foreground">Inicia sesión con tu cuenta de Discord para acceder a tu dashboard de maker</h2>
      </div>

      <div className="grid gap-4">
        <Button 
          variant="outline" 
          disabled={isLoading} 
          onClick={handleDiscordLogin} 
          className="py-6 bg-[#5865F2] hover:bg-[#4752c4] text-white border-none"
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.discord className="mr-2 h-5 w-5" />
          )}
          Iniciar sesión con Discord
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground">
          ¿Aún no eres miembro de la comunidad?{" "}
          <Button variant="link" className="p-0 text-blue-500 hover:text-blue-600" onClick={onRegisterClick}>
            Regístrate a la comunidad
          </Button>
        </p>
      </div>

      {/* Removed email/password form
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O
          </span>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="nombre@ejemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              required
            />
          </div>
          <Button disabled={isLoading} className="w-full py-6">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar sesión
          </Button>
        </div>
      </form>
      */}
    </div>
  )
} 