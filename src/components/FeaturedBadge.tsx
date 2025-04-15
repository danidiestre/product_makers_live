import Link from 'next/link'

interface FeaturedBadgeProps {
  className?: string
  variant?: 'default' | 'compact'
  showLink?: boolean
}

export const FeaturedBadge = ({ className = '', variant = 'default', showLink = true }: FeaturedBadgeProps) => {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Medal Icon */}
      <div className="flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand-blue"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      </div>

      {/* Text content */}
      <div className="flex items-center gap-2">
        <span className={`font-medium ${variant === 'compact' ? 'text-sm' : 'text-base'}`}>
          Featured on <span className="text-brand-blue font-bold">product makers</span>
        </span>
        {showLink && (
          <Link 
            href="https://productmakers.com/featured" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:text-brand-blue/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
} 