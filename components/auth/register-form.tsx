"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { ArrowRight, User, Store, Briefcase, GraduationCap, Shield, Lock, Eye, EyeOff, Check, X, Users, UserCheck } from "lucide-react"

type UserRole = "buyer" | "seller" | "freelancer" | "client" | "producer" | "distributor" | "learner" | "educator" | "student" | "corporation"

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [step, setStep] = useState(1) // 1: Role selection, 2: Form details
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    businessName: "",
    businessType: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Check URL params for role
  useEffect(() => {
    const roleParam = searchParams.get('role') as UserRole
    if (roleParam && ['buyer', 'seller', 'freelancer', 'client', 'producer', 'distributor', 'learner', 'educator'].includes(roleParam)) {
      setSelectedRole(roleParam)
      setStep(2)
    }
  }, [searchParams])

  const roles = [
    {
      id: "buyer" as UserRole,
      title: "Buyer",
      description: "Shop amazing products from across Africa",
      icon: User,
      color: "blue",
      badge: "🛍️ Shop",
    },
    {
      id: "seller" as UserRole,
      title: "Seller",
      description: "Sell your products to customers worldwide",
      icon: Store,
      color: "orange",
      badge: "💼 Sell",
    },
    {
      id: "freelancer" as UserRole,
      title: "Freelancer",
      description: "Offer your skills and services",
      icon: UserCheck,
      color: "green",
      badge: "💻 Work",
    },
    {
      id: "client" as UserRole,
      title: "Client",
      description: "Hire talented professionals for projects",
      icon: Briefcase,
      color: "purple",
      badge: "🤝 Hire",
    },
    {
      id: "producer" as UserRole,
      title: "Producer",
      description: "Manufacture and distribute products",
      icon: Store,
      color: "indigo",
      badge: "🏭 Produce",
    },
    {
      id: "distributor" as UserRole,
      title: "Distributor",
      description: "Connect producers with retailers",
      icon: Briefcase,
      color: "teal",
      badge: "🚚 Distribute",
    },
    {
      id: "learner" as UserRole,
      title: "Learner",
      description: "Access courses and skill development",
      icon: GraduationCap,
      color: "pink",
      badge: "🎓 Learn",
    },
    {
      id: "educator" as UserRole,
      title: "Educator",
      description: "Teach and create educational content",
      icon: GraduationCap,
      color: "yellow",
      badge: "📚 Teach",
    },
    {
      id: "student" as UserRole,
      title: "Student/Freelancer",
      description: "Find jobs and apprenticeships - Free",
      icon: GraduationCap,
      color: "orange",
      badge: "🧠 Learn",
    },
    {
      id: "corporation" as UserRole,
      title: "Corporation",
      description: "Post jobs and find talent",
      icon: Briefcase,
      color: "orange",
      badge: "🏢 Hire",
    }
  ]

  const countries = [
    "Nigeria",
    "Kenya",
    "Angola",
    "Cape Verde",
    "Ghana",
    "Morocco",
    "Egypt",
    "UAE",
    "Saudi Arabia",
    "Qatar",
    "Kuwait",
    "Oman",
  ]

  const createUserProfile = async (userId: string) => {
    const { data: profileData, error } = await supabase
      .from("user_profiles")
      .insert({
        user_id: userId,
        first_name: formData.firstName,
        last_name: formData.lastName,
        country: formData.country,
        phone: formData.phone,
        role: selectedRole,
      })
      .select()

    if (error) {
      console.error("Manual profile creation error:", JSON.stringify(error))
      throw new Error(error.message || "Failed to create user profile")
    }
    return profileData
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match")
      }

      // Validate required fields
      if (!selectedRole) {
        throw new Error("Please select an account type")
      }

      if (!formData.firstName || !formData.lastName || !formData.country || !formData.phone) {
        throw new Error("Please fill in all required fields")
      }

      console.log("Starting registration process...")

      // Create user account with metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            country: formData.country,
            phone: formData.phone,
            role: selectedRole,
          },
        },
      })

      if (authError) {
        console.error("Auth error:", authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error("Failed to create user account")
      }

      console.log("User created successfully:", authData.user.id)

      // Wait for trigger to potentially create profile
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Check if profile was created by trigger
      const { data: existingProfile, error: checkError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", authData.user.id)
        .single()

      if (checkError && checkError.code === "PGRST116") {
        // Profile doesn't exist, create it manually
        console.log("Creating profile manually...")
        await createUserProfile(authData.user.id)
      } else if (checkError) {
        console.error("Error checking profile:", checkError)
        // Try to create profile anyway
        try {
          await createUserProfile(authData.user.id)
        } catch (createError) {
          console.error("Failed to create profile manually:", createError)
          // Continue anyway - user is created
        }
      } else {
        console.log("Profile created successfully by trigger")
      }

      console.log("Registration completed successfully")

      // Redirect based on role
      if (selectedRole === "buyer") {
        router.push("/marketplace")
      } else {
        router.push(`/verification-welcome?role=${selectedRole}&email=${formData.email}`)
      }
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-orange-500">
            Zantra
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">Join Africa's premier digital marketplace</p>
        </div>

        {!selectedRole ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white text-center mb-6">Choose your account type</h3>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className="w-full p-4 border-2 border-gray-700 rounded-lg hover:border-orange-500 transition-colors text-left group"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                    <role.icon className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-orange-500 transition-colors">
                      {role.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{role.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              {(() => {
                const currentRole = roles.find((r) => r.id === selectedRole)
                const CurrentIcon = currentRole?.icon

                return (
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                      {CurrentIcon ? <CurrentIcon className="w-4 h-4 text-black" /> : null}
                    </div>
                    <span className="text-white font-medium">{currentRole?.title}</span>
                  </div>
                )
              })()}
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="text-orange-500 text-sm hover:text-orange-400"
              >
                Change
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-300">
                Country *
              </label>
              <select
                id="country"
                name="country"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-400 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
