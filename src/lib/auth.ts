import { signIn, signOut, useSession } from "next-auth/react"

export const useAuth = () => {
  const { data: session, status } = useSession()

  const handleDiscordLogin = async () => {
    await signIn("discord", { callbackUrl: "/" })
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  return {
    session,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    signInWithDiscord: handleDiscordLogin,
    signOut: handleSignOut,
  }
} 