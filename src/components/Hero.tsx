import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
      
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Empowering the Next Generation of Product Makers
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community of creators, innovators, and builders. Share, learn, and grow with the best tools and resources.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
          
          <div className="pt-8 border-t w-full flex justify-center">
            <p className="text-muted-foreground text-sm">Trusted by 1000+ makers from leading companies</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Company logos would go here */}
            <div className="h-8 w-24 bg-muted rounded-md"></div>
            <div className="h-8 w-24 bg-muted rounded-md"></div>
            <div className="h-8 w-24 bg-muted rounded-md"></div>
            <div className="h-8 w-24 bg-muted rounded-md"></div>
            <div className="h-8 w-24 bg-muted rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 