"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload, Clock, CheckCircle } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onContinueShopping: () => void
}

const PHILIPPINE_CITIES = [
  "Metro Manila",
  "Cebu City",
  "Davao City",
  "Cagayan de Oro",
  "Makati",
  "Quezon City",
  "Pasig",
  "Caloocan",
  "Las Piñas",
  "Parañaque",
  "Other",
]

const GCASH_NUMBER = "0917 XXX XXXX"

export function CheckoutModal({ isOpen, onClose, onContinueShopping }: CheckoutModalProps) {
  const [step, setStep] = useState<"form" | "payment" | "success">("form") // Added "success" step
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Metro Manila",
    notes: "", // added notes field
  })
  const [paymentMethod, setPaymentMethod] = useState("gcash")
  const [orderNumber, setOrderNumber] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [timeLeft, setTimeLeft] = useState(1800)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [showCODInfo, setShowCODInfo] = useState(false)

  const PRODUCT_PRICE = 899
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

  // Generate order number
  const generateOrderNumber = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000)
    return `PH-VOLCANO-${randomNum}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const phoneRegex = /^09\d{9}$/
    if (!formData.fullName.trim()) return "Full name is required"
    if (!phoneRegex.test(formData.phone)) return "Phone must be in format: 09XXXXXXXXX"
    if (!formData.email.trim()) return "Email is required"
    if (!formData.address.trim()) return "Shipping address is required"
    return ""
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateForm()
    if (error) {
      setSubmitError(error)
      return
    }
    setSubmitError("")
    const orderNum = generateOrderNumber()
    setOrderNumber(orderNum)
    setTimeLeft(1800)
    setStep("payment")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      let imageUrl = ""

      // Upload image to Vercel Blob if file exists
      if (file) {
        const blobFormData = new FormData()
        blobFormData.append("file", file)

        const uploadResponse = await fetch("/api/upload-image", {
          method: "POST",
          body: blobFormData,
        })

        if (!uploadResponse.ok) {
          setSubmitError("Failed to upload payment proof. Please try again.")
          setIsSubmitting(false)
          return
        }

        const uploadData = await uploadResponse.json()
        imageUrl = uploadData.url
      }

      // Send order data to Google Apps Script
      const orderData = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        quantity: quantity.toString(),
        totalPrice: totalPrice.toString(),
        paymentMethod: paymentMethod,
        orderNumber: orderNumber,
        imageUrl: imageUrl,
        submittedAt: new Date().toISOString(),
        notes: formData.notes, // added notes field
      }

      if (paymentMethod === "cod") {
        Object.assign(orderData, {
          codDownpayment: COD_DOWNPAYMENT.toString(),
          codBalance: COD_BALANCE.toString(),
        })
      }

      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        setStep("success")
      } else {
        const error = await response.json()
        setSubmitError(error.error || "Failed to submit order. Please try again.")
      }
    } catch (error) {
      console.log("[v0] Order submission error:", error)
      setSubmitError("Network error. Please try again.")
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
      city: "Metro Manila",
      notes: "", // added notes field
    })
    setPaymentMethod("gcash")
    setFile(null)
    setTimeLeft(1800)
    setSubmitError("")
    setShowCODInfo(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl border border-border shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            {step === "success" ? "Payment Confirmed" : "Order Your Volcanic Mud Scrub"}
          </h1>
          <button onClick={handleClose} className="p-2 hover:bg-card rounded-lg transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === "success" ? (
            <div className="space-y-6 text-center">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"></div>
                  <CheckCircle className="w-20 h-20 text-primary relative" />
                </div>
              </div>

              {/* Main Message */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Payment Confirmed!</h2>
                <p className="text-foreground/70">Thank you {formData.fullName} — your order is now being processed.</p>
              </div>

              {/* Order Summary */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-left">
                <h3 className="font-semibold text-foreground text-center mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Order ID:</span>
                    <span className="font-semibold text-primary">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Service:</span>
                    <span className="font-semibold text-foreground">Volcanic Mud Scrub</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70">Quantity:</span>
                    <span className="font-semibold text-foreground">{quantity}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between items-center">
                    <span className="text-foreground/70 font-medium">Amount Paid:</span>
                    <span className="font-bold text-primary text-lg">₱{totalPrice}</span>
                  </div>
                  {paymentMethod === "cod" && (
                    <>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/70">Downpayment Received:</span>
                        <span className="font-semibold text-primary">₱{COD_DOWNPAYMENT}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/70">Balance on Delivery:</span>
                        <span className="font-semibold text-foreground">₱{COD_BALANCE}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Confirmation Details */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-foreground/80">
                    Confirmation email sent to: <strong>{formData.email}</strong>
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-foreground/80">
                    A detailed receipt has been emailed to you with order details and payment confirmation.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg flex-shrink-0">✓</span>
                  <span className="text-foreground/80">
                    We'll contact you shortly at <strong>{formData.phone}</strong> to confirm your order and arrange
                    delivery.
                  </span>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
                <p className="font-semibold text-foreground mb-3">What Happens Next:</p>
                <ol className="space-y-2 text-sm text-foreground/80">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">1.</span>
                    <span>Our team will verify your payment (usually within 1 hour)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">2.</span>
                    <span>We'll call you to confirm delivery details</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">3.</span>
                    <span>Your order will be prepared and shipped</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary">4.</span>
                    <span>Track your package and receive updates via SMS</span>
                  </li>
                </ol>
              </div>

              {/* Need Help */}
              <div className="text-sm text-foreground/70">
                <p>
                  Need immediate help? Reply to your confirmation email or call us at <strong>0917 XXX XXXX</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleClose}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Done
                </Button>
                <Button
                  onClick={() => {
                    onContinueShopping()
                    handleClose()
                  }}
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : step === "form" ? (
            <form onSubmit={handleSubmitForm} className="space-y-6">
              {/* Product Summary */}
              <div className="flex gap-4 pb-6 border-b border-border">
                <img
                  src="/volcanic-mud-scrub-hero-product-shot-with-golden-g.jpg"
                  alt="Volcanic Mud Scrub"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Volcanic Mud Scrub</h3>
                  <p className="text-sm text-foreground/70">Premium volcanic clay scrub</p>
                  <p className="font-semibold text-primary mt-2">₱{PRODUCT_PRICE}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="09XXXXXXXXX"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-foreground/70 mt-1">Format: 09XXXXXXXXX</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
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
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">City/Municipality *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary"
                >
                  {PHILIPPINE_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
                <div className="flex items-center gap-4 w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 rounded-lg border border-border hover:bg-card transition-colors"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-foreground w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(5, quantity + 1))}
                    className="px-4 py-2 rounded-lg border border-border hover:bg-card transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">₱{totalPrice}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Payment Method *</label>
                <div className="space-y-2">
                  {[
                    { id: "gcash", label: "GCash (Full Payment)" },
                    { id: "cod", label: "Cash on Delivery (20% Downpayment Required)" },
                    { id: "bank", label: "Bank Transfer (Full Payment)" },
                  ].map((method) => (
                    <div key={method.id}>
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-card transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value)
                            if (e.target.value === "cod") {
                              setShowCODInfo(true)
                            }
                          }}
                          className="w-4 h-4"
                        />
                        <span className="text-foreground font-medium">{method.label}</span>
                      </label>
                      {method.id === "cod" && paymentMethod === "cod" && showCODInfo && (
                        <div className="mt-3 ml-7 bg-primary/10 border border-primary rounded-lg p-4 space-y-3">
                          <p className="text-sm text-foreground">
                            To secure your Cash on Delivery order, a 20% downpayment (
                            <strong>₱{COD_DOWNPAYMENT}</strong>) via GCash is required. This prevents order cancellation
                            and reserves your item.
                          </p>
                          <div className="bg-background border border-border rounded p-3 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-foreground/80">Downpayment (20%):</span>
                              <span className="font-semibold text-foreground">₱{COD_DOWNPAYMENT}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-foreground/80">Balance on Delivery:</span>
                              <span className="font-semibold text-foreground">₱{COD_BALANCE}</span>
                            </div>
                          </div>
                          <div className="bg-background border border-border rounded p-3 text-xs space-y-2">
                            <p className="font-semibold text-foreground">Why 20% downpayment?</p>
                            <ul className="space-y-1 text-foreground/70 list-disc list-inside">
                              <li>Prevents fake/cancelled orders</li>
                              <li>Ensures serious buyers</li>
                              <li>Covers rider fuel cost</li>
                              <li>Guarantees item reservation</li>
                            </ul>
                          </div>
                          <div className="bg-background border border-border rounded p-3 text-xs text-foreground/70 space-y-1">
                            <p className="font-semibold text-foreground">Cancellation Policy:</p>
                            <p>Downpayment refundable if cancelled 24 hours before shipment</p>
                            <p>Non-refundable if rider is already dispatched</p>
                            <p>Full refund if item is out of stock</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* GCash Info */}
              {paymentMethod === "gcash" && (
                <div className="bg-primary/10 border border-primary rounded-lg p-4">
                  <p className="text-sm text-foreground/80 mb-2">Send payment to:</p>
                  <p className="font-semibold text-foreground text-lg">{GCASH_NUMBER}</p>
                </div>
              )}

              {/* Bank Transfer Info */}
              {paymentMethod === "bank" && (
                <div className="bg-primary/10 border border-primary rounded-lg p-4">
                  <p className="text-sm text-foreground/80 mb-2">Bank Transfer Details:</p>
                  <p className="font-semibold text-foreground text-lg">Bank Name: [Your Bank]</p>
                  <p className="font-semibold text-foreground">Account: [Your Account Details]</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Additional Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions or requests..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:border-primary resize-none"
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
                <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue to Payment
                </Button>
                <Button
                  type="button"
                  onClick={() => onContinueShopping()}
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Continue Shopping
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Order Confirmation */}
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Order Confirmed</h2>
                <p className="text-primary font-semibold text-xl">#{orderNumber}</p>
                <p className="text-foreground/70 mt-2">Amount: ₱{totalPrice}</p>
              </div>

              {paymentMethod === "cod" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">COD Downpayment Instructions:</h3>
                  <ol className="space-y-3 text-sm text-foreground/80">
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">1.</span>
                      <span>
                        Send <strong>₱{COD_DOWNPAYMENT}</strong> via GCash to: <strong>{GCASH_NUMBER}</strong>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">2.</span>
                      <span>
                        Include reference: <strong className="text-primary">COD-{orderNumber}</strong>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">3.</span>
                      <span>Upload payment screenshot below</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">4.</span>
                      <span>
                        Our rider will collect remaining <strong>₱{COD_BALANCE}</strong> upon delivery
                      </span>
                    </li>
                  </ol>
                  <div className="bg-primary/5 border border-primary/30 rounded-lg p-3 mt-4">
                    <p className="text-xs text-foreground/70">
                      You will receive an SMS 1 hour before delivery with the rider's details.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "gcash" && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Payment Instructions:</h3>
                  <ol className="space-y-3 text-sm text-foreground/80">
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">1.</span>
                      <span>
                        Send exact amount <strong>₱{totalPrice}</strong> via GCash to: <strong>{GCASH_NUMBER}</strong>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">2.</span>
                      <span>
                        Include reference: <strong className="text-primary">{orderNumber}</strong>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary flex-shrink-0">3.</span>
                      <span>Upload payment proof below</span>
                    </li>
                  </ol>
                </div>
              )}

              {/* Countdown Timer */}
              <div className="flex items-center justify-center gap-2 bg-primary/10 border border-primary rounded-lg p-4">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-foreground font-semibold">
                  Complete payment in: <span className="text-primary">{formatTime(timeLeft)}</span>
                </span>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Upload Payment Proof {paymentMethod === "cod" ? "(Downpayment)" : "(Full Payment)"} *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-primary" />
                    <span className="text-foreground font-medium">{file ? file.name : "Click to upload image"}</span>
                    <span className="text-xs text-foreground/70">PNG, JPG up to 10MB</span>
                  </label>
                </div>
              </div>

              {/* Confirmation Message */}
              <div className="bg-primary/10 border border-primary rounded-lg p-4">
                {paymentMethod === "cod" ? (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">COD Order Confirmation</p>
                    <p className="text-sm text-foreground/80">
                      We'll verify your downpayment within 1 hour. Our rider will call you 1 hour before delivery to
                      collect the remaining ₱{COD_BALANCE}.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-foreground/80">
                    We'll verify your payment within 1 hour and send you an SMS confirmation to {formData.phone}
                  </p>
                )}
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
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting || !file}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Confirm Order"}
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep("form")}
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary/10 bg-transparent"
                >
                  Back to Order Form
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
