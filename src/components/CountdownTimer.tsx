'use client'

import { FC, useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  className?: string
}

export const CountdownTimer: FC<CountdownTimerProps> = ({ className }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      
      const diff = midnight.getTime() - now.getTime()
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      
      setTimeRemaining({ hours, minutes, seconds })
    }

    // Calculate initial time
    calculateTimeRemaining()

    // Update every second
    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`flex items-center text-sm text-gray-600 ${className}`}>
      <Clock className="h-4 w-4 mr-2" />
      <span>Today's voting ends in:</span>
      <div className="ml-2 font-mono">
        {String(timeRemaining.hours).padStart(2, '0')}:
        {String(timeRemaining.minutes).padStart(2, '0')}:
        {String(timeRemaining.seconds).padStart(2, '0')}
      </div>
    </div>
  )
} 