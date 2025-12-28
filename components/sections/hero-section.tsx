"use client"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { UrgencyTimer } from "@/components/urgency-timer"
import { LiveViewers } from "@/components/live-viewers"
import { Flame } from "lucide-react"

export function HeroSection() {
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

  const handleNavClick = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] md:min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-gold-glow" />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-gold-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <div
          className={`mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.05s" }}
        >
          <UrgencyTimer />
          <LiveViewers />
        </div>

        <div
          className={`mb-8 inline-flex items-center gap-3 rounded-full border-2 border-primary/40 bg-primary/10 px-5 py-3 animate-gold-glow ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          <Flame className="w-5 h-5 text-primary animate-gold-sparkle" />
          <span className="text-sm sm:text-base font-bold text-foreground">Trusted by 50,000+ Filipino Women</span>
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance px-2 leading-tight ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          Transform Your Skin with <span className="text-primary animate-gold-sparkle">Nature's Volcanic Power</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg sm:text-xl md:text-2xl text-foreground/90 mb-8 text-pretty max-w-3xl mx-auto px-2 leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          Premium Deep-Cleansing Mud Scrub. Designed for tropical heat, humidity, and Filipino skin.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <button onClick={() => handleNavClick("#buy-now")} className="w-full sm:w-auto">
            <Button className="min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold animate-gold-shimmer text-primary-foreground border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50">
              Shop Volcanic Scrub
            </Button>
          </button>
          <button onClick={() => handleNavClick("#buy-now")} className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold border-2 border-primary text-primary hover:bg-primary/20 bg-transparent transition-all duration-300"
            >
              Buy Now
            </Button>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-16 py-8 border-y border-primary/20">
          {[
            { icon: "💳", label: "GCash Accepted" },
            { icon: "🔥", label: "FDA Approved" },
            { icon: "✅", label: "30-Day Guarantee" },
          ].map((badge, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center gap-2 min-h-[70px] justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              <span className="text-2xl sm:text-3xl">{badge.icon}</span>
              <span className="text-xs sm:text-sm text-foreground font-medium text-center leading-snug">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className={`relative rounded-2xl overflow-hidden volcanic-card aspect-square sm:aspect-video group ${isVisible ? "animate-scale-in" : "opacity-0"}`}
          style={{ animationDelay: "0.7s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
          <img
            src="/hero-images/hero-image.png"
            alt="Volcanic Mud Scrub Premium Product - Deep Cleansing with Natural Whitening"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
