"use client"

import { useEffect, useRef, useState } from "react"

export function HowToUseSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const steps = [
    {
      number: "1",
      title: "Apply",
      description: "Apply an ample amount of the scrub to your hands",
      icon: "🧴",
    },
    {
      number: "2",
      title: "Massage",
      description: "Gently massage onto your face and body in circular motions",
      icon: "💆",
    },
    {
      number: "3",
      title: "Leave",
      description: "Leave on the skin for 5-15 minutes for optimal results",
      icon: "⏱️",
    },
    {
      number: "4",
      title: "Rinse",
      description: "Rinse thoroughly with water",
      icon: "💧",
    },
    {
      number: "5",
      title: "Moisturize",
      description: "Apply moisturizer to replenish hydration",
      icon: "✨",
    },
  ]

  const frequency = [
    { level: "Beginners", times: "1-2 times per week", desc: "For sensitive or new users" },
    { level: "Regular Use", times: "2-3 times per week", desc: "For optimal results (recommended)" },
    { level: "Advanced", times: "Up to 3 times per week", desc: "For experienced users with resilient skin" },
  ]

  return (
    <section ref={sectionRef} id="how-to-use" className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            🧪 How to <span className="text-primary">Use</span>
          </h2>
          <p
            className={`text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Simple steps to achieve your best skin with Volcanic Mud Scrub
          </p>
        </div>

        {/* Step-by-step instructions */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8">Application Steps</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`rounded-xl bg-background border border-border/50 p-6 text-center hover:border-primary/50 transition-all duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.2 + idx * 0.08}s` }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-3">{step.title}</h4>
                <p className="text-sm text-foreground/70">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                    <svg className="w-6 h-6 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Frequency Guide */}
        <div
          className={`rounded-xl bg-background border border-border/50 p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.7s" }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">Usage Frequency Guide</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {frequency.map((item, idx) => (
              <div key={idx} className="rounded-lg bg-card border border-border/30 p-6">
                <h4 className="text-xl font-bold text-primary mb-2">{item.level}</h4>
                <p className="text-2xl font-bold text-foreground mb-3">{item.times}</p>
                <p className="text-sm text-foreground/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div
            className={`rounded-xl bg-primary/10 border border-primary/20 p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.8s" }}
          >
            <h4 className="text-xl font-bold text-foreground mb-4">✓ Do's</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span className="text-foreground/80">Do a patch test before first use</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span className="text-foreground/80">Follow with moisturizer always</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span className="text-foreground/80">Use gentle circular motions</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span className="text-foreground/80">Stick to 2-3 times per week</span>
              </li>
            </ul>
          </div>

          <div
            className={`rounded-xl bg-red-500/10 border border-red-500/20 p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.9s" }}
          >
            <h4 className="text-xl font-bold text-foreground mb-4">✗ Don'ts</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <span className="text-foreground/80">Don't overuse or use daily</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <span className="text-foreground/80">Don't scrub too hard</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <span className="text-foreground/80">Don't use on broken or irritated skin</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-red-500">✗</span>
                <span className="text-foreground/80">Don't mix with other exfoliants</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
