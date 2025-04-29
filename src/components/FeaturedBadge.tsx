import { Gem, Sparkle, Sparkles, Trophy } from 'lucide-react'
import Link from 'next/link'

interface FeaturedBadgeProps {
  className?: string
}

export const FeaturedBadge = ({ className = '' }: FeaturedBadgeProps) => {
  return (
    <Link
      href="https://productmakers.com/featured"
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full flex flex-row items-center gap-3 p-3 px-4 bg-background border rounded-xl relative overflow-hidden ${className}`}
      legacyBehavior>
      {/* Medal Icon */}
      <div className="size-8 bg-brand-yellow text-background flex items-center justify-center">
      </div>
      {/* Text content */}
      <div className="flex items-center gap-2 z-10 h-10">
        <div className="flex flex-col justify-end -space-y-1 h-full mt-0.5">
          <span className="font-bold text-foreground text-[10px]">
            Producto publicado en la comunidad
          </span>
          <span className="font-extrabold text-brand-blue text-xl">
            productmakers.ai
          </span>
        </div>
      </div>
    </Link>
  );
} 