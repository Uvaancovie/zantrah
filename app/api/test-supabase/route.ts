import { NextResponse } from 'next/server'

// Demo mode version of the API endpoint
export async function GET() {
  try {
    // Return mock data in demo mode
    return NextResponse.json({ 
      success: true, 
      sample: [{ id: 'demo-user-id-123' }],
      mode: 'demo'
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
