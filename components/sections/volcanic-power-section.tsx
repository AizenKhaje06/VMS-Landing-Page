"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { ThreeDRotatingCarousel } from "./3d-rotating-carousel"

export function VolcanicPowerSection() {
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

  const ingredients = [
    {
      name: "Volcanic Clay",
      benefit: "Deep pore cleansing & oil absorption",
    },
    {
      name: "Papaya Extract",
      benefit: "Natural enzyme exfoliation",
    },
    {
      name: "Rice Extract",
      benefit: "Gentle brightening & soothing",
    },
    {
      name: "Niacinamide (Vitamin B3)",
      benefit: "Skin conditioning & barrier support",
    },
    {
      name: "Aloe Vera",
      benefit: "Hydration & anti-inflammation",
    },
    {
      name: "Charcoal",
      benefit: "Toxin removal & deep detox",
    },
  ]

  return (
    <section ref={sectionRef} id="volcanic-power" className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            🔥 Volcanic <span className="text-primary">Power</span>
          </h2>
          <p
            className={`text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Harness the transformative power of Philippine volcanic minerals combined with tropical botanicals
          </p>
        </div>

        {/* Two-column layout with text on left and rotating carousel on right */}
        <div className="grid md:grid-cols-2 gap-16 items-center relative">
          {/* Key Ingredients List */}
          <div
            className={`${isVisible ? "animate-fade-in-up" : "opacity-0"} relative z-20 pr-8`}
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Key Power Ingredients</h3>
            <div className="space-y-4">
              {ingredients.map((ingredient, idx) => (
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
                  <div>
                    <p className="font-semibold text-foreground">{ingredient.name}</p>
                    <p className="text-sm text-foreground/70">{ingredient.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Rotating Image Carousel */}
          <div
            className={`${isVisible ? "animate-scale-in" : "opacity-0"} flex justify-center w-full pt-8`}
            style={{ animationDelay: "0.2s" }}
          >
            <ThreeDRotatingCarousel />
          </div>
        </div>

        {/* Full Ingredients List */}
        <div
          className={`mt-16 rounded-xl bg-background border border-border/50 p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.8s" }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Complete Ingredients List</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Water",
              "Cetearyl Alcohol (emollient/thickener)",
              "Stearic Acid (cleansing agent/emulsifier)",
              "Glyceryl Monostearate (emulsifier)",
              "Titanium Dioxide (mineral whitening/UV filter)",
              "Phenoxyethanol (preservative)",
              "Carica Papaya Fruit Extract (Papaya Extract)",
              "Oryza Sativa Seed Extract (Rice Extract)",
              "Niacinamide (Vitamin B3, skin conditioning)",
              "Glycerin (humectant)",
              "Aloe Barbadensis Leaf Extract (Aloe Vera)",
              "Arctostaphylos Uva-Ursi Leaf Extract (Bearberry Extract)",
              "Charcoal Extract (absorbent/cleansing)",
              "Fragrance",
            ].map((ingredient, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground/80">{ingredient}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
