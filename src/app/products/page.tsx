import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import { Search } from 'lucide-react'

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Title and search */}
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
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full sm:w-[300px] pl-10 pr-4 py-2 text-sm border rounded-lg bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product List */}
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4">
            <AppList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 