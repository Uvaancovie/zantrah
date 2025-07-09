"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { useProfile } from "@/hooks/use-profile"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/layout/navbar"
import { User, Mail, Phone, MapPin, Briefcase, Save, Shield, CheckCircle } from "lucide-react"

export default function ProfilePageEnhanced() {
  const { profile, hasProfile, saveProfile } = useProfile()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'verification'>('profile')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    role: "",
  })
  
  // Vendor verification checklist
  const [verificationSteps, setVerificationSteps] = useState([
    { id: 'phone', label: 'Verify phone number', completed: false },
    { id: 'email', label: 'Verify email address', completed: false },
    { id: 'id', label: 'Upload government ID', completed: false },
    { id: 'business', label: 'Business registration', completed: false },
    { id: 'address', label: 'Address verification', completed: false },
    { id: 'portfolio', label: 'Upload product portfolio', completed: false },
    { id: 'payment', label: 'Connect payment method', completed: false },
  ])

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

  useEffect(() => {
    // Load profile data in demo mode
    if (profile) {
      setFormData({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        country: profile.country || "",
        role: profile.role || "",
      })
    }
  }, []) // Remove dependencies to prevent infinite loop

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update profile in database
      const { error } = await supabase
        .from("user_profiles")
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          role: formData.role,
          updated_at: new Date().toISOString(),
        })
        .eq("id", profile?.id)

      if (error) throw error

      // Update local profile
      const updatedProfile = {
        ...profile!,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        role: formData.role,
      }

      saveProfile(updatedProfile)

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        variant: "success",
      })
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-t-2xl overflow-hidden shadow-lg p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600">Manage your personal information and vendor status</p>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-gray-50 px-6 py-4 flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`mr-4 py-2 px-4 font-medium rounded-lg ${
                activeTab === 'profile'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={`py-2 px-4 font-medium rounded-lg ${
                activeTab === 'verification'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Vendor Verification
            </button>
          </div>

          {/* Profile Form Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-b-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+1234567890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Country
                    </label>
                    <select
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Account Type
                  </label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Account Type</option>
                    <option value="customer">Customer</option>
                    <option value="small_business">Small Business</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="student">Student/Freelancer</option>
                    <option value="corporation">Corporation</option>
                  </select>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-orange-500 text-black py-4 px-6 rounded-lg font-bold text-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Vendor Verification Tab */}
          {activeTab === 'verification' && (
            <div className="bg-white rounded-b-2xl shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Vendor Verification</h2>
                <p className="text-gray-600">Complete these steps to become a verified vendor and build trust with customers</p>
                
                <div className="mt-4 flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span className="text-sm font-medium">Basic Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">Trusted Vendor</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Current Vendor Status */}
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-orange-800">Your Current Status</h3>
                      <p className="text-orange-600 text-sm">Basic Verification (1/7 steps completed)</p>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200 flex items-center">
                      <span className="mr-1">🟡</span>
                      Verified User
                    </div>
                  </div>
                </div>
                
                {/* Verification Checklist */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="font-medium text-gray-900">Verification Checklist</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {verificationSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {step.completed ? '✓' : index + 1}
                          </div>
                          <span className={`font-medium ${step.completed ? 'text-green-600' : 'text-gray-700'}`}>
                            {step.label}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const updatedSteps = [...verificationSteps];
                            updatedSteps[index] = { ...step, completed: !step.completed };
                            setVerificationSteps(updatedSteps);
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            step.completed 
                              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                              : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                          }`}
                        >
                          {step.completed ? 'Completed' : 'Complete Now'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Next Steps */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Upgrade Your Vendor Status</h3>
                  <p className="text-blue-600 text-sm mb-4">Complete at least 3 verification steps to become a Verified Seller and 6 steps for Trusted Vendor status.</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
                    Learn More About Verification
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
