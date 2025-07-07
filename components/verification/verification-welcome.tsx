"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Calendar, Video, FileText, Camera, Shield, ArrowRight, Users } from "lucide-react"

type Platform = "google-meet" | "zoom" | "teams"
type TimeSlot = {
  id: string
  time: string
  available: boolean
}

export default function VerificationWelcome() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role")
  const email = searchParams.get("email")

  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedTimezone, setSelectedTimezone] = useState("")
  const [isScheduling, setIsScheduling] = useState(false)
  const [isScheduled, setIsScheduled] = useState(false)

  const platforms = [
    {
      id: "google-meet" as Platform,
      name: "Google Meet",
      icon: Video,
      description: "Join via browser or mobile app",
    },
    {
      id: "zoom" as Platform,
      name: "Zoom",
      icon: Camera,
      description: "Professional video conferencing",
    },
    {
      id: "teams" as Platform,
      name: "Microsoft Teams",
      icon: Users,
      description: "Enterprise-grade meetings",
    },
  ]

  const timeSlots: TimeSlot[] = [
    { id: "09:00", time: "09:00 AM", available: true },
    { id: "10:00", time: "10:00 AM", available: true },
    { id: "11:00", time: "11:00 AM", available: false },
    { id: "14:00", time: "02:00 PM", available: true },
    { id: "15:00", time: "03:00 PM", available: true },
    { id: "16:00", time: "04:00 PM", available: true },
    { id: "17:00", time: "05:00 PM", available: false },
  ]

  const timezones = [
    "Africa/Lagos (WAT)",
    "Africa/Nairobi (EAT)",
    "Africa/Cairo (EET)",
    "Africa/Casablanca (WET)",
    "Asia/Dubai (GST)",
    "Asia/Riyadh (AST)",
    "UTC+0 (GMT)",
  ]

  const getRoleInfo = (role: string | null) => {
    switch (role) {
      case "small_business":
        return {
          title: "Small Business",
          price: "R29.99/month",
          features: ["Product listings", "Basic analytics", "Payment processing", "Customer communication"],
        }
      case "entrepreneur":
        return {
          title: "Entrepreneur",
          price: "R69.99/month",
          features: [
            "Advanced analytics",
            "Portfolio showcase",
            "Logistics integration",
            "Customer insights",
            "PayPal integration",
          ],
        }
      case "student":
        return {
          title: "Student/Freelancer",
          price: "Free",
          features: ["Profile creation", "Project portfolio", "Job applications", "Apprenticeship matching"],
        }
      case "corporation":
        return {
          title: "Corporation",
          price: "Custom pricing",
          features: ["Job postings", "Candidate search", "Application management", "Talent database access"],
        }
      default:
        return {
          title: "Customer",
          price: "Free",
          features: ["Browse products", "Secure checkout", "Order tracking", "Customer support"],
        }
    }
  }

  const roleInfo = getRoleInfo(role)

  const handleScheduleMeeting = async () => {
    if (!selectedPlatform || !selectedDate || !selectedTime || !selectedTimezone) {
      return
    }

    setIsScheduling(true)

    try {
      // Here you would typically call your API to schedule the meeting
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      setIsScheduled(true)
    } catch (error) {
      console.error("Failed to schedule meeting:", error)
    } finally {
      setIsScheduling(false)
    }
  }

  // Generate next 7 days for date selection
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        }),
      })
    }

    return dates
  }

  if (isScheduled) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-gray-900 rounded-3xl p-12 border border-orange-500/20">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">Meeting Scheduled Successfully! 🎉</h1>

            <p className="text-gray-300 text-lg mb-8">
              Your verification meeting has been scheduled. We'll send you a confirmation email with the meeting link
              and details.
            </p>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-8">
              <h3 className="text-orange-500 font-bold mb-4">Meeting Details</h3>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Platform:</strong> {platforms.find((p) => p.id === selectedPlatform)?.name}
                </p>
                <p>
                  <strong>Date:</strong> {selectedDate}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTime} ({selectedTimezone})
                </p>
                <p>
                  <strong>Account Type:</strong> {roleInfo.title}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Link
                href="/dashboard"
                className="w-full bg-orange-500 text-black py-4 px-6 rounded-xl font-bold text-lg hover:bg-orange-400 transition-colors inline-block"
              >
                Go to Dashboard
              </Link>

              <Link
                href="/verification"
                className="w-full border-2 border-orange-500 text-orange-500 py-4 px-6 rounded-xl font-bold text-lg hover:bg-orange-500 hover:text-black transition-colors inline-block"
              >
                Upload Documents
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Zantra! 🎉</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Congratulations on joining Africa's premier digital marketplace. Let's get you verified and ready to start
            your journey.
          </p>
        </div>

        {/* Account Summary */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-orange-500/20 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">{roleInfo.title} Account</h2>
              <p className="text-orange-500 font-bold text-lg">{roleInfo.price}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-black" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {roleInfo.features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <CheckCircle className="w-4 h-4 text-orange-500 mr-3 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Verification Process */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-orange-500/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FileText className="w-6 h-6 text-orange-500 mr-3" />
            Verification Process
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold">1</span>
              </div>
              <h3 className="text-white font-bold mb-2">Schedule Meeting</h3>
              <p className="text-gray-400 text-sm">Book a 15-minute video call with our verification team</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-gray-300 font-bold mb-2">Upload Documents</h3>
              <p className="text-gray-400 text-sm">Provide ID and proof of address for verification</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-gray-300 font-bold mb-2">Get Verified</h3>
              <p className="text-gray-400 text-sm">Start selling within 24 hours of completion</p>
            </div>
          </div>
        </div>

        {/* Meeting Scheduler */}
        <div className="bg-gray-900 rounded-2xl p-8 border border-orange-500/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calendar className="w-6 h-6 text-orange-500 mr-3" />
            Schedule Your Verification Meeting
          </h2>

          <div className="space-y-6">
            {/* Platform Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Choose Meeting Platform</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`p-4 rounded-xl border-2 transition-colors text-left ${
                      selectedPlatform === platform.id
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-700 hover:border-orange-500/50"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <platform.icon className="w-6 h-6 text-orange-500 mr-3" />
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{platform.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Date</h3>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose a date</option>
                {getAvailableDates().map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Time</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setSelectedTime(slot.time)}
                    disabled={!slot.available}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedTime === slot.time
                        ? "border-orange-500 bg-orange-500/10 text-orange-500"
                        : slot.available
                          ? "border-gray-700 text-white hover:border-orange-500/50"
                          : "border-gray-800 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Timezone Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Select Timezone</h3>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose your timezone</option>
                {timezones.map((timezone) => (
                  <option key={timezone} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>

            {/* Schedule Button */}
            <div className="pt-6">
              <button
                onClick={handleScheduleMeeting}
                disabled={!selectedPlatform || !selectedDate || !selectedTime || !selectedTimezone || isScheduling}
                className="w-full bg-orange-500 text-black py-4 px-6 rounded-xl font-bold text-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isScheduling ? (
                  "Scheduling Meeting..."
                ) : (
                  <>
                    Schedule Verification Meeting
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">Need help or have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/help"
              className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-bold hover:bg-orange-500 hover:text-black transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/verification"
              className="border-2 border-gray-700 text-gray-300 px-6 py-3 rounded-lg font-bold hover:border-orange-500 hover:text-orange-500 transition-colors"
            >
              Upload Documents Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
