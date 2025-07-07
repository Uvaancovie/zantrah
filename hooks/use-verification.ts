"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useAuth } from "./use-auth"

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

export function useVerification() {
  const { user } = useAuth()
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchVerificationRequest()
    } else {
      setVerificationRequest(null)
      setLoading(false)
    }
  }, [user])

  const fetchVerificationRequest = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase.from("verification_requests").select("*").eq("user_id", user.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching verification request:", error)
        return
      }

      setVerificationRequest(data || null)
    } catch (error) {
      console.error("Error fetching verification request:", error)
    } finally {
      setLoading(false)
    }
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
    if (!user) throw new Error("User not authenticated")

    // Upload documents
    let idDocumentUrl = ""
    let proofOfAddressUrl = ""

    if (formData.idDocument) {
      idDocumentUrl = await uploadFile(formData.idDocument, "id-documents")
    }

    if (formData.proofOfAddress) {
      proofOfAddressUrl = await uploadFile(formData.proofOfAddress, "proof-of-address")
    }

    // Insert verification request
    const { data, error } = await supabase
      .from("verification_requests")
      .insert({
        user_id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        age: Number.parseInt(formData.age),
        nationality: formData.nationality,
        id_number: formData.idNumber,
        id_document_url: idDocumentUrl,
        proof_of_address_url: proofOfAddressUrl,
      })
      .select()
      .single()

    if (error) throw error

    // Send verification email
    await sendVerificationEmail({
      ...formData,
      userId: user.id,
      verificationId: data.id,
      idDocumentUrl,
      proofOfAddressUrl,
    })

    setVerificationRequest(data)
    return data
  }

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    if (!user) throw new Error("User not authenticated")

    const fileExt = file.name.split(".").pop()
    const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("verification-documents").upload(fileName, file)

    if (error) throw error
    return data.path
  }

  const sendVerificationEmail = async (verificationData: any) => {
    try {
      await fetch("/api/send-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(verificationData),
      })
    } catch (error) {
      console.error("Failed to send verification email:", error)
    }
  }

  return {
    verificationRequest,
    loading,
    submitVerificationRequest,
    refetch: fetchVerificationRequest,
    hasVerificationRequest: !!verificationRequest,
    verificationStatus: verificationRequest?.status || null,
  }
}
