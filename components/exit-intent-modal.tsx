"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    let hasShown = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        const lastShown = localStorage.getItem("exitIntentShown")
        const now = Date.now()

        // Show only once per session or after 24 hours
        if (!lastShown || now - Number.parseInt(lastShown) > 86400000) {
          setIsOpen(true)
          hasShown = true
          localStorage.setItem("exitIntentShown", now.toString())
        }
      }
    }

    // Add delay to prevent triggering immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return
    }

    // Here you would normally send to your email service
    console.log("[v0] Exit intent email captured:", email)

    setIsSubmitted(true)

    // Close modal after 2 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-background border border-primary/30 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-card transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-foreground/70" />
        </button>

        <div className="p-8">
          {!isSubmitted ? (
            <>
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Gift className="w-12 h-12 text-primary" />
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-3">Wait! Don't Miss Out</h2>

              <p className="text-base text-foreground/80 text-center mb-6 leading-relaxed">
                Get <span className="font-bold text-primary">₱100 OFF</span> your first order plus exclusive skincare
                tips delivered to your inbox.
              </p>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  required
                />

                <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Claim My ₱100 Discount
                </Button>
              </form>

              {/* No thanks link */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                No thanks, I'll pay full price
              </button>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Success!</h3>
              <p className="text-base text-foreground/80">
                Check your email for your ₱100 discount code. Happy shopping!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
