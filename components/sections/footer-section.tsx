"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { useState } from "react"
import { ContactModal } from "@/components/contact-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function FooterSection() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeMessage, setSubscribeMessage] = useState("")

  const triggerConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      createConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      createConfetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const createConfetti = (options: any) => {
    const colors = ["#FFD700", "#FFA500", "#FF6B6B", "#4ECDC4", "#45B7D1"]
    const canvas = document.createElement("canvas")
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = String(options.zIndex || 9999)
    document.body.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      life: number
    }> = []

    for (let i = 0; i < options.particleCount; i++) {
      particles.push({
        x: canvas.width * options.origin.x,
        y: canvas.height * Math.abs(options.origin.y),
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -15 - 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        life: options.ticks,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, index) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.3
        p.life--

        if (p.life <= 0) {
          particles.splice(index, 1)
          return
        }

        ctx.fillStyle = p.color
        ctx.globalAlpha = p.life / options.ticks
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      } else {
        document.body.removeChild(canvas)
      }
    }

    animate()
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    setSubscribeMessage("")

    try {
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        triggerConfetti()
        setSubscribeMessage("Thank you for subscribing! Check your email for a welcome message.")
        setEmail("")
      } else {
        setSubscribeMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubscribeMessage("Network error. Please try again.")
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <>
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-12 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Stay Updated</h3>
            <p className="text-foreground/70 text-sm mb-4 text-center">
              Get exclusive offers and skincare tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="cwagoventures@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background text-foreground border-border"
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-semibold"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
              {subscribeMessage && <p className="text-sm text-center text-foreground/70">{subscribeMessage}</p>}
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="mb-4 flex items-center justify-center md:justify-start gap-3">
                <Image
                  src="/logo/cosmi-beautii-logo.png"
                  alt="Cosmi Beautii Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <span className="text-xl font-semibold text-foreground">Cosmi Beautii PH</span>
              </div>
              <p className="text-foreground/70 text-sm text-center md:text-left">
                Premium volcanic skincare designed for Filipino men and women. Transform your skin naturally.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              {/* Support */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li>
                    <Link href="#faq" className="hover:text-primary transition">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="hover:text-primary transition text-left"
                    >
                      Shipping Info
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="hover:text-primary transition text-left"
                    >
                      Returns
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="hover:text-primary transition text-left"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-foreground/70 hover:text-primary transition">
                    <Phone className="w-4 h-4" />
                    <span>+63 917 XXX XXXX</span>
                  </div>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="flex items-center gap-2 text-foreground/70 hover:text-primary transition"
                  >
                    <Mail className="w-4 h-4" />
                    <span>cwagoventures@gmail.com</span>
                  </button>
                  <p className="text-foreground/70 mt-4">24/7 Email Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-foreground/70">© 2025 Cosmibeautii. All rights reserved.</p>
              <div className="flex gap-6 text-sm text-foreground/70">
                <Link href="#" className="hover:text-primary transition">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-primary transition">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-primary transition">
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ContactModal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  )
}
