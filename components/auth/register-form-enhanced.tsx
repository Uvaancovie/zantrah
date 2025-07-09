"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { ArrowRight, User, Store, Briefcase, GraduationCap, Shield, Lock, Eye, EyeOff, Check, X, Users, UserCheck } from "lucide-react"

type UserRole = "buyer" | "seller" | "freelancer" | "client" | "producer" | "distributor" | "learner" | "educator"

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
  ]

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25
    if (password.match(/\d/)) strength += 25
    if (password.match(/[^a-zA-Z\d]/)) strength += 25
    return strength
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }
  }

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRole) return

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (passwordStrength < 75) {
      setError("Please use a stronger password")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Mock registration - just redirect to verification
      router.push("/verification-welcome")
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  if (step === 1) {
    // Role Selection Step
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Zantra</h2>
            <p className="text-lg text-gray-600 mb-8">Choose your role to get started</p>
            
            {/* Security indicators */}
            <div className="flex justify-center items-center gap-4 mb-8 p-3 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center text-green-600">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">SSL Secured</span>
              </div>
              <div className="flex items-center text-green-600">
                <Lock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center text-green-600">
                <UserCheck className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">GDPR Compliant</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-lg transform hover:scale-105 ${
                  selectedRole === role.id
                    ? `border-${role.color}-500 bg-${role.color}-50`
                    : "border-gray-200 bg-white hover:border-orange-500"
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 bg-${role.color}-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <role.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="absolute top-4 right-4 text-lg">{role.badge.split(' ')[0]}</div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{role.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-orange-500">{role.badge}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Form Details Step
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-4"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Change Role
          </button>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Sign up as {selectedRole && roles.find(r => r.id === selectedRole)?.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {selectedRole && roles.find(r => r.id === selectedRole)?.description}
          </p>

          {/* Security indicators */}
          <div className="flex justify-center items-center gap-4 mb-6 p-3 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center text-green-600">
              <Shield className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">Secure</span>
            </div>
            <div className="flex items-center text-green-600">
              <Lock className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">Encrypted</span>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="John"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="+27 123 456 789"
            />
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              id="country"
              name="country"
              required
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            >
              <option value="">Select your country</option>
              <option value="nigeria">Nigeria</option>
              <option value="kenya">Kenya</option>
              <option value="ghana">Ghana</option>
              <option value="morocco">Morocco</option>
              <option value="egypt">Egypt</option>
              <option value="saudi-arabia">Saudi Arabia</option>
              <option value="uae">UAE</option>
              <option value="angola">Angola</option>
              <option value="cape-verde">Cape Verde</option>
            </select>
          </div>

          {(selectedRole === 'seller' || selectedRole === 'producer' || selectedRole === 'distributor') && (
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Your Business Name"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Password strength</span>
                  <span className={`text-xs font-medium ${
                    passwordStrength >= 75 ? 'text-green-600' : 
                    passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Confirm your password"
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <X className="w-4 h-4 mr-1" />
                Passwords don't match
              </p>
            )}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="mt-1 text-sm text-green-600 flex items-center">
                <Check className="w-4 h-4 mr-1" />
                Passwords match
              </p>
            )}
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{" "}
              <Link href="/terms" className="text-orange-500 hover:text-orange-600 font-medium">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-orange-500 hover:text-orange-600 font-medium">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading || passwordStrength < 75}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
