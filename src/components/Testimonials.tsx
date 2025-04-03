export function Testimonials() {
  const testimonials = [
    {
      quote: "Product Makers transformed how I build and launch products. The community feedback alone saved me months of development time.",
      author: "Sarah Johnson",
      role: "Founder, TechFlow",
      image: "/avatars/avatar-1.png"
    },
    {
      quote: "The resources and tools available here helped me turn my idea into a profitable business in just three months.",
      author: "Michael Chen",
      role: "CEO, Innovate Labs",
      image: "/avatars/avatar-2.png"
    },
    {
      quote: "I've tried many product development platforms, but none have the combination of community and resources that Product Makers offers.",
      author: "Aisha Patel",
      role: "Product Lead, Scaleup Inc.",
      image: "/avatars/avatar-3.png"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Trusted by Makers Worldwide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our community has to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-secondary/30 p-6 rounded-lg border flex flex-col gap-4">
              <div className="relative">
                <svg 
                  className="absolute -top-4 -left-3 text-primary/20 h-10 w-10" 
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.032-.52.112-1.01.24-.496.127-.855.222-1.054.282l-.39.09c-.124.03-.25.05-.378.066-.217.015-.377.048-.513.09l.05-3.65c.066-.02.157-.035.272-.05.214-.02.39-.035.53-.06l.126-.013c.11-.01.334-.03.673-.06.34-.033.612-.047.826-.047.468 0 .955.067 1.46.2.506.134.908.33 1.207.59.299.26.53.575.693.944.164.37.246.824.246 1.368 0 .52-.123.924-.367 1.22-.245.295-.7.628-1.35 1.005-.652.377-1.23.634-1.736.77l.276.483c.164-.04.393-.138.684-.295.29-.157.53-.253.714-.285.184-.032.357.01.52.14.163.132.245.307.245.524 0 .45-.097.873-.29 1.272-.193.4-.533.742-1.02 1.027-.495.285-1.02.478-1.608.582-.59.103-1.242.155-1.95.155-1.188 0-2.06-.258-2.62-.773-.562-.516-.842-1.125-.842-1.825 0-.74.237-1.34.936-1.82.374-.254 1.015-.569 1.863-.946-.73-.54-1.095-1.305-1.095-2.292 0-.568.135-1.074.417-1.516.28-.443.673-.785 1.18-1.03.505-.245 1.064-.369 1.676-.369.304 0 .62.025.945.075.324.05.678.136 1.06.256l.395.124.34.13c.152.055.372.127.66.214.99.288 1.69.636 2.1 1.044.41.408.62.895.62 1.457 0 .218-.033.418-.101.6-.066.18-.176.34-.33.48-.153.14-.4.28-.738.42-.34.14-.743.262-1.208.365 0-.68-.054-1.267-.162-1.76-.108-.494-.294-.903-.56-1.228-.264-.325-.624-.58-1.08-.765-.456-.186-.984-.28-1.584-.28-.457 0-.855.067-1.193.2-.34.134-.602.315-.79.54-.186.228-.28.44-.28.635 0 .367.148.656.443.87.295.213.722.373 1.28.48.558.11 1.157.19 1.792.245.635.055 1.22.12 1.75.195.53.077.97.173 1.298.29 1.11.43 1.666 1.095 1.666 1.987 0 .593-.205 1.072-.613 1.442-.41.37-.982.556-1.72.556-.19 0-.428-.026-.716-.076-.287-.05-.486-.076-.595-.076-.277 0-.523.073-.74.216-.217.143-.325.325-.325.546 0 .19.045.365.136.523.09.158.229.293.416.405.187.113.439.19.756.238.316.048.687.073 1.113.073.557 0 1.08-.083 1.573-.246.418-.142.757-.376 1.016-.702.26-.326.388-.717.388-1.175 0-.783-.324-1.335-.97-1.652.57-.163.997-.404 1.273-.72.275-.318.415-.674.415-1.07z"></path>
                </svg>
                <p className="text-lg italic relative z-10">{testimonial.quote}</p>
              </div>
              <div className="flex items-center mt-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden mr-3">
                  {/* Placeholder for avatar image */}
                  <span className="text-sm font-semibold">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 