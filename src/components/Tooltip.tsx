'use client'

import { FC, ReactNode, useState } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-1',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-1',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-1'
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className={`absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm ${positionClasses[position]}`}
          role="tooltip"
        >
          {content}
          <div 
            className={`absolute ${
              position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900' : 
              position === 'right' ? 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900' :
              position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900' :
              'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900'
            } border-solid border-4 border-transparent`}
          />
        </div>
      )}
    </div>
  )
} 