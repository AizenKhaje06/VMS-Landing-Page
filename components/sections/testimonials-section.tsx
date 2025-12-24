"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Angela R.",
    location: "Makati, Metro Manila",
    rating: 5,
    text: "Sobrang effective ng Volcanic Mud Scrub! My pores looked visibly smaller after just 2 weeks. Worth every piso!",
    image: "/testimonials/angela.jpg",
    beforeAfter: true,
  },
  {
    id: 2,
    name: "Jamie L.",
    location: "Cebu City",
    rating: 5,
    text: "Finally found something that actually works for oily skin in this heat. My face stays matte all day now. GCash payment made it so convenient!",
    image: "/testimonials/jamie.jpg",
    beforeAfter: false,
  },
  {
    id: 3,
    name: "Sofia M.",
    location: "Quezon City",
    rating: 5,
    text: "The combination of this scrub with the complete routine is unbeatable. My skin has never looked better. Highly recommend to all my friends!",
    image: "/testimonials/sofia.jpg",
    beforeAfter: false,
  },
  {
    id: 4,
    name: "Michelle T.",
    location: "Davao City",
    rating: 5,
    text: "Been using for 4 weeks now and I can see such a dramatic difference. Pores are smaller, skin is brighter, and I finally have the confidence to go makeup-free!",
    image: "/testimonials/michelle.jpg",
    beforeAfter: true,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
            REAL RESULTS
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Loved by <span className="text-primary">50,000+ Filipino Women</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">4.9/5 Average Rating</span>
          </div>
          <p className="text-foreground/70 text-lg">Based on 10,000+ verified reviews</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg bg-card border border-border/50 p-6 hover:border-primary/50 transition-all"
            >
              {/* Before/After badge */}
              {testimonial.beforeAfter && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-4">
                  With Before/After Photos
                </span>
              )}

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

              {/* User info */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image || "/placeholder.svg?height=48&width=48&query=" + testimonial.name}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/70">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Callout */}
        <div className="rounded-lg bg-card border border-border/50 p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Watch Real Customer Reviews</h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            See our customers apply the Volcanic Mud Scrub and share their honest before and after transformations
          </p>
          <div className="bg-background rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-foreground/70">Video testimonials coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
