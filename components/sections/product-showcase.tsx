"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Volcanic Mud Scrub",
    price: 1299,
    priceDisplay: "₱1,299",
    image: "/products/volcanic-mud-scrub.jpg",
    category: "treatments",
    featured: true,
    description: "Deep purifying exfoliant with natural volcanic clay",
    link: "/products/volcanic-scrub",
  },
  {
    id: 2,
    name: "Brightening Serum",
    price: 899,
    priceDisplay: "₱899",
    image: "/products/brightening-serum.jpg",
    category: "treatments",
    featured: false,
    description: "Vitamin C complex for radiant glow",
    link: "/products/brightening-serum",
  },
  {
    id: 3,
    name: "Hydrating Cream",
    price: 1099,
    priceDisplay: "₱1,099",
    image: "/products/hydrating-cream.jpg",
    category: "moisturizers",
    featured: false,
    description: "Deep moisture lock for tropical skin",
    link: "/products/hydrating-cream",
  },
  {
    id: 4,
    name: "Cleansing Oil",
    price: 749,
    priceDisplay: "₱749",
    image: "/products/cleansing-oil.jpg",
    category: "cleansers",
    featured: false,
    description: "Gentle oil cleanser removes makeup and impurities",
    link: "/products/cleansing-oil",
  },
  {
    id: 5,
    name: "Toner",
    price: 599,
    priceDisplay: "₱599",
    image: "/products/toner.jpg",
    category: "cleansers",
    featured: false,
    description: "Balancing toner for pH equilibrium",
    link: "/products/toner",
  },
]

export function ProductShowcase() {
  const [activeFilter, setActiveFilter] = useState("all")
  const { addToCart } = useCart()

  const filters = [
    { id: "all", label: "All" },
    { id: "cleansers", label: "Cleansers" },
    { id: "treatments", label: "Treatments" },
    { id: "moisturizers", label: "Moisturizers" },
  ]

  const filteredProducts = activeFilter === "all" ? products : products.filter((p) => p.category === activeFilter)

  const featuredProduct = products.find((p) => p.featured)
  const otherProducts = filteredProducts.filter((p) => !p.featured)

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <section id="products" className="py-16 sm:py-24 bg-card px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Skincare <span className="text-primary">Collection</span>
          </h2>
          <p className="text-lg text-foreground/70">Curated for Filipino skin concerns</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`${
                activeFilter === filter.id
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-primary/30 text-foreground hover:border-primary bg-transparent"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Featured Product */}
        {activeFilter === "all" && (
          <div className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-lg overflow-hidden bg-background aspect-square flex items-center justify-center border border-border/50">
                <img
                  src={featuredProduct?.image || "/placeholder.svg?height=400&width=400&query=volcanic-mud-scrub"}
                  alt={featuredProduct?.name || "Featured Product"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
                  Our Hero Product
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{featuredProduct?.name}</h3>
                <p className="text-foreground/70 text-lg mb-6">{featuredProduct?.description}</p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-2xl">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Natural Volcanic Clay</p>
                      <p className="text-foreground/70">From local Philippine volcanoes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-2xl">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Dermatologist Tested</p>
                      <p className="text-foreground/70">Safe for all skin types</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold text-2xl">✓</span>
                    <div>
                      <p className="font-semibold text-foreground">Visible Results</p>
                      <p className="text-foreground/70">Clearer pores in 4 weeks</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                  <Button
                    onClick={() => handleAddToCart(featuredProduct!)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Link href={featuredProduct?.link || "#"}>
                    <Button
                      variant="outline"
                      className="border-primary/30 text-foreground h-12 px-8 bg-transparent w-full sm:w-auto"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>

                <p className="text-2xl font-bold text-primary mt-8">{featuredProduct?.priceDisplay}</p>
              </div>
            </div>
          </div>
        )}

        {/* Other Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeFilter === "all" ? otherProducts : filteredProducts).map((product) => (
            <div
              key={product.id}
              className="group rounded-lg overflow-hidden bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden bg-card flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg?height=300&width=300&query=" + product.name}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">{product.name}</h4>
                <p className="text-foreground/70 text-sm mb-4">{product.description}</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xl font-bold text-primary">{product.priceDisplay}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      title="Add to cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    <Link href={product.link}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary/30 text-foreground hover:border-primary bg-transparent"
                        title="View product details"
                      >
                        →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
