export default function Features() {
  const features = [
    {
      icon: "✓",
      title: "Task Management",
      description:
        "Organize and prioritize tasks with ease. Set deadlines, assign team members, and track progress in real-time.",
    },
    {
      icon: "💬",
      title: "Real-time Chat",
      description:
        "Communicate instantly with your team. Share updates, ask questions, and collaborate without leaving the platform.",
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
  ]

  return (
    <section id="features" className="px-6 py-20 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl text-balance">Everything you need to succeed</h2>
          <p className="mt-4 text-lg text-wih-50/60">Powerful features designed for modern teams</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-wih-700 bg-wih-800 p-6 hover:border-wih-600 hover:bg-wih-800/80 transition"
            >
              <div className="mb-4 text-3xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-wih-50">{feature.title}</h3>
              <p className="text-wih-50/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
