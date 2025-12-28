"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

export function ScienceSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [enlargedCard, setEnlargedCard] = useState<number | null>(null)
  const [showIngredientsModal, setShowIngredientsModal] = useState(false)

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

  const carouselCards = ingredients.map((ingredient, idx) => ({
    id: idx + 1,
    src: `/science-section-images/${
      idx === 0
        ? "volcanic-mud"
        : idx === 1
          ? "papaya"
          : idx === 2
            ? "rice"
            : idx === 3
              ? "niacinamide"
              : idx === 4
                ? "aloe-vera"
                : "charcoal"
    }.png`,
    alt: `${ingredient.name} - ${ingredient.benefit}`,
    name: ingredient.name,
    benefit: ingredient.benefit,
  }))

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            THE POWER OF NATURE & SCIENCE
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            🔥 Volcanic-Inspired <span className="text-primary">Power</span>
          </h2>
          <p
            className={`text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
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
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-1">{card.name}</h3>
                  <p className="text-xs sm:text-sm text-white/80">{card.benefit}</p>
                </div>
              </div>
            </div>
          ))}
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
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">{carouselCards[enlargedCard].name}</h3>
                <p className="text-base md:text-lg text-white/90">{carouselCards[enlargedCard].benefit}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative mb-16">
          <div
            className={`${isVisible ? "animate-scale-in" : "opacity-0"} flex justify-center w-full order-1 lg:order-2`}
            style={{ animationDelay: "0.2s" }}
          >
            {/* Desktop carousel */}
            {/* <div className="hidden md:block">
              <ThreeDRotatingCarousel ingredients={ingredients} showIngredientCards={true} />
            </div> */}
            {/* Mobile carousel */}
            {/* <MobileGlowCarousel cards={carouselCards} showDetails={true} /> */}
          </div>

          <div
            className={`${isVisible ? "animate-fade-in-up" : "opacity-0"} relative z-20 order-2 lg:order-1`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-center max-w-3xl mx-auto">
              <button
                onClick={() => setShowIngredientsModal(true)}
                className="w-full px-8 py-4 bg-primary hover:bg-primary/90 text-background font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105"
              >
                SEE FULL INGREDIENTS
              </button>
            </div>
          </div>
        </div>

        {showIngredientsModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
            onClick={() => setShowIngredientsModal(false)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-xl border-2 border-primary shadow-[0_0_50px_rgba(255,215,0,0.6)] animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowIngredientsModal(false)}
                className="sticky top-4 float-right mr-4 p-2 bg-primary/20 hover:bg-primary/40 rounded-full transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-primary" />
              </button>

              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Complete Ingredients List</h3>
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
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Why <span className="text-primary">Volcanic-Inspired Clay</span> Works Best
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Our volcanic-inspired clay formula draws on the powerful purifying properties found in nature's most
              potent minerals, specifically formulated for tropical Asian skin. The mineral composition works
              synergistically with our humid climate.
            </p>

            {/* Key minerals */}
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20">
                    <span className="text-primary font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Silica-Rich Minerals</h4>
                  <p className="text-foreground/70">Exfoliates gently while extracting deep impurities from pores</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20">
                    <span className="text-primary font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Mineral Clay Complex</h4>
                  <p className="text-foreground/70">
                    Detoxifies skin by drawing out environmental pollution and bacteria
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/20">
                    <span className="text-primary font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Nourishing Trace Minerals</h4>
                  <p className="text-foreground/70">
                    Magnesium, potassium, and calcium nourish skin during the cleansing process
                  </p>
                </div>
              </div>
            </div>

            {/* Comparison */}
            <div className="rounded-lg bg-background p-6 border border-border/50">
              <h4 className="font-semibold text-foreground mb-4">Our Formula vs Regular Clay</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-foreground/70">Detoxification Power</span>
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">⭐⭐⭐⭐⭐</span>
                    <span className="text-foreground/50">vs ⭐⭐⭐</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-foreground/70">Mineral Content</span>
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">⭐⭐⭐⭐⭐</span>
                    <span className="text-foreground/50">vs ⭐⭐⭐⭐</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground/70">Gentle on Skin</span>
                  <div className="flex gap-2">
                    <span className="text-primary font-bold">⭐⭐⭐⭐</span>
                    <span className="text-foreground/50">vs ⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-lg overflow-hidden bg-background aspect-square border border-border/50 flex items-center justify-center">
            <img
              src="/vms-inspired/image-nature.png"
              alt="Deep Cleansing Clay Mineral Composition - Natural Forest Setting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Local sourcing callout */}
        <div className="p-8 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-3">Volcanic-Inspired Formula, For Filipino Skin</h3>
          <p className="text-foreground/70 text-lg">
            Our volcanic-inspired formula is specifically crafted for the unique needs of tropical, humid climate skin.
            We deliver exceptional results with powerful natural ingredients designed for Filipino beauty.
          </p>
        </div>
      </div>
    </section>
  )
}
