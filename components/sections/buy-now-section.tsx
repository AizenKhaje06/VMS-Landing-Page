"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckoutModal } from "@/components/checkout-modal"
import { UrgencyTimer } from "@/components/urgency-timer"
import { Package } from "lucide-react"

export function BuyNowSection() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stockCount, setStockCount] = useState(23)
  const [buyNowClicked, setBuyNowClicked] = useState(false)
  const [continueShoppingClicked, setContinueShoppingClicked] = useState(false)

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
    const interval = setInterval(() => {
      setStockCount((prev) => Math.max(15, prev - 1))
    }, 45000) // Decrease every 45 seconds

    return () => clearInterval(interval)
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
      <section ref={sectionRef} id="buy-now" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-card px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="rounded-xl sm:rounded-2xl bg-background border border-primary/30 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 md:p-10 lg:p-12">
              {/* Product Image */}
              <div
                className={`rounded-lg sm:rounded-xl overflow-hidden border border-border/50 ${isVisible ? "animate-scale-in" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                <img
                  src="/checkout-image/volcanic-mud-scrub-product.png"
                  alt="Volcanic Mud Scrub"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Purchase Section */}
              <div
                className={`flex flex-col justify-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className="mb-4">
                  <UrgencyTimer />
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
                  Volcanic Mud Scrub
                </h2>
                <p className="text-sm sm:text-base text-foreground/70 mb-5 sm:mb-6 leading-relaxed">
                  Premium volcanic clay scrub for radiant, clear skin
                </p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl sm:text-4xl font-bold text-primary">₱299</span>
                    <span className="text-xl sm:text-2xl text-foreground/50 line-through">₱499</span>
                    <span className="px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded">40% OFF</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    Free Metro Manila shipping | 30-day guarantee
                  </p>
                </div>

                <div className="mb-6 sm:mb-8 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-foreground">
                      Only <span className="font-bold text-amber-500">{stockCount} units</span> left in stock!
                    </span>
                  </div>
                </div>

                {/* CTA Buttons - Mobile-optimized with min-height for touch */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setBuyNowClicked(true)
                      setIsModalOpen(true)
                    }}
                    className={`w-full min-h-[52px] sm:h-14 text-sm sm:text-base transition-all duration-300 ${
                      buyNowClicked
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    }`}
                  >
                    Buy Now
                  </Button>
                  <Button
                    onClick={() => {
                      setContinueShoppingClicked(true)
                      handleContinueShopping()
                    }}
                    variant="outline"
                    className={`w-full min-h-[48px] sm:h-12 text-sm sm:text-base transition-all duration-300 ${
                      continueShoppingClicked
                        ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                        : "border-primary text-primary hover:bg-primary/10 bg-transparent"
                    }`}
                  >
                    Continue Shopping
                  </Button>
                </div>

                {/* Benefits */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/50 space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-foreground/80">100% Natural Volcanic Clay</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-foreground/80">GCash Payment Accepted</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-bold flex-shrink-0">✓</span>
                    <span className="text-sm sm:text-base text-foreground/80">30-Day Glow Guarantee</span>
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
