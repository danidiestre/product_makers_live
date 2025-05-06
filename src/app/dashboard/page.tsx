'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Edit, Github, Twitter, Linkedin, Globe } from 'lucide-react'

// Define the Role type locally to match what's in Prisma schema
type Role = 'Developer' | 'Designer' | 'ProductManager' | 'Marketer' | 'Founder' | 'Other'

export default function DashboardPage() {
  const { data: session } = useSession()
  
  const getRoleColor = (role?: string | null) => {
    if (!role) return 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
    
    const colors: Record<string, string> = {
      Developer: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
      Designer: 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100',
      ProductManager: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
      Marketer: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100',
      Founder: 'bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100',
      Other: 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
    }
    
    return colors[role] || colors.Other
  }

  // We need to use a type assertion here since we know role might exist in the session
  const userRole = (session?.user as any)?.role as string | undefined

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild variant="outline" size="sm" className="mt-4 md:mt-0">
          <Link href="/dashboard/profile">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Profile Overview */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
            <CardDescription>
              Your public maker profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || 'User'} />
                  <AvatarFallback className="text-xl">
                    {session?.user?.name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>
                <Badge className={`${getRoleColor(userRole)}`}>
                  {userRole || 'Set Role'}
                </Badge>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{session?.user?.name || 'Your Name'}</h3>
                  <p className="text-muted-foreground mt-1">
                    {session?.user?.email || 'your.email@example.com'}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" target="_blank">
                      <Twitter className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" target="_blank">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" target="_blank">
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="#" target="_blank">
                      <Globe className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Info</CardTitle>
            <CardDescription>
              Your account details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Account Type</p>
                <p className="text-sm text-muted-foreground">
                  {session?.user ? 'Discord Login' : 'Not logged in'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Join Date</p>
                <p className="text-sm text-muted-foreground">June 2023</p>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/settings">
                    Manage Account
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
