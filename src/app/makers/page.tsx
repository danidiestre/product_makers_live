'use client'

import { MakersList } from '@/components/MakersList'
import { getAllMakers } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function MakersPage() {
  const makers = getAllMakers()
  const verifiedCount = makers.filter(maker => maker.isVerified).length

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Simple Hero Section */}
        <section className="relative py-12 border-b border-gray-200 bg-white">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold mb-4">Meet Our Amazing Makers</h1>
              <p className="text-xl text-gray-600">
                Discover the talented individuals behind the innovative products shaping the future of technology.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 bg-gray-50">
          <div className="container">
            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500">Total Makers</p>
                <p className="text-3xl font-bold text-brand-blue">{makers.length}</p>
              </div>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <p className="text-sm text-gray-500">Verified Makers</p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-brand-blue">{verifiedCount}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Makers List with Filtering */}
            <MakersList initialMakers={makers} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 