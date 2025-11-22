'use client'
import Image from "next/image";
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles, Zap, Target, Share2, Star, Quote, ChevronRight } from "lucide-react"
import { motion, useScroll } from "framer-motion"

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marketing Director",
    company: "TechFlow",
    content: "Connic AI has completely transformed our content strategy. We're producing 10x more content with higher engagement rates.",
    avatar: "SJ"
  },
  {
    name: "Marcus Chen",
    role: "Founder",
    company: "GrowthLabs",
    content: "The ability to tailor content for specific platforms is a game changer. My LinkedIn engagement is up 300% since using Connic.",
    avatar: "MC"
  },
  {
    name: "Elena Rodriguez",
    role: "Social Media Manager",
    company: "Creative Co",
    content: "Finally, an AI tool that understands brand voice. It doesn't sound robotic like the others. Highly recommended!",
    avatar: "ER"
  }
]

const workflowSteps = [
  {
    title: "Define Your Audience",
    description: "Tell Connic who you're talking to. Be specific about demographics, interests, and pain points.",
    icon: Target,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Choose Your Platform",
    description: "Select where this content will live. Connic optimizes tone, length, and format for LinkedIn, Twitter, Instagram, and more.",
    icon: Share2,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop"
  },
  {
    title: "Generate & Refine",
    description: "Get instant variations. Tweak the tone, adjust the length, or ask for a complete rewrite in seconds.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1974&auto=format&fit=crop"
  }
]

export default function LandingPage() {
  const containerRef = useRef(null)
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent text-foreground flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <header className="border-b sticky top-0 bg-background/10 backdrop-blur-md z-50 border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Sparkles size={18} />
            </div>
            Connic AI
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#workflow" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 overflow-hidden relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto max-w-4xl text-center space-y-8"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Now with Gemini 3 Pro
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Marketing Srategist <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600">Right In Your Hands</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate targeted campaigns tailored to specific audiences and optimized for every social platform in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 text-base gap-2 bg-white text-black hover:bg-gray-200">
                  Start Creating Free <ArrowRight size={18} />
                </Button>
              </Link>
            
            </div>
            
            {/* Dashboard Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-16 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
               <div className="aspect-video bg-white/5 relative group">
                  <Image 
                    src="/dashboardprev.png" 
                    alt="Connic AI Dashboard" 
                    fill 
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60"></div>
               </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Everything you need to scale</h2>
              <p className="text-muted-foreground">
                Built for marketers who demand quality and speed.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Audience Targeting",
                  description: "Define personas and let AI craft messages that resonate with their specific pain points.",
                  icon: Target
                },
                {
                  title: "Platform Optimization",
                  description: "Automatically format content for LinkedIn, Twitter, Instagram, and email newsletters.",
                  icon: Share2
                },
                {
                  title: "Brand Voice",
                  description: "Train the AI on your previous content to maintain a consistent tone across all channels.",
                  icon: Zap
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4">
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Section - Alternating Layout with Scroll Animation */}
        <section id="workflow" className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How Connic Works</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From idea to published campaign in three simple steps.
              </p>
            </div>

            <div className="space-y-32">
              {workflowSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}
                >
                  <div className="flex-1 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold">{step.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {['Smart Analysis', 'Instant Generation', 'One-click Export'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                          <CheckCircle2 size={16} className="text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 w-full">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-transparent mix-blend-overlay z-10"></div>
                      <Image 
                        src={step.image} 
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section - Scroll Scale Effect */}
        <section id="testimonials" className="py-24 bg-black/20 backdrop-blur-sm overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Loved by Marketers</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 relative"
                >
                  <Quote className="absolute top-8 right-8 text-white/10" size={40} />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4 text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    &quot;{testimonial.content}&quot;
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 blur-[100px] -z-10"></div>
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your marketing?</h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of marketers using Connic AI to create better content, faster.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-black hover:bg-gray-200">
                Get Started for Free <ChevronRight className="ml-2" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-muted-foreground">No credit card required • 14-day free trial</p>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                  <Sparkles size={18} />
                </div>
                Connic AI
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered marketing copy generator for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
                <li><Link href="#" className="hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Connic AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
