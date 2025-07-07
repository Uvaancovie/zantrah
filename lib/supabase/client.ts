import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://mwfwnjztrqseoqzoycsc.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Znduanp0cnFzZW9xem95Y3NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNjMxNTcsImV4cCI6MjA2NjkzOTE1N30.jIr2TDchAENpxRozPhl3c8v3Wsr_FymxbqhiMv1GRXI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
