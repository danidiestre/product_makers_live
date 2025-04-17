"use client";

import { useEffect, useState } from 'react';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';

type Props = {
  seconds: number;
};

export default function Countdown({ seconds }: Props) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const dd = Math.floor(timeLeft / 86400);
  const hh = Math.floor((timeLeft % 86400) / 3600);
  const mm = Math.floor((timeLeft % 3600) / 60);
  const ss = timeLeft % 60;

  return (
    <NumberFlowGroup>
      <div
        style={
          {
            fontVariantNumeric: 'tabular-nums',
            '--number-flow-char-height': '0.85em',
          } as React.CSSProperties & Record<string, string>
        }
      >
        <NumberFlow
          suffix='d'
          trend={-1}
          value={dd}
          format={{ minimumIntegerDigits: 2 }} />
        <NumberFlow
          suffix='h'
          prefix=" : "
          trend={-1}
          value={hh}
          format={{ minimumIntegerDigits: 2 }} />
        <NumberFlow
          suffix='m'
          prefix=" : "
          trend={-1}
          value={mm}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
        <NumberFlow
          suffix='s'
          prefix=" : "
          trend={-1}
          value={ss}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
        />
      </div>
    </NumberFlowGroup>
  );
}
