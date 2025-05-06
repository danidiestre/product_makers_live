import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import DiscordLoginButton from "@/components/auth/discord-login-button"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="grid gap-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Hola de nuevo maker</h1>
              <h2 className="text-muted-foreground">Inicia sesión con tu cuenta de Discord para acceder a tu dashboard de maker</h2>
            </div>

            <div className="grid gap-4">
              <DiscordLoginButton />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-l">
        <div className="absolute inset-0">
          <Image
            src="/assets/maker_sign_bg.jpg"
            alt="Maker Background"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="absolute top-10 left-10 z-20">
          <Link href="/">
            <Image
              src="/assets/logo_productmakers.svg"
              alt="Product Makers Logo"
              width={75}
              height={20}
              className="mr-2"
            />
          </Link>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center max-w-2xl px-4">
            <h2 className="text-4xl font-light leading-[1.2]">
              Únete a nuestra comunidad de makers
              <br />
              y da vida a tus ideas
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
} 