'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'


export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Welcome, {session?.user?.name || 'Guest'}
        </h1>
        <Link href="/" className="text-blue-500 hover:text-blue-700 mt-4 block">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
