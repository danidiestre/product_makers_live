import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for solo makers just getting started",
      features: [
        "Basic product creation tools",
        "Community forum access",
        "5 project templates",
        "1GB storage",
        "Email support"
      ],
      cta: "Get Started",
      ctaLink: "/signup",
      popular: false
    },
    {
      name: "Pro",
      price: "29",
      description: "For serious makers ready to scale their products",
      features: [
        "Everything in Free",
        "Advanced analytics dashboard",
        "Unlimited projects",
        "50GB storage",
        "Priority support",
        "Team collaboration (up to 3)",
        "Custom domains"
      ],
      cta: "Try Free for 14 Days",
      ctaLink: "/signup/pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "99",
      description: "For teams and organizations with complex needs",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "Dedicated account manager",
        "Custom integrations",
        "500GB storage",
        "24/7 phone support",
        "Advanced security features",
        "Custom reporting"
      ],
      cta: "Contact Sales",
      ctaLink: "/contact",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for your making journey. All plans include core features to help you build amazing products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg border ${plan.popular ? 'border-primary shadow-lg relative' : 'border-border'} bg-background p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline">
                  <span className="text-4xl font-extrabold">${plan.price}</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                asChild 
                className={`${plan.popular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
                size="lg"
              >
                <Link href={plan.ctaLink}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 