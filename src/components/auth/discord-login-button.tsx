'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useAuth } from "@/lib/auth"

export default function DiscordLoginButton() {
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
      Accede con Discord
    </Button>
  )
} 