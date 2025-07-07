"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useVerification } from "@/hooks/use-verification"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Settings, LogOut, Shield, CheckCircle, Clock, AlertCircle, X } from "lucide-react"

export default function UserMenu() {
  const { user, profile, signOut, isAuthenticated } = useAuth()
  const { verificationRequest, verificationStatus } = useVerification()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  if (!isAuthenticated) return null

  const getVerificationStatusInfo = () => {
    switch (verificationStatus) {
      case "pending":
        return { icon: Clock, color: "text-yellow-500", text: "Verification Pending" }
      case "approved":
        return { icon: CheckCircle, color: "text-green-500", text: "Verified" }
      case "rejected":
        return { icon: X, color: "text-red-500", text: "Verification Failed" }
      case "video_scheduled":
        return { icon: Shield, color: "text-blue-500", text: "Video Call Scheduled" }
      default:
        return { icon: AlertCircle, color: "text-gray-500", text: "Not Verified" }
    }
  }

  const statusInfo = getVerificationStatusInfo()
  const StatusIcon = statusInfo.icon

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2 hover:bg-gray-700 transition-colors"
        >
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-black" />
          </div>
          <div className="text-left">
            <div className="text-white text-sm font-medium">
              {profile?.first_name} {profile?.last_name}
            </div>
            <div className="flex items-center">
              <StatusIcon className={`w-3 h-3 ${statusInfo.color} mr-1`} />
              <span className={`text-xs ${statusInfo.color}`}>{statusInfo.text}</span>
            </div>
          </div>
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
            <div className="py-2">
              <button
                onClick={() => {
                  setShowProfile(true)
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <hr className="border-gray-700 my-2" />
              <button
                onClick={() => {
                  signOut()
                  setShowMenu(false)
                }}
                className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-orange-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-orange-500">User Profile</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {profile?.first_name} {profile?.last_name}
              </h3>
              <p className="text-gray-400">{user?.email}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Role:</span>
                <span className="text-white capitalize">{profile?.role?.replace("_", " ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Country:</span>
                <span className="text-white">{profile?.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="text-white">{profile?.phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Verification:</span>
                <div className="flex items-center">
                  <StatusIcon className={`w-4 h-4 ${statusInfo.color} mr-2`} />
                  <span className={statusInfo.color}>{statusInfo.text}</span>
                </div>
              </div>
            </div>

            {verificationRequest && (
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Verification Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Submitted:</span>
                    <span className="text-white">{new Date(verificationRequest.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={statusInfo.color}>{verificationRequest.status}</span>
                  </div>
                  {verificationRequest.admin_notes && (
                    <div>
                      <span className="text-gray-400">Notes:</span>
                      <p className="text-white text-xs mt-1">{verificationRequest.admin_notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={() => setShowProfile(false)}
              className="w-full bg-orange-500 text-black py-3 px-4 rounded-lg font-bold hover:bg-orange-400 transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
