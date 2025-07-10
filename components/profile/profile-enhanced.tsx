"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { useProfile } from "@/hooks/use-profile"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Navbar from "@/components/layout/navbar"
import { 
  User, Mail, Phone, MapPin, Briefcase, Save, Shield, 
  CheckCircle, Upload, Building, CreditCard, FileText, 
  Home, Image, GraduationCap
} from "lucide-react"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  phoneSchema,
  emailSchema,
  govIdSchema,
  businessSchema,
  addressSchema,
  portfolioSchema,
  paymentSchema,
  studentSchema,
  corporationSchema
} from "@/lib/verification-schemas"
import PhoneVerificationForm from "@/components/forms/PhoneVerificationForm"
import EmailVerificationForm from "@/components/forms/EmailVerificationForm"
import GovIdVerificationForm from "@/components/forms/GovIdVerificationForm"
import BusinessVerificationForm from "@/components/forms/BusinessVerificationForm"
import AddressVerificationForm from "@/components/forms/AddressVerificationForm"
import PortfolioVerificationForm from "@/components/forms/PortfolioVerificationForm"
import PaymentVerificationForm from "@/components/forms/PaymentVerificationForm"
import StudentVerificationForm from "@/components/forms/StudentVerificationForm"
import CorporationVerificationForm from "@/components/forms/CorporationVerificationForm"
import { Button } from "@/components/ui/button"

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
  
  // For verification forms
  type VerificationFormData = {
    phone: z.infer<typeof phoneSchema>;
    email: z.infer<typeof emailSchema>;
    id: z.infer<typeof govIdSchema>;
    business: z.infer<typeof businessSchema>;
    address: z.infer<typeof addressSchema>;
    portfolio: z.infer<typeof portfolioSchema>;
    payment: z.infer<typeof paymentSchema>;
    student: z.infer<typeof studentSchema>;
    corporation: z.infer<typeof corporationSchema>;
  }

  const [selectedVerificationStep, setSelectedVerificationStep] = useState<string | null>(null)
  const [verificationFormData, setVerificationFormData] = useState<VerificationFormData>({
    phone: { phone: "" },
    email: { email: "" },
    id: { idType: "passport", idNumber: "", idFile: "" },
    business: { businessName: "", businessType: "sole_proprietorship", registrationNumber: "", registrationFile: "" },
    address: { addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", country: "", proofFile: "" },
    portfolio: { portfolioDescription: "", portfolioItems: [{ title: "", description: "", image: "" }] },
    payment: { accountName: "", bankName: "", accountNumber: "", swiftCode: "", routingNumber: "" },
    student: { institutionName: "", studentId: "", program: "", graduationYear: new Date().getFullYear().toString(), studentIdCard: "", enrollmentProof: "" },
    corporation: { companyName: "", registrationNumber: "", industry: "", companySize: "1-10", hiringCapacity: "1-5", website: "", companyLogo: "", businessLicense: "" }
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
    { id: 'student', label: 'Student verification', completed: false },
    { id: 'corporation', label: 'Corporation hiring verification', completed: false },
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
                      <p className="text-orange-600 text-sm">Basic Verification (1/9 steps completed)</p>
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
                
                {/* Verification Forms with Accordion */}
                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">Complete Verification Steps</h3>
                  
                    <div className="mb-4 border-b">
                    <div className="flex border-b">
                      <button
                      onClick={() => setSelectedVerificationStep('regular')}
                      className={`py-2 px-4 font-medium ${
                        selectedVerificationStep === 'regular' || !selectedVerificationStep
                        ? 'border-b-2 border-orange-500 text-orange-600'
                        : 'text-gray-600 hover:text-gray-800'
                      }`}
                      >
                      Regular Verification
                      </button>
                      <button
                      onClick={() => setSelectedVerificationStep('student')}
                      className={`py-2 px-4 font-medium ${
                        selectedVerificationStep === 'student'
                        ? 'border-b-2 border-orange-500 text-orange-600'
                        : 'text-gray-600 hover:text-gray-800'
                      }`}
                      >
                      Student Verification
                      </button>
                      <button
                      onClick={() => setSelectedVerificationStep('corporation')}
                      className={`py-2 px-4 font-medium ${
                        selectedVerificationStep === 'corporation'
                        ? 'border-b-2 border-orange-500 text-orange-600'
                        : 'text-gray-600 hover:text-gray-800'
                      }`}
                      >
                      Corporation Verification
                      </button>
                    </div>
                    </div>

                    {/* Regular Verification Forms */}
                    {(selectedVerificationStep === 'regular' || !selectedVerificationStep) && (
                    <Accordion type="single" collapsible className="space-y-4">
                      {/* Phone Verification Form */}
                      <AccordionItem value="phone" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Phone Verification</span>
                        {verificationSteps[0].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <PhoneVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[0].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.phone}
                        updateFormData={(data: z.infer<typeof phoneSchema>) => setVerificationFormData(prev => ({...prev, phone: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>

                      {/* Email Verification Form */}
                      <AccordionItem value="email" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Email Verification</span>
                        {verificationSteps[1].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <EmailVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[1].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.email}
                        updateFormData={(data: z.infer<typeof emailSchema>) => setVerificationFormData(prev => ({...prev, email: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>

                      {/* Government ID Verification Form */}
                      <AccordionItem value="id" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <FileText className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Government ID Verification</span>
                        {verificationSteps[2].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <GovIdVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[2].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.id}
                        updateFormData={(data: z.infer<typeof govIdSchema>) => setVerificationFormData(prev => ({...prev, id: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>

                      {/* Business Registration Form */}
                      <AccordionItem value="business" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <Building className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Business Registration</span>
                        {verificationSteps[3].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <BusinessVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[3].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.business}
                        updateFormData={(data: z.infer<typeof businessSchema>) => setVerificationFormData(prev => ({...prev, business: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>

                      {/* Address Verification Form */}
                      <AccordionItem value="address" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <Home className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Address Verification</span>
                        {verificationSteps[4].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <AddressVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[4].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.address}
                        updateFormData={(data: z.infer<typeof addressSchema>) => setVerificationFormData(prev => ({...prev, address: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>

                      {/* Portfolio Verification Form */}
                      <AccordionItem value="portfolio" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <Image className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Portfolio Verification</span>
                        {verificationSteps[5].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <PortfolioVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[5].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.portfolio}
                        updateFormData={(data: z.infer<typeof portfolioSchema>) => setVerificationFormData(prev => ({...prev, portfolio: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>

                      {/* Payment Verification Form */}
                      <AccordionItem value="payment" className="border rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:no-underline hover:bg-gray-100">
                        <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Payment Method</span>
                        {verificationSteps[6].completed && (
                          <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 py-3">
                        <PaymentVerificationForm 
                        setCompleted={(completed: boolean) => {
                          const updatedSteps = [...verificationSteps];
                          updatedSteps[6].completed = completed;
                          setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.payment}
                        updateFormData={(data: z.infer<typeof paymentSchema>) => setVerificationFormData(prev => ({...prev, payment: data}))}
                        />
                      </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    )}

                    {/* Student Verification Tab */}
                    {selectedVerificationStep === 'student' && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-orange-50 border-b">
                      <div className="flex items-center">
                        <GraduationCap className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Student Verification</span>
                        {verificationSteps[7].completed && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Submit your student information to qualify for special rates and opportunities.
                      </p>
                      </div>
                      <div className="px-4 py-3">
                      <StudentVerificationForm 
                        setCompleted={(completed: boolean) => {
                        const updatedSteps = [...verificationSteps];
                        updatedSteps[7].completed = completed;
                        setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.student}
                        updateFormData={(data: z.infer<typeof studentSchema>) => setVerificationFormData(prev => ({...prev, student: data}))}
                      />
                      </div>
                    </div>
                    )}

                    {/* Corporation Verification Tab */}
                    {selectedVerificationStep === 'corporation' && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-orange-50 border-b">
                      <div className="flex items-center">
                        <Briefcase className="w-5 h-5 mr-3 text-orange-500" />
                        <span className="font-medium">Corporation Hiring Verification</span>
                        {verificationSteps[8].completed && (
                        <CheckCircle className="w-4 h-4 ml-2 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Register your corporation to access talent and build your hiring presence.
                      </p>
                      </div>
                      <div className="px-4 py-3">
                      <CorporationVerificationForm 
                        setCompleted={(completed: boolean) => {
                        const updatedSteps = [...verificationSteps];
                        updatedSteps[8].completed = completed;
                        setVerificationSteps(updatedSteps);
                        }}
                        initialData={verificationFormData.corporation}
                        updateFormData={(data: z.infer<typeof corporationSchema>) => setVerificationFormData(prev => ({...prev, corporation: data}))}
                      />
                      </div>
                    </div>
                    )}
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Upgrade Your Vendor Status</h3>
                  <p className="text-blue-600 text-sm mb-4">Complete at least 3 verification steps to become a Verified Seller and 6 steps for Trusted Vendor status. Students can gain special access by completing student verification, and corporations can access talent by completing corporation verification.</p>
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
