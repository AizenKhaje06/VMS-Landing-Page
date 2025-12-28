"use client"

import { Star } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const reviews = [
  {
    id: 1,
    name: "Angela R.",
    location: "Makati, Metro Manila",
    rating: 5,
    text: "Sobrang effective ng Volcanic Mud Scrub! My pores looked visibly smaller after just 2 weeks. Worth every piso!",
    image: "/testimonials/angela.jpg",
    verified: true,
    beforeAfter: true,
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Jamie L.",
    location: "Cebu City",
    rating: 5,
    text: "Finally found something that actually works for oily skin in this heat. My face stays matte all day now!",
    image: "/testimonials/jamie.jpg",
    verified: true,
    beforeAfter: false,
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Sofia M.",
    location: "Quezon City",
    rating: 5,
    text: "The scrub is amazing! My skin has never looked better. Highly recommend to all my friends!",
    image: "/testimonials/sofia.jpg",
    verified: true,
    beforeAfter: false,
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Michelle T.",
    location: "Davao City",
    rating: 5,
    text: "Been using for 4 weeks and I can see such a dramatic difference. Pores smaller, skin brighter, finally makeup-free confident!",
    image: "/testimonials/michelle.jpg",
    verified: true,
    beforeAfter: true,
    date: "1 week ago",
  },
]

export function ReviewsSection() {
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

  return (
    <section ref={sectionRef} id="reviews" className="py-16 sm:py-20 md:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-4 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            Customer <span className="text-primary">Reviews</span>
          </h2>
          <div
            className={`flex items-center justify-center gap-3 mb-4 flex-wrap ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">4.9/5 Average Rating</span>
            <span className="text-base text-foreground/60">(10,000+ Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={review.id}
              className={`rounded-2xl bg-card border-2 border-border/80 p-6 sm:p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Purchase
                  </div>
                )}
              </div>

              <p className="text-base text-foreground/80 mb-4 leading-relaxed italic">"{review.text}"</p>

              {review.beforeAfter && (
                <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary">📸 Includes Before/After Photos</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t-2 border-border/60">
                <div className="flex items-center gap-3">
                  <img
                    src={review.image || `/placeholder.svg?height=48&width=48&query=${review.name}`}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-primary/20"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-foreground/60">{review.location}</p>
                  </div>
                </div>
                <span className="text-xs text-foreground/50">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
