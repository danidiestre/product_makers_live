'use client'

import { FC, ReactNode, useState, useRef, useEffect } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export const Tooltip: FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      const centerX = triggerRect.left + (triggerRect.width / 2)
      const top = triggerRect.top - tooltipRect.height - 8

      tooltipRef.current.style.setProperty('--tooltip-x', `${centerX}px`)
      tooltipRef.current.style.setProperty('--tooltip-y', `${top}px`)
    }
  }, [isVisible])

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          ref={tooltipRef}
          className="fixed transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md whitespace-nowrap z-[100]" 
          style={{
            left: 'var(--tooltip-x, 50%)',
            top: 'var(--tooltip-y, 0)',
          }}
        >
          {content}
          <div className="absolute left-1/2 -translate-x-1/2 top-full">
            <div className="border-4 border-transparent border-t-gray-900" />
          </div>
        </div>
      )}
    </div>
  )
} 