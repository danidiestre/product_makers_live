'use client'

import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import StreamCountdown from '@/components/StreamCountdown'
import { WeeklyCountdown } from '@/components/WeeklyCountdown'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Gradient background wrapper */}
      <div className="fixed inset-0 bg-gradient-to-b from-white via-[#FAFBFF] to-[#F8F9FF] pointer-events-none" />
      
      {/* Subtle mesh gradient overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(at 100% 0%, rgb(124 58 237 / 0.15) 0px, transparent 50%),
                           radial-gradient(at 0% 0%, rgb(37 99 235 / 0.1) 0px, transparent 50%),
                           radial-gradient(at 100% 100%, rgb(236 72 153 / 0.1) 0px, transparent 50%),
                           radial-gradient(at 0% 100%, rgb(234 179 8 / 0.1) 0px, transparent 50%)`
        }}
      />

      <div className="relative">
        <Navbar />
        <main className="flex-1">
          {/* StreamCountdown banner */}
          <StreamCountdown />
          
          {/* Hero Section */}
          <section className="pt-8 pb-12 border-b border-gray-100">          
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl text-gray-900 mb-5">
                  discover amazing <span className="font-bold">products</span> built by <span className="font-bold">makers</span>
                </h1>
                <p className="text-lg text-gray-600">
                  product makers is a community showcasing innovative apps and tools created by independent developers and small teams.
                </p>
              </div>
            </div>
          </section>
          
          {/* Product List Section */}
          <div id="featured-apps" className="max-w-4xl mx-auto px-4 py-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                🔥 <span className="text-gray-600">This Week's Top Products</span>
              </h2>
              <WeeklyCountdown />
            </div>
            <AppList searchQuery="" limit={10} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
} 