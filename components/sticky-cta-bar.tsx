"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { CheckoutModal } from "@/components/checkout-modal"

export function StickyCtaBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 80vh (past hero section)
      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight

      if (scrollPosition > viewportHeight * 0.8) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAddToCart = () => {
    // Add product to cart
    addToCart({
      id: 1,
      name: "Volcanic Mud Scrub",
      price: 299,
      quantity: 1,
      image: "/volcanic-mud-scrub-hero-product-shot-with-golden-g.jpg",
    })
    // Open checkout modal
    setIsCheckoutOpen(true)
  }

  const handleContinueShopping = () => {
    setIsCheckoutOpen(false)
  }

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-500 shadow-2xl border-t border-amber-400/20">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left side - Product info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm md:text-base truncate">Volcanic Mud Scrub</p>
                <p className="text-white/90 text-xs md:text-sm">
                  Limited Time: <span className="font-bold">₱299</span>{" "}
                  <span className="line-through opacity-75">₱499</span>
                </p>
              </div>

              {/* Right side - CTA Button */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="bg-white text-amber-700 hover:bg-amber-50 font-bold shadow-lg min-h-[48px] px-6 md:px-8 flex-shrink-0"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Buy Now</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onContinueShopping={handleContinueShopping}
      />
    </>
  )
}
