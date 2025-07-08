import { type NextRequest, NextResponse } from "next/server"

// Demo mode version of the API endpoint - always returns success
export async function POST(request: NextRequest) {
  try {
    // Log the request for demo purposes
    console.log('Verification email would be sent in production mode')
    
    // Return success response
    return NextResponse.json(
      { success: true, message: "Email sent successfully (demo mode)" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error in send verification email endpoint:", error)
    return NextResponse.json(
      { success: false, message: "Failed to send verification email" },
      { status: 500 }
    )
  }
}
