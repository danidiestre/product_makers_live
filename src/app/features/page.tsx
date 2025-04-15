import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Cta } from '@/components/Cta'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Product Makers Features - Tools and Capabilities',
  description: 'Explore the powerful features of Product Makers platform. From ideation to launch, we provide everything you need to build successful products.'
}

export default function FeaturesPage() {
  const mainFeatures = [
    {
      title: 'Product Workspace',
      description: 'A centralized environment for all your product work. Manage tasks, track progress, and collaborate with your team.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18.4 9.4 8.5 19.2" />
          <path d="m10.8 5.6 5.6 5.6" />
          <path d="m13 7.8 5.6 5.6" />
          <path d="m16 11.6 5.6 5.6" />
        </svg>
      )
    },
    {
      title: 'Idea Validation',
      description: 'Test your ideas with real users before investing significant resources. Gather feedback and refine your product vision.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 16 2 2 4-4" />
        </svg>
      )
    },
    {
      title: 'Development Tools',
      description: 'Access a suite of tools designed specifically for product development, including templates, frameworks, and code snippets.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 11 2-2-2-2" />
          <path d="M11 13h4" />
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        </svg>
      )
    },
    {
      title: 'Launch Toolkit',
      description: 'Everything you need to successfully launch your product, from marketing templates to growth strategies.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v7" />
          <path d="M5 12a7 7 0 1 0 14 0 7 7 0 1 0-14 0Z" />
          <path d="M12 16v-7" />
          <path d="m15 8-3 3-3-3" />
        </svg>
      )
    }
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-background relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-grid-pattern" />
          </div>
          
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Product Makers</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to build, launch, and grow successful products. Our platform is designed by makers, for makers.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">Start Building Today</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Main Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Core Platform Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our comprehensive suite of tools helps you at every stage of the product development lifecycle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {mainFeatures.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Detailed Features */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Product Development Suite</h2>
              <p className="text-muted-foreground text-lg max-w-3xl">
                Our comprehensive tools cover every aspect of the product development lifecycle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-muted/30 p-8 rounded-lg border">
                <h3 className="text-2xl font-semibold mb-4">Ideation & Research</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Market Research Tools</h4>
                      <p className="text-sm text-muted-foreground">Analyze market trends and identify opportunities with our powerful research dashboard.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Idea Validation Framework</h4>
                      <p className="text-sm text-muted-foreground">Test and validate your ideas quickly with our proven frameworks and methodologies.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Customer Feedback Collection</h4>
                      <p className="text-sm text-muted-foreground">Gather and organize customer insights with surveys, interviews, and user testing tools.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/30 p-8 rounded-lg border">
                <h3 className="text-2xl font-semibold mb-4">Design & Prototyping</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Interactive Wireframing</h4>
                      <p className="text-sm text-muted-foreground">Create and share interactive wireframes and mockups with your team and stakeholders.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Design System Library</h4>
                      <p className="text-sm text-muted-foreground">Access a comprehensive library of UI components and design patterns for consistent products.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Rapid Prototyping Tools</h4>
                      <p className="text-sm text-muted-foreground">Build functional prototypes without coding to test and iterate on your product ideas.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/30 p-8 rounded-lg border">
                <h3 className="text-2xl font-semibold mb-4">Development & Testing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Code Templates & Snippets</h4>
                      <p className="text-sm text-muted-foreground">Accelerate development with pre-built templates and code snippets for common features.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Integrated Testing Tools</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive testing tools to ensure quality and performance before launch.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Version Control Integration</h4>
                      <p className="text-sm text-muted-foreground">Seamless integration with popular version control systems to manage your codebase.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-muted/30 p-8 rounded-lg border">
                <h3 className="text-2xl font-semibold mb-4">Launch & Growth</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Launch Checklist & Playbooks</h4>
                      <p className="text-sm text-muted-foreground">Comprehensive checklists and playbooks to ensure a successful product launch.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Analytics Dashboard</h4>
                      <p className="text-sm text-muted-foreground">Track key metrics and user behavior to continuously improve your product.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Marketing Tool Integration</h4>
                      <p className="text-sm text-muted-foreground">Connect with popular marketing tools to promote and grow your product.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <Cta />
      </main>
      <Footer />
    </div>
  )
} 