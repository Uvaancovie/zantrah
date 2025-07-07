"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ShoppingCart,
  Store,
  Users,
  Briefcase,
  MapPin,
  CheckCircle,
  Globe,
  Truck,
  CreditCard,
  Star,
  Heart,
} from "lucide-react"
import AuthPopup from "@/components/auth/auth-popup"
import Navbar from "@/components/layout/navbar"
import { useProfile } from "@/hooks/use-profile"

export default function Home() {
  const { hasProfile, profile } = useProfile()
  const [profilePopup, setProfilePopup] = useState<{ isOpen: boolean; redirectTo?: string }>({
    isOpen: false,
  })

  const openProfilePopup = (redirectTo?: string) => {
    setProfilePopup({ isOpen: true, redirectTo })
  }

  const closeProfilePopup = () => {
    setProfilePopup({ isOpen: false })
  }

  // Mock product data
  const featuredProducts = [
    {
      id: 1,
      name: "Handwoven Kente Cloth",
      price: "R450",
      originalPrice: "R600",
      image: "/placeholder.svg?height=300&width=300",
      vendor: "Akosua Textiles",
      location: "Ghana",
      rating: 4.8,
      reviews: 124,
      category: "Fashion",
    },
    {
      id: 2,
      name: "Organic Argan Oil",
      price: "R280",
      originalPrice: "R350",
      image: "/placeholder.svg?height=300&width=300",
      vendor: "Atlas Beauty",
      location: "Morocco",
      rating: 4.9,
      reviews: 89,
      category: "Beauty",
    },
    {
      id: 3,
      name: "Maasai Beaded Jewelry",
      price: "R320",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      vendor: "Nairobi Crafts",
      location: "Kenya",
      rating: 4.7,
      reviews: 156,
      category: "Jewelry",
    },
    {
      id: 4,
      name: "Ethiopian Coffee Beans",
      price: "R180",
      originalPrice: "R220",
      image: "/placeholder.svg?height=300&width=300",
      vendor: "Highland Roasters",
      location: "Ethiopia",
      rating: 4.9,
      reviews: 203,
      category: "Food",
    },
    {
      id: 5,
      name: "Baobab Skincare Set",
      price: "R520",
      originalPrice: "R680",
      image: "/placeholder.svg?height=300&width=300",
      vendor: "Savanna Naturals",
      location: "South Africa",
      rating: 4.6,
      reviews: 78,
      category: "Beauty",
    },
    {
      id: 6,
      name: "Ankara Print Dress",
      price: "R380",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      vendor: "Lagos Fashion",
      location: "Nigeria",
      rating: 4.8,
      reviews: 92,
      category: "Fashion",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Featured Products */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium mb-8 border border-orange-500/20">
              <Globe className="w-4 h-4 mr-2" />
              Connecting Africa & the Middle East
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Amazing
              <span className="block text-orange-500">African Products</span>
            </h1>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              From handcrafted textiles to organic beauty products - shop authentic items from verified vendors across
              Africa and the Middle East.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() =>
                  hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace")
                }
                className="group bg-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-400 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openProfilePopup()}
                className="group border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-500 hover:text-black transition-all"
              >
                <Store className="mr-2 w-5 h-5" />
                Start Selling
              </button>
            </div>
          </div>

          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() =>
                  hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace")
                }
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
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

                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.vendor} • {product.location}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-400 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Products */}
          <div className="text-center">
            <button
              onClick={() => (hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace"))}
              className="inline-flex items-center bg-white text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Countries Served */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto text-center mt-16">
            {["Nigeria", "Kenya", "Angola", "Cape Verde", "Ghana", "Morocco", "Egypt", "UAE"].map((country, index) => (
              <div key={index} className="text-gray-400 text-sm font-medium">
                {country}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Options */}
      <section id="business" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're shopping, selling, or seeking opportunities - we've got you covered.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Zantra Commerce */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-orange-500/50 transition-all">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Zantra Commerce</h3>
              <p className="text-gray-600 mb-6">
                Discover amazing products from across Africa and the Middle East. Shop with confidence and get your
                items delivered.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Browse thousands of products
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Secure payment processing
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Delivery & pickup options
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Order tracking & receipts
                </li>
              </ul>
              <button
                onClick={() =>
                  hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace")
                }
                className="w-full bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors"
              >
                {hasProfile ? "Go to Marketplace" : "Sign In to Shop"}
              </button>
            </div>

            {/* Zantra Business */}
            <div className="bg-black p-8 rounded-2xl shadow-lg border-2 border-orange-500">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Store className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Zantra Business</h3>
              <p className="text-gray-300 mb-6">
                Grow your business with our comprehensive seller platform. From small vendors to large enterprises.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Multiple seller tiers
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Payment integration
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Logistics support
                </li>
              </ul>
              <button
                onClick={() => openProfilePopup()}
                className="w-full bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors"
              >
                Start Selling
              </button>
            </div>
          </div>

          {/* Business Tiers */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Small Business */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-black mb-2">Small Business</h4>
                <div className="text-3xl font-bold text-orange-500 mb-1">R29.99</div>
                <div className="text-gray-600 text-sm">per month</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Product listings with images
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Basic payment processing
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Customer communication
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Order management
                </li>
              </ul>
              <button
                onClick={() => openProfilePopup()}
                className="w-full border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-bold hover:bg-orange-500 hover:text-black transition-colors"
              >
                Choose Plan
              </button>
            </div>

            {/* Entrepreneur */}
            <div className="bg-orange-500 p-6 rounded-xl shadow-lg border-2 border-orange-600 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-orange-500 px-3 py-1 rounded-full text-xs font-bold">POPULAR</span>
              </div>
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-black mb-2">Entrepreneur</h4>
                <div className="text-3xl font-bold text-black mb-1">R69.99</div>
                <div className="text-black/70 text-sm">per month</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-sm text-black">
                  <CheckCircle className="w-4 h-4 text-black mr-2 mt-0.5 flex-shrink-0" />
                  Everything in Small Business
                </li>
                <li className="flex items-start text-sm text-black">
                  <CheckCircle className="w-4 h-4 text-black mr-2 mt-0.5 flex-shrink-0" />
                  Advanced analytics & insights
                </li>
                <li className="flex items-start text-sm text-black">
                  <CheckCircle className="w-4 h-4 text-black mr-2 mt-0.5 flex-shrink-0" />
                  Portfolio & case studies
                </li>
                <li className="flex items-start text-sm text-black">
                  <CheckCircle className="w-4 h-4 text-black mr-2 mt-0.5 flex-shrink-0" />
                  Logistics API integration
                </li>
              </ul>
              <button
                onClick={() => openProfilePopup()}
                className="w-full bg-black text-orange-500 px-4 py-2 rounded-lg font-bold hover:bg-gray-900 transition-colors"
              >
                Choose Plan
              </button>
            </div>

            {/* Student/Freelancer */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-black mb-2">Student/Freelancer</h4>
                <div className="text-3xl font-bold text-orange-500 mb-1">FREE</div>
                <div className="text-gray-600 text-sm">forever</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Student profile creation
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Project portfolio
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Job applications
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Apprenticeship matching
                </li>
              </ul>
              <button
                onClick={() => openProfilePopup()}
                className="w-full border-2 border-orange-500 text-orange-500 px-4 py-2 rounded-lg font-bold hover:bg-orange-500 hover:text-black transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">African Talent Hub</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connecting African corporations with talented students and professionals across the continent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-orange-500/20">
              <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Students & Professionals</h3>
              <p className="text-gray-300 mb-6">
                Showcase your skills, find apprenticeships, and connect with leading African corporations.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Create professional profiles
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Upload project portfolios
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Apply for positions
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-orange-500 mr-3" />
                  Find mentorship opportunities
                </li>
              </ul>
              <button
                onClick={() => openProfilePopup()}
                className="w-full bg-orange-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-orange-400 transition-colors"
              >
                Join as Student
              </button>
            </div>

            <div className="bg-orange-500 p-8 rounded-xl">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">For African Corporations</h3>
              <p className="text-black/80 mb-6">
                Find the best talent across Africa. Post jobs, review applications, and build your team.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-black">
                  <CheckCircle className="w-5 h-5 text-black mr-3" />
                  Post job opportunities
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle className="w-5 h-5 text-black mr-3" />
                  Search student database
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle className="w-5 h-5 text-black mr-3" />
                  Review applications & CVs
                </li>
                <li className="flex items-center text-black">
                  <CheckCircle className="w-5 h-5 text-black mr-3" />
                  Junior positions for free
                </li>
              </ul>
              <button
                onClick={() => openProfilePopup()}
                className="w-full bg-black text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors"
              >
                Post Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Why Choose Zantra?</h2>
            <p className="text-xl text-gray-600">Built specifically for the African and Middle Eastern markets</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Local Focus</h3>
              <p className="text-gray-600">
                Designed specifically for African and Middle Eastern markets with local payment methods and logistics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Smart Logistics</h3>
              <p className="text-gray-600">
                Integrated delivery solutions with local logistics partners across all supported countries.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple payment options including mobile money, bank transfers, and international payment gateways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Join Africa's Digital Revolution?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Whether you're buying, selling, or seeking opportunities - your journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openProfilePopup()}
              className="bg-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-400 transition-all shadow-lg"
            >
              Get Started Today
            </button>
            <button
              onClick={() => (hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace"))}
              className="border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-500 hover:text-black transition-all"
            >
              Explore Marketplace
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 border-t border-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="text-2xl font-bold text-orange-500 mb-4">Zantra</div>
              <p className="text-gray-400 mb-6 max-w-md">
                Africa's premier digital marketplace connecting buyers, sellers, and talent across the continent and
                Middle East.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold text-sm">ZA</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-orange-500">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() =>
                      hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace")
                    }
                    className="hover:text-white transition-colors"
                  >
                    Marketplace
                  </button>
                </li>
                <li>
                  <Link href="#business" className="hover:text-white transition-colors">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="#jobs" className="hover:text-white transition-colors">
                    Jobs
                  </Link>
                </li>
                <li>
                  <button onClick={() => openProfilePopup()} className="hover:text-white transition-colors">
                    Students
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-orange-500">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">© 2024 Zantra. Empowering Africa's Digital Future.</p>
          </div>
        </div>
      </footer>

      {/* Profile Popup */}
      <AuthPopup isOpen={profilePopup.isOpen} onClose={closeProfilePopup} redirectTo={profilePopup.redirectTo} />
    </div>
  )
}
