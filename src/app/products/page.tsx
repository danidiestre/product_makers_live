'use client'

import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')

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
          {/* Header */}
          <div className="border-b border-gray-200 bg-white">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Title and description */}
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 lowercase">the products</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Discover innovative apps and tools created by indie makers
                  </p>
                </div>
                
                {/* Search bar */}
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-[300px] pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <section className="py-4">
            <div className="max-w-4xl mx-auto px-4">
              <AppList searchQuery={searchQuery} />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
} 