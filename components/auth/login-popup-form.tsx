"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ArrowRight, Mail, User } from "lucide-react"

interface LoginPopupFormProps {
  onSuccess: () => void
  onError: (error: string) => void
  redirectTo?: string
}

export default function LoginPopupForm({ onSuccess, onError, redirectTo }: LoginPopupFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Find user profile by email
      const { data: profileData, error } = await supabase.from("user_profiles").select("*").eq("email", email).single()

      if (error || !profileData) {
        throw new Error("Profile not found. Please create a profile first.")
      }

      // Store profile data in localStorage
      localStorage.setItem("zantra_profile_id", profileData.id)
      localStorage.setItem(
        "zantra_user_data",
        JSON.stringify({
          id: profileData.id,
          firstName: profileData.first_name,
          lastName: profileData.last_name,
          email: profileData.email,
          role: profileData.role,
          country: profileData.country,
        }),
      )

      onSuccess()

      // Small delay to show success message
      setTimeout(() => {
        // Redirect based on role or specified redirect
        if (redirectTo) {
          router.push(redirectTo)
        } else if (profileData.role === "customer") {
          router.push("/marketplace")
        } else {
          // Check verification status for vendors
          supabase
            .from("verification_requests")
            .select("status")
            .eq("profile_id", profileData.id)
            .single()
            .then(({ data: verificationData }) => {
              if (!verificationData) {
                router.push("/verification")
              } else if (verificationData.status === "approved") {
                router.push("/dashboard")
              } else {
                router.push("/verification")
              }
            })
        }
      }, 1000)
    } catch (err: any) {
      onError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="your@email.com"
          />
          <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
        <p className="text-orange-500 text-sm">
          <User className="w-4 h-4 inline mr-1" />
          Enter your email to access your profile. No password required!
        </p>
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
            Access Profile
            <ArrowRight className="ml-2 w-4 h-4" />
          </>
        )}
      </button>
    </form>
  )
}
