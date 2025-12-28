"use client"

import { useEffect, useState, useRef } from "react"

export function ProblemSolutionSection() {
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

  const problems = [
    {
      title: "Clogged Pores in Humidity",
      description: "Tropical heat causes trapped sweat and bacteria",
    },
    {
      title: "Dull Skin from Pollution",
      description: "Metro air pollution creates surface buildup",
    },
    {
      title: "Oiliness in Tropical Heat",
      description: "Excess sebum production throughout the day",
    },
  ]

  const solutions = [
    {
      title: "Deep Purification",
      description: "Volcanic minerals extract impurities effectively",
    },
    {
      title: "Oil Control",
      description: "Natural clay balances sebum production",
    },
    {
      title: "Natural Glow",
      description: "Reveals radiant skin in just 4 weeks",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className={`text-4xl sm:text-5xl font-bold text-foreground text-center mb-16 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Why Filipino Skin Needs <span className="text-primary">Deep Clay Purification</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Problems Column - added staggered animations */}
          <div>
            <h3
              className={`text-2xl font-semibold text-foreground mb-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              Common Skin Issues
            </h3>
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">✕</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h4>
                    <p className="text-foreground/70">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Column - added staggered animations */}
          <div>
            <h3
              className={`text-2xl font-semibold text-foreground mb-8 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              Deep Cleansing Solutions
            </h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-semibold">✓</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{solution.title}</h4>
                    <p className="text-foreground/70">{solution.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`text-center py-8 border-t border-border ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          <p className="text-lg text-foreground/80">
            Complete volcanic-inspired skincare solution for tropical Filipino skin
          </p>
        </div>
      </div>
    </section>
  )
}
