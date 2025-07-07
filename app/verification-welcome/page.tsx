import { Suspense } from "react"
import VerificationWelcome from "@/components/verification/verification-welcome"

function VerificationWelcomeContent() {
  return <VerificationWelcome />
}

export default function VerificationWelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <VerificationWelcomeContent />
    </Suspense>
  )
}
