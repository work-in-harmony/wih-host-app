export default function Stats() {
  const stats = [
    { label: "Teams using WorkInHarmony", value: "10,000+" },
    { label: "Tasks completed daily", value: "500K+" },
    { label: "Time saved per team", value: "20 hours" },
    { label: "Uptime guarantee", value: "99.9%" },
  ]

  return (
    <section className="border-y border-wih-700 px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-wih-50 md:text-4xl">{stat.value}</div>
              <p className="mt-2 text-sm text-wih-50/60 md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
