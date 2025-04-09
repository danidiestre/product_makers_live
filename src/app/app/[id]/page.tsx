'use client'

import { FC, useState, useEffect } from 'react'
import { ArrowLeft, Share2, ThumbsUp, MessageSquare, Calendar, ExternalLink, Code, Github, Globe, Smartphone, Play } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getAppById } from '@/lib/data'
import { Tooltip } from '@/components/Tooltip'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'

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
        <Link href="/" className="mt-6 inline-flex items-center text-brand-blue hover:text-brand-blue/80">
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
      <Navbar />
      {/* Content with padding for fixed header */}
      <div>
        {/* App header - Hero section */}
        <div className="bg-gray-50 relative border-b">
          <div className="max-w-4xl mx-auto px-4 pt-6 pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Products
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">
                {app.name}
              </span>
            </div>

            <div className="flex items-start gap-6">
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
                        className="flex items-center text-sm text-gray-600 hover:text-brand-blue"
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
                  </div>

                  {/* Main CTAs */}
                  <div className="flex items-center gap-2">
                    {/* Visit project button */}
                    {app.externalLinks?.website && (
                      <a
                        href={app.externalLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-brand-blue text-white hover:bg-brand-blue/90 transition-colors duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Visit Project</span>
                      </a>
                    )}

                    {/* Comments button */}
                    <Link
                      href="#comments"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200"
                    >
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span>{app.commentsCount}</span>
                    </Link>

                    {/* Upvote button */}
                    <Tooltip content={hasUpvoted ? "Remove upvote" : "Upvote this app"}>
                      <button 
                        onClick={handleUpvote}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                          hasUpvoted 
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-2 border-blue-200' 
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${hasUpvoted ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span>{hasUpvoted ? app.votes + 1 : app.votes}</span>
                      </button>
                    </Tooltip>

                    {/* Share button */}
                    <Tooltip content="Share this app">
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: app.name,
                              text: app.description,
                              url: window.location.href,
                            })
                          } else {
                            navigator.clipboard.writeText(window.location.href)
                          }
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 transition-all duration-200"
                      >
                        <Share2 className="h-4 w-4 text-gray-500" />
                        <span>Share</span>
                      </button>
                    </Tooltip>
                  </div>
                </div>
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
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="flex gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Problem</h4>
                        <p className="text-sm text-gray-600">Users struggle with [specific problem] leading to [negative outcome].</p>
                      </div>
                      <div className="border-l border-gray-200"></div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Solution</h4>
                        <p className="text-sm text-gray-600">We provide [key solution] that helps users [achieve desired outcome].</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{app.description}</p>
                </div>
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
              
              {/* Comments section */}
              <section className="mt-12 border-t pt-8" id="comments">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Discussion</h2>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                    {app.commentsCount} comments
                  </span>
                </div>
                
                {/* Example Comments */}
                <div className="space-y-6 mb-8">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://avatars.githubusercontent.com/u/1234567" alt="User avatar" className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">Sarah Chen</span>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700">This is exactly what I've been looking for! The UI is so clean and intuitive. Have you considered adding keyboard shortcuts for power users?</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src="https://avatars.githubusercontent.com/u/7654321" alt="User avatar" className="h-full w-full object-cover" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">Alex Rivera</span>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                      <p className="text-gray-700">Great work on this! I'm curious about the tech stack you used. Any plans to make it open source?</p>
                    </div>
                  </div>
                </div>

                {/* Sign in to comment prompt */}
                <div className="border rounded-lg p-6 bg-gray-50">
                  <div className="text-center">
                    <MessageSquare className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <h3 className="text-gray-700 font-medium mb-2">Join the conversation</h3>
                    <p className="text-gray-500 text-sm mb-4">Sign in to leave a comment</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild 
                      className="bg-white"
                    >
                      <Link href="/login" className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                          <polyline points="10 17 15 12 10 7"/>
                          <line x1="15" x2="3" y1="12" y2="12"/>
                        </svg>
                        Sign in to comment
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Right column */}
            <div>
              {/* App makers */}
              <section className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Meet the Makers</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {app.makers?.map((maker, index) => (
                    <div key={index} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-100">
                          <img src={maker.avatar} alt={maker.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{maker.name}</h4>
                              <p className="text-sm text-gray-500">{maker.role}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {maker.twitter && (
                                <a
                                  href={`https://twitter.com/${maker.twitter}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                  </svg>
                                </a>
                              )}
                              {maker.github && (
                                <a
                                  href={`https://github.com/${maker.github}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                  <Github className="w-5 h-5" />
                                </a>
                              )}
                              {maker.website && (
                                <a
                                  href={maker.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-400 hover:text-brand-blue transition-colors"
                                >
                                  <Globe className="w-5 h-5" />
                                </a>
                              )}
                            </div>
                          </div>
                          {maker.bio && (
                            <p className="mt-2 text-sm text-gray-600">{maker.bio}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Release Information */}
              <section className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-900">Release Information</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                      <Calendar className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Initial Release</p>
                      <p className="text-base font-medium text-gray-900">
                        {new Date(app.launchDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Metrics */}
              {app.metrics && (
                <section className="mb-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-semibold text-gray-900">App Metrics</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {/* Launch date */}
                    <div className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                          <Calendar className="h-5 w-5 text-brand-blue" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Launch Date</p>
                          <p className="text-base font-medium text-gray-900">
                            {new Date(app.launchDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Downloads */}
                    {app.metrics.downloads && (
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                            <ArrowLeft className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Downloads</p>
                            <p className="text-base font-medium text-gray-900">
                              {app.metrics.downloads.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Active Users */}
                    {app.metrics.activeUsers && (
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                            <MessageSquare className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Active Users</p>
                            <p className="text-base font-medium text-gray-900">
                              {app.metrics.activeUsers.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Average Rating */}
                    {app.metrics.avgRating && (
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-brand-blue/10">
                            <ThumbsUp className="h-5 w-5 text-brand-blue" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Average Rating</p>
                            <p className="text-base font-medium text-gray-900">
                              {app.metrics.avgRating}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppProfilePage 