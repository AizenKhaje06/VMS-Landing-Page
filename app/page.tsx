"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { OverviewSection } from "@/components/sections/overview-section"
import { VolcanicPowerSection } from "@/components/sections/volcanic-power-section"
import { ResultsSection } from "@/components/sections/results-section"
import { HowToUseSection } from "@/components/sections/how-to-use-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { FAQSection } from "@/components/sections/faq-section"
import { BuyNowSection } from "@/components/sections/buy-now-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <div id="overview">
        <OverviewSection />
      </div>
      <div id="volcanic-power">
        <VolcanicPowerSection />
      </div>
      <div id="results">
        <ResultsSection />
      </div>
      <div id="how-to-use">
        <HowToUseSection />
      </div>
      <div id="reviews">
        <ReviewsSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="buy-now">
        <BuyNowSection />
      </div>
      <FooterSection />
    </main>
  )
}
