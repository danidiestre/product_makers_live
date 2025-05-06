'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ToggleLeft, ToggleRight } from 'lucide-react'

interface NotificationPreference {
  id: string
  title: string
  description: string
  enabled: boolean
}

export default function NotificationsPage() {
  const { data: session } = useSession()
  
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{message: string, type: 'success' | 'error' | null}>({
    message: '',
    type: null
  })
  
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'product_updates',
      title: 'Product Updates',
      description: 'Get notified about new product launches and updates.',
      enabled: true
    },
    {
      id: 'new_makers',
      title: 'New Makers',
      description: 'Get notified when new makers join the platform.',
      enabled: false
    },
    {
      id: 'community_announcements',
      title: 'Community Announcements',
      description: 'Important announcements about the community.',
      enabled: true
    },
    {
      id: 'comments',
      title: 'Comments',
      description: 'Get notified when someone comments on your products.',
      enabled: true
    },
    {
      id: 'mentions',
      title: 'Mentions',
      description: 'Get notified when someone mentions you.',
      enabled: true
    }
  ])
  
  const togglePreference = (id: string) => {
    setPreferences(prefs => 
      prefs.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    )
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ message: '', type: null })
    
    try {
      // Here you would send the preferences to your API
      // This is a placeholder for the actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus({ message: 'Notification preferences updated successfully', type: 'success' })
    } catch (error) {
      console.error('Error updating notification preferences:', error)
      setStatus({ message: 'Failed to update notification preferences', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Manage your notification preferences
        </p>
      </div>
      
      {status.type && (
        <div className={`p-4 rounded-md ${
          status.type === 'success' ? 'bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-300' : 
          'bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-300'
        }`}>
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>
              Choose what updates you want to receive via email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {preferences.map(preference => (
              <div key={preference.id} className="flex items-start justify-between space-x-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={preference.id} className="text-base">
                      {preference.title}
                    </Label>
                    <Badge variant={preference.enabled ? "default" : "outline"} className="ml-2">
                      {preference.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {preference.description}
                  </p>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => togglePreference(preference.id)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {preference.enabled ? (
                    <ToggleRight className="h-6 w-6 text-primary" />
                  ) : (
                    <ToggleLeft className="h-6 w-6" />
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
} 