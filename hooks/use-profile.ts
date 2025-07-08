"use client"

export interface UserProfile {
  id: string
  first_name?: string
  last_name?: string
  email?: string
  country?: string
  phone?: string
  role?: string
}

// This is a stubbed version of useProfile that always returns a profile
export function useProfile() {
  // Create a dummy profile that will be returned by default
  const dummyProfile: UserProfile = {
    id: '1',
    first_name: 'Demo',
    last_name: 'User',
    email: 'demo@zantra.com',
    country: 'South Africa',
    phone: '+27123456789',
    role: 'admin'
  }
  
  // Return a profile with all necessary properties and methods
  return {
    profile: dummyProfile,
    loading: false,
    hasProfile: true,
    saveProfile: (data: UserProfile) => {
      console.log('Save profile called - this is a no-op in demo mode', data)
    },
    clearProfile: () => {
      console.log('Clear profile called - this is a no-op in demo mode')
    }
  }
}
