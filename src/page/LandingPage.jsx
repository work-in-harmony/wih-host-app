import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wih-700 bg-wih-900/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="text-xl sm:text-2xl font-bold text-wih-50 hover:opacity-90 transition">
          WorkInHarmony
        </a>

        <div className="hidden items-center gap-6 lg:gap-8 md:flex">
          <a href="#features" className="text-sm lg:text-base text-wih-50/80 hover:text-wih-50 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm lg:text-base text-wih-50/80 hover:text-wih-50 transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm lg:text-base text-wih-50/80 hover:text-wih-50 transition-colors">
            Testimonials
          </a>
          <a href="#about" className="text-sm lg:text-base text-wih-50/80 hover:text-wih-50 transition-colors">
            About
          </a>
        </div>

        <div className="hidden items-center gap-3 lg:gap-4 md:flex">
          <button className="px-4 lg:px-6 py-2 text-sm lg:text-base text-wih-50 hover:text-wih-50/80 transition-colors">
            Log in
          </button>
          <button className="rounded-full bg-wih-50 px-4 lg:px-6 py-2 text-sm lg:text-base font-semibold text-wih-900 hover:bg-wih-50/90 transition-all hover:scale-105">
            Get Started
          </button>
        </div>

        <button
          className="md:hidden text-wih-50 p-2 hover:bg-wih-800 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-wih-700 bg-wih-800 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-wih-50/80 hover:text-wih-50 py-2 px-3 rounded-lg hover:bg-wih-700 transition-colors" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#pricing" className="text-wih-50/80 hover:text-wih-50 py-2 px-3 rounded-lg hover:bg-wih-700 transition-colors" onClick={() => setIsOpen(false)}>
              Pricing
            </a>
            <a href="#testimonials" className="text-wih-50/80 hover:text-wih-50 py-2 px-3 rounded-lg hover:bg-wih-700 transition-colors" onClick={() => setIsOpen(false)}>
              Testimonials
            </a>
            <a href="#about" className="text-wih-50/80 hover:text-wih-50 py-2 px-3 rounded-lg hover:bg-wih-700 transition-colors" onClick={() => setIsOpen(false)}>
              About
            </a>
            <div className="pt-3 border-t border-wih-700 mt-2 space-y-3">
              <button className="w-full text-center py-2 px-3 rounded-lg text-wih-50 hover:bg-wih-700 transition-colors">
                Log in
              </button>
              <button className="w-full rounded-full bg-wih-50 px-6 py-3 font-semibold text-wih-900 hover:bg-wih-50/90 transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-32 bg-wih-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-wih-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-wih-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-block rounded-full bg-wih-800 border border-wih-700 px-4 py-2 text-xs sm:text-sm text-wih-50/80">
              ✨ The future of team collaboration
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-wih-50">
              Work smarter, not harder
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-wih-50/80 max-w-2xl mx-auto lg:mx-0">
              Our project management tool helps teams organize tasks, share files, chat in real time, and stay on top of
              deadlines—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="rounded-full bg-wih-50 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-wih-900 hover:bg-wih-50/90 transition-all hover:scale-105 shadow-lg">
                Start Free Trial
              </button>
              <button className="rounded-full border-2 border-wih-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-wih-50 hover:bg-wih-800 transition-all hover:border-wih-600">
                Watch Demo
              </button>
            </div>
            
            <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-wih-50/60">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-wih-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Free 14-day trial
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-wih-50" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No credit card required
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-2xl bg-gradient-to-br from-wih-800 to-wih-900 border border-wih-700 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="text-5xl sm:text-6xl md:text-7xl mb-4">📊</div>
                  <p className="text-base sm:text-lg text-wih-50/60">Your workspace awaits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "50K+", label: "Tasks Completed" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 border-y border-wih-700 bg-wih-800">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-wih-50 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm lg:text-base text-wih-50/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: "✓",
      title: "Task Management",
      description: "Organize and prioritize tasks with ease. Set deadlines, assign team members, and track progress in real-time.",
    },
    {
      icon: "💬",
      title: "Real-time Chat",
      description: "Communicate instantly with your team. Share updates, ask questions, and collaborate without leaving the platform.",
    },
    {
      icon: "📁",
      title: "File Sharing",
      description: "Upload, store, and share files securely. Keep all project documents in one centralized location.",
    },
    {
      icon: "📈",
      title: "Analytics & Reports",
      description: "Get insights into team productivity. Track metrics and generate reports to optimize your workflow.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Stay updated with intelligent alerts. Never miss important deadlines or team updates.",
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "Your data is protected with industry-leading security. Compliance with GDPR, SOC 2, and more.",
    },
  ];

  return (
    <section id="features" className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-32 bg-wih-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block rounded-full bg-wih-800 border border-wih-700 px-4 py-2 text-xs sm:text-sm text-wih-50/80 mb-4 sm:mb-6">
            🚀 Powerful Features
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wih-50 mb-4">
            Everything you need to succeed
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-wih-50/60 max-w-2xl mx-auto">
            Powerful features designed for modern teams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-wih-700 bg-wih-800 p-5 sm:p-6 lg:p-8 hover:border-wih-600 hover:bg-wih-800/80 transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-4 text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-wih-50">{feature.title}</h3>
              <p className="text-sm sm:text-base text-wih-50/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      content: "WorkInHarmony transformed how our team collaborates. We're 40% more productive!",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      content: "The real-time chat and task management features are game-changers for remote teams.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Watson",
      role: "Team Lead",
      company: "DesignHub",
      content: "Best project management tool we've used. Intuitive, powerful, and reliable.",
      avatar: "👩‍🎨"
    },
  ];

  return (
    <section id="testimonials" className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-32 bg-wih-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block rounded-full bg-wih-800 border border-wih-700 px-4 py-2 text-xs sm:text-sm text-wih-50/80 mb-4 sm:mb-6">
            💬 Testimonials
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wih-50 mb-4">
            Loved by teams worldwide
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-wih-50/60 max-w-2xl mx-auto">
            See what our customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border border-wih-700 bg-wih-800 p-5 sm:p-6 lg:p-8 hover:border-wih-600 hover:bg-wih-800/80 transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="text-3xl sm:text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-sm sm:text-base text-wih-50">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-wih-50/60">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-wih-50/80 leading-relaxed italic">"{testimonial.content}"</p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-sm sm:text-base">⭐</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for small teams",
      features: ["Up to 5 team members", "10GB storage", "Basic features", "Email support"],
      highlighted: false
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For growing teams",
      features: ["Up to 20 team members", "100GB storage", "Advanced features", "Priority support", "Custom integrations"],
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: ["Unlimited team members", "Unlimited storage", "All features", "24/7 dedicated support", "Custom solutions"],
      highlighted: false
    },
  ];

  return (
    <section id="pricing" className="px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-32 bg-wih-800">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 sm:mb-16 text-center">
          <div className="inline-block rounded-full bg-wih-900 border border-wih-700 px-4 py-2 text-xs sm:text-sm text-wih-50/80 mb-4 sm:mb-6">
            💰 Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wih-50 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-wih-50/60 max-w-2xl mx-auto">
            Choose the plan that's right for your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl border p-6 sm:p-8 transition-all hover:scale-105 ${
                plan.highlighted
                  ? "border-wih-50 bg-wih-900 shadow-2xl"
                  : "border-wih-700 bg-wih-900/50 hover:border-wih-600"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 text-center">
                  <span className="inline-block rounded-full bg-wih-50 px-3 py-1 text-xs font-semibold text-wih-900">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-wih-50 mb-2">{plan.name}</h3>
                <p className="text-sm text-wih-50/60 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-wih-50">{plan.price}</span>
                  <span className="text-sm sm:text-base text-wih-50/60">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base">
                    <svg className="w-5 h-5 text-wih-50 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-wih-50/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full py-3 font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-wih-50 text-wih-900 hover:bg-wih-50/90 hover:scale-105"
                    : "bg-wih-800 text-wih-50 border border-wih-700 hover:bg-wih-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-wih-700 px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:py-32 bg-wih-900">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-wih-50 mb-4 sm:mb-6">
          Ready to transform your team's workflow?
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-wih-50/70 max-w-2xl mx-auto">
          Join thousands of teams already using WorkInHarmony to collaborate better and ship faster.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="rounded-full bg-wih-50 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-wih-900 hover:bg-wih-50/90 transition-all hover:scale-105 shadow-lg">
            Start Your Free Trial
          </button>
          <button className="rounded-full border-2 border-wih-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-wih-50 hover:bg-wih-800 transition-all hover:border-wih-600">
            Schedule a Demo
          </button>
        </div>
        <p className="mt-6 sm:mt-8 text-xs sm:text-sm text-wih-50/50">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-wih-700 bg-wih-800 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-wih-50 mb-3 sm:mb-4">WorkInHarmony</h3>
            <p className="text-xs sm:text-sm text-wih-50/60 max-w-xs">
              The complete project management solution for modern teams.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base text-wih-50 mb-3 sm:mb-4">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#features" className="text-wih-50/70 hover:text-wih-50">Features</a></li>
              <li><a href="#pricing" className="text-wih-50/70 hover:text-wih-50">Pricing</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Integrations</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Updates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base text-wih-50 mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#about" className="text-wih-50/70 hover:text-wih-50">About</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Blog</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Careers</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base text-wih-50 mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Docs</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">API Reference</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Community</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Status</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm sm:text-base text-wih-50 mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Privacy Policy</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Terms of Service</a></li>
              <li><a href="#" className="text-wih-50/70 hover:text-wih-50">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-wih-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-wih-50/60">
          <p>&copy; {new Date().getFullYear()} WorkInHarmony. All rights reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-wih-50">Twitter</a>
            <a href="#" className="hover:text-wih-50">LinkedIn</a>
            <a href="#" className="hover:text-wih-50">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function LandingPage() { 
  return (
    <div className="bg-wih-900 text-wih-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}