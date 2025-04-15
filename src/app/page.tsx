'use client'

import { Navbar } from '@/components/Navbar'
import { AppList } from '@/components/AppList'
import Footer from '@/components/Footer'
import StreamCountdown from '@/components/StreamCountdown'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section with Subtle Modern Gradient */}
        <section className="relative overflow-hidden py-16 md:py-20 border-b border-gray-200">
          {/* Subtle gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50"></div>
          
          {/* Light pattern overlay */}
          <div className="absolute inset-0 opacity-10" 
               style={{
                 backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
               }}
          ></div>
          
          {/* Soft gradient accents */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-5xl opacity-5"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-5xl opacity-5"></div>
          
          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating + symbol */}
            <div 
              className="absolute w-16 h-16 opacity-5" 
              style={{
                top: '15%',
                left: '10%',
                animation: 'float 20s ease-in-out infinite',
                background: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5V19M5 12H19' stroke='%232563EB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(2px)',
              }}
            ></div>
            
            {/* Floating circle */}
            <div 
              className="absolute w-12 h-12 bg-indigo-300 rounded-full opacity-8" 
              style={{
                top: '30%',
                right: '15%',
                animation: 'float 15s ease-in-out infinite 2s',
                filter: 'blur(8px)',
              }}
            ></div>
            
            {/* Floating square */}
            <div 
              className="absolute w-10 h-10 bg-blue-200 rounded-md opacity-5" 
              style={{
                bottom: '25%',
                left: '30%',
                animation: 'floatReverse 25s ease-in-out infinite 1s',
                filter: 'blur(6px)',
              }}
            ></div>
            
            {/* Floating times symbol */}
            <div 
              className="absolute w-14 h-14 opacity-5" 
              style={{
                top: '65%',
                right: '25%',
                animation: 'float 18s ease-in-out infinite 3s',
                background: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 6L6 18M6 6L18 18' stroke='%237C3AED' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(2px)',
              }}
            ></div>
            
            {/* Floating diamond */}
            <div 
              className="absolute w-16 h-16 opacity-5" 
              style={{
                top: '45%',
                left: '40%',
                animation: 'floatReverse 22s ease-in-out infinite',
                transform: 'rotate(45deg)',
                background: 'rgba(191, 219, 254, 0.2)',
                filter: 'blur(5px)',
              }}
            ></div>
          </div>
          
          {/* Animation keyframes */}
          <style jsx>{`
            @keyframes float {
              0% {
                transform: translateY(0) translateX(0);
              }
              25% {
                transform: translateY(-10px) translateX(5px);
              }
              50% {
                transform: translateY(0) translateX(10px);
              }
              75% {
                transform: translateY(10px) translateX(5px);
              }
              100% {
                transform: translateY(0) translateX(0);
              }
            }
            
            @keyframes floatReverse {
              0% {
                transform: translateY(0) translateX(0);
              }
              25% {
                transform: translateY(10px) translateX(-5px);
              }
              50% {
                transform: translateY(0) translateX(-10px);
              }
              75% {
                transform: translateY(-10px) translateX(-5px);
              }
              100% {
                transform: translateY(0) translateX(0);
              }
            }
          `}</style>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                discover amazing products built by makers
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                product makers is a community showcasing innovative apps and tools created by independent developers and small teams.
              </p>
              <StreamCountdown />
              <div className="inline-flex justify-center gap-4 flex-wrap mt-8">
                <a 
                  href="#featured-apps" 
                  className="px-6 py-3 rounded-lg bg-brand-blue text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 hover:bg-brand-blue/90 lowercase flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                  explore products
                </a>
                <a 
                  href="https://youtube.com/@productmakers" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-[#FF0000] text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#FF0000]/90 lowercase flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  youtube
                </a>
                <a 
                  href="https://discord.gg/productmakers" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-[#5865F2] text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 hover:bg-[#5865F2]/90 lowercase flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                  </svg>
                  discord
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Product List Section */}
        <div id="featured-apps" className="container mx-auto px-4 py-8">
          <AppList />
        </div>
      </main>
      <Footer />
    </div>
  )
} 