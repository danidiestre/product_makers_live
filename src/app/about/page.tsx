import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">About Product Makers</h1>
              <p className="text-xl text-muted-foreground">
                A community of creators, innovators, and builders.
              </p>
            </div>

            <div className="space-y-16">
              {/* What we are */}
              <div className="prose prose-lg mx-auto">
                <h2 className="text-2xl font-semibold mb-4">What is Product Makers?</h2>
                <p className="text-gray-600">
                  Product Makers is a vibrant community platform where independent developers, designers, and entrepreneurs come together to showcase their products, share knowledge, and support each other's journey in building successful digital products.
                </p>
              </div>

              {/* Vision */}
              <div className="prose prose-lg mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  We envision a world where anyone with a great product idea has the resources, support, and platform to bring it to life. We believe in democratizing product creation and fostering an inclusive environment where makers can thrive.
                </p>
              </div>

              {/* Mission */}
              <div className="prose prose-lg mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  Our mission is to empower the next generation of product makers by:
                </p>
                <ul className="text-gray-600 list-disc pl-6 space-y-2">
                  <li>Providing a platform to showcase and discover innovative products</li>
                  <li>Facilitating knowledge sharing and collaboration among makers</li>
                  <li>Building a supportive community that celebrates creativity and entrepreneurship</li>
                  <li>Offering resources and tools to help makers succeed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 