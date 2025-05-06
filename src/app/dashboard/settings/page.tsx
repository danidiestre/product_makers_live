'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, ExternalLink, Info, LogOut, Mail, Shield, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function SettingsPage() {
  const { data: session } = useSession()
  
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid gap-6">
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Details about your account and connected services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Name</span>
                </div>
                <span>{session?.user?.name || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email</span>
                </div>
                <span>{session?.user?.email || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between border-t pt-3 mt-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Authentication</span>
                </div>
                <Badge variant="outline" className="gap-1 px-2 py-1">
                  <img src="/discord-icon.svg" alt="Discord" className="h-3 w-3" />
                  <span>Discord</span>
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/profile">
                Edit Profile
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
        
        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>
              Manage your privacy settings and security options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-md p-4 bg-muted/40">
              <div className="flex gap-2 items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Your Privacy</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile information is visible to other makers on the platform. 
                    You can manage what information is displayed in your profile settings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-md p-4 bg-amber-50 dark:bg-amber-950/20">
              <div className="flex gap-2 items-start">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium">Connected Accounts</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your account is connected through Discord authentication.
                    To change your profile picture or username, please update them in Discord.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle>Help & Support</CardTitle>
            <CardDescription>
              Get help with your account or ask questions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" asChild className="w-full justify-between">
              <a href="https://discord.gg/productmakers" target="_blank" rel="noopener noreferrer">
                <span>Join our Discord Community</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            
            <Button variant="outline" asChild className="w-full justify-between">
              <a href="https://twitter.com/productmakers" target="_blank" rel="noopener noreferrer">
                <span>Follow us on Twitter</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            
            <Button variant="outline" asChild className="w-full justify-between">
              <a href="mailto:hello@productmakers.ai" target="_blank" rel="noopener noreferrer">
                <span>Contact Support</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
