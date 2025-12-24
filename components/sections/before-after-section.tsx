"use client"

import { useState, useRef, useEffect } from "react"

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
  const [activeTransformation, setActiveTransformation] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
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

  const current = transformations[activeTransformation]

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          className={`text-4xl sm:text-5xl font-bold text-foreground text-center mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          Real Results in <span className="text-primary">4 Weeks</span>
        </h2>
        <p
          className={`text-base sm:text-lg text-foreground/70 text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          See the visible transformation from our Volcanic Mud Scrub
        </p>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Before/After Slider */}
          <div className="lg:col-span-2">
            <div
              className={`relative rounded-lg overflow-hidden bg-card border border-border/50 aspect-square sm:aspect-video ${isVisible ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              {/* After image (background) */}
              <img
                src={current.after || "/placeholder.svg?height=500&width=600&query=after-transformation"}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before image (on slider) */}
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <img
                  src={current.before || "/placeholder.svg?height=500&width=600&query=before-transformation"}
                  alt="Before"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Slider handle - improved styling */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize hover:w-2 transition-all shadow-xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M9.707 3.293a1 1 0 00-1.414 1.414L12.586 10l-4.293 4.293a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414l-6-6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-semibold">
                Before
              </div>
              <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-semibold">
                After
              </div>

              {/* Hidden slider input for interaction */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize"
              />
            </div>

            {/* Transformation Details - added animation */}
            <div
              className={`mt-6 text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">{current.name}</h3>
              <p className="text-foreground/70 text-lg mb-2">{current.area}</p>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-semibold">
                Result after {current.duration}
              </span>
            </div>
          </div>

          {/* Transformation selector - added animation */}
          <div
            className={`space-y-4 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Transformation Areas</h3>
            {transformations.map((transform, index) => (
              <button
                key={transform.id}
                onClick={() => setActiveTransformation(index)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                  activeTransformation === index
                    ? "bg-primary/20 border-2 border-primary scale-105 shadow-lg shadow-primary/20"
                    : "bg-card border border-border/50 hover:border-primary/50 hover:scale-102"
                }`}
              >
                <p className="font-semibold text-foreground">{transform.area}</p>
                <p className="text-sm text-foreground/70">{transform.name}</p>
                <p className="text-sm text-primary mt-2 font-semibold">{transform.duration}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Key improvements callout - added animations to stats */}
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
    </section>
  )
}
