'use client'

import { FC } from 'react'
import { Maker } from '@/lib/types'
import Link from 'next/link'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import { getAllApps } from '@/lib/data'

interface MakerCardProps {
  maker: Maker
}

export const MakerCard: FC<MakerCardProps> = ({ maker }) => {
  const { name, role, avatar, bio, twitter, github, website, makerCategory, isVerified } = maker
  
  // Get latest app from this maker (if any)
  const latestApp = getAllApps()
    .filter(app => app.makers?.some(m => m.name === name))
    .sort((a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime())[0]

  return (
    <div className="border rounded-lg overflow-hidden hover:border-blue-500 transition-all bg-white">
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="h-16 w-16 rounded-full overflow-hidden flex-shrink-0 border border-gray-100">
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
              {isVerified && (
                <BadgeCheck className="h-5 w-5 text-blue-500" aria-label="Verified Maker" />
              )}
            </div>

            <p className="text-sm text-gray-500 mt-1">{role}</p>
            
            {/* Maker Category Badge */}
            {makerCategory && (
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-2 ${
                makerCategory === 'Designer' ? 'bg-purple-100 text-purple-800' : 
                makerCategory === 'Developer' ? 'bg-blue-100 text-blue-800' :
                makerCategory === 'Marketing' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {makerCategory}
              </span>
            )}

            {/* Bio */}
            {bio && (
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">{bio}</p>
            )}

            {/* Latest app link */}
            {latestApp && (
              <div className="mt-3">
                <span className="text-xs text-gray-500">Latest:</span> 
                <Link 
                  href={`/app/${latestApp.id}`}
                  className="ml-1 text-sm text-brand-blue hover:underline"
                >
                  {latestApp.name}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer with links */}
      {(website || twitter || github) && (
        <div className="bg-gray-50 py-2 px-4 flex gap-3 border-t border-gray-100">
          {website && (
            <a 
              href={website} 
              className="flex items-center text-xs text-gray-600 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              <span>Website</span>
            </a>
          )}
          {twitter && (
            <a 
              href={`https://twitter.com/${twitter}`} 
              className="flex items-center text-xs text-gray-600 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
              <span>Twitter</span>
            </a>
          )}
          {github && (
            <a 
              href={`https://github.com/${github}`} 
              className="flex items-center text-xs text-gray-600 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
          )}
        </div>
      )}
    </div>
  )
} 