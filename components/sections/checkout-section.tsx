"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Copy, Check } from "lucide-react"
import { useCart } from "@/components/cart-context"

export function CheckoutSection() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart()
  const [step, setStep] = useState<"review" | "payment" | "proof">("review")
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | "cod" | "bank">("gcash")
  const [referenceNumber, setReferenceNumber] = useState("")
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null)
  const [copiedRef, setCopiedRef] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const generateReferenceNumber = () => {
    const ref = "GLW-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    setReferenceNumber(ref)
  }

  const handlePlaceOrder = () => {
    if (paymentMethod === "gcash" && !referenceNumber) {
      alert("Please generate or enter a reference number")
      return
    }
    if (paymentMethod === "bank" && !referenceNumber) {
      alert("Please enter a bank reference number")
      return
    }
    if (paymentMethod === "gcash" && !paymentProofFile && step === "proof") {
      alert("Please upload payment proof")
      return
    }

    setOrderPlaced(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referenceNumber)
    setCopiedRef(true)
    setTimeout(() => setCopiedRef(false), 2000)
  }

  if (orderPlaced) {
    return (
      <section className="py-16 sm:py-24 bg-background px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Order Confirmed!</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Thank you for your purchase. We've received your order and will process it shortly.
          </p>

          <div className="bg-card rounded-lg border border-border/50 p-8 mb-8 text-left">
            <h3 className="font-semibold text-foreground mb-4">Order Details</h3>
            <div className="space-y-2 text-foreground/70">
              <p>
                <span className="font-semibold text-foreground">Reference Number:</span> {referenceNumber}
              </p>
              <p>
                <span className="font-semibold text-foreground">Total Amount:</span> ₱{cartTotal.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold text-foreground">Payment Method:</span>{" "}
                {paymentMethod === "gcash" ? "GCash" : paymentMethod === "bank" ? "Bank Transfer" : "Cash on Delivery"}
              </p>
              <p>
                <span className="font-semibold text-foreground">Shipping:</span> Free Metro Manila Shipping
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
            <p className="text-foreground mb-4">
              You'll receive a confirmation email shortly. Contact us on Viber or WhatsApp for updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8">Track Order</Button>
              <Button
                variant="outline"
                className="border-primary/30 text-foreground h-12 px-8 bg-transparent"
                onClick={() => {
                  clearCart()
                  setOrderPlaced(false)
                  setStep("review")
                }}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="checkout" className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Step indicator */}
        <div className="flex gap-4 mb-12">
          {(["review", "payment", "proof"] as const).map((s, index) => (
            <div key={s} className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step === s
                    ? "bg-primary text-primary-foreground"
                    : s === "review"
                      ? "bg-primary text-primary-foreground"
                      : "bg-border text-foreground/50"
                }`}
              >
                {index + 1}
              </div>
              {index < 2 && (
                <div className={`flex-1 h-1 ${step === "review" || index === 0 ? "bg-primary" : "bg-border"}`}></div>
              )}
            </div>
          ))}
        </div>

        {step === "review" && (
          <>
            <h2 className="text-3xl font-bold text-foreground mb-8">Review Your Order</h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-foreground/70 mb-6">Your cart is empty</p>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => (window.location.href = "#products")}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-background rounded-lg border border-border/50 divide-y divide-border/50 mb-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover bg-card"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{item.name}</h3>
                        <p className="text-primary font-bold">₱{item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-border rounded"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>
                        <span className="text-foreground font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-border rounded"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-destructive/10 rounded">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-background rounded-lg border border-border/50 p-6 mb-8">
                  <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Subtotal</span>
                      <span className="text-foreground font-semibold">₱{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/70">Shipping (Metro Manila)</span>
                      <span className="text-foreground font-semibold text-primary">FREE</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">₱{cartTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-border text-foreground bg-transparent hover:bg-border/50"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                    onClick={() => setStep("payment")}
                  >
                    Proceed to Payment
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {step === "payment" && (
          <>
            <h2 className="text-3xl font-bold text-foreground mb-8">Choose Payment Method</h2>

            <div className="space-y-4 mb-8">
              {(["gcash", "cod", "bank"] as const).map((method) => (
                <label
                  key={method}
                  className="flex items-start gap-4 p-6 bg-background border border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-all"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value as typeof method)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {method === "gcash"
                        ? "GCash (Recommended)"
                        : method === "cod"
                          ? "Cash on Delivery"
                          : "Bank Transfer"}
                    </p>
                    <p className="text-sm text-foreground/70 mt-1">
                      {method === "gcash"
                        ? "Fastest & safest way to pay in the Philippines"
                        : method === "cod"
                          ? "Pay when your order arrives"
                          : "Direct bank transfer to our account"}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-border text-foreground bg-transparent"
                onClick={() => setStep("review")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                onClick={() => setStep("proof")}
              >
                Continue
              </Button>
            </div>
          </>
        )}

        {step === "proof" && (
          <>
            <h2 className="text-3xl font-bold text-foreground mb-8">
              {paymentMethod === "gcash" ? "Complete Your GCash Payment" : "Payment Instructions"}
            </h2>

            {paymentMethod === "gcash" && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Send Payment via GCash</h3>

                <div className="space-y-6">
                  <div>
                    <p className="text-foreground/70 mb-2">1. Open your GCash app</p>
                    <p className="text-foreground/70 mb-2">2. Send money to: +63 917 XXX XXXX (Cosmi Beautii)</p>
                    <p className="text-foreground/70 mb-4">3. Amount: ₱{cartTotal.toLocaleString()}</p>
                  </div>

                  <div className="bg-background p-4 rounded-lg border border-border/50">
                    <p className="text-sm text-foreground/70 mb-3">Reference Number (include in notes):</p>
                    {!referenceNumber ? (
                      <Button
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={generateReferenceNumber}
                      >
                        Generate Reference Number
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referenceNumber}
                          readOnly
                          className="flex-1 bg-card border border-border/50 rounded px-4 py-2 text-foreground font-mono font-bold"
                        />
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                          onClick={copyToClipboard}
                        >
                          {copiedRef ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copiedRef ? "Copied" : "Copy"}
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="bg-background p-4 rounded-lg border border-border/50">
                    <label className="block">
                      <span className="text-sm font-semibold text-foreground mb-2 block">Upload Payment Proof</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPaymentProofFile(e.target.files?.[0] || null)}
                        className="w-full"
                      />
                      {paymentProofFile && (
                        <p className="text-sm text-primary mt-2">✓ {paymentProofFile.name} selected</p>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Cash on Delivery</h3>
                <p className="text-foreground/70 mb-4">
                  Our courier will contact you before delivery. You can pay with cash when your order arrives. Free
                  shipping to Metro Manila.
                </p>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Bank Transfer Details</h3>
                <div className="space-y-3 text-foreground/70">
                  <p>Bank: BDO Unibank</p>
                  <p>Account Name: Cosmi Beautii Skincare PH</p>
                  <p>Account Number: 0012 3456 7890</p>
                  <p>Amount: ₱{cartTotal.toLocaleString()}</p>
                  <div className="mt-6 p-4 bg-background rounded border border-border/50">
                    <p className="text-sm text-foreground/70 mb-2">Please enter your bank reference number:</p>
                    <input
                      type="text"
                      placeholder="Bank transaction reference"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                      className="w-full bg-card border border-border/50 rounded px-4 py-2 text-foreground"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-border text-foreground bg-transparent"
                onClick={() => setStep("payment")}
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
