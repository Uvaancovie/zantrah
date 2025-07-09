import { Suspense } from "react"
import RegisterFormEnhanced from "@/components/auth/register-form-enhanced"

function RegisterContent() {
  return <RegisterFormEnhanced />
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  )
}
