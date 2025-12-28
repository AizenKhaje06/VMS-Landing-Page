"use client"

import { useState, useRef, useEffect } from "react"
import { useCart } from "@/components/cart-context"
import Link from "next/link"

export function ProductImageShowcase() {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
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

  const images = [
    "/volcanic-mud-scrub-hero-product-shot-with-golden-g.jpg",
    "/products/volcanic-mud-scrub.jpg",
    "/transformations/before-1-front.jpg",
    "/transformations/after-1-front.jpg",
  ]

  const handleAddToCart = () => {
    addToCart({
      id: 1,
      name: "Volcanic Mud Scrub",
      price: 750,
      quantity,
      image: images[0],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-background overflow-hidden py-12 md:py-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Image Section */}
          <div className={`flex flex-col gap-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Main Image with Animation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card/50 backdrop-blur rounded-2xl p-6 border border-border/30 overflow-hidden h-96 md:h-[500px] flex items-center justify-center">
                <img
                  src={images[selectedImage] || "/placeholder.svg"}
                  alt={`Volcanic Scrub - View ${selectedImage + 1}`}
                  className="w-full h-full object-cover rounded-xl animate-scale-in"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Image Badge */}
              <div className="absolute top-8 right-8 bg-accent/90 backdrop-blur text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold animate-glow">
                Best Seller
              </div>
            </div>

            {/* Thumbnail Gallery with Scroll Animation */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all duration-300 overflow-hidden hover:border-accent ${
                    selectedImage === idx
                      ? "border-accent ring-2 ring-accent/50 scale-105"
                      : "border-border/30 hover:border-border/60"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div
            className={`flex flex-col justify-start gap-6 ${isVisible ? "animate-slide-in-left" : "opacity-0"} animation-delay-200`}
          >
            {/* Header */}
            <div>
              <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Premium Skincare</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Volcanic Mud Scrub</h1>
              <p className="text-muted-foreground text-lg mt-3">
                Harness the power of volcanic clay for radiant, glowing skin in just 4 weeks
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent text-xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-foreground font-semibold">4.9 out of 5</p>
              <p className="text-muted-foreground">(2,847 reviews)</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-accent">₱750</span>
              <span className="text-xl text-muted-foreground line-through">₱1,200</span>
              <span className="text-sm font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full">Save 37%</span>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Key Benefits:</h3>
              <ul className="space-y-2">
                {[
                  "Deep exfoliation with volcanic minerals",
                  "Removes dirt, oil & dead skin cells",
                  "Unclogs pores & reduces breakouts",
                  "Smooth, radiant skin in 4 weeks",
                ].map((benefit, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="text-accent flex-shrink-0 mt-1">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 bg-card/50 border border-border/30 rounded-lg p-4 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-border/30 hover:bg-border/60 text-foreground transition-all duration-200"
              >
                −
              </button>
              <span className="text-xl font-semibold text-foreground w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-border/30 hover:bg-border/60 text-foreground transition-all duration-200"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  added
                    ? "bg-green-600/90 text-white"
                    : "bg-accent hover:bg-accent/90 text-primary-foreground shadow-lg hover:shadow-xl"
                }`}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              <Link
                href="/products/volcanic-scrub"
                className="w-full py-4 px-6 rounded-lg font-bold text-lg border-2 border-accent text-accent hover:bg-accent/10 transition-all duration-300"
              >
                View Full Details
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/30">
              {[
                { icon: "✓", label: "GCash Accepted" },
                { icon: "🛡️", label: "FDA Approved" },
                { icon: "✅", label: "30-Day Guarantee" },
                { icon: "💬", label: "24/7 Support" },
              ].map((badge, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl mb-1">{badge.icon}</p>
                  <p className="text-xs text-muted-foreground">{badge.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles animation */}
      <div
        className="absolute top-20 right-10 w-3 h-3 bg-accent rounded-full opacity-20 animate-float-up"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute bottom-40 left-10 w-2 h-2 bg-accent rounded-full opacity-20 animate-float-up"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 right-20 w-2 h-2 bg-accent rounded-full opacity-20 animate-float-up"
        style={{ animationDelay: "2s" }}
      />
    </section>
  )
}
