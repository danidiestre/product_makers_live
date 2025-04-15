import { useEffect, useState } from 'react';

const getNextTuesday = () => {
  const now = new Date();
  const currentDay = now.getUTCDay(); // Sunday is 0, Monday is 1, etc.
  const daysUntilTuesday = (2 - currentDay + 7) % 7; // 2 is Tuesday
  
  // Create next Tuesday date at 18:00 Spanish time (UTC+2 in summer, UTC+1 in winter)
  const nextTuesday = new Date(now);
  nextTuesday.setUTCDate(now.getUTCDate() + daysUntilTuesday);
  nextTuesday.setUTCHours(16); // 18:00 Spanish time (UTC+2)
  nextTuesday.setUTCMinutes(0);
  nextTuesday.setUTCSeconds(0);
  nextTuesday.setUTCMilliseconds(0);

  // If it's past Tuesday 18:00, add 7 days
  if (now > nextTuesday) {
    nextTuesday.setUTCDate(nextTuesday.getUTCDate() + 7);
  }

  return nextTuesday;
};

const StreamCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextTuesday = getNextTuesday();
      const difference = nextTuesday.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 max-w-md mx-auto">
      <p className="text-xs text-gray-600 mb-1">Next live stream in:</p>
      <div className="flex justify-center gap-3">
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-800">{timeLeft.days}</span>
          <p className="text-[10px] text-gray-500">days</p>
        </div>
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-800">{timeLeft.hours}</span>
          <p className="text-[10px] text-gray-500">hours</p>
        </div>
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-800">{timeLeft.minutes}</span>
          <p className="text-[10px] text-gray-500">min</p>
        </div>
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-800">{timeLeft.seconds}</span>
          <p className="text-[10px] text-gray-500">sec</p>
        </div>
      </div>
      <p className="text-[10px] text-center text-gray-500 mt-1">Every Tuesday at 6:00 PM (Spanish time)</p>
    </div>
  );
};

export default StreamCountdown; 