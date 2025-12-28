"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"

interface Ingredient {
  name: string
  benefit: string
}

interface ThreeDRotatingCarouselProps {
  ingredients?: Ingredient[]
  showIngredientCards?: boolean
}

export function ThreeDRotatingCarousel({ ingredients = [], showIngredientCards = false }: ThreeDRotatingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const images = [
    {
      id: 1,
      src: "/product-overview-images/5.png",
      alt: "All Skin Types - Suitable for every complexion",
    },
    {
      id: 2,
      src: "/product-overview-images/4.png",
      alt: "FDA Approved - Safe and tested formula",
    },
    {
      id: 3,
      src: "/product-overview-images/3.png",
      alt: "Niacinamide - Advanced skin conditioning",
    },
    {
      id: 4,
      src: "/product-overview-images/2.png",
      alt: "Volcanic Clay Mud - Deep pore cleansing",
    },
    {
      id: 5,
      src: "/product-overview-images/1.png",
      alt: "Aloe Vera - Natural hydration & soothing",
    },
    {
      id: 6,
      src: "/product-overview-images/6.png",
      alt: "Rice & Papaya - Natural brightening & exfoliation",
    },
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay, images.length])

  const getImageIndex = (offset) => {
    return (currentIndex + offset + images.length) % images.length
  }

  const rotateCarousel = (direction) => {
    setCurrentIndex((prev) => (prev + direction + images.length) % images.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 6000)
  }

  return (
    <div className="w-full py-12">
      {/* Main 3D Carousel Container */}
      <div className="flex items-center justify-center perspective" style={{ perspective: "1200px" }}>
        {/* Left Navigation Button */}
        <button
          onClick={() => rotateCarousel(-1)}
          className="absolute left-0 z-30 p-3 bg-primary/20 hover:bg-primary/40 rounded-full transition-all duration-300 transform hover:scale-110"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 3D Carousel */}
        <div className="relative w-full max-w-4xl h-96 sm:h-[500px] md:h-[600px]">
          {/* Left Panel */}
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 sm:w-40 md:w-48 h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border-2 border-primary/30 opacity-60 hover:opacity-80 transition-all duration-500"
            style={{
              zIndex: 10,
              transform: "perspective(1200px) rotateY(45deg) translateX(-60px) translateY(-50%) skewY(-5deg)",
            }}
          >
            <img
              src={images[getImageIndex(-1)].src || "/placeholder.svg"}
              alt={images[getImageIndex(-1)].alt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Center Panel (Main) */}
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-56 md:w-72 h-72 sm:h-96 md:h-[450px] rounded-xl overflow-hidden border-2 border-primary shadow-2xl transition-all duration-700"
            style={{
              zIndex: 20,
              boxShadow: "0 20px 60px rgba(255, 215, 0, 0.4)",
            }}
          >
            <img
              key={currentIndex}
              src={images[currentIndex].src || "/placeholder.svg"}
              alt={images[currentIndex].alt}
              className="w-full h-full object-cover animate-fade-in-up"
            />
          </div>

          {/* Right Panel */}
          <div
            className="absolute right-0 top-1/2 transform translate-y-1/2 w-32 sm:w-40 md:w-48 h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden border-2 border-primary/30 opacity-60 hover:opacity-80 transition-all duration-500"
            style={{
              zIndex: 10,
              transform: "perspective(1200px) rotateY(-45deg) translateX(60px) translateY(-50%) skewY(5deg)",
            }}
          >
            <img
              src={images[getImageIndex(1)].src || "/placeholder.svg"}
              alt={images[getImageIndex(1)].alt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Navigation Button */}
        <button
          onClick={() => rotateCarousel(1)}
          className="absolute right-0 z-30 p-3 bg-primary/20 hover:bg-primary/40 rounded-full transition-all duration-300 transform hover:scale-110"
          aria-label="Next image"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Image Counter & Indicators */}
      <div className="flex flex-col items-center gap-6 mt-8">
        <div className="text-sm text-foreground/60">
          {currentIndex + 1} of {images.length}
        </div>

        {/* Indicator Dots */}
        <div className="flex gap-2 flex-wrap justify-center">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx)
                setIsAutoPlay(false)
                setTimeout(() => setIsAutoPlay(true), 6000)
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex ? "w-3 h-3 bg-primary" : "w-2 h-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {showIngredientCards && ingredients.length > 0 && (
        <div className="mt-8 lg:hidden">
          <div
            key={currentIndex}
            className="bg-background border-2 border-primary/30 rounded-xl p-6 shadow-lg animate-fade-in-up mx-auto max-w-sm"
          >
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <CheckCircle className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {ingredients[currentIndex % ingredients.length]?.name || "Power Ingredient"}
                </h4>
                <p className="text-foreground/70">
                  {ingredients[currentIndex % ingredients.length]?.benefit || "Amazing benefits for your skin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
