"use client"

import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                G
              </div>
              <span className="text-lg font-semibold text-primary">GlowVital</span>
            </div>
            <p className="text-foreground/70 text-sm">
              Premium volcanic skincare designed for Filipino women. Transform your skin naturally.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="#products" className="hover:text-primary transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-primary transition">
                  Volcanic Mud Scrub
                </Link>
              </li>
              <li>
                <Link href="#products" className="hover:text-primary transition">
                  Complete Routine
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Bundle Deals
                </Link>
              </li>
            </ul>
          </div>

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
                <Link href="#" className="hover:text-primary transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Contact Us
                </Link>
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
              <div className="flex items-center gap-2 text-foreground/70 hover:text-primary transition">
                <Mail className="w-4 h-4" />
                <span>support@glowvital.ph</span>
              </div>
              <p className="text-foreground/70 mt-4">24/7 Viber & WhatsApp Support</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground/70">© 2025 GlowVital. All rights reserved.</p>
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
  )
}
