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
  GraduationCap,
  Handshake,
  Shield,
  Lock,
  TrendingUp,
  Award,
  Eye,
  UserCheck,
  MessageSquare,
} from "lucide-react"
import AuthPopup from "@/components/auth/auth-popup"
import Navbar from "@/components/layout/navbar"
import { useProfile } from "@/hooks/use-profile"
import { useLanguage } from "@/context/LanguageContext"

export default function EnhancedHome() {
  const { hasProfile, profile } = useProfile()
  const { t } = useLanguage()
  const [profilePopup, setProfilePopup] = useState<{ isOpen: boolean; redirectTo?: string }>({
    isOpen: false,
  })

  const openProfilePopup = (redirectTo?: string) => {
    setProfilePopup({ isOpen: true, redirectTo })
  }

  const closeProfilePopup = () => {
    setProfilePopup({ isOpen: false })
  }

  // Core ecosystem blocks as per feedback
  const ecosystemBlocks = [
    {
      id: 'work',
      title: t('ecosystem.work.title'),
      subtitle: t('ecosystem.work.subtitle'),
      description: t('ecosystem.work.description'),
      icon: Briefcase,
      gradient: 'from-blue-500 to-blue-700',
      href: '/marketplace?category=services',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    },
    {
      id: 'products',
      title: t('ecosystem.products.title'),
      subtitle: t('ecosystem.products.subtitle'),
      description: t('ecosystem.products.description'),
      icon: ShoppingCart,
      gradient: 'from-orange-500 to-red-600',
      href: '/marketplace',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    },
    {
      id: 'network',
      title: t('ecosystem.network.title'),
      subtitle: t('ecosystem.network.subtitle'),
      description: t('ecosystem.network.description'),
      icon: Handshake,
      gradient: 'from-green-500 to-emerald-600',
      href: '/marketplace?category=b2b',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
    {
      id: 'learn',
      title: t('ecosystem.learn.title'),
      subtitle: t('ecosystem.learn.subtitle'),
      description: t('ecosystem.learn.description'),
      icon: GraduationCap,
      gradient: 'from-purple-500 to-indigo-600',
      href: '/marketplace?category=education',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    },
  ]

  // User type selection paths for structured sign-up
  const userTypes = [
    { key: 'buyer', icon: ShoppingCart, color: 'bg-blue-500' },
    { key: 'seller', icon: Store, color: 'bg-orange-500' },
    { key: 'freelancer', icon: Users, color: 'bg-green-500' },
    { key: 'client', icon: Briefcase, color: 'bg-purple-500' },
  ]

  // Trust indicators for professional appearance
  const trustIndicators = [
    { label: t('trust.sslSecured'), icon: Lock },
    { label: t('trust.verified'), icon: Shield },
    { label: '10K+ Users', icon: Users },
    { label: '50+ Countries', icon: Globe },
  ]

  // Featured products with vendor verification badges
  const featuredProducts = [
    {
      id: 1,
      name: "Handwoven Kente Cloth",
      price: "R450",
      originalPrice: "R600",
      image: "https://images.pexels.com/photos/6850751/pexels-photo-6850751.jpeg",
      vendor: "Akosua Textiles",
      location: "Ghana",
      rating: 4.8,
      reviews: 124,
      category: "Fashion",
      trustLevel: "elite", // elite, pro, basic
      badge: t('trust.trustedVendor'),
    },
    {
      id: 2,
      name: "Organic Argan Oil",
      price: "R280",
      originalPrice: "R350",
      image: "https://images.pexels.com/photos/10110225/pexels-photo-10110225.jpeg",
      vendor: "Atlas Beauty",
      location: "Morocco",
      rating: 4.9,
      reviews: 89,
      category: "Beauty",
      trustLevel: "pro",
      badge: t('trust.verifiedSeller'),
    },
    {
      id: 3,
      name: "Maasai Beaded Jewelry",
      price: "R320",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
      vendor: "Nairobi Crafts",
      location: "Kenya",
      rating: 4.7,
      reviews: 156,
      category: "Jewelry",
      trustLevel: "basic",
      badge: t('trust.verifiedUser'),
    },
  ]

  const getTrustBadgeColor = (level: string) => {
    switch (level) {
      case 'elite': return 'bg-blue-500 text-white'
      case 'pro': return 'bg-green-500 text-white'
      case 'basic': return 'bg-yellow-500 text-black'
      default: return 'bg-gray-500 text-white'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Enhanced Hero Section with Clear Mission Statement */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-orange-500/5 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            {/* Trust indicators banner */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 p-4 bg-black/30 rounded-2xl backdrop-blur-sm border border-orange-500/20">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 text-orange-400">
                  <indicator.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{indicator.label}</span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-medium mb-8 border border-orange-500/20">
              <Globe className="w-4 h-4 mr-2" />
              {t('hero.connecting')}
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-2xl sm:text-3xl text-orange-500 font-bold mb-6">
              {t('hero.subtitle')}
            </p>

            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() =>
                  hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace")
                }
                className="group bg-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-400 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                {t('hero.shopNow')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openProfilePopup("/dashboard")}
                className="group border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-500 hover:text-black transition-all flex items-center"
              >
                <Store className="mr-2 w-5 h-5" />
                {t('hero.sellWithUs')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Ecosystem Blocks - 4 Main Areas */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path in the Zantra Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four interconnected marketplaces designed to empower African entrepreneurship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecosystemBlocks.map((block, index) => (
              <Link
                key={block.id}
                href={block.href}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Background image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${block.gradient} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                </div>

                {/* Content overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <block.icon className="w-8 h-8 mb-2" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{block.title}</h3>
                  <p className="text-lg font-medium mb-2 opacity-90">{block.subtitle}</p>
                  <p className="text-sm opacity-80 leading-relaxed">{block.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm font-medium">
                    <span>Explore Now</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* User Type Selection for Structured Sign-up */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Join as Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your path and get a customized experience tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {userTypes.map((type, index) => (
              <button
                key={type.key}
                onClick={() => openProfilePopup(`/register?role=${type.key}`)}
                className="group p-8 rounded-2xl border-2 border-gray-200 hover:border-orange-500 transition-all duration-200 text-center hover:shadow-lg transform hover:scale-105"
              >
                <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`userTypes.${type.key}`)}</h3>
                <div className="w-8 h-1 bg-orange-500 mx-auto opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with Trust Badges */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('products.featured')}
            </h2>
            <p className="text-xl text-gray-600">
              Authentic products from verified vendors across Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Trust badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${getTrustBadgeColor(product.trustLevel)} flex items-center`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {product.badge}
                  </div>

                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-orange-500 font-medium">{product.category}</span>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {product.location}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      by <span className="font-medium text-gray-900">{product.vendor}</span>
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors flex items-center">
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      {t('products.addToCart')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/marketplace"
              className="inline-flex items-center bg-black text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-gray-800 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Trust Indicators */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">10K+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">5K+</div>
              <div className="text-gray-300">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-300">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">98%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Join Africa's Premier Digital Marketplace?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your journey today and connect with thousands of buyers, sellers, and professionals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openProfilePopup()}
              className="bg-white text-orange-500 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <UserCheck className="mr-2 w-5 h-5" />
              {t('hero.getStarted')}
            </button>
            <Link
              href="/marketplace"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-orange-500 transition-colors flex items-center justify-center"
            >
              <Eye className="mr-2 w-5 h-5" />
              {t('hero.exploreMarketplace')}
            </Link>
          </div>
        </div>
      </section>

      {/* Auth Popup */}
      <AuthPopup
        isOpen={profilePopup.isOpen}
        onClose={closeProfilePopup}
        redirectTo={profilePopup.redirectTo}
      />
    </div>
  )
}
