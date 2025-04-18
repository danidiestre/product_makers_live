'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'
import Countdown from '@/components/Countdown'
import { getSecondsUntilEndOfWeekCEST } from '@/lib/utils'

export function WeeklyCountdown() {

  const [endOfWeek, setEndOfWeek] = useState<number | null>(null)

  useEffect(() => {
    const seconds = getSecondsUntilEndOfWeekCEST()
    setEndOfWeek(seconds)
  }, [])

  if (endOfWeek === null) return null

  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground">
      <Clock size={16} />
      <Countdown seconds={endOfWeek} />
    </div>
  )
} 