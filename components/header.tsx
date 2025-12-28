"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Results", href: "#results" },
    { name: "Reviews", href: "#reviews" },
    { name: "Volcanic Power", href: "#volcanic-power" },
    { name: "How to Use", href: "#how-to-use" },
    { name: "FAQ", href: "#faq" },
    { name: "Buy Now", href: "#buy-now" },
  ]

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="lg:hidden grid grid-cols-[auto_1fr_auto] items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 justify-self-start">
            <Image
              src="/logo/cosmi-beautii-logo.png"
              alt="Cosmi Beautii Logo"
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
            />
          </Link>

          {/* Centered Brand Text */}
          <div className="justify-self-center text-center">
            <span className="font-serif font-medium text-gold-medium tracking-wide animate-breathing">
              Volcanic Mud
            </span>
          </div>

          {/* Mobile Menu Button - Thumb-friendly 44px target */}
          <button
            className="min-w-[44px] min-h-[44px] flex items-center justify-center justify-self-end"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo/cosmi-beautii-logo.png"
              alt="Cosmi Beautii Logo"
              width={48}
              height={48}
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
            />
            <span className="hidden sm:inline text-base md:text-lg lg:text-xl font-semibold text-primary truncate">
              Cosmi Beautii PH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm xl:text-base text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap min-h-[44px] px-2"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavClick("#buy-now")}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6">Buy Now</Button>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Optimized for touch */}
        {mobileMenuOpen && (
          <div className="pb-4 lg:hidden flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-foreground hover:text-primary hover:bg-card transition-colors duration-200 min-h-[44px] px-4 py-3 rounded-lg"
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => handleNavClick("#buy-now")} className="w-full pt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px]">
                Buy Now
              </Button>
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
