"use client"

import VerificationForm from "@/components/verification/verification-form"

export default function VerificationPage() {
  // Demo mode: Show a static verification status instead of checking the DB
  const demoVerificationRequest = {
    status: "approved",
    created_at: "2025-06-01T10:00:00Z",
    updated_at: "2025-06-03T14:30:00Z"
  }

  // Show the verification status page instead of the form in demo mode
  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-orange-500/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Verification Status</h2>
          <div className="mb-6">
            {demoVerificationRequest.status === "pending" && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-500 font-medium">⏳ Verification Pending</p>
                <p className="text-gray-300 text-sm mt-2">
                  We're reviewing your documents. You'll hear from us within 24 hours.
                </p>
              </div>
            )}
            {demoVerificationRequest.status === "video_scheduled" && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-500 font-medium">📹 Video Call Scheduled</p>
                <p className="text-gray-300 text-sm mt-2">Check your email for video call details.</p>
              </div>
            )}
            {demoVerificationRequest.status === "approved" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-500 font-medium">✅ Verified</p>
                <p className="text-gray-300 text-sm mt-2">Congratulations! You can now start selling on Zantra.</p>
              </div>
            )}
            {demoVerificationRequest.status === "rejected" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-500 font-medium">❌ Verification Failed</p>
                <p className="text-gray-300 text-sm mt-2">Please contact support for more information.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
