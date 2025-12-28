"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/sections/hero-section"
import { OverviewSection } from "@/components/sections/overview-section"
import { ScienceSection } from "@/components/sections/science-section"
import { ResultsSection } from "@/components/sections/results-section"
import { HowToUseSection } from "@/components/sections/how-to-use-section"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { FAQSection } from "@/components/sections/faq-section"
import { BuyNowSection } from "@/components/sections/buy-now-section"
import { FooterSection } from "@/components/sections/footer-section"
import { StickyCtaBar } from "@/components/sticky-cta-bar"
import { ExitIntentModal } from "@/components/exit-intent-modal"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <StickyCtaBar />
      <ExitIntentModal />
      <HeroSection />
      <div id="overview">
        <OverviewSection />
      </div>
      <div id="results">
        <ResultsSection />
      </div>
      <div id="reviews">
        <ReviewsSection />
      </div>
      <div id="volcanic-power">
        <ScienceSection />
      </div>
      <div id="how-to-use">
        <HowToUseSection />
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
