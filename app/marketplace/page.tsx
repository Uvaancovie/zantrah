"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import { Search, Filter, Star, MapPin, Heart, MessageCircle, Phone, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  vendor: {
    name: string
    location: string
    email: string
    phone: string
    trustLevel?: "basic" | "pro" | "elite"
    trustBadge?: {
      label: string
      icon: string
      color: string
    }
  }
  rating: number
  reviews: number
  category: string
  description: string
}

export default function MarketplacePage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const categories = ["all", "Fashion", "Beauty", "Jewelry", "Food", "Electronics", "Home & Garden", "Art & Crafts"]

  const products: Product[] = [
    {
      id: 1,
      name: "Handwoven Kente Cloth",
      price: "R450",
      originalPrice: "R600",
      image: "https://images.unsplash.com/photo-1594736797933-d0fccafcce89?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Akosua Textiles",
        location: "Accra, Ghana",
        email: "info@akosua-textiles.com",
        phone: "+233 24 123 4567",
        trustLevel: "elite",
        trustBadge: {
          label: "Trusted Vendor",
          icon: "🔵",
          color: "blue",
        },
      },
      rating: 4.8,
      reviews: 124,
      category: "Fashion",
      description:
        "Authentic handwoven Kente cloth made by skilled artisans in Ghana. Perfect for special occasions and cultural celebrations.",
    },
    {
      id: 2,
      name: "Organic Argan Oil",
      price: "R280",
      originalPrice: "R350",
      image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Atlas Beauty",
        location: "Marrakech, Morocco",
        email: "contact@atlasbeauty.ma",
        phone: "+212 661 234 567",
        trustLevel: "pro",
        trustBadge: {
          label: "Verified Seller",
          icon: "🟢",
          color: "green",
        },
      },
      rating: 4.9,
      reviews: 89,
      category: "Beauty",
      description:
        "Pure organic argan oil sourced directly from Moroccan cooperatives. Rich in vitamins and perfect for skin and hair care.",
    },
    {
      id: 3,
      name: "Maasai Beaded Jewelry",
      price: "R320",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Nairobi Crafts",
        location: "Nairobi, Kenya",
        email: "orders@nairobicrafts.ke",
        phone: "+254 722 345 678",
        trustLevel: "basic",
        trustBadge: {
          label: "Verified User",
          icon: "🟡",
          color: "yellow",
        },
      },
      rating: 4.7,
      reviews: 156,
      category: "Jewelry",
      description:
        "Traditional Maasai beaded jewelry handcrafted by local artisans. Each piece tells a story and supports community development.",
    },
    {
      id: 4,
      name: "Ethiopian Coffee Beans",
      price: "R180",
      originalPrice: "R220",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Highland Roasters",
        location: "Addis Ababa, Ethiopia",
        email: "hello@highlandroasters.et",
        phone: "+251 911 234 567",
        trustLevel: "pro",
        trustBadge: {
          label: "Verified Seller",
          icon: "🟢",
          color: "green",
        },
      },
      rating: 4.9,
      reviews: 203,
      category: "Food",
      description:
        "Premium Ethiopian coffee beans from the birthplace of coffee. Single-origin, fair-trade, and freshly roasted to perfection.",
    },
    {
      id: 5,
      name: "Baobab Skincare Set",
      price: "R520",
      originalPrice: "R680",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Savanna Naturals",
        location: "Cape Town, South Africa",
        email: "info@savannanaturals.co.za",
        phone: "+27 82 345 6789",
        trustLevel: "elite",
        trustBadge: {
          label: "Trusted Vendor",
          icon: "🔵",
          color: "blue",
        },
      },
      rating: 4.6,
      reviews: 78,
      category: "Beauty",
      description:
        "Complete skincare set featuring baobab oil and other indigenous African botanicals. Nourishing and rejuvenating for all skin types.",
    },
    {
      id: 6,
      name: "Ankara Print Dress",
      price: "R380",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Lagos Fashion",
        location: "Lagos, Nigeria",
        email: "style@lagosfashion.ng",
        phone: "+234 803 456 7890",
        trustLevel: "basic",
        trustBadge: {
          label: "Verified User",
          icon: "🟡",
          color: "yellow",
        },
      },
      rating: 4.8,
      reviews: 92,
      category: "Fashion",
      description:
        "Vibrant Ankara print dress designed by Nigerian fashion designers. Modern cut with traditional African patterns.",
    },
    {
      id: 7,
      name: "Moroccan Tagine Pot",
      price: "R450",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Fez Pottery",
        location: "Fez, Morocco",
        email: "orders@fezpottery.ma",
        phone: "+212 535 123 456",
        trustLevel: "pro",
        trustBadge: {
          label: "Verified Seller",
          icon: "🟢",
          color: "green",
        },
      },
      rating: 4.7,
      reviews: 67,
      category: "Home & Garden",
      description:
        "Authentic handcrafted tagine pot from Fez. Perfect for cooking traditional Moroccan dishes and adding style to your kitchen.",
    },
    {
      id: 8,
      name: "Shea Butter Soap",
      price: "R85",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center",
      vendor: {
        name: "Burkina Naturals",
        location: "Ouagadougou, Burkina Faso",
        email: "contact@burkinanaturals.bf",
        phone: "+226 70 123 456",
        trustLevel: "basic",
        trustBadge: {
          label: "Verified User",
          icon: "🟡",
          color: "yellow",
        },
      },
      rating: 4.5,
      reviews: 234,
      category: "Beauty",
      description:
        "Natural shea butter soap made from pure African shea butter. Moisturizing and gentle for sensitive skin.",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleContactVendor = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending message
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedProduct?.vendor.name}`,
      variant: "default",
    })
    setSelectedProduct(null)
    setContactForm({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Zantra Marketplace</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover authentic products from verified vendors across Africa and the Middle East
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products or vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&crop=center"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-black px-2 py-1 rounded-lg text-xs font-bold">
                      SALE
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{product.category}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Trust Badge */}
                  {product.vendor.trustBadge && (
                    <div className={`flex items-center mb-2 px-2 py-1 rounded-full text-xs font-medium bg-${product.vendor.trustBadge.color}-100 text-${product.vendor.trustBadge.color}-600 border border-${product.vendor.trustBadge.color}-200 w-fit`}>
                      <span className="mr-1">{product.vendor.trustBadge.icon}</span>
                      {product.vendor.trustBadge.label}
                    </div>
                  )}

                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.vendor.name} • {product.vendor.location}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-400 transition-colors flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                    <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg text-sm font-bold hover:bg-orange-500 hover:text-black transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Vendor Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Vendor</h3>
              <p className="text-gray-600">Get in touch with {selectedProduct.vendor.name}</p>
              
              {/* Trust Badge in Modal */}
              {selectedProduct.vendor.trustBadge && (
                <div className={`inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium bg-${selectedProduct.vendor.trustBadge.color}-100 text-${selectedProduct.vendor.trustBadge.color}-600 border border-${selectedProduct.vendor.trustBadge.color}-200`}>
                  <span className="mr-1">{selectedProduct.vendor.trustBadge.icon}</span>
                  {selectedProduct.vendor.trustBadge.label}
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-bold text-gray-900 mb-2">{selectedProduct.name}</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {selectedProduct.vendor.location}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {selectedProduct.vendor.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {selectedProduct.vendor.email}
                </div>
              </div>
            </div>

            <form onSubmit={handleContactVendor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Hi, I'm interested in your product..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-black px-4 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
