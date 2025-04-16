'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// Format numbers to ensure they always have two digits
const formatNumber = (num: number) => {
  return num.toString().padStart(2, '0');
};

const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex items-center mx-0.5">
    <div className="flex items-center justify-center bg-gray-100 rounded px-1.5 py-0.5 min-w-[1.75rem] text-sm text-gray-800 font-medium">
      {formatNumber(value)}
    </div>
    <span className="text-xs text-gray-500 ml-1">{unit}</span>
  </div>
)

export function WeeklyCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const endOfWeek = new Date()
      
      // Set to next Sunday at midnight
      endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
      endOfWeek.setHours(23, 59, 59, 999)
      
      const difference = endOfWeek.getTime() - now.getTime()
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    // Update immediately
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
      <div className="flex items-center">
        <Clock className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
        <span className="text-xs text-gray-500 font-medium">Acaba en:</span>
      </div>
      <div className="flex items-center">
        <TimeUnit value={timeLeft.days} unit="d" />
        <TimeUnit value={timeLeft.hours} unit="h" />
        <TimeUnit value={timeLeft.minutes} unit="m" />
        <TimeUnit value={timeLeft.seconds} unit="s" />
      </div>
    </div>
  )
} 