"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { ShoppingCart, ArrowLeft, Check, AlertCircle, Zap } from "lucide-react"

export default function VolcanicScrubPage() {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("overview")
  const [addedToCart, setAddedToCart] = useState(false)

  const product = {
    id: 1,
    name: "Volcanic Mud Scrub",
    price: 1299,
    priceDisplay: "₱1,299",
    image: "/products/volcanic-mud-scrub.jpg",
    rating: 4.9,
    reviews: 287,
    description:
      "Deep purifying exfoliant with natural volcanic clay from Philippine volcanic sources. Perfect for tropical skin conditions.",
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const increaseQuantity = () => setQuantity((q) => q + 1)
  const decreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square rounded-lg overflow-hidden bg-card border border-border/50 flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg?height=500&width=500&query=volcanic-mud-scrub"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-foreground font-semibold">{product.rating}</span>
                <span className="text-foreground/60">({product.reviews} reviews)</span>
              </div>

              <p className="text-lg text-foreground/70 mb-6">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl font-bold text-primary mb-2">{product.priceDisplay}</p>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Zap className="w-4 h-4 text-primary" />
                <span>Free Metro Manila shipping on orders over ₱2,000</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 rounded-lg border border-border hover:bg-card transition flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-xl font-semibold text-foreground w-8 text-center">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-lg border border-border hover:bg-card transition flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              className={`w-full h-12 text-lg font-semibold transition-all ${
                addedToCart
                  ? "bg-green-600 hover:bg-green-600 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              {addedToCart ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Dermatologist Tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">GCash Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border/50 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            {["overview", "ingredients", "usage", "warnings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-semibold capitalize transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Why Choose Volcanic Mud Scrub?</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-primary text-2xl font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Deep Pore Purification</h3>
                      <p className="text-foreground/70">
                        Natural volcanic clay draws out impurities and excess oil from deep within pores
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-primary text-2xl font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Gentle Yet Effective</h3>
                      <p className="text-foreground/70">
                        Specially formulated for tropical skin—exfoliates without harsh scrubbing
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-primary text-2xl font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Visible Results in 4 Weeks</h3>
                      <p className="text-foreground/70">
                        Customers report clearer pores, reduced acne, and brighter skin tone
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-primary text-2xl font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Philippine Volcanic Clay</h3>
                      <p className="text-foreground/70">
                        Sourced from local volcanoes, rich in minerals and silica compounds
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-primary text-2xl font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Balances Oil Production</h3>
                      <p className="text-foreground/70">
                        Perfect for combination and oily skin types common in tropical climates
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-primary text-2xl font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Non-Drying Formula</h3>
                      <p className="text-foreground/70">Won't leave skin tight or irritated when used as directed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Premium Quality Assurance</h3>
                <p className="text-foreground/80">
                  Dermatologist tested, hypoallergenic, cruelty-free, and made from 100% natural ingredients. Every
                  batch is lab-tested for purity and potency.
                </p>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">Complete Ingredients List</h2>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Active Ingredients</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">Volcanic Clay (40%)</p>
                    <p className="text-foreground/70 text-sm">
                      Rich in minerals like silica, iron oxide, and magnesium. Absorbs excess oil and removes dead skin
                      cells through gentle abrasion.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pumice Powder (15%)</p>
                    <p className="text-foreground/70 text-sm">
                      Natural exfoliant that gently removes dead skin cells without damaging the skin barrier.
                      Fine-milled for comfort.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Charcoal (8%)</p>
                    <p className="text-foreground/70 text-sm">
                      Activated charcoal draws out impurities, bacteria, and toxins from pores. Excellent for acne-prone
                      skin.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Nourishing & Soothing Ingredients</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">Coconut Oil (10%)</p>
                    <p className="text-foreground/70 text-sm">
                      Moisturizing and antimicrobial properties. Balances the exfoliation with gentle hydration.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Jojoba Oil (8%)</p>
                    <p className="text-foreground/70 text-sm">
                      Similar to skin's natural sebum, prevents moisture loss without clogging pores.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Green Tea Extract (5%)</p>
                    <p className="text-foreground/70 text-sm">
                      Powerful antioxidant that reduces redness and protects skin from free radical damage.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Aloe Vera (5%)</p>
                    <p className="text-foreground/70 text-sm">
                      Soothes irritation, reduces inflammation, and provides gentle healing properties.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Vitamin E (3%)</p>
                    <p className="text-foreground/70 text-sm">
                      Antioxidant that supports skin healing and protects against environmental damage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Botanical & Essential Oils</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground">Tea Tree Oil (2%)</p>
                    <p className="text-foreground/70 text-sm">
                      Natural antibacterial and antifungal properties. Excellent for acne control.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Lavender Oil (1%)</p>
                    <p className="text-foreground/70 text-sm">
                      Calming and soothing aromatics that reduce skin irritation and inflammation.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Chamomile Extract (1%)</p>
                    <p className="text-foreground/70 text-sm">
                      Anti-inflammatory and antioxidant properties help calm sensitive skin.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">100% Natural & Clean Formula</h3>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>✓ No harsh chemicals, sulfates, or parabens</li>
                  <li>✓ No synthetic fragrances (only natural essential oils)</li>
                  <li>✓ No plastic microbeads—uses natural exfoliants only</li>
                  <li>✓ Cruelty-free and vegan-friendly</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">How to Use Volcanic Mud Scrub</h2>

              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Cleanse Your Face</h3>
                    <p className="text-foreground/70">
                      Start with a clean, damp face using a gentle cleanser. Pat skin slightly damp (not dripping wet).
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Apply Scrub</h3>
                    <p className="text-foreground/70">
                      Using a wooden or plastic spatula, apply a thin to medium layer (coin-sized amount) of the scrub
                      to forehead, cheeks, nose, and chin. Avoid the eye area and lips.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Gentle Massage</h3>
                    <p className="text-foreground/70">
                      Using gentle circular motions, massage the scrub into your skin for 2-3 minutes. Don't scrub
                      aggressively. Focus on the T-zone for best results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Rinse Thoroughly</h3>
                    <p className="text-foreground/70">
                      Rinse with lukewarm water until all traces of the scrub are removed. Use a soft washcloth to help
                      if needed. Pat dry gently.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Follow Up</h3>
                    <p className="text-foreground/70">
                      Apply your regular toner, essence, serum, or moisturizer. Use SPF during the day. Your skin may
                      feel sensitive after exfoliation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Recommended Usage Schedule</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-foreground text-sm">For Normal to Oily Skin:</p>
                    <p className="text-foreground/70 text-sm">2-3 times per week for best results</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">For Sensitive or Combination Skin:</p>
                    <p className="text-foreground/70 text-sm">1-2 times per week</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">For Dry Skin:</p>
                    <p className="text-foreground/70 text-sm">Once per week (follow with extra hydration)</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Pro Tips for Best Results</h3>
                <ul className="text-foreground/80 text-sm space-y-2">
                  <li>• Use warm water to open pores before applying the scrub</li>
                  <li>• Never use more than once daily</li>
                  <li>• Expect slight redness immediately after—this is normal and fades quickly</li>
                  <li>• Avoid the scrub if you have active breakouts or open wounds</li>
                  <li>• Results improve after 4 consecutive weeks of use</li>
                  <li>• Store in a cool, dry place away from direct sunlight</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "warnings" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-foreground">Important Safety Information</h2>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Do Not Use If:</h3>
                    <ul className="text-red-800 space-y-2">
                      <li>• You have broken, irritated, or sunburned skin</li>
                      <li>• You have active acne lesions (wait for them to heal first)</li>
                      <li>• You are allergic to any listed ingredients</li>
                      <li>• You have a dermatological condition requiring treatment</li>
                      <li>• You are taking medications that increase sun sensitivity</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Precautions:</h3>
                    <ul className="text-yellow-800 space-y-2">
                      <li>• Perform a patch test 24 hours before full use</li>
                      <li>• Never scrub aggressively—apply gentle pressure only</li>
                      <li>• Use sunscreen (SPF 30+) after exfoliation</li>
                      <li>• Avoid mixing with other exfoliating products</li>
                      <li>• Do not use on face more than 3 times per week</li>
                      <li>• If redness persists beyond 1 hour, discontinue use</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Side Effects & Reactions</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-foreground mb-1">Normal Reactions (Expected):</p>
                    <ul className="text-foreground/70 text-sm space-y-1 ml-4">
                      <li>• Slight redness immediately after use (fades within 30 min)</li>
                      <li>• Mild tightness or tingling sensation</li>
                      <li>• Temporary increased oil production as skin rebalances</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">When to Stop & Consult a Doctor:</p>
                    <ul className="text-foreground/70 text-sm space-y-1 ml-4">
                      <li>• Persistent redness lasting more than 2 hours</li>
                      <li>• Burning or stinging sensation</li>
                      <li>• Swelling or hives</li>
                      <li>• Severe itching or irritation</li>
                      <li>• Any sign of allergic reaction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Ingredient Allergies</h3>
                <p className="text-foreground/70 mb-3">If you are allergic to any of these, do not use this product:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-foreground/70 text-sm space-y-1">
                    <li>• Tea tree oil</li>
                    <li>• Lavender oil</li>
                    <li>• Charcoal</li>
                    <li>• Aloe vera</li>
                  </ul>
                  <ul className="text-foreground/70 text-sm space-y-1">
                    <li>• Coconut oil</li>
                    <li>• Jojoba oil</li>
                    <li>• Green tea</li>
                    <li>• Chamomile</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Storage & Expiration</h3>
                <div className="space-y-2 text-foreground/70">
                  <p>• Store in a cool, dry place away from direct sunlight</p>
                  <p>• Keep container tightly closed when not in use</p>
                  <p>• Shelf life: 24 months from manufacturing date</p>
                  <p>• Use within 12 months of opening</p>
                  <p>• Do not refrigerate</p>
                  <p>• Keep away from heat sources and humidity</p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-2">Need Medical Advice?</h3>
                <p className="text-foreground/80 text-sm mb-3">
                  If you experience any adverse reactions or have concerns about using this product, please consult with
                  a dermatologist or medical professional. They can assess your individual skin condition and provide
                  personalized recommendations.
                </p>
                <p className="text-foreground/80 text-sm">
                  Our customer support team is also available 24/7 at cosmibeautii.ph for any product-related
                  questions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="mt-24 pt-16 border-t border-border/50">
          <h2 className="text-3xl font-bold text-foreground mb-8">Complete Your Routine</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 2, name: "Brightening Serum", price: "₱899" },
              { id: 3, name: "Hydrating Cream", price: "₱1,099" },
              { id: 4, name: "Cleansing Oil", price: "₱749" },
            ].map((prod) => (
              <div
                key={prod.id}
                className="rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition"
              >
                <div className="aspect-square bg-background flex items-center justify-center">
                  <img
                    src={`/products/${prod.name.toLowerCase().replace(/ /g, "-")}.jpg`}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{prod.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-primary font-bold">{prod.price}</p>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
