"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"

interface CarouselCard {
  id: number
  src: string
  alt: string
  title?: string
  name?: string
  benefit?: string
}

interface MobileGlowCarouselProps {
  cards: CarouselCard[]
  showDetails?: boolean
}

export function MobileGlowCarousel({ cards, showDetails = false }: MobileGlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }

    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }

    setIsDragging(false)
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Respect prefers-reduced-motion
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    prefersReducedMotion.current = mediaQuery.matches
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (prefersReducedMotion.current) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [cards.length])

  // Calculate which cards are visible
  const getPrevIndex = () => (currentIndex - 1 + cards.length) % cards.length
  const getNextIndex = () => (currentIndex + 1) % cards.length

  return (
    <div className="w-full py-8 md:hidden" ref={containerRef}>
      {/* Carousel Container */}
      <div
        className="relative w-full h-[420px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Card Preview (10-15%) */}
        <div
          className="absolute left-0 top-1/2 w-[65%] h-[300px] rounded-2xl overflow-hidden transition-all duration-500 ease-out"
          style={{
            transform: `translateY(-50%) translateX(-72%) rotateY(15deg) scale(0.9) ${isDragging ? "rotateZ(-2deg)" : ""}`,
            opacity: 0.6,
            zIndex: 1,
            willChange: "transform",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={cards[getPrevIndex()].src || "/placeholder.svg"}
            alt={cards[getPrevIndex()].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Active Center Card */}
        <div
          className="absolute left-1/2 top-1/2 w-[75%] h-[340px] rounded-2xl overflow-hidden transition-all duration-700 ease-out"
          style={{
            transform: `translateX(-50%) translateY(-50%) scale(1) ${isDragging ? "rotateZ(1deg)" : ""}`,
            opacity: 1,
            zIndex: 10,
            willChange: "transform",
            boxShadow: "0 25px 60px rgba(255, 191, 0, 0.4), 0 15px 40px rgba(255, 191, 0, 0.3)",
          }}
        >
          <img
            key={currentIndex}
            src={cards[currentIndex].src || "/placeholder.svg"}
            alt={cards[currentIndex].alt}
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Card Title/Text */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white font-bold text-2xl leading-tight line-clamp-2">
              {cards[currentIndex].title || cards[currentIndex].name || "Card Title"}
            </h3>
            {showDetails && cards[currentIndex].benefit && (
              <p className="text-white/90 text-base mt-2 line-clamp-2">{cards[currentIndex].benefit}</p>
            )}
          </div>
        </div>

        {/* Next Card Preview (10-15%) */}
        <div
          className="absolute right-0 top-1/2 w-[65%] h-[300px] rounded-2xl overflow-hidden transition-all duration-500 ease-out"
          style={{
            transform: `translateY(-50%) translateX(72%) rotateY(-15deg) scale(0.9) ${isDragging ? "rotateZ(2deg)" : ""}`,
            opacity: 0.6,
            zIndex: 1,
            willChange: "transform",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <img
            src={cards[getNextIndex()].src || "/placeholder.svg"}
            alt={cards[getNextIndex()].alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex ? "w-8 h-3 bg-primary" : "w-3 h-3 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to card ${idx + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="text-center text-sm text-foreground/60 mt-3">
        {currentIndex + 1} of {cards.length}
      </div>

      {/* Detail Card (if showDetails is true) */}
      {showDetails && (
        <div className="mt-6 px-4">
          <div
            key={currentIndex}
            className="bg-background border-2 border-primary/30 rounded-xl p-6 shadow-lg"
            style={{
              animation: prefersReducedMotion.current ? "none" : "fade-in-up 0.5s ease-out",
            }}
          >
            <div className="flex flex-col items-center justify-center text-center gap-3">
              <CheckCircle className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {cards[currentIndex].name || cards[currentIndex].title || "Power Ingredient"}
                </h4>
                <p className="text-foreground/70 text-base">
                  {cards[currentIndex].benefit || "Amazing benefits for your skin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
