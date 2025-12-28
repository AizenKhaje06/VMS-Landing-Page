import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { from, subject, message, to } = body

    // Validation
    if (!from || !subject || !message || !to) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // For now, we'll log the message and return success
    console.log("[v0] Contact form submission:", {
      from,
      to,
      subject,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending
    // In production, replace this with actual email service:
    // await sendEmail({ from, to, subject, message })

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
