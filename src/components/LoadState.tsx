import React from "react"
import { Loader } from 'lucide-react'

type LoadStateProps = {
  message: string;
};

export function LoadState({ message }: LoadStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <Loader className="size-10 text-muted-foreground animate-spin" />
      <span className="text-sm font-medium text-muted-foreground">{message}</span>
    </div>
  )
} 