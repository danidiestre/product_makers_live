import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Cta() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-lg mb-8 text-primary-foreground/80">
            Join thousands of makers who are creating the next generation of innovative products. Get started for free today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Get Started For Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground" asChild>
              <Link href="/demo">Request Demo</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-primary-foreground/60">
            No credit card required. Start building instantly.
          </p>
        </div>
      </div>
    </section>
  )
} 