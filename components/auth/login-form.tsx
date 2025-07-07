"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Mail, Lock } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      console.log("Login successful for user:", data.user.id)

      // Get user profile to determine role
      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("role, is_verified")
        .eq("user_id", data.user.id)
        .single()

      if (profileError) {
        console.error("Profile fetch error:", profileError)
        // Fallback to user metadata
        const userRole = data.user.user_metadata?.role

        if (redirect === "marketplace" || userRole === "customer") {
          router.push("/marketplace")
        } else {
          router.push("/verification")
        }
        return
      }

      const userRole = profileData.role

      if (redirect === "marketplace" || userRole === "customer") {
        // Customer goes to marketplace
        router.push("/marketplace")
      } else {
        // Check if vendor needs verification
        const { data: verificationData } = await supabase
          .from("verification_requests")
          .select("status")
          .eq("user_id", data.user.id)
          .single()

        if (!verificationData) {
          // New vendor needs verification
          router.push("/verification")
        } else if (verificationData.status === "approved") {
          // Verified vendor can access dashboard
          router.push("/dashboard")
        } else {
          // User has pending verification
          router.push("/verification")
        }
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message)
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
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-400">Welcome back to Africa's premier marketplace</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="mt-1 relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="your@email.com"
              />
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-black bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-orange-500 hover:text-orange-400 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
