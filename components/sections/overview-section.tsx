"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { ThreeDRotatingCarousel } from "./3d-rotating-carousel"
import { MobileGlowCarousel } from "./mobile-glow-carousel"

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

  const carouselCards = [
    {
      id: 1,
      src: "/product-overview-images/6.png",
      alt: "All Skin Types - Volcanic Mud Scrub with Natural Ingredients",
      title: "All Skin Types",
    },
    {
      id: 2,
      src: "/product-overview-images/1.png",
      alt: "FDA Approved - Safe and Tested Volcanic Mud Scrub",
      title: "FDA Approved",
    },
    {
      id: 3,
      src: "/product-overview-images/3.png",
      alt: "Niacinamide - Skin Conditioning and Brightening",
      title: "Niacinamide B3",
    },
    {
      id: 4,
      src: "/product-overview-images/5.png",
      alt: "Volcanic Clay Mud - Deep Cleansing from Philippine Mines",
      title: "Volcanic Clay",
    },
    {
      id: 5,
      src: "/product-overview-images/2.png",
      alt: "Aloe Vera - Hydrating and Soothing",
      title: "Aloe Vera",
    },
    {
      id: 6,
      src: "/product-overview-images/4.png",
      alt: "Rice Extract & Papaya Enzymes - Natural Exfoliation",
      title: "Rice & Papaya",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            PREMIUM VOLCANIC FORMULA
          </span>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            ✨ Product <span className="text-primary">Overview</span>
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4 leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            The ultimate exfoliating scrub designed specifically for tropical Filipino skin
          </p>
        </div>

        {/* Flexible grid that stacks on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <div className={`${isVisible ? "animate-scale-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            {/* Desktop carousel */}
            <div className="hidden md:block">
              <ThreeDRotatingCarousel />
            </div>
            {/* Mobile carousel */}
            <MobileGlowCarousel cards={carouselCards} showDetails={false} />
          </div>

          {/* Features List */}
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-balance">
              Why Choose Our Volcanic Scrub?
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 sm:gap-4 items-start"
                  style={
                    isVisible
                      ? { animation: `fade-in-up 0.6s ease-out forwards`, animationDelay: `${0.4 + idx * 0.05}s` }
                      : {}
                  }
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
