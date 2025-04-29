'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SignInForm } from "./sign-in-form"
import { SignUpForm } from "./sign-up-form"

export function AuthTabs() {
  const [activeTab, setActiveTab] = useState("signin")

  return (
    <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="signin">Iniciar sesión</TabsTrigger>
        <TabsTrigger value="signup">Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value="signin" className="space-y-4">
        <SignInForm onRegisterClick={() => setActiveTab("signup")} />
      </TabsContent>
      <TabsContent value="signup" className="space-y-4">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  )
} 