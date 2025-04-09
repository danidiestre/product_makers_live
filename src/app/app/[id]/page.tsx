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
          
          <div className="hidden md:flex items-center space-x-6">
            {/* Tech pills */}
            <div className="flex space-x-2">
              {app.technologies?.slice(0, 3).map((tech, index) => (
                <div key={index} className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
                  <Code className="h-3 w-3 text-gray-500 mr-1.5" />
                  <span className="text-gray-700">{tech}</span>
                </div>
              ))}
              {app.technologies && app.technologies.length > 3 && (
                <span className="text-xs text-gray-500 py-1">+{app.technologies.length - 3} more</span>
              )}
            </div>
            
            {/* External links */}
            <div className="flex space-x-3">
              {app.externalLinks?.website && (
                <a 
                  href={app.externalLinks.website}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {app.externalLinks?.github && (
                <a 
                  href={app.externalLinks.github}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {app.externalLinks?.appStore && (
                <a 
                  href={app.externalLinks.appStore}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="App Store"
                >
                  <Smartphone className="h-5 w-5" />
                </a>
              )}
              {app.externalLinks?.playStore && (
                <a 
                  href={app.externalLinks.playStore}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Play"
                >
                  <Play className="h-5 w-5" />
                </a>
              )}
            </div>
            
            {/* Upvote button */}
            <button 
              onClick={handleUpvote}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors ${
                hasUpvoted 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Content with padding for fixed header */}
      <div className="pt-20">
        {/* App header - Hero section */}
        <div className="bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 pt-8 pb-12">
            <div className="flex items-start gap-6 mb-8">
              <div className="h-24 w-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 shadow-lg">
                <img src={app.imageUrl} alt={app.name} className="h-full w-full object-cover" />
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
                <div className="flex items-center mt-2 mb-4">
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
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {app.tags?.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:hidden flex space-x-2">
                <button 
                  onClick={handleUpvote}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-md transition-colors ${
                    hasUpvoted 
                      ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
                </button>
                <button className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              <h2 className="text-sm font-medium text-gray-700 mr-2">Tech Stack:</h2>
              {app.technologies?.map((tech, index) => (
                <div key={index} className="flex items-center bg-white border rounded px-2 py-1">
                  <Code className="h-3 w-3 text-gray-500 mr-1.5" />
                  <span className="text-xs text-gray-700">{tech}</span>
                </div>
              ))}
            </div>
            
            {/* External links & launch date */}
            <div className="flex flex-wrap justify-between items-center p-4 bg-white shadow-sm rounded-lg border border-gray-100">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-700">
                  Launched on {new Date(app.launchDate).toLocaleDateString('en-US', {
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex space-x-4 mt-3 sm:mt-0">
                {app.externalLinks?.website && (
                  <a 
                    href={app.externalLinks.website} 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
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
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800"
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
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
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
                    className="flex items-center text-sm text-green-600 hover:text-green-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Google Play
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
                <section className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Metrics</h3>
                  <ul className="space-y-2">
                    {app.metrics.downloads && (
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Downloads</span>
                        <span className="text-sm font-medium text-gray-900">{app.metrics.downloads.toLocaleString()}</span>
                      </li>
                    )}
                    {app.metrics.activeUsers && (
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <span className="text-sm font-medium text-gray-900">{app.metrics.activeUsers.toLocaleString()}</span>
                      </li>
                    )}
                    {app.metrics.avgRating && (
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average Rating</span>
                        <span className="text-sm font-medium text-gray-900">{app.metrics.avgRating}</span>
                      </li>
                    )}
                  </ul>
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