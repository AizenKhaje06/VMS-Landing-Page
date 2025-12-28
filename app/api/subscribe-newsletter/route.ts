import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Extract first name from email (part before @)
    const firstName = email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1)

    console.log("[v0] Newsletter subscription from:", email)

    // Send welcome email
    await sendWelcomeEmail(email, firstName)

    return NextResponse.json({ success: true, message: "Successfully subscribed!" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Newsletter subscription error:", error)
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 })
  }
}

async function sendWelcomeEmail(email: string, firstName: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY

  if (!RESEND_API_KEY) {
    console.log("[v0] No Resend API key found, skipping email")
    return
  }

  const SENDER_EMAIL = "onboarding@resend.dev"
  const OWNER_EMAIL = "cwagoventures@gmail.com"

  // Send to owner email in testing mode, but show it's for the customer
  const recipientEmail = OWNER_EMAIL

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.8; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: white; padding: 50px 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
    .sparkle { font-size: 40px; display: inline-block; animation: sparkle 2s infinite; }
    @keyframes sparkle { 0%, 100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.2) rotate(10deg); } }
    .content { padding: 50px 40px; }
    .content h2 { color: #1a1a1a; font-size: 24px; margin: 0 0 20px 0; }
    .content p { font-size: 16px; color: #4a4a4a; line-height: 1.8; margin: 15px 0; }
    .highlight-box { background: linear-gradient(135deg, #fff8e1 0%, #ffe9a0 100%); border-left: 4px solid #ffd700; padding: 25px; margin: 30px 0; border-radius: 8px; }
    .highlight-box p { margin: 8px 0; color: #2d2d2d; font-weight: 500; }
    .emoji { font-size: 20px; margin-right: 8px; }
    .signature { margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0; }
    .signature p { margin: 5px 0; color: #2d2d2d; }
    .brand { font-weight: 700; color: #1a1a1a; font-size: 18px; }
    .footer { background: #f9f9f9; padding: 30px; text-align: center; color: #888; font-size: 14px; }
    .test-notice { background: #fef2f2; border: 2px solid #ef4444; padding: 15px; margin: 20px; border-radius: 8px; color: #991b1b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="test-notice">
      <strong>📧 Testing Mode:</strong> This email is for: ${email}
    </div>
    
    <div class="header">
      <div class="sparkle">✨</div>
      <h1>CONGRATULATIONS FOR SUBSCRIBING!</h1>
    </div>
    
    <div class="content">
      <h2>Hi ${firstName},</h2>
      
      <p>Something special is brewing at <strong>Cosmibeautii</strong>! 💌</p>
      
      <div class="highlight-box">
        <p><span class="emoji">💎</span>Exclusive early access to new products</p>
        <p><span class="emoji">🎁</span>Special subscriber-only discounts</p>
        <p><span class="emoji">✨</span>Expert skincare tips and tricks</p>
        <p><span class="emoji">📬</span>First to know about promotions</p>
      </div>
      
      <p>From insider skincare tips to exclusive offers, you'll be the first to see what's coming.</p>
      
      <p><strong>Stay tuned… your skin's next favorite moment is on its way!</strong></p>
      
      <div class="signature">
        <p>With love,</p>
        <p class="brand">The Cosmibeautii Team</p>
      </div>
    </div>
    
    <div class="footer">
      <p>You're receiving this because you subscribed to Cosmibeautii newsletter.</p>
      <p>© 2025 Cosmibeautii. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: recipientEmail,
        subject: "Your glow-up is about to begin ✨",
        html: emailHtml,
      }),
    })

    if (response.ok) {
      console.log("[v0] Welcome email sent successfully to:", recipientEmail)
    } else {
      const errorData = await response.text()
      console.error("[v0] Failed to send welcome email:", errorData)
    }
  } catch (error) {
    console.error("[v0] Error sending welcome email:", error)
  }
}
