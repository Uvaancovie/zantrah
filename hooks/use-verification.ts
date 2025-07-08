"use client"

interface VerificationRequest {
  id: string
  user_id: string
  full_name: string
  email: string
  age: number
  nationality: string
  id_number: string
  id_document_url: string | null
  proof_of_address_url: string | null
  status: "pending" | "approved" | "rejected" | "video_scheduled"
  video_call_scheduled_at: string | null
  video_call_completed_at: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

// This is a stubbed version of useVerification
export function useVerification() {
  // Create a dummy verification request
  const dummyVerification: VerificationRequest = {
    id: '1',
    user_id: '1',
    full_name: 'Demo User',
    email: 'demo@zantra.com',
    age: 30,
    nationality: 'South African',
    id_number: 'ABC123456789',
    id_document_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
    proof_of_address_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center',
    status: 'approved',
    video_call_scheduled_at: null,
    video_call_completed_at: null,
    admin_notes: null,
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-01T00:00:00.000Z'
  }
  
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    console.log(`Upload file called with ${file.name} to ${folder} - this is a no-op in demo mode`)
    return 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center'
  }
  
  const sendVerificationEmail = async (verificationData: any) => {
    console.log('Send verification email called - this is a no-op in demo mode', verificationData)
  }
  
  const submitVerificationRequest = async (formData: {
    fullName: string
    email: string
    age: string
    nationality: string
    idNumber: string
    idDocument: File | null
    proofOfAddress: File | null
  }) => {
    console.log('Submit verification request called with:', formData)
    return dummyVerification
  }
  
  return {
    verificationRequest: dummyVerification,
    loading: false,
    hasVerificationRequest: true,
    submitVerificationRequest,
    uploadFile,
    refetch: () => console.log('Refetch called - this is a no-op in demo mode'),
    checkVerificationStatus: () => 'approved'
  }
}
