export default function CTA() {
  return (
    <section className="border-t border-wih-700 px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-balance">
          Ready to transform your team's workflow?
        </h2>
        <p className="mt-6 text-lg text-wih-50/70">
          Join thousands of teams already using WorkInHarmony to collaborate better and ship faster.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button className="rounded-full bg-wih-50 px-8 py-3 font-semibold text-wih-900 hover:bg-wih-50/90 transition">
            Start Your Free Trial
          </button>
          <button className="rounded-full border border-wih-700 px-8 py-3 font-semibold text-wih-50 hover:bg-wih-800 transition">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  )
}
