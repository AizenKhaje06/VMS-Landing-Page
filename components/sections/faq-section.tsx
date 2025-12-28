"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { ContactModal } from "@/components/contact-modal"

const faqs = [
  {
    id: 1,
    question: "How often should I use the Volcanic Mud Scrub?",
    answer:
      "Use 2-3 times per week for best results. Start with once or twice a week if you have sensitive skin, then gradually increase frequency. Avoid daily use as over-exfoliation can irritate the skin.",
  },
  {
    id: 2,
    question: "Is it suitable for sensitive skin?",
    answer:
      "Yes! The Volcanic Mud Scrub is gentle yet effective. Do a patch test first on a small area. If you have very sensitive skin, start with once a week. The natural volcanic clay is less abrasive than synthetic scrubs.",
  },
  {
    id: 3,
    question: "Can I use it with other products?",
    answer:
      "Use it as part of your routine: Cleansing Oil → Volcanic Mud Scrub → Toner → Serum → Moisturizing Cream. Avoid mixing with other exfoliants on the same day.",
  },
  {
    id: 4,
    question: "How does the GCash payment process work?",
    answer:
      "After placing your order, you'll receive a reference number. Send the payment via GCash to our account, use the reference number in the notes, and upload your payment proof. We'll confirm and ship your order within 24 hours.",
  },
  {
    id: 5,
    question: "What areas do you ship to?",
    answer:
      "Free shipping to Metro Manila (NCR). We also ship to provincial areas for a small fee. Shipping takes 3-5 business days for Metro Manila and 5-7 days for provincial areas.",
  },
  {
    id: 6,
    question: "How long before I see results?",
    answer:
      "Most customers see visible pore reduction within 2-3 weeks with consistent 2-3x weekly use. Maximum results appear after 4 weeks. Results vary based on skin type and current condition.",
  },
  {
    id: 7,
    question: "Is there an expiration date?",
    answer:
      "Products have a shelf life of 24 months from manufacture date when stored in a cool, dry place. Check the box for the manufacturing and expiration dates.",
  },
  {
    id: 8,
    question: "Can I buy in bulk for wholesale/reselling?",
    answer:
      "Yes! Contact us via email for wholesale inquiries. We offer special pricing for bulk orders and resellers interested in our products.",
  },
]

export function FAQSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground/70 px-4 leading-relaxed">
            Everything you need to know about our products and service
          </p>
        </div>

        {/* FAQ Items - Optimized for mobile tapping */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-lg border border-border/50 bg-background overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-4 py-4 sm:px-6 sm:py-5 md:px-8 flex items-center justify-between hover:bg-card transition-colors min-h-[60px]"
              >
                <span className="text-sm sm:text-base md:text-lg font-semibold text-foreground text-left pr-3 sm:pr-4 leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded Answer */}
              {expandedId === faq.id && (
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-card border-t border-border/50">
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 md:mt-16 p-6 sm:p-8 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">Still Have Questions?</h3>
          <p className="text-sm sm:text-base text-foreground/70 mb-5 sm:mb-6 px-2 leading-relaxed">
            Our customer service team is ready to help. Contact us via email.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="min-h-[48px] px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold inline-flex items-center justify-center transition-colors"
            >
              Email Support
            </button>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </section>
  )
}
