"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutModal } from "@/components/checkout-modal"

export function BuyNowSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const handleContinueShopping = () => {
    setIsModalOpen(false)
    const overviewSection = document.querySelector("#overview")
    if (overviewSection) {
      overviewSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <section ref={sectionRef} id="buy-now" className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-background border border-primary/30 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 sm:p-12">
              {/* Product Image */}
              <div
                className={`rounded-xl overflow-hidden border border-border/50 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                <img
                  src="/volcanic-mud-scrub-hero-product-shot-with-golden-g.jpg"
                  alt="Volcanic Mud Scrub"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Purchase Section */}
              <div
                className={`flex flex-col justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Volcanic Mud Scrub</h2>
                <p className="text-foreground/70 mb-6">Premium volcanic clay scrub for radiant, clear skin</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="text-4xl font-bold text-primary mb-2">₱899</div>
                  <p className="text-sm text-foreground/70">Free Metro Manila shipping | 30-day guarantee</p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-14 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={handleContinueShopping}
                    variant="outline"
                    className="w-full h-12 text-base border-primary text-primary hover:bg-primary/10 bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Benefits */}
                <div className="mt-8 pt-8 border-t border-border/50 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-foreground/80">100% Natural Volcanic Clay</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-foreground/80">GCash Payment Accepted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary">✓</span>
                    <span className="text-foreground/80">30-Day Glow Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onContinueShopping={handleContinueShopping}
      />
    </>
  )
}
