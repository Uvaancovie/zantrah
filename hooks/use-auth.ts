"use client"

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

// This is a stubbed version of useAuth that always returns an authenticated user
export function useAuth() {
  const dummyUser: UserProfile = { 
    id: '1', 
    firstName: 'Demo', 
    lastName: 'User',
    email: 'demo@zantra.com',
    country: 'South Africa',
    phone: '+27123456789',
    role: 'admin', 
    isVerified: true 
  }
  
  // Return a dummy user with all necessary properties and methods
  return { 
    user: dummyUser, 
    profile: dummyUser, 
    loading: false, 
    isAuthenticated: true, 
    isVerified: true,
    userRole: dummyUser.role,
    signOut: () => {
      console.log('Sign out clicked - this is a no-op in demo mode')
      // In demo mode, don't actually sign out
    },
    updateUser: () => {
      console.log('Update user called - this is a no-op in demo mode')
      // In demo mode, don't actually update
    }
  }
}
