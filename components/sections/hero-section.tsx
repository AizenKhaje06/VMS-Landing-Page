"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

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

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-card px-4 py-16 sm:py-24 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-40 animate-shimmer" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Trust badge - added animation */}
        <div
          className={`mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-sm text-foreground">Trusted by 50,000+ Filipino Women</span>
        </div>

        {/* Main Headline - added animation */}
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.2s" }}
        >
          Transform Your Skin with <span className="text-primary">Philippine Volcanic Power</span>
        </h1>

        {/* Subheadline - added animation */}
        <p
          className={`text-lg sm:text-xl text-foreground/80 mb-8 text-pretty max-w-3xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.3s" }}
        >
          Premium Volcanic Mud Scrub. Designed for tropical heat, humidity, and Filipino skin.
        </p>

        {/* CTA Buttons - added animation and improved mobile */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <Link href="#product-showcase" className="w-full sm:w-auto">
            <Button className="h-12 w-full px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/50">
              Shop Volcanic Scrub
            </Button>
          </Link>
          <Link href="#checkout" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="h-12 w-full px-8 text-base border-primary text-primary hover:bg-primary/10 bg-transparent transition-all duration-300"
            >
              Buy Now
            </Button>
          </Link>
        </div>

        {/* Trust Badges Row - added animation to each badge */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 py-8 border-y border-border/50">
          {[
            { icon: "✓", label: "GCash Accepted" },
            { icon: "🚚", label: "Free Metro Manila Shipping" },
            { icon: "🛡️", label: "30-Day Glow Guarantee" },
          ].map((badge, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center gap-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.5 + idx * 0.1}s` }}
            >
              <span className="text-2xl">{badge.icon}</span>
              <span className="text-sm text-foreground">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Hero Product Image - added animation and glow effect */}
        <div
          className={`relative rounded-2xl overflow-hidden bg-card border border-border/50 aspect-square sm:aspect-video group ${isVisible ? "animate-scale-in" : "opacity-0"}`}
          style={{ animationDelay: "0.7s" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <img
            src="/volcanic-mud-scrub-hero-product-shot-with-golden-g.jpg"
            alt="Volcanic Mud Scrub Premium Product"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Scroll indicator - improved styling */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
