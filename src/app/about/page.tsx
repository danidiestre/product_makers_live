'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ChevronDown } from 'lucide-react'
import Script from 'next/script'

// Metadata is handled in metadata.ts in the same directory for Next.js 13+
// Cannot use export const metadata in client components

export default function AboutPage() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]) // First one open by default
  
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }
  
  // FAQ items
  const faqItems = [
    {
      question: "What is Product Makers?",
      answer: "Product Makers is a Spanish-speaking community for people who create digital products, focused on sharing real experiences and helping others develop viable products from scratch."
    },
    {
      question: "What is the main goal of this community?",
      answer: <>
        <p className="text-gray-600 mb-3">
          To create a space where makers can:
        </p>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Learn from each other</li>
          <li>Share tools and processes</li>
          <li>Receive real-time feedback</li>
          <li>Develop real products, not just theoretical ideas</li>
        </ul>
      </>
    },
    {
      question: "What defines a Product Maker?",
      answer: "A Product Maker is someone capable of building and launching digital products by themselves or in collaboration. They don't need to be an expert in everything, but they understand and participate in the entire process: ideation, design, development, validation, go-to-market, etc."
    },
    {
      question: "Who is this community for?",
      answer: "Designers, developers, PMs, indie hackers, CTOs, entrepreneurs, and anyone interested in creating digital products, either from scratch or within established companies."
    },
    {
      question: "Do I need technical knowledge to participate?",
      answer: "Not necessarily. While many members come from the product world, anyone interested in learning, sharing, and building is welcome."
    },
    {
      question: "What type of content will be shared?",
      answer: <ul className="text-gray-600 list-disc pl-6 space-y-1">
        <li>Product development in public (building in public)</li>
        <li>Interviews and case studies</li>
        <li>Thematic talks about UX, ASO, SEO, growth, etc.</li>
        <li>Workflow comparisons</li>
        <li>Tools and methodologies (MVPs, MCPs, design-to-code, etc.)</li>
      </ul>
    },
    {
      question: "Where can I follow the content?",
      answer: "All content will be shared on the Product Makers YouTube channel. Events will be announced on platforms like LinkedIn and Instagram, and registrations will be done through Luma."
    },
    {
      question: "Is there a platform for the community?",
      answer: <>
        <p className="text-gray-600 mb-3">
          Yes, Discord is being used for:
        </p>
        <ul className="text-gray-600 list-disc pl-6 space-y-1">
          <li>Sharing resources</li>
          <li>Resolving doubts</li>
          <li>Receiving feedback</li>
          <li>Connecting with other makers</li>
        </ul>
        <p className="text-gray-600 mt-3">
          A virtual coworking voice channel has also been created.
        </p>
      </>
    },
    {
      question: "What's the spirit behind the community?",
      answer: "Zero bullshit. Everything is real, practical, and based on experience. We aim to elevate each other, collaborate, and form a solid creative ecosystem in the Spanish-speaking world."
    },
    {
      question: "Does this have commercial purposes?",
      answer: "No. The project was born with the goal of creating value and community, without immediate intention of monetization. If there are ever sponsors, it will be without compromising the independence or utility of the community."
    },
    {
      question: "How can I participate?",
      answer: <ol className="text-gray-600 list-decimal pl-6 space-y-1">
        <li>Sign up for events via Luma.</li>
        <li>Join Discord.</li>
        <li>Share your projects, ideas, and questions.</li>
        <li>Subscribe to the Product Makers YouTube channel.</li>
      </ol>
    },
    {
      question: "Why in Spanish?",
      answer: "Because it's the natural language of the organizing team and the target audience. We want to create quality and accessible content for Spain and Latin America."
    }
  ];
  
  // JSON-LD for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' 
          ? faq.answer 
          : "See the Product Makers website for complete details."
      }
    }))
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Add JSON-LD for FAQ rich snippets */}
      <Script 
        id="about-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    
      <Navbar />
      <main className="flex-1">
        <article className="py-20 bg-background"> {/* Changed section to article for better semantics */}
          <div className="container max-w-4xl">
            <header className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4" id="about-title">About Product Makers</h1>
              <p className="text-xl text-muted-foreground">
                A community of creators, innovators, and builders.
              </p>
            </header>

            <div className="space-y-16">
              {/* What we are */}
              <section className="prose prose-lg mx-auto" aria-labelledby="what-is">
                <h2 className="text-2xl font-semibold mb-4" id="what-is">What is Product Makers?</h2>
                <p className="text-gray-600">
                  Product Makers is a vibrant community platform where indie makers, designers, and entrepreneurs come together to showcase their products, share knowledge, and support each other's journey in building successful digital products.
                </p>
              </section>

              {/* Vision */}
              <section className="prose prose-lg mx-auto" aria-labelledby="vision">
                <h2 className="text-2xl font-semibold mb-4" id="vision">Our Vision</h2>
                <p className="text-gray-600">
                  We envision a world where anyone with a great product idea has the resources, support, and platform to bring it to life. We believe in democratizing product creation and fostering an inclusive environment where makers can thrive.
                </p>
              </section>

              {/* Mission */}
              <section className="prose prose-lg mx-auto" aria-labelledby="mission">
                <h2 className="text-2xl font-semibold mb-4" id="mission">Our Mission</h2>
                <p className="text-gray-600">
                  Our mission is to empower the next generation of product makers by:
                </p>
                <ul className="text-gray-600 list-disc pl-6 space-y-2">
                  <li>Providing a platform to showcase and discover innovative products</li>
                  <li>Facilitating knowledge sharing and collaboration among makers</li>
                  <li>Building a supportive community that celebrates creativity and entrepreneurship</li>
                  <li>Offering resources and tools to help makers succeed</li>
                </ul>
              </section>
              
              {/* FAQ Section */}
              <section className="prose prose-lg mx-auto" aria-labelledby="faq-heading">
                <h2 className="text-2xl font-semibold mb-8 text-center" id="faq-heading">Frequently Asked Questions</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {faqItems.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`bg-white rounded-lg border transition-shadow duration-300 ${
                        openFaqs.includes(index) 
                          ? 'border-brand-blue/30 shadow-lg shadow-brand-blue/5' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <button 
                        onClick={() => toggleFaq(index)}
                        className="flex justify-between items-center w-full text-left p-5 focus:outline-none"
                        aria-expanded={openFaqs.includes(index)}
                        aria-controls={`faq-answer-${index}`}
                      >
                        <h3 className={`text-xl font-medium transition-colors ${
                          openFaqs.includes(index) ? 'text-brand-blue' : 'text-gray-900'
                        }`}>
                          {faq.question}
                        </h3>
                        <div className={`flex-shrink-0 ml-4 p-1 rounded-full transition-colors ${
                          openFaqs.includes(index) ? 'bg-brand-blue/10' : 'bg-gray-100'
                        }`}>
                          <ChevronDown 
                            aria-hidden="true"
                            className={`h-5 w-5 transition-transform duration-300 ${
                              openFaqs.includes(index) 
                                ? 'rotate-180 text-brand-blue' 
                                : 'text-gray-500'
                            }`} 
                          />
                        </div>
                      </button>
                      
                      <div 
                        id={`faq-answer-${index}`}
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          openFaqs.includes(index) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-5 pt-0 border-t border-gray-100">
                          {typeof faq.answer === 'string' 
                            ? <p className="text-gray-600">{faq.answer}</p>
                            : faq.answer
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
} 