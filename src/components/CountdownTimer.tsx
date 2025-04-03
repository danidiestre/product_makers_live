'use client'

import { FC } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  hours: number
  minutes: number
  seconds: number
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 space-x-1">
      <Clock className="h-4 w-4" />
      <span>Today's voting ends in: </span>
      <div className="flex space-x-2 font-medium">
        <div className="flex items-center">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{hours.toString().padStart(2, '0')}</span>
          <span className="mx-1">h</span>
        </div>
        <div className="flex items-center">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{minutes.toString().padStart(2, '0')}</span>
          <span className="mx-1">m</span>
        </div>
        <div className="flex items-center">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{seconds.toString().padStart(2, '0')}</span>
          <span className="mx-1">s</span>
        </div>
      </div>
    </div>
  )
} 