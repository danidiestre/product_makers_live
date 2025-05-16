import React from "react"

type EmptyStateProps = {
  icon: React.ReactNode;
  message: string;
  children?: React.ReactNode;
};

export function EmptyState({ message, children, icon }: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 text-muted-foreground p-12">
      {icon}
      <span className="text-base font-medium">{message}</span>
      {children}
    </div>
  )
} 