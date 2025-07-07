"use client"

import { useState, useEffect } from "react"

interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  country: string
  phone: string
  role: string
  isVerified: boolean
}

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("zantra_user_data")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("zantra_user_data")
        localStorage.removeItem("zantra_profile_id")
      }
    }
    setLoading(false)
  }, [])

  const signOut = () => {
    localStorage.removeItem("zantra_user_data")
    localStorage.removeItem("zantra_profile_id")
    setUser(null)
    window.location.href = "/"
  }

  const updateUser = (userData: Partial<UserProfile>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("zantra_user_data", JSON.stringify(updatedUser))
    }
  }

  return {
    user,
    profile: user, // For compatibility
    loading,
    signOut,
    updateUser,
    isAuthenticated: !!user,
    isVerified: user?.isVerified ?? false,
    userRole: user?.role,
  }
}
