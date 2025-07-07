import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    "https://mwfwnjztrqseoqzoycsc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Znduanp0cnFzZW9xem95Y3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjMxNTcsImV4cCI6MjA2NjkzOTE1N30.jIr2TDchAENpxRozPhl3c8v3Wsr_FymxbqhiMv1GRXI",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    },
  )
}
