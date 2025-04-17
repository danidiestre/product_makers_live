'use client'

import { Clock } from 'lucide-react'
import Countdown from '@/components/Countdown'
import { getSecondsUntilEndOfWeekCEST } from '@/lib/utils'

export function WeeklyCountdown() {

  const endOfWeek = getSecondsUntilEndOfWeekCEST();

  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted-foreground">
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span className="sr-only">Acaba en</span>
      </div>
      <Countdown seconds={endOfWeek} />
    </div>
  )
} 