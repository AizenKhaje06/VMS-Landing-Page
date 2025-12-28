"use client"

import { useEffect, useState } from "react"

interface ABTestVariant {
  id: string
  content: any
  weight?: number
}

interface ABTestProps {
  testId: string
  variants: ABTestVariant[]
  render: (variant: ABTestVariant) => React.ReactNode
}

export function ABTest({ testId, variants, render }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useState<ABTestVariant | null>(null)

  useEffect(() => {
    // Simple A/B testing logic - in production, you'd use a proper A/B testing service
    const stored = localStorage.getItem(`ab-test-${testId}`)
    if (stored) {
      const variant = variants.find(v => v.id === stored)
      if (variant) {
        setSelectedVariant(variant)
        return
      }
    }

    // Random selection based on weights
    const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0)
    let random = Math.random() * totalWeight

    for (const variant of variants) {
      random -= variant.weight || 1
      if (random <= 0) {
        setSelectedVariant(variant)
        localStorage.setItem(`ab-test-${testId}`, variant.id)
        break
      }
    }
  }, [testId, variants])

  if (!selectedVariant) {
    // Return first variant as fallback while loading
    return <>{render(variants[0])}</>
  }

  return <>{render(selectedVariant)}</>
}

// Headline variants for A/B testing
export const heroHeadlineVariants: ABTestVariant[] = [
  {
    id: "control",
    content: <>Transform Your Skin with <span className="text-primary animate-gold-sparkle">Nature's Volcanic Power</span></>,
    weight: 1
  },
  {
    id: "pain-point",
    content: <>Say Goodbye to Oily Skin, Acne & Dullness <span className="text-primary animate-gold-sparkle">Forever</span></>,
    weight: 1
  },
  {
    id: "benefit-focused",
    content: <>Get Clear, Bright & Radiant Skin in Just <span className="text-primary animate-gold-sparkle">2 Weeks</span></>,
    weight: 1
  }
]

// CTA button variants for A/B testing
export const ctaButtonVariants: ABTestVariant[] = [
  {
    id: "control",
    content: [
      {
        text: "Shop Volcanic Scrub",
        variant: "default" as const,
        className: "min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold animate-gold-shimmer text-primary-foreground border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
      },
      {
        text: "Buy Now",
        variant: "outline" as const,
        className: "min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold border-2 border-primary text-primary hover:bg-primary/20 bg-transparent transition-all duration-300"
      }
    ],
    weight: 1
  },
  {
    id: "urgency-focused",
    content: [
      {
        text: "🔥 Claim Your Discount - Limited Time!",
        variant: "default" as const,
        className: "min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold animate-gold-shimmer text-primary-foreground border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
      },
      {
        text: "⚡ Order Now Before Stock Runs Out!",
        variant: "outline" as const,
        className: "min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold border-2 border-primary text-primary hover:bg-primary/20 bg-transparent transition-all duration-300"
      }
    ],
    weight: 1
  },
  {
    id: "benefit-focused-cta",
    content: [
      {
        text: "Get Clear Skin Today",
        variant: "default" as const,
        className: "min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold animate-gold-shimmer text-primary-foreground border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
      },
      {
        text: "Start Your Transformation",
        variant: "outline" as const,
        className: "min-h-[56px] sm:h-14 md:h-16 w-full px-8 sm:px-10 text-base sm:text-lg font-bold border-2 border-primary text-primary hover:bg-primary/20 bg-transparent transition-all duration-300"
      }
    ],
    weight: 1
  }
]
