"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { ArrowRight, User, Store, Briefcase, GraduationCap } from "lucide-react"

type UserRole = "customer" | "small_business" | "entrepreneur" | "student" | "corporation"

interface RegisterPopupFormProps {
  onSuccess: () => void
  onError: (error: string) => void
}

export default function RegisterPopupForm({ onSuccess, onError }: RegisterPopupFormProps) {
  const [step, setStep] = useState<"role" | "form">("role")
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const roles = [
    {
      id: "customer" as UserRole,
      title: "Customer",
      description: "Shop products from across Africa",
      icon: User,
    },
    {
      id: "small_business" as UserRole,
      title: "Small Business",
      description: "Sell products online - R29.99/month",
      icon: Store,
    },
    {
      id: "entrepreneur" as UserRole,
      title: "Entrepreneur",
      description: "Advanced business features - R69.99/month",
      icon: Briefcase,
    },
    {
      id: "student" as UserRole,
      title: "Student/Freelancer",
      description: "Find jobs and apprenticeships - Free",
      icon: GraduationCap,
    },
    {
      id: "corporation" as UserRole,
      title: "Corporation",
      description: "Post jobs and find talent",
      icon: Briefcase,
    },
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
    "South Africa",
  ]

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep("form")
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) throw new Error("First name is required")
    if (!formData.lastName.trim()) throw new Error("Last name is required")
    if (!formData.email.trim()) throw new Error("Email is required")
    if (!formData.country) throw new Error("Country is required")
    if (!formData.phone.trim()) throw new Error("Phone number is required")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      validateForm()

      console.log("Creating user profile...")

      // Create user profile directly without authentication
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          country: formData.country,
          phone: formData.phone,
          role: selectedRole,
          email: formData.email,
        })
        .select()
        .single()

      if (profileError) {
        console.error("Profile creation error:", profileError)
        throw new Error("Failed to create profile")
      }

      console.log("Profile created successfully:", profileData.id)

      // Store profile ID in localStorage for session management
      localStorage.setItem("zantra_profile_id", profileData.id)
      localStorage.setItem(
        "zantra_user_data",
        JSON.stringify({
          id: profileData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          role: selectedRole,
          country: formData.country,
        }),
      )

      onSuccess()

      // Small delay to show success message
      setTimeout(() => {
        // Redirect based on role
        if (selectedRole === "customer") {
          router.push("/marketplace")
        } else {
          router.push(`/verification-welcome?role=${selectedRole}&email=${formData.email}&profile_id=${profileData.id}`)
        }
      }, 1000)
    } catch (err: any) {
      console.error("Registration error:", err)
      onError(err.message || "An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "role") {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white text-center mb-4">Choose your account type</h3>
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            className="w-full p-3 border-2 border-gray-700 rounded-lg hover:border-orange-500 transition-colors text-left group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                <role.icon className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-medium group-hover:text-orange-500 transition-colors text-sm">
                  {role.title}
                </h4>
                <p className="text-gray-400 text-xs">{role.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center mr-2">
            {(() => {
              const currentRole = roles.find((r) => r.id === selectedRole)
              const CurrentIcon = currentRole?.icon
              return CurrentIcon ? <CurrentIcon className="w-3 h-3 text-black" /> : null
            })()}
          </div>
          <span className="text-white font-medium text-sm">{roles.find((r) => r.id === selectedRole)?.title}</span>
        </div>
        <button type="button" onClick={() => setStep("role")} className="text-orange-500 text-xs hover:text-orange-400">
          Change
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">First Name *</label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Last Name *</label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          placeholder="john@example.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Country *</label>
          <select
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          >
            <option value="">Select</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Phone *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            placeholder="+1234567890"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input type="checkbox" required className="rounded border-gray-700 text-orange-500 focus:ring-orange-500" />
        <span className="ml-2 text-sm text-gray-400">
          I agree to the{" "}
          <button type="button" className="text-orange-500 hover:text-orange-400">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-orange-500 hover:text-orange-400">
            Privacy Policy
          </button>
        </span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 text-black py-3 px-4 rounded-lg font-bold hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            Create Profile
            <ArrowRight className="ml-2 w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
