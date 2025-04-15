'use client'

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

const StreamCountdown = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeComponents, setTimeComponents] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      let nextStream = new Date();
      
      // Set to next Tuesday
      nextStream.setDate(now.getDate() + ((2 + 7 - now.getDay()) % 7));
      // Set to 6 PM Spanish time (UTC+2)
      nextStream.setHours(18, 0, 0, 0);
      
      // If it's past 6 PM on a Tuesday, move to next week
      if (now > nextStream) {
        nextStream.setDate(nextStream.getDate() + 7);
      }

      const diff = nextStream.getTime() - now.getTime();
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      };
    };

    setTimeComponents(calculateTimeLeft());
    const timer = setInterval(() => setTimeComponents(calculateTimeLeft()), 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-[#FDF4F2] rounded-lg border border-[#FADCD9] shadow-sm">
        <div className="flex items-center gap-4 px-4 py-3">
          <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 border border-[#FADCD9]">
            <span className="text-base">🎥</span>
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 text-sm">
              <span className="font-bold">This site is being built live!</span>{' '}
              Watch us code{' '}
              <a 
                href="https://youtube.com/@productmakers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-blue font-medium hover:underline"
              >
                on YouTube
              </a>
              <span className="ml-1 text-gray-500">
                · Join next stream in{' '}
                <NumberFlowGroup>
                  <span
                    style={{ fontVariantNumeric: 'tabular-nums' } as React.CSSProperties}
                    className="inline-flex items-baseline font-medium"
                  >
                    <NumberFlow trend={-1} value={timeComponents.days} />
                    <span className="mx-0.5">d</span>
                    <NumberFlow
                      trend={-1}
                      value={timeComponents.hours}
                      format={{ minimumIntegerDigits: 2 }}
                    />
                    <span className="mx-0.5">h</span>
                    <NumberFlow
                      trend={-1}
                      value={timeComponents.minutes}
                      digits={{ 1: { max: 5 } }}
                      format={{ minimumIntegerDigits: 2 }}
                    />
                    <span className="mx-0.5">m</span>
                    <NumberFlow
                      trend={-1}
                      value={timeComponents.seconds}
                      digits={{ 1: { max: 5 } }}
                      format={{ minimumIntegerDigits: 2 }}
                    />
                    <span className="ml-0.5">s</span>
                  </span>
                </NumberFlowGroup>
              </span>
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-[#FADCD9]/20 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamCountdown; 