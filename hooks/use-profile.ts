"use client"

import { useState, useEffect } from "react"

export interface UserProfile {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  country?: string
  phone?: string
  role?: string
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // Load profile from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("zantra_user_data")
    if (stored) {
      try {
        setProfile(JSON.parse(stored))
      } catch {
        localStorage.removeItem("zantra_user_data")
      }
    }
    setLoading(false)
  }, [])

  // Helpers
  const saveProfile = (data: UserProfile) => {
    setProfile(data)
    localStorage.setItem("zantra_user_data", JSON.stringify(data))
    localStorage.setItem("zantra_profile_id", data.id)
  }

  const clearProfile = () => {
    localStorage.removeItem("zantra_user_data")
    localStorage.removeItem("zantra_profile_id")
    setProfile(null)
  }

  return {
    profile,
    loading,
    hasProfile: !!profile,
    saveProfile,
    clearProfile,
  }
}
