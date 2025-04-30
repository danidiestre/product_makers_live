'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useAuth } from "@/lib/auth"
import { Card, CardContent } from "@/components/ui/card"
import { DiscordLogoIcon } from "@radix-ui/react-icons"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [hasJoinedDiscord, setHasJoinedDiscord] = useState(false)
  const [hasIntroduced, setHasIntroduced] = useState(false)
  const { signInWithDiscord } = useAuth()
  const DISCORD_INVITE_LINK = "https://discord.com/invite/PnBJNwDW77"
  const DISCORD_PRESENTATIONS_LINK = "https://discord.com/channels/1341520126901616682/1341521413886054430"

  // Load saved states from localStorage on component mount
  useEffect(() => {
    const savedJoinedState = localStorage.getItem('hasJoinedDiscord')
    const savedIntroducedState = localStorage.getItem('hasIntroduced')
    
    if (savedJoinedState) setHasJoinedDiscord(true)
    if (savedIntroducedState) setHasIntroduced(true)
  }, [])

  const handleJoinDiscord = () => {
    window.open(DISCORD_INVITE_LINK, '_blank')
    setHasJoinedDiscord(true)
    localStorage.setItem('hasJoinedDiscord', 'true')
  }

  const handleIntroduction = () => {
    window.open(DISCORD_PRESENTATIONS_LINK, '_blank')
    setHasIntroduced(true)
    localStorage.setItem('hasIntroduced', 'true')
  }

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
    <div className="grid gap-6 max-w-2xl mx-auto w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Bienvenido maker</h1>
        <h2 className="text-muted-foreground">Sigue estos pasos para crear tu perfil de maker</h2>
      </div>

      <div className="grid gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-4 text-center text-muted-foreground">1</span>
                  <div>
                    <h3 className="font-semibold">Únete al Discord</h3>
                    <p className="text-sm text-muted-foreground">Accede al Discord mediante este link</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="default"
                onClick={handleJoinDiscord}
                className="shrink-0"
              >
                Únete
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={!hasJoinedDiscord ? "opacity-50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-4 text-center text-muted-foreground">2</span>
                  <div>
                    <h3 className="font-semibold">Preséntate</h3>
                    <p className="text-sm text-muted-foreground">
                      Dinos quien eres en <code className="text-xs bg-muted px-1 py-0.5 rounded">#presentaciones</code>
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                variant="default"
                onClick={handleIntroduction}
                className="shrink-0"
                disabled={!hasJoinedDiscord}
              >
                Preséntate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className={!hasJoinedDiscord || !hasIntroduced ? "opacity-50" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium w-4 text-center text-muted-foreground">3</span>
                  <div>
                    <h3 className="font-semibold">Accede al Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Inicia sesión</p>
                  </div>
                </div>
              </div>
              <Button 
                variant="default"
                disabled={!hasJoinedDiscord || !hasIntroduced || isLoading} 
                onClick={handleDiscordLogin} 
                className="bg-[#5865F2] hover:bg-[#4752c4] text-white shrink-0"
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.discord className="mr-2 h-5 w-5" />
                )}
                Entra
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 