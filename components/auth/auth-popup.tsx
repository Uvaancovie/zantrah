"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import LoginForm from "./login-popup-form"
import RegisterForm from "./register-popup-form"

interface AuthPopupProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
  redirectTo?: string
}

export default function AuthPopup({ isOpen, onClose, defaultTab = "login", redirectTo }: AuthPopupProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)
  const { toast } = useToast()

  const handleSuccess = (message: string) => {
    toast({
      title: "Success!",
      description: message,
      variant: "success",
    })
    onClose()
  }

  const handleError = (error: string) => {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-orange-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-orange-500">
            {activeTab === "login" ? "Welcome Back" : "Join Zantra"}
          </DialogTitle>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex bg-black rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "login" ? "bg-orange-500 text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "register" ? "bg-orange-500 text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Content */}
        {activeTab === "login" ? (
          <LoginForm
            onSuccess={() => handleSuccess("Welcome back! You've been signed in successfully.")}
            onError={handleError}
            redirectTo={redirectTo}
          />
        ) : (
          <RegisterForm
            onSuccess={() => handleSuccess("Account created successfully! Welcome to Zantra.")}
            onError={handleError}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
