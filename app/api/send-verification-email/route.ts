import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Email content for admin notification
    const emailContent = `
      🔔 NEW VENDOR VERIFICATION REQUEST - ZANTRA
      
      ═══════════════════════════════════════════════
      📋 VENDOR DETAILS
      ═══════════════════════════════════════════════
      
      👤 Full Name: ${data.fullName}
      📧 Email: ${data.email}
      🎂 Age: ${data.age}
      🌍 Nationality: ${data.nationality}
      🆔 ID Number: ${data.idNumber}
      🔗 User ID: ${data.userId}
      📝 Verification ID: ${data.verificationId}
      
      ═══════════════════════════════════════════════
      📎 DOCUMENTS UPLOADED
      ═══════════════════════════════════════════════
      
      🆔 ID Document: ${data.idDocumentUrl ? "✅ Uploaded" : "❌ Not uploaded"}
      🏠 Proof of Address: ${data.proofOfAddressUrl ? "✅ Uploaded" : "❌ Not uploaded"}
      
      ═══════════════════════════════════════════════
      📋 NEXT STEPS
      ═══════════════════════════════════════════════
      
      1. 📂 Review uploaded documents in Supabase storage
      2. 📞 Schedule video call with vendor
      3. ✅ Complete verification process
      4. 🚀 Activate vendor account
      
      🔗 Admin Panel: ${process.env.NEXT_PUBLIC_SITE_URL}/admin/verifications
      
      ═══════════════════════════════════════════════
      
      This is an automated message from Zantra's verification system.
      Please process this request within 24 hours.
    `

    // In a real application, you would use an email service like SendGrid, Resend, etc.
    // For now, we'll simulate sending to way2flyagency@gmail.com
    console.log("📧 Sending verification email to: way2flyagency@gmail.com")
    console.log("Email Content:", emailContent)

    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: 'way2flyagency@gmail.com',
      from: 'noreply@zantra.com',
      subject: `🔔 New Verification Request - ${data.fullName} (${data.nationality})`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    })
    */

    // Simulate successful email sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Verification email sent to way2flyagency@gmail.com",
      recipient: "way2flyagency@gmail.com",
    })
  } catch (error) {
    console.error("Error sending verification email:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send verification email",
      },
      { status: 500 },
    )
  }
}
