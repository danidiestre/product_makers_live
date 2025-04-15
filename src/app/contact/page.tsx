import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Contact Product Makers - Get in Touch',
  description: 'Have questions or need help? Contact our team at Product Makers. We\'re here to support your product journey.'
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-background">
          <div className="container max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Have questions about our platform or need help getting started? Our team is here to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+1 (888) 123-4567</p>
                      <p className="text-sm text-muted-foreground">Monday - Friday, 9am - 5pm PST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">support@productmakers.com</p>
                      <p className="text-sm text-muted-foreground">We aim to respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold">Office</h3>
                      <p className="text-muted-foreground">123 Product St, Suite 456</p>
                      <p className="text-sm text-muted-foreground">San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 rounded-md border bg-background"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 rounded-md border bg-background"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full p-2 rounded-md border bg-background"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-2 rounded-md border bg-background"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting this form, you agree to our 
                    <a href="/privacy" className="text-primary hover:underline mx-1">Privacy Policy</a>
                    and 
                    <a href="/terms" className="text-primary hover:underline ml-1">Terms of Service</a>.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section (Placeholder) */}
        <section className="py-8 bg-muted/30">
          <div className="container">
            <div className="h-64 bg-muted rounded-lg w-full flex items-center justify-center">
              <p className="text-muted-foreground">Map Placeholder</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 