"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useVerification } from "@/hooks/use-verification"
import { useToast } from "@/hooks/use-toast"
import { Upload, FileText, MapPin, User, CheckCircle } from "lucide-react"

interface VerificationPopupProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface VerificationFormData {
  fullName: string
  email: string
  age: string
  nationality: string
  idNumber: string
  idDocument: File | null
  proofOfAddress: File | null
}

export default function VerificationPopup({ isOpen, onClose, onSuccess }: VerificationPopupProps) {
  const [step, setStep] = useState<"form" | "success">("form")
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
  const { submitVerificationRequest } = useVerification()
  const { toast } = useToast()

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

    // Validate file size (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    // Validate file type
    if (file && !file.type.match(/^(image\/(jpeg|jpg|png|gif)|application\/pdf)$/)) {
      toast({
        title: "Invalid file type",
        description: "Please select an image (JPEG, PNG, GIF) or PDF file",
        variant: "destructive",
      })
      return
    }

    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) throw new Error("Full name is required")
    if (!formData.email.trim()) throw new Error("Email is required")
    if (!formData.age || Number.parseInt(formData.age) < 18) throw new Error("You must be at least 18 years old")
    if (!formData.nationality) throw new Error("Nationality is required")
    if (!formData.idNumber.trim()) throw new Error("ID number is required")
    if (!formData.idDocument) throw new Error("ID document is required")
    if (!formData.proofOfAddress) throw new Error("Proof of address is required")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      validateForm()

      await submitVerificationRequest(formData)

      toast({
        title: "Verification Submitted!",
        description: "We'll review your documents and contact you within 24 hours.",
        variant: "success",
      })

      setStep("success")
      onSuccess?.()
    } catch (err: any) {
      toast({
        title: "Submission Failed",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setStep("form")
    setFormData({
      fullName: "",
      email: "",
      age: "",
      nationality: "",
      idNumber: "",
      idDocument: null,
      proofOfAddress: null,
    })
    onClose()
  }

  if (step === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-orange-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-orange-500">
              Verification Submitted! 🎉
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-black" />
            </div>

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

            <p className="text-gray-400 text-sm mb-6">
              Check your email for further instructions and scheduling details.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleClose}
                className="w-full bg-orange-500 text-black py-3 px-4 rounded-lg font-bold hover:bg-orange-400 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => window.open("/verification-welcome", "_blank")}
                className="w-full border-2 border-orange-500 text-orange-500 py-3 px-4 rounded-lg font-bold hover:bg-orange-500 hover:text-black transition-colors"
              >
                Schedule Video Call
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl bg-gray-900 border-orange-500/20 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-orange-500">Vendor Verification</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full h-24 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-gray-400 text-sm text-center px-2">
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
                    className="w-full h-24 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition-colors"
                  >
                    <MapPin className="w-6 h-6 text-gray-400 mb-1" />
                    <span className="text-gray-400 text-sm text-center px-2">
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
                <br />• Maximum file size: 5MB per document
                <br />• Accepted formats: JPEG, PNG, GIF, PDF
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-black py-4 px-6 rounded-lg font-bold text-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Verification Request"
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              By submitting this form, you agree to our verification process and terms of service.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
