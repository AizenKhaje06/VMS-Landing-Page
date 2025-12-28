"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const transformations = [
  {
    id: 1,
    name: "Maria, 28",
    area: "Front View",
    before: "/transformations/before-1-front.jpg",
    after: "/transformations/after-1-front.jpg",
    duration: "4 weeks",
  },
  {
    id: 2,
    name: "Maria, 28",
    area: "Cheek Close-up",
    before: "/transformations/before-1-cheek.jpg",
    after: "/transformations/after-1-cheek.jpg",
    duration: "4 weeks",
  },
  {
    id: 3,
    name: "Maria, 28",
    area: "T-Zone",
    before: "/transformations/before-1-tzone.jpg",
    after: "/transformations/after-1-tzone.jpg",
    duration: "4 weeks",
  },
]

export function BeforeAfterSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [lightboxType, setLightboxType] = useState<"before" | "after" | null>(null)
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

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

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformations.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length)
    setAutoPlay(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
    setAutoPlay(false)
  }

  const openLightbox = (image: string, type: "before" | "after") => {
    setLightboxImage(image)
    setLightboxType(type)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxType(null)
  }

  const current = transformations[currentIndex]

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Real Results in <span className="text-primary">4 Weeks</span>
        </h2>
        <p
          className={`text-base sm:text-lg text-foreground/70 text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          See the visible transformation from our Volcanic Mud Scrub
        </p>

        <div
          className={`relative mb-12 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          {/* Slideshow container */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8">
            {/* Before Image */}
            <div className="w-1/2 max-w-md">
              <button
                onClick={() => openLightbox(current.before, "before")}
                className="relative group w-full cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden aspect-square shadow-lg animate-glow-orange">
                  <img
                    src={current.before || "/placeholder.svg?height=400&width=400&query=before-transformation"}
                    alt="Before"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-black/70 text-white text-xs sm:text-sm font-semibold">
                    Before
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 sm:p-3">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* After Image */}
            <div className="w-1/2 max-w-md">
              <button
                onClick={() => openLightbox(current.after, "after")}
                className="relative group w-full cursor-pointer"
              >
                <div className="relative rounded-lg overflow-hidden aspect-square shadow-lg animate-glow-orange">
                  <img
                    src={current.after || "/placeholder.svg?height=400&width=400&query=after-transformation"}
                    alt="After"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-4 sm:py-2 rounded-full bg-black/70 text-white text-xs sm:text-sm font-semibold">
                    After
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 sm:p-3">
                      <svg
                        className="w-4 h-4 sm:w-6 sm:h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-transform z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Transformation details */}
          <div className="mt-6 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{current.name}</h3>
            <p className="text-foreground/70 text-base sm:text-lg mb-2">{current.area}</p>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold text-sm sm:text-base">
              Result after {current.duration}
            </span>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {transformations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoPlay(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Key improvements callout */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { stat: "73%", label: "Reduction in pore size" },
            { stat: "4x", label: "Brighter skin appearance" },
            { stat: "89%", label: "Less oily by midday" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`text-center p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{item.stat}</p>
              <p className="text-foreground/70 text-sm sm:text-base">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-50"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="relative max-w-4xl w-full">
            <div className="relative rounded-lg overflow-hidden shadow-2xl animate-glow-orange">
              <img
                src={lightboxImage || "/placeholder.svg"}
                alt={lightboxType === "before" ? "Before - Enlarged" : "After - Enlarged"}
                className="w-full h-auto max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/70 text-white text-lg font-semibold">
                {lightboxType === "before" ? "Before" : "After"}
              </div>
            </div>
            <p className="text-white text-center mt-4 text-lg">
              {current.name} - {current.area} ({current.duration})
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
