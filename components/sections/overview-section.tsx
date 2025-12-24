"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { ThreeDRotatingCarousel } from "./3d-rotating-carousel"

export function OverviewSection() {
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

  const features = [
    "100% Natural Volcanic Clay from Philippine Mines",
    "Enriched with Rice Extract & Papaya Enzymes",
    "Contains Niacinamide (Vitamin B3) for Skin Conditioning",
    "Aloe Vera & Charcoal for Deep Cleansing",
    "Dermatologist Tested & Approved",
    "Safe for All Skin Types (with Patch Test)",
  ]

  return (
    <section ref={sectionRef} id="overview" className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            ✨ Product <span className="text-primary">Overview</span>
          </h2>
          <p
            className={`text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            The ultimate exfoliating scrub designed specifically for tropical Filipino skin
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Rotating Image Carousel */}
          <div className={`${isVisible ? "animate-scale-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <ThreeDRotatingCarousel />
          </div>

          {/* Features List */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Why Choose Our Volcanic Scrub?</h3>
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 items-start"
                  style={
                    isVisible
                      ? { animation: `fade-in-up 0.6s ease-out forwards`, animationDelay: `${0.4 + idx * 0.05}s` }
                      : {}
                  }
                >
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-foreground/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
