import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AppList />
      </main>
      <Footer />
    </div>
  )
} 