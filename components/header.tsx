"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: "Overview", href: "#overview" },
    { name: "Volcanic Power", href: "#volcanic-power" },
    { name: "Results", href: "#results" },
    { name: "How to Use", href: "#how-to-use" },
    { name: "Reviews", href: "#reviews" },
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              G
            </div>
            <span className="hidden sm:inline text-lg font-semibold text-primary">Cosmi Beautii PH</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-foreground hover:text-primary transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => handleNavClick("#buy-now")}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Buy Now</Button>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="pb-4 lg:hidden flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-foreground hover:text-primary transition-colors duration-200 py-2"
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => handleNavClick("#buy-now")} className="w-full pt-2">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Buy Now</Button>
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
