'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  User, 
  Settings, 
  Bell,
  ChevronRight
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const isActivePath = (path: string) => {
    return pathname === path
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-muted/40 border-r border-border shrink-0">
        <div className="p-4 space-y-2">
          <div className="text-lg font-semibold py-2 px-4 mb-4">Dashboard</div>
          
          <Link 
            href="/dashboard" 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors ${
              isActivePath('/dashboard') ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          
          <Link 
            href="/dashboard/profile" 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors ${
              isActivePath('/dashboard/profile') ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <User size={18} />
            <span>Profile</span>
          </Link>
          
          <Link 
            href="/dashboard/notifications" 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors ${
              isActivePath('/dashboard/notifications') ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </Link>
          
          <Link 
            href="/dashboard/settings" 
            className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors ${
              isActivePath('/dashboard/settings') ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 bg-background">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </div>
    </div>
  )
} 