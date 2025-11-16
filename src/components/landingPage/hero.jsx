export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-wih-800 px-4 py-2 text-sm text-wih-50/80">
              ✨ The future of team collaboration
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-balance">
              Work smarter, not harder
            </h1>
            <p className="text-lg leading-relaxed text-wih-50/80 max-w-prose">
              Our project management tool helps teams organize tasks, share files, chat in real time, and stay on top of
              deadlines—all in one place. Whether you're managing a big project or collaborating with a small team, it
              makes work simple, fast, and stress-free.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full bg-wih-50 px-8 py-3 font-semibold text-wih-900 hover:bg-wih-50/90 transition">
                Start Free Trial
              </button>
              <button className="rounded-full border border-wih-700 px-8 py-3 font-semibold text-wih-50 hover:bg-wih-800 transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 rounded-2xl bg-gradient-to-br from-wih-800 to-wih-900 border border-wih-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-wih-50/60">Your workspace awaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
