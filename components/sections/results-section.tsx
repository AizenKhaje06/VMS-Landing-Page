"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp } from "lucide-react"

export function ResultsSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animatedMetrics, setAnimatedMetrics] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          results.forEach((_, idx) => {
            setTimeout(() => {
              setAnimatedMetrics((prev) => [...prev, idx])
            }, Number.parseInt(results[idx].delay) * 1000)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const results = [
    { metric: "92%", description: "Pore Size Reduction", delay: "0.2s" },
    { metric: "4 Weeks", description: "Visible Transformation", delay: "0.3s" },
    { metric: "50,000+", description: "Happy Customers", delay: "0.4s" },
    { metric: "4.9/5", description: "Average Rating", delay: "0.5s" },
  ]

  return (
    <section ref={sectionRef} id="results" className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            📊 Real <span className="text-primary">Results</span>
          </h2>
          <p
            className={`text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Proven results from thousands of Filipino women using the Volcanic Mud Scrub
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {results.map((result, idx) => (
            <div
              key={idx}
              className={`rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 p-6 min-h-64 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/20 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: result.delay }}
            >
              <div
                className={`text-5xl sm:text-6xl font-black text-primary mb-3 leading-none group-hover:scale-105 transition-transform duration-300 ${animatedMetrics.includes(idx) ? "animate-count-up" : "opacity-0"}`}
              >
                {result.metric}
              </div>
              <p className="text-sm sm:text-base text-foreground/80 font-medium tracking-wide leading-snug">
                {result.description}
              </p>
              <div className="mt-4 h-1 w-12 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Before/After Showcase */}
        <div
          className={`rounded-xl bg-card border border-border/50 p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Before & After Transformations</h3>
          <div className="grid sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="rounded-lg overflow-hidden border border-border/30">
                <div className="aspect-square bg-gradient-to-br from-card to-background flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-primary/40" />
                </div>
                <div className="p-4 bg-background">
                  <p className="text-sm text-foreground/70 text-center">Visible transformation after consistent use</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Benefits */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Immediate Effects (After 1st Use)",
              benefits: [
                "Smoother skin texture",
                "Refined pore appearance",
                "Deep cleansing sensation",
                "Brighter complexion",
              ],
            },
            {
              title: "Long-Term Results (2-4 Weeks)",
              benefits: [
                "Dramatically reduced pore size",
                "Clearer, glowing skin",
                "Reduced acne breakouts",
                "Improved skin tone",
              ],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className={`rounded-xl bg-card border border-border/50 p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
            >
              <h4 className="text-xl font-bold text-foreground mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
