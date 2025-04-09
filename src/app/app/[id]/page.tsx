'use client'

import { FC, useState, useEffect } from 'react'
import { ArrowLeft, Share2, ThumbsUp, MessageSquare, Calendar, ExternalLink, Code, Github, Globe, Smartphone, Play } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getAppById } from '@/lib/data'

const AppProfilePage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const [hasUpvoted, setHasUpvoted] = useState(false)
  const [headerFixed, setHeaderFixed] = useState(false)
  
  // Find the app from data service
  const app = getAppById(id as string)
  
  useEffect(() => {
    const handleScroll = () => {
      setHeaderFixed(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Background pattern style for when there's no cover image
  const patternStyle = {
    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.05) 1px, transparent 0)`,
    backgroundSize: '24px 24px',
  }
  
  if (!app) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900">App not found</h1>
        <p className="mt-4 text-gray-600">The app you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>
    )
  }

  const handleUpvote = () => {
    setHasUpvoted(!hasUpvoted)
    // In a real app, you would call an API to update the vote count
  }

  return (
    <>
      {/* Fixed header */}
      <div className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        headerFixed ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-6 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <div className="flex items-center">
              <div className={`h-10 w-10 rounded-xl overflow-hidden flex-shrink-0 mr-3 ${
                headerFixed ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}>
                <img src={app.imageUrl} alt={app.name} className="h-full w-full object-cover" />
              </div>
              <h1 className={`font-bold text-gray-900 transition-all duration-300 ${
                headerFixed ? "text-lg" : "text-xl"
              }`}>{app.name}</h1>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content with padding for fixed header */}
      <div className="pt-20">
        {/* App header - Hero section */}
        <div className="bg-gradient-to-b from-gray-50 via-white to-white relative">
          {/* Cover image */}
          <div className="w-full h-48 md:h-64 bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden relative mb-8">
            {app.coverImage ? (
              <img 
                src={app.coverImage} 
                alt={`${app.name} cover`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="absolute inset-0" style={patternStyle}></div>
              </div>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="max-w-4xl mx-auto px-4 pt-0 pb-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="h-24 w-24 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-lg border border-gray-100 p-3 flex items-center justify-center">
                <img src={app.imageUrl} alt={app.name} className="h-full w-full object-contain" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-2">
                  {app.badges?.map((badge) => (
                    <span 
                      key={badge}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        badge === 'new' ? 'bg-blue-100 text-blue-800' :
                        badge === 'trending' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}
                    >
                      {badge === 'new' ? 'New' : 
                      badge === 'trending' ? 'Trending' : 
                      'Top of the Week'}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                
                {/* Makers */}
                <div className="flex items-center mt-2 mb-3">
                  <div className="flex -space-x-2 mr-3">
                    {app.makers?.slice(0, 3).map((maker, index) => (
                      <div key={index} className="h-7 w-7 rounded-full overflow-hidden border-2 border-white">
                        <img src={maker.avatar} alt={maker.name} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    By {app.makers?.map(m => m.name).join(', ')}
                  </span>
                </div>

                {/* App type and description */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {app.externalLinks?.appStore && (
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center">
                      <Smartphone className="h-3 w-3 mr-1" />
                      iOS
                    </span>
                  )}
                  {app.externalLinks?.playStore && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md flex items-center">
                      <Play className="h-3 w-3 mr-1" />
                      Android
                    </span>
                  )}
                  {app.externalLinks?.website && (
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-md flex items-center">
                      <Globe className="h-3 w-3 mr-1" />
                      Web
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{app.description}</p>

                {/* External links */}
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {app.externalLinks?.website && (
                      <a 
                        href={app.externalLinks.website} 
                        className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    )}
                    {app.externalLinks?.github && (
                      <a 
                        href={app.externalLinks.github} 
                        className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        GitHub
                      </a>
                    )}
                    {app.externalLinks?.appStore && (
                      <a 
                        href={app.externalLinks.appStore} 
                        className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Smartphone className="h-4 w-4 mr-1" />
                        App Store
                      </a>
                    )}
                    {app.externalLinks?.playStore && (
                      <a 
                        href={app.externalLinks.playStore} 
                        className="flex items-center text-sm text-gray-600 hover:text-green-600"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Play Store
                      </a>
                    )}
                  </div>

                  {/* Main CTAs */}
                  <div className="flex items-center gap-3">
                    {/* Visit project button */}
                    {app.externalLinks?.website && (
                      <a
                        href={app.externalLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Visit Project</span>
                      </a>
                    )}

                    {/* Upvote button */}
                    <button 
                      onClick={handleUpvote}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        hasUpvoted 
                          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200' 
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:hidden flex space-x-2">
                <button 
                  onClick={handleUpvote}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    hasUpvoted 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
                </button>
                {app.externalLinks?.website && (
                  <a
                    href={app.externalLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      
        {/* Main content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="md:col-span-2">
              {/* Description */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About {app.name}</h2>
                <p className="text-gray-700 leading-relaxed">{app.description}</p>
              </section>
              
              {/* Screenshots */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 gap-4">
                  {app.screenshots?.map((screenshot, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img 
                        src={screenshot} 
                        alt={`${app.name} screenshot ${index + 1}`} 
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Updates */}
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Updates</h2>
                <div className="border rounded-lg divide-y">
                  {app.updates?.map((update, index) => (
                    <div key={index} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-sm font-medium text-gray-900">Version {update.version}</span>
                          <p className="text-gray-700 mt-1">{update.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            
            {/* Right column */}
            <div>
              {/* App makers */}
              <section className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-gray-900 mb-3">App Makers</h3>
                <div className="space-y-3">
                  {app.makers?.map((maker, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3 border border-gray-200">
                        <img src={maker.avatar} alt={maker.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{maker.name}</p>
                        <p className="text-xs text-gray-500">{maker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Metrics */}
              {app.metrics && (
                <section className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Metrics</h3>
                  <div className="grid gap-3">
                    {/* Launch date card */}
                    <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-purple-500 transition-colors">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">Launch Date</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {new Date(app.launchDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    {app.metrics.downloads && (
                      <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-blue-500 transition-colors">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <ArrowLeft className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">Downloads</p>
                          <p className="text-lg font-semibold text-gray-900">{app.metrics.downloads.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    {app.metrics.activeUsers && (
                      <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-green-500 transition-colors">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">Active Users</p>
                          <p className="text-lg font-semibold text-gray-900">{app.metrics.activeUsers.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                    {app.metrics.avgRating && (
                      <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:border-yellow-500 transition-colors">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                          <ThumbsUp className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm text-gray-500">Average Rating</p>
                          <p className="text-lg font-semibold text-gray-900">{app.metrics.avgRating}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
          
          {/* Comments section - placeholder for now */}
          <section className="mt-12 border-t pt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Discussion</h2>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                {app.commentsCount} comments
              </span>
            </div>
            
            <div className="border rounded-lg p-6 bg-gray-50 text-center">
              <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <h3 className="text-gray-700 font-medium">Join the conversation</h3>
              <p className="text-gray-500 text-sm mt-1">Comments coming soon</p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default AppProfilePage 