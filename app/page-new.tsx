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
  Shield,
  Lock,
  GraduationCap,
  Handshake,
  Eye,
  UserCheck,
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

  // Core ecosystem blocks as per feedback
  const ecosystemBlocks = [
    {
      id: 'work',
      title: 'Work 💼',
      subtitle: 'Hire Freelancers',
      description: 'Find skilled professionals for your projects across Africa and the Middle East',
      icon: Briefcase,
      gradient: 'from-blue-500 to-blue-700',
      href: '/marketplace?category=services',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    },
    {
      id: 'products',
      title: 'Products 🛍️',
      subtitle: 'Shop Amazing Items',
      description: 'Discover authentic African products from verified vendors',
      icon: ShoppingCart,
      gradient: 'from-orange-500 to-red-600',
      href: '/marketplace',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    },
    {
      id: 'network',
      title: 'Network 🤝',
      subtitle: 'Business Connections',
      description: 'Connect with traders, distributors, and business partners',
      icon: Handshake,
      gradient: 'from-green-500 to-emerald-600',
      href: '/marketplace?category=b2b',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    },
    {
      id: 'learn',
      title: 'Learn 🎓',
      subtitle: 'Grow Your Skills',
      description: 'Access micro-courses and educational content',
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
    { label: 'SSL Secured', icon: Lock },
    { label: 'Verified', icon: Shield },
    { label: '10K+ Users', icon: Users },
    { label: '50+ Countries', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Enhanced Hero Section with Clear Mission Statement */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
              Connecting Africa & the Middle East
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Africa's Premier Digital Marketplace
            </h1>

            <p className="text-2xl sm:text-3xl text-orange-500 font-bold mb-6">
              Buy. Sell. Hire. Learn. The Digital Marketplace for Africa.
            </p>

            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              From handcrafted textiles to organic beauty products - shop authentic items from verified vendors across Africa and the Middle East.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() =>
                  hasProfile ? (window.location.href = "/marketplace") : openProfilePopup("/marketplace")
                }
                className="group bg-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-400 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCart className="mr-2 w-5 h-5" />
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => openProfilePopup("/dashboard")}
                className="group border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-xl text-lg font-bold hover:bg-orange-500 hover:text-black transition-all flex items-center"
              >
                <Store className="mr-2 w-5 h-5" />
                Start Selling
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
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${block.gradient} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                </div>

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
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {type.key.charAt(0).toUpperCase() + type.key.slice(1)}
                </h3>
                <div className="w-8 h-1 bg-orange-500 mx-auto opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            ))}
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
              Get Started
            </button>
            <Link
              href="/marketplace"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-orange-500 transition-colors flex items-center justify-center"
            >
              <Eye className="mr-2 w-5 h-5" />
              Explore Marketplace
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
