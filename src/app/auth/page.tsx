import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { AuthTabs } from "@/components/auth/auth-tabs"
import { Card } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to Product Makers
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account or create a new one
            </p>
          </div>
          <Card className="p-6">
            <AuthTabs />
          </Card>
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
        <div className="relative z-20 p-10">
          <Image
            src="/assets/logo_productmakers.svg"
            alt="Product Makers Logo"
            width={150}
            height={40}
            className="mr-2"
          />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-10 text-center">
          <blockquote>
            <p className="text-2xl font-light">
              &ldquo;Únete a nuestra comunidad de makers y da vida a tus ideas.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  )
} 