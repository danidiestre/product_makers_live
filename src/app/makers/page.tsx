'use client'

import { MakersList } from '@/components/MakersList'
import { getAllMakers } from '@/lib/data'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function MakersPage() {
  const makers = getAllMakers()

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
            {/* Makers List with Filtering */}
            <MakersList initialMakers={makers} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 