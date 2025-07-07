import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import VerificationForm from "@/components/verification/verification-form"

export default async function VerificationPage() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login?message=Please sign in to access verification")
  }

  // Check if user already has a verification request
  const { data: existingRequest } = await supabase
    .from("verification_requests")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  if (existingRequest) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-orange-500/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Verification Status</h2>
            <div className="mb-6">
              {existingRequest.status === "pending" && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-500 font-medium">⏳ Verification Pending</p>
                  <p className="text-gray-300 text-sm mt-2">
                    We're reviewing your documents. You'll hear from us within 24 hours.
                  </p>
                </div>
              )}
              {existingRequest.status === "video_scheduled" && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-500 font-medium">📹 Video Call Scheduled</p>
                  <p className="text-gray-300 text-sm mt-2">Check your email for video call details.</p>
                </div>
              )}
              {existingRequest.status === "approved" && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-500 font-medium">✅ Verified</p>
                  <p className="text-gray-300 text-sm mt-2">Congratulations! You can now start selling on Zantra.</p>
                </div>
              )}
              {existingRequest.status === "rejected" && (
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

  return <VerificationForm />
}
