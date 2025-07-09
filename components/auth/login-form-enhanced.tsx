"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Mail, Lock, Eye, EyeOff, Shield, CheckCircle } from "lucide-react"

export default function LoginFormEnhanced() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <div className="text-center">
          <Link href="/" className="text-3xl font-bold text-orange-500">
            Zantra
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
        </div>

        {/* Security Badges */}
        <div className="flex justify-center space-x-6 py-4">
          <div className="flex flex-col items-center text-xs text-gray-500">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-1">
              <Shield className="w-5 h-5" />
            </div>
            <span>Secure Login</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-500">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-1">
              <Lock className="w-5 h-5" />
            </div>
            <span>SSL Secured</span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-500">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-1">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span>GDPR Compliant</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">
              <p>{error}</p>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 placeholder-transparent"
              placeholder="Email address"
            />
            <label
              htmlFor="email"
              className={`absolute text-sm duration-300 transform ${
                email ? '-translate-y-5 top-1 scale-75 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 text-orange-500' 
                : 'top-3 left-10 text-gray-500 z-10'
              }`}
            >
              Email address
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 placeholder-transparent"
              placeholder="Password"
            />
            <label
              htmlFor="password"
              className={`absolute text-sm duration-300 transform ${
                password ? '-translate-y-5 top-1 scale-75 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 text-orange-500' 
                : 'top-3 left-10 text-gray-500 z-10'
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-orange-500 hover:text-orange-400">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-orange-500 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 font-medium text-lg"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-orange-500 hover:text-orange-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
