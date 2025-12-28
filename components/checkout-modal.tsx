"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Clock, CheckCircle } from "lucide-react"
import { PHILIPPINE_PROVINCES, PHILIPPINE_LOCATIONS } from "@/lib/philippine-locations"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onContinueShopping: () => void
}

export function CheckoutModal({ isOpen, onClose, onContinueShopping }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "review" | "payment" | "success">("form")
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    province: "Metro Manila",
    municipality: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("gcash")
  const [orderNumber, setOrderNumber] = useState("")
  const [timeLeft, setTimeLeft] = useState(1800)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [showCODInfo, setShowCODInfo] = useState(false)
  const [availableMunicipalities, setAvailableMunicipalities] = useState<string[]>(PHILIPPINE_LOCATIONS["Metro Manila"])
  const [continueToPaymentClicked, setContinueToPaymentClicked] = useState(false)
  const [continueShoppingClicked, setContinueShoppingClicked] = useState(false)
  const [confirmOrderDetailsClicked, setConfirmOrderDetailsClicked] = useState(false)
  const [editOrderDetailsClicked, setEditOrderDetailsClicked] = useState(false)
  const [confirmOrderClicked, setConfirmOrderClicked] = useState(false)
  const [backToFormClicked, setBackToFormClicked] = useState(false)
  const [doneClicked, setDoneClicked] = useState(false)
  const [continueShoppingSuccessClicked, setContinueShoppingSuccessClicked] = useState(false)

  const PRODUCT_PRICE = 299
  const totalPrice = PRODUCT_PRICE * quantity
  const COD_DOWNPAYMENT = Math.round(totalPrice * 0.2)
  const COD_BALANCE = totalPrice - COD_DOWNPAYMENT

  // Format remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Countdown timer
  useEffect(() => {
    if (step === "payment" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, step])

  useEffect(() => {
    if (step === "success") {
      triggerConfetti()
    }
  }, [step])

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

      // Create confetti particles
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

  // Generate order number
  const generateOrderNumber = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    return `PH-VOLCANO-${randomNum}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "province") {
      const municipalities = PHILIPPINE_LOCATIONS[value] || []
      setAvailableMunicipalities(municipalities)
      setFormData({
        ...formData,
        province: value,
        municipality: municipalities[0] || "", // Set first municipality as default
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setSubmitError("Please enter your full name")
      return false
    }
    if (!formData.phone.match(/^09\d{9}$/)) {
      setSubmitError("Please enter a valid phone number (e.g., 09XXXXXXXXX)")
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setSubmitError("Please enter a valid email address")
      return false
    }
    if (!formData.address.trim()) {
      setSubmitError("Please enter your shipping address")
      return false
    }
    if (!formData.municipality.trim()) {
      setSubmitError("Please select your municipality")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!validateForm()) {
      return
    }

    // Generate order number
    const orderNum = `PH-VOLCANO-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
    setOrderNumber(orderNum)

    // Go to review step
    setStep("review")
  }

  const handleProceedToPayment = async () => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: `${formData.municipality}, ${formData.province}`,
          quantity,
          totalPrice,
          paymentMethod: "GCash",
          notes: formData.notes || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit order")
      }

      setStep("success")
    } catch (error) {
      setSubmitError("Failed to submit order. Please try again.")
      console.error("Order submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderNumber,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          city: `${formData.municipality}, ${formData.province}`,
          quantity,
          totalPrice,
          paymentMethod,
          notes: formData.notes || "",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit order")
      }

      setStep("success")
    } catch (error) {
      setSubmitError("Failed to submit order. Please try again.")
      console.error("Order submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep("form")
    setQuantity(1)
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      province: "Metro Manila",
      municipality: "",
      notes: "",
    })
    setPaymentMethod("gcash")
    setTimeLeft(1800)
    setSubmitError("")
    setShowCODInfo(false)
    setAvailableMunicipalities(PHILIPPINE_LOCATIONS["Metro Manila"])
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto bg-background rounded-xl sm:rounded-2xl border border-border shadow-2xl my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 sm:p-6 flex items-center justify-between z-10">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground text-balance leading-tight">
            {step === "success"
              ? "Order Successful!"
              : step === "review"
                ? "Review Your Order"
                : "Order Your Volcanic Mud Scrub"}
          </h1>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-card rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8">
          {step === "success" ? (
            <div className="space-y-5 sm:space-y-6 text-center">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                  <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-primary relative animate-bounce-in" />
                </div>
              </div>

              {/* Main Message */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground animate-fade-in">
                  🎉 Congratulations! 🎉
                </h2>
                <p className="text-sm sm:text-base font-semibold text-primary animate-fade-in-delay">
                  Your Order is Confirmed!
                </p>
                <p className="text-sm sm:text-base text-foreground/70 px-4 leading-relaxed animate-fade-in-delay-2">
                  Thank you {formData.fullName} — your order is now being processed.
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-3 sm:space-y-4 text-left animate-slide-up">
                <h3 className="font-semibold text-base sm:text-lg text-foreground text-center mb-3 sm:mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm sm:text-base text-foreground/70">Order ID:</span>
                    <span className="font-semibold text-sm sm:text-base text-primary break-all text-right">
                      {orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm sm:text-base text-foreground/70">Service:</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground text-right">
                      Volcanic Mud Scrub
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm sm:text-base text-foreground/70">Quantity:</span>
                    <span className="font-semibold text-sm sm:text-base text-foreground">{quantity}</span>
                  </div>
                  <div className="border-t border-border pt-2 sm:pt-3 flex justify-between items-center gap-4">
                    <span className="text-sm sm:text-base text-foreground/70 font-medium">Amount Paid:</span>
                    <span className="font-bold text-primary text-lg sm:text-xl">₱{totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* GCash Payment Instructions */}
              <div className="bg-gradient-to-br from-amber-900/20 to-amber-950/20 border-2 border-amber-600/30 rounded-xl p-5 sm:p-6 text-left animate-slide-up shadow-lg">
                <h3 className="font-bold text-lg sm:text-xl text-amber-500 mb-4 text-center">
                  GCash Payment Instructions
                </h3>
                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-amber-500 flex-shrink-0">1.</span>
                    <span className="text-foreground/90 leading-relaxed">Open your GCash app</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-amber-500 flex-shrink-0">2.</span>
                    <span className="text-foreground/90 leading-relaxed">
                      Send <span className="font-bold text-amber-500">₱{totalPrice}</span> to:{" "}
                      <span className="font-bold text-amber-400">09XX-XXX-XXXX</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-amber-500 flex-shrink-0">3.</span>
                    <span className="text-foreground/90 leading-relaxed">
                      Use reference: <span className="font-bold text-amber-400">{orderNumber}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-amber-500 flex-shrink-0">4.</span>
                    <span className="text-foreground/90 leading-relaxed">Screenshot your payment confirmation</span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-amber-600/20">
                  <p className="text-xs sm:text-sm text-foreground/70 text-center leading-relaxed">
                    After payment, send your screenshot to our{" "}
                    <a
                      href="https://www.facebook.com/CosmiBeautiiMain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-amber-400 hover:text-amber-300 underline transition-colors"
                    >
                      Facebook Page
                    </a>
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 sm:p-5 text-left animate-slide-up-delay-2">
                <p className="font-semibold text-sm sm:text-base text-foreground mb-3">What Happens Next:</p>
                <ol className="space-y-2 text-xs sm:text-sm text-foreground/80">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary flex-shrink-0">1.</span>
                    <span className="leading-relaxed">Our team will verify your payment (usually within 1 hour)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary flex-shrink-0">2.</span>
                    <span className="leading-relaxed">We'll call you to confirm delivery details</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary flex-shrink-0">3.</span>
                    <span className="leading-relaxed">Your order will be prepared and shipped</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary flex-shrink-0">4.</span>
                    <span className="leading-relaxed">Track your package and receive updates via SMS</span>
                  </li>
                </ol>
              </div>

              {/* Need Help */}
              <div className="text-xs sm:text-sm text-foreground/70 px-4 leading-relaxed">
                <p>
                  Need immediate help? Reply to your confirmation email or call us at <strong>0917 XXX XXXX</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleClose}
                  className="w-full min-h-[48px] sm:h-12 text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Done
                </Button>
                <Button
                  onClick={() => {
                    onContinueShopping()
                    handleClose()
                  }}
                  variant="outline"
                  className="w-full min-h-[48px] sm:h-12 text-sm sm:text-base border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Product Summary */}
              <div className="flex gap-3 sm:gap-4 pb-5 sm:pb-6 border-b border-border">
                <img
                  src="/checkout-image/volcanic-mud-scrub-product.png"
                  alt="Volcanic Mud Scrub"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">Volcanic Mud Scrub</h3>
                  <p className="text-xs sm:text-sm text-foreground/70">Premium volcanic clay scrub</p>
                  <p className="font-semibold text-primary mt-1 sm:mt-2">₱{PRODUCT_PRICE}</p>
                </div>
              </div>

              {/* Form Fields - Mobile-optimized inputs */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary text-sm sm:text-base min-h-[48px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="09XXXXXXXXX"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary text-sm sm:text-base min-h-[48px]"
                  />
                  <p className="text-xs text-foreground/70 mt-1.5">Format: 09XXXXXXXXX</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary text-sm sm:text-base min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Shipping Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House number, street, barangay"
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary text-sm sm:text-base min-h-[48px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Province *</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary text-sm sm:text-base min-h-[48px]"
                  >
                    {PHILIPPINE_PROVINCES.map((province) => (
                      <option key={province} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Municipality *</label>
                  <select
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary text-sm sm:text-base min-h-[48px]"
                  >
                    <option value="">Select Municipality</option>
                    {availableMunicipalities.map((municipality) => (
                      <option key={municipality} value={municipality}>
                        {municipality}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quantity - Touch-friendly buttons */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="min-w-[48px] min-h-[48px] rounded-lg border border-border hover:bg-card transition-colors flex items-center justify-center font-semibold text-lg"
                  >
                    −
                  </button>
                  <span className="text-lg sm:text-xl font-semibold text-foreground min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="min-w-[48px] min-h-[48px] rounded-lg border border-border hover:bg-card transition-colors flex items-center justify-center font-semibold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-card border border-border rounded-lg p-4 sm:p-5">
                <div className="flex justify-between items-center gap-4">
                  <span className="text-sm sm:text-base text-foreground font-semibold">Total Amount:</span>
                  <span className="text-xl sm:text-2xl font-bold text-primary">₱{totalPrice}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Payment Method *</label>
                <div className="space-y-2 sm:space-y-3">
                  {[{ id: "gcash", label: "GCash (Full Payment)" }].map((method) => (
                    <div key={method.id}>
                      <label className="flex items-center gap-3 p-3 sm:p-4 rounded-lg border border-border cursor-pointer hover:bg-card transition-colors min-h-[56px]">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-5 h-5 text-primary flex-shrink-0"
                        />
                        <span className="text-sm sm:text-base text-foreground font-medium leading-snug">
                          {method.label}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions or requests..."
                  className="w-full px-4 py-3 sm:py-3.5 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary resize-none text-sm sm:text-base min-h-[100px]"
                  rows={3}
                />
              </div>

              {/* Error Message */}
              {submitError && (
                <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
                  <p className="text-sm text-red-500">{submitError}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  onClick={() => setContinueToPaymentClicked(true)}
                  className={`w-full min-h-[48px] sm:h-12 text-sm sm:text-base transition-all duration-300 ${
                    continueToPaymentClicked
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Continue to Payment
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setContinueShoppingClicked(true)
                    onContinueShopping()
                  }}
                  variant="outline"
                  className={`w-full min-h-[48px] sm:h-12 text-sm sm:text-base transition-all duration-300 ${
                    continueShoppingClicked
                      ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                      : "border-primary text-primary hover:bg-primary/10 bg-transparent"
                  }`}
                >
                  Continue Shopping
                </Button>
              </div>
            </form>
          ) : step === "review" ? (
            <div className="space-y-5 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Review Your Order</h2>
                <p className="text-sm sm:text-base text-foreground/70">
                  Please double-check your order details before proceeding
                </p>
              </div>

              {/* Product Details */}
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4">
                <h3 className="font-semibold text-base sm:text-lg text-foreground border-b border-border pb-3">
                  Product Details
                </h3>
                <div className="flex gap-4">
                  <img
                    src="/checkout-image/volcanic-mud-scrub-product.png"
                    alt="Volcanic Mud Scrub"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Volcanic Mud Scrub</h4>
                    <p className="text-sm text-foreground/70 mb-2">
                      Premium volcanic clay scrub with natural whitening
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-foreground/70">
                        Quantity: <span className="font-semibold text-foreground">{quantity}</span>
                      </p>
                      <p className="font-semibold text-primary">₱{PRODUCT_PRICE} each</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-3">
                <h3 className="font-semibold text-base sm:text-lg text-foreground border-b border-border pb-3">
                  Shipping Information
                </h3>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Name:</span>
                    <span className="font-semibold text-foreground text-right">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Phone:</span>
                    <span className="font-semibold text-foreground">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Email:</span>
                    <span className="font-semibold text-foreground text-right break-all">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Address:</span>
                    <span className="font-semibold text-foreground text-right max-w-[60%]">{formData.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Municipality:</span>
                    <span className="font-semibold text-foreground">{formData.municipality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Province:</span>
                    <span className="font-semibold text-foreground">{formData.province}</span>
                  </div>
                  {formData.notes && (
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="text-foreground/70">Notes:</span>
                      <span className="font-semibold text-foreground text-right max-w-[60%]">{formData.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-3">
                <h3 className="font-semibold text-base sm:text-lg text-foreground border-b border-border pb-3">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Order ID:</span>
                    <span className="font-semibold text-primary">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Subtotal:</span>
                    <span className="font-semibold text-foreground">₱{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Shipping:</span>
                    <span className="font-semibold text-primary">FREE</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="text-base sm:text-lg font-bold text-foreground">Total:</span>
                    <span className="text-xl sm:text-2xl font-bold text-primary">₱{totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-card border border-border rounded-xl p-4 sm:p-5">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">🛡️</span>
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-foreground">30-Day Guarantee</p>
                    <p className="text-xs text-foreground/70">Love it or get your money back</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">🚚</span>
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-foreground">Free Shipping</p>
                    <p className="text-xs text-foreground/70">On all orders over $100</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">💬</span>
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-foreground">24/7 Support</p>
                    <p className="text-xs text-foreground/70">Expert skincare advisors</p>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">🔒</span>
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm text-foreground">Secure Payment</p>
                    <p className="text-xs text-foreground/70">SSL encrypted checkout</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={() => { setConfirmOrderDetailsClicked(true); handleProceedToPayment(); }}
                  className={`w-full min-h-[48px] sm:h-12 text-sm sm:text-base transition-all duration-300 ${
                    confirmOrderDetailsClicked
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Confirm Order Details
                </Button>
                <Button
                  onClick={() => { setEditOrderDetailsClicked(true); setStep("form"); }}
                  variant="outline"
                  className={`w-full min-h-[48px] sm:h-12 text-sm sm:text-base transition-all duration-300 ${
                    editOrderDetailsClicked
                      ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
                      : "border-primary text-primary hover:bg-primary/10 bg-transparent"
                  }`}
                >
                  Edit Order Details
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-5 sm:space-y-6">
              <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">GCash Payment</h3>
                    <p className="text-sm text-foreground/70">Fast & secure payment</p>
                  </div>
                </div>

                <div className="space-y-4 bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <span className="text-sm text-foreground/70">Amount to Pay:</span>
                    <span className="text-xl font-bold text-primary">₱{totalPrice}</span>
                  </div>

                  {timeLeft > 0 && (
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Complete payment within: {formatTime(timeLeft)}</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Send payment to:</p>
                    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                      <p className="text-sm text-foreground/70">GCash Number:</p>
                      <p className="font-bold text-foreground text-lg">+63 917 XXX XXXX</p>
                      <p className="text-xs text-foreground/70">Account Name: Cosmi Beautii</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GCash Payment Instructions */}
              <div className="bg-gradient-to-br from-[#3a3420] to-[#2a2515] border-2 border-amber-700/50 rounded-xl p-6 sm:p-7 text-left animate-slide-up-delay shadow-lg">
                <h3 className="font-bold text-lg sm:text-xl text-white mb-5 text-center">
                  GCash Payment Instructions:
                </h3>
                <div className="space-y-3.5 text-sm sm:text-base">
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-white flex-shrink-0">1.</span>
                    <span className="text-white/90 leading-relaxed">Open your GCash app</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-white flex-shrink-0">2.</span>
                    <span className="text-white/90 leading-relaxed">
                      Send ₱999 to: <span className="font-bold text-amber-400">09XX-XXX-XXXX</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-white flex-shrink-0">3.</span>
                    <span className="text-white/90 leading-relaxed">
                      Use reference: <span className="font-bold text-amber-400">{orderNumber}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-white flex-shrink-0">4.</span>
                    <span className="text-white/90 leading-relaxed">Screenshot your payment confirmation</span>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-amber-700/30">
                  <p className="text-xs sm:text-sm text-white/70 text-center leading-relaxed">
                    After payment, send your screenshot to our{" "}
                    <a
                      href="https://www.facebook.com/CosmiBeautiiMain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-amber-400 hover:text-amber-300 underline transition-colors"
                    >
                      FB Messenger
                    </a>
                  </p>
                </div>
              </div>

              {submitError && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 sm:p-4 text-sm">
                  {submitError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={() => setStep("form")}
                  variant="outline"
                  className="flex-1 order-2 sm:order-1 min-h-[48px] sm:h-12 text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  Back to Form
                </Button>
                <Button
                  onClick={handleConfirmOrder}
                  className="flex-1 order-1 sm:order-2 min-h-[48px] sm:h-12 text-sm sm:text-base bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Order"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
