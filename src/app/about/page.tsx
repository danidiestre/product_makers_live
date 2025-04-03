import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Cta } from '@/components/Cta'

export const metadata = {
  title: 'About Product Makers - Our Story and Mission',
  description: 'Learn about Product Makers, our mission to empower creators and builders, and the team behind our platform.'
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Our Mission</h1>
            <p className="text-xl text-muted-foreground text-center mb-12">
              Empowering the next generation of creators, innovators, and product makers.
            </p>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p>
                Product Makers was founded in 2023 with a simple but powerful idea: making it easier for creators to build and launch amazing products. We believe that everyone has the potential to create something impactful, but too often, great ideas never see the light of day due to technical barriers, resource constraints, or lack of community support.
              </p>
              <p>
                Our platform aims to democratize product creation by providing the tools, resources, and community that makers need to turn their ideas into reality. Whether you're a solo entrepreneur, part of a small team, or working within a larger organization, we're here to support your product development journey.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe that the tools to create great products should be accessible to everyone, regardless of technical background or resources.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 6.1H3" />
                    <path d="M21 12.1H3" />
                    <path d="M15.1 18H3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing the boundaries of what's possible in product development and creation tools.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8c0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6h8" />
                    <path d="M18 16c2.2 0 4-1.8 4-4s-1.8-4-4-4h-8" />
                    <circle cx="18" cy="16" r="2" />
                    <circle cx="6" cy="8" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive environment where makers can connect, collaborate, and grow together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-12">
              We're a diverse group of creators, engineers, and entrepreneurs passionate about empowering makers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
                  <h3 className="font-semibold">Team Member {i}</h3>
                  <p className="text-sm text-muted-foreground">Co-founder & Role</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  )
} 