"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Upload, FileText, Camera, MapPin, User } from "lucide-react"

interface VerificationFormData {
  fullName: string
  email: string
  age: string
  nationality: string
  idNumber: string
  idDocument: File | null
  proofOfAddress: File | null
}

export default function VerificationForm() {
  const [formData, setFormData] = useState<VerificationFormData>({
    fullName: "",
    email: "",
    age: "",
    nationality: "",
    idNumber: "",
    idDocument: null,
    proofOfAddress: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "idDocument" | "proofOfAddress") => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const profileId = localStorage.getItem("zantra_profile_id")
    if (!profileId) throw new Error("Profile not found")

    const fileExt = file.name.split(".").pop()
    const fileName = `${profileId}/${folder}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("verification-documents").upload(fileName, file)

    if (error) throw error
    return data.path
  }

  const sendVerificationEmail = async (verificationData: any) => {
    try {
      await fetch("/api/send-verification-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationData),
      })
    } catch (error) {
      console.error("Failed to send verification email:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const profileId = localStorage.getItem("zantra_profile_id")
      if (!profileId) throw new Error("Please create a profile first")

      // Upload documents
      let idDocumentUrl = ""
      let proofOfAddressUrl = ""

      if (formData.idDocument) {
        idDocumentUrl = await uploadFile(formData.idDocument, "id-documents")
      }

      if (formData.proofOfAddress) {
        proofOfAddressUrl = await uploadFile(formData.proofOfAddress, "proof-of-address")
      }

      // Insert verification request
      const { data, error } = await supabase
        .from("verification_requests")
        .insert({
          profile_id: profileId,
          full_name: formData.fullName,
          email: formData.email,
          age: Number.parseInt(formData.age),
          nationality: formData.nationality,
          id_number: formData.idNumber,
          id_document_url: idDocumentUrl,
          proof_of_address_url: proofOfAddressUrl,
        })
        .select()
        .single()

      if (error) throw error

      // Send verification email to admin
      await sendVerificationEmail({
        ...formData,
        profileId,
        verificationId: data.id,
        idDocumentUrl,
        proofOfAddressUrl,
      })

      setIsSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-orange-500/20">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Verification Submitted!</h2>
            <p className="text-gray-300 mb-6">
              We have received your verification documents. To complete the process, we need to book a video
              consultation to confirm your verification.
            </p>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
              <p className="text-orange-500 font-medium text-sm">
                📹 You can get verified by tonight! Our team will contact you within 24 hours to schedule your video
                call.
              </p>
            </div>
            <p className="text-gray-400 text-sm">Check your email for further instructions and scheduling details.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Vendor Verification</h1>
          <p className="text-gray-400">Complete your verification to start selling on Zantra</p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-orange-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <User className="w-5 h-5 text-orange-500 mr-2" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nationality *</label>
                  <select
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ID Number *</label>
                <input
                  type="text"
                  name="idNumber"
                  required
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your national ID number"
                />
              </div>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <FileText className="w-5 h-5 text-orange-500 mr-2" />
                Required Documents
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Country ID Document *</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, "idDocument")}
                      className="hidden"
                      id="idDocument"
                      required
                    />
                    <label
                      htmlFor="idDocument"
                      className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm text-center">
                        {formData.idDocument ? formData.idDocument.name : "Upload ID Document"}
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Proof of Address *</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange(e, "proofOfAddress")}
                      className="hidden"
                      id="proofOfAddress"
                      required
                    />
                    <label
                      htmlFor="proofOfAddress"
                      className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                    >
                      <MapPin className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm text-center">
                        {formData.proofOfAddress ? formData.proofOfAddress.name : "Upload Proof of Address"}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="text-orange-500 text-sm">
                  <strong>Required Documents:</strong>
                  <br />• Valid government-issued ID (passport, national ID, driver's license)
                  <br />• Proof of address (utility bill, bank statement, lease agreement - not older than 3 months)
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 text-black py-4 px-6 rounded-lg font-bold text-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Submitting..." : "Submit Verification Request"}
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-400 text-sm">
                By submitting this form, you agree to our verification process and terms of service.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
