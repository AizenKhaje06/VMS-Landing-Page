"use client"

import { Check, Shield, Clock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ContactModal } from "@/components/contact-modal"

export function GuaranteeSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main guarantee card */}
        <div className="rounded-lg bg-card border border-primary/50 p-8 sm:p-12 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              30-Day <span className="text-primary">Glow Guarantee</span>
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              We're so confident in our Volcanic Mud Scrub that if you don't see visible improvement in pore size,
              brightness, and oil control within 30 days of regular use, we'll refund your money. No questions asked.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">
              Learn More About Our Guarantee
            </Button>
          </div>
        </div>

        {/* Trust badges grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Dermatologist Certified */}
          <div className="rounded-lg bg-card border border-border/50 p-8 hover:border-primary/50 transition-all">
            <Shield className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Dermatologist Approved</h3>
            <p className="text-foreground/70">
              Clinically tested and proven safe for all skin types, including sensitive skin. Approved for PH tropical
              climate.
            </p>
          </div>

          {/* Natural & Halal */}
          <div className="rounded-lg bg-card border border-border/50 p-8 hover:border-primary/50 transition-all">
            <Check className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">100% Natural & Halal Certified</h3>
            <p className="text-foreground/70">
              Made from natural volcanic clay with no harmful chemicals, parabens, or sulfates. Halal certified for
              Muslim consumers.
            </p>
          </div>

          {/* Fast Shipping */}
          <div className="rounded-lg bg-card border border-border/50 p-8 hover:border-primary/50 transition-all">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Free Metro Manila Shipping</h3>
            <p className="text-foreground/70">
              Free and fast delivery to Metro Manila. Orders placed before 2 PM ship the same day. Provincial shipping
              available.
            </p>
          </div>

          {/* Easy Returns */}
          <div className="rounded-lg bg-card border border-border/50 p-8 hover:border-primary/50 transition-all">
            <RotateCcw className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Easy Returns & Refunds</h3>
            <p className="text-foreground/70">
              Not happy? Return within 30 days for a full refund. No shipping costs required. Simple and hassle-free.
            </p>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">24/7 Customer Support</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Have questions? Our Filipino team is here to help via email.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
            >
              Email Us
            </Button>
          </div>
        </div>
      </div>
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  )
}
