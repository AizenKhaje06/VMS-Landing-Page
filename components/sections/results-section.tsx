"use client"

import { useEffect, useRef, useState } from "react"
import { Flame } from "lucide-react"
import Image from "next/image"

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
    {
      metric: "93%",
      description: "Noticed smaller pores in 7 days",
      delay: "0.2s",
    },
    {
      metric: "100%",
      description: "Real before & after results (no filters)",
      delay: "0.3s",
    },
    {
      metric: "12,000+",
      description: "Verified Filipina customers",
      delay: "0.4s",
    },
    {
      metric: "4.9★",
      description: "From 3,200+ reviews",
      delay: "0.5s",
    },
  ]

  const beforeAfterImages = [
    {
      src: "/before-and-after-images/woman-1.png",
      alt: "Woman's skin transformation showing reduced dark spots and clearer complexion",
    },
    {
      src: "/before-and-after-images/man-1.png",
      alt: "Man's skin transformation showing clear skin and reduced acne",
    },
    {
      src: "/before-and-after-images/woman-2.png",
      alt: "Woman's before and after results with radiant, even skin tone",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="results"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background via-secondary/20 to-background px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <div className="mb-4 inline-flex items-center gap-3">
            <Flame className="w-8 h-8 text-primary animate-gold-sparkle" />
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-foreground text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            >
              Real <span className="text-primary animate-gold-sparkle">Results</span>
            </h2>
            <Flame className="w-8 h-8 text-primary animate-gold-sparkle" />
          </div>
          <p
            className={`text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Proven results from thousands of Filipino women using the Volcanic Mud Scrub
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {results.map((result, idx) => {
            return (
              <div
                key={idx}
                className={`volcanic-card rounded-2xl p-4 sm:p-6 md:p-8 min-h-[240px] sm:min-h-[280px] flex flex-col items-center justify-center text-center group overflow-hidden ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: result.delay }}
              >
                <div
                  className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4 md:mb-6 leading-none group-hover:scale-105 transition-transform duration-300 break-words w-full px-2 ${animatedMetrics.includes(idx) ? "animate-count-up" : "opacity-0"}`}
                >
                  {result.metric}
                </div>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-primary/90 font-semibold leading-snug tracking-wide px-2 break-words">
                  {result.description}
                </p>
              </div>
            )
          })}
        </div>

        <div
          className={`volcanic-card rounded-2xl p-6 sm:p-8 shadow-xl ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.6s" }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            Before & After Transformations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {beforeAfterImages.map((image, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20"
              >
                <div className="aspect-square relative">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4 bg-card">
                  <p className="text-sm text-foreground/70 text-center leading-relaxed">
                    Visible transformation after consistent use
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
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
              className={`volcanic-card rounded-2xl p-6 sm:p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
            >
              <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-5 text-balance">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 animate-gold-glow" />
                    <span className="text-base text-foreground/80 leading-relaxed">{benefit}</span>
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
