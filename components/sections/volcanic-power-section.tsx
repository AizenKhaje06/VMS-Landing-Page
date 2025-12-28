"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

export function VolcanicPowerSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [enlargedCard, setEnlargedCard] = useState<number | null>(null)

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
      name: "Deep-Cleansing Clay",
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

  const carouselCards = [
    {
      id: 1,
      src: "/overview/clay-mud.png",
      alt: "Volcanic Clay - Deep pore cleansing & oil absorption",
      title: "Volcanic Clay",
      description: "Deep pore cleansing & oil absorption",
    },
    {
      id: 2,
      src: "/overview/rice-papaya.png",
      alt: "Papaya Extract - Natural enzyme exfoliation",
      title: "Papaya Extract",
      description: "Natural enzyme exfoliation",
    },
    {
      id: 3,
      src: "/overview/rice-papaya.png",
      alt: "Rice Extract - Gentle brightening & soothing",
      title: "Rice Extract",
      description: "Gentle brightening & soothing",
    },
    {
      id: 4,
      src: "/overview/niacinamide.png",
      alt: "Niacinamide (Vitamin B3) - Skin conditioning & barrier support",
      title: "Niacinamide B3",
      description: "Skin conditioning & barrier support",
    },
    {
      id: 5,
      src: "/overview/aloe-vera.png",
      alt: "Aloe Vera - Hydration & anti-inflammation",
      title: "Aloe Vera",
      description: "Hydration & anti-inflammation",
    },
    {
      id: 6,
      src: "/overview/clay-mud.png",
      alt: "Charcoal - Toxin removal & deep detox",
      title: "Charcoal",
      description: "Toxin removal & deep detox",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="volcanic-power"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              THE POWER OF NATURE & SCIENCE
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            🔥 Volcanic-Inspired <span className="text-primary">Power</span>
          </h2>
          <p
            className={`text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto px-4 leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Harness the transformative power of nature with our volcanic-inspired formula featuring deep-cleansing clay
            and potent tropical botanicals
          </p>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {carouselCards.map((card, idx) => (
            <div
              key={card.id}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-primary/30 bg-black cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
              onClick={() => setEnlargedCard(idx)}
              style={
                isVisible
                  ? { animation: `fade-in-up 0.6s ease-out forwards`, animationDelay: `${0.3 + idx * 0.1}s` }
                  : {}
              }
            >
              <img src={card.src || "/placeholder.svg"} alt={card.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {enlargedCard !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
          onClick={() => setEnlargedCard(null)}
        >
          <button
            onClick={() => setEnlargedCard(null)}
            className="absolute top-4 right-4 p-2 bg-primary/20 hover:bg-primary/40 rounded-full transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-primary" />
          </button>
          <div className="relative max-w-4xl w-full aspect-[3/4] max-h-[90vh] animate-scale-in">
            <img
              src={carouselCards[enlargedCard].src || "/placeholder.svg"}
              alt={carouselCards[enlargedCard].alt}
              className="w-full h-full object-contain rounded-xl border-2 border-primary shadow-[0_0_50px_rgba(255,215,0,0.6)]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 rounded-b-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{carouselCards[enlargedCard].title}</h3>
              <p className="text-base md:text-lg text-white/90">{carouselCards[enlargedCard].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
