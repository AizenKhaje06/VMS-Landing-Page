import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwzOj_NUTrWAL6o7ZlgEUdVdnYbFeXsRwErqWK3JnQFRzN86-FQa2zrMwDTneSx_Pdc/exec"

const OWNER_EMAIL = "cwagoventures@gmail.com"

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    console.log("[v0] Received order data:", orderData)

    const appScriptData = {
      submittedAt: new Date().toISOString(),
      orderNumber: orderData.orderNumber,
      fullName: orderData.fullName,
      phone: orderData.phone,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      quantity: orderData.quantity,
      totalPrice: orderData.totalPrice,
      paymentMethod: orderData.paymentMethod,
      codBalance: orderData.paymentMethod === "cod" ? orderData.codBalance : "",
      imageUrl: orderData.imageUrl || "",
      notes: orderData.notes || "",
    }

    console.log("[v0] Formatted data for Google Apps Script:", appScriptData)

    const formData = new URLSearchParams()
    formData.append("data", JSON.stringify(appScriptData))

    // Send to Google Apps Script
    const appScriptResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      redirect: "follow",
    })

    console.log("[v0] Google Apps Script response status:", appScriptResponse.status)

    if (appScriptResponse.status === 302 || appScriptResponse.ok) {
      console.log("[v0] Order processed successfully by Google Apps Script")

      sendCustomerEmail(orderData).catch(() => {
        // Silently fail - emails are handled by Google Apps Script
      })

      return NextResponse.json(
        { success: true, message: "Order submitted successfully", orderId: orderData.orderNumber },
        { status: 200 },
      )
    }

    const responseText = await appScriptResponse.text()
    console.error("[v0] Google Apps Script error:", responseText)
    return NextResponse.json({ error: "Failed to process order. Please try again." }, { status: 500 })
  } catch (error) {
    console.error("[v0] Order submission error:", error)
    return NextResponse.json({ error: "Network error. Please try again." }, { status: 500 })
  }
}

async function sendCustomerEmail(orderData: any) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY

  if (!RESEND_API_KEY) {
    return
  }

  const recipientEmail = OWNER_EMAIL
  const SENDER_EMAIL = "onboarding@resend.dev"

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #d97706 0%, #ea580c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
    .order-box { background: white; border: 2px solid #d97706; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .order-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .order-item:last-child { border-bottom: none; }
    .label { color: #6b7280; }
    .value { font-weight: bold; color: #111827; }
    .total { font-size: 24px; color: #d97706; font-weight: bold; }
    .instructions { background: #fef3c7; border-left: 4px solid #d97706; padding: 15px; margin: 20px 0; border-radius: 4px; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
    .button { display: inline-block; background: #d97706; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    .test-notice { background: #fef2f2; border: 2px solid #ef4444; padding: 15px; margin: 15px 0; border-radius: 8px; color: #991b1b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="test-notice">
      <strong>📧 Testing Mode:</strong> Customer email: ${orderData.email}
    </div>
    
    <div class="header">
      <h1>🎉 Order Confirmed!</h1>
      <p>Thank you for your order, ${orderData.fullName}!</p>
    </div>
    
    <div class="content">
      <h2>Order Details</h2>
      <div class="order-box">
        <div class="order-item">
          <span class="label">Order Number:</span>
          <span class="value">${orderData.orderNumber}</span>
        </div>
        <div class="order-item">
          <span class="label">Product:</span>
          <span class="value">Volcanic Mud Scrub</span>
        </div>
        <div class="order-item">
          <span class="label">Quantity:</span>
          <span class="value">${orderData.quantity}</span>
        </div>
        <div class="order-item">
          <span class="label">Total Amount:</span>
          <span class="total">₱${orderData.totalPrice}</span>
        </div>
      </div>

      <h3>Shipping Information</h3>
      <div class="order-box">
        <div class="order-item">
          <span class="label">Name:</span>
          <span class="value">${orderData.fullName}</span>
        </div>
        <div class="order-item">
          <span class="label">Phone:</span>
          <span class="value">${orderData.phone}</span>
        </div>
        <div class="order-item">
          <span class="label">Email:</span>
          <span class="value">${orderData.email}</span>
        </div>
        <div class="order-item">
          <span class="label">Address:</span>
          <span class="value">${orderData.address}, ${orderData.city}</span>
        </div>
      </div>

      <div class="instructions">
        <h3>📱 GCash Payment Instructions</h3>
        <ol>
          <li>Open your GCash app</li>
          <li>Send <strong>₱${orderData.totalPrice}</strong> to: <strong>09XX-XXX-XXXX</strong></li>
          <li>Use reference: <strong>${orderData.orderNumber}</strong></li>
          <li>Screenshot your payment confirmation</li>
          <li>Send the screenshot to our <a href="https://www.facebook.com/CosmiBeautiiMain">Facebook Page</a></li>
        </ol>
      </div>

      <h3>What Happens Next?</h3>
      <ul>
        <li>✅ Our team will verify your payment (usually within 1 hour)</li>
        <li>📞 We'll call you to confirm delivery details</li>
        <li>📦 Your order will be prepared and shipped</li>
        <li>📲 Track your package via SMS updates</li>
      </ul>

      <div class="footer">
        <p>Need help? Contact us:</p>
        <p>📱 Phone: 0917 XXX XXXX</p>
        <p>💬 Facebook: <a href="https://www.facebook.com/CosmiBeautiiMain">Cosmi Beautii</a></p>
        <p style="margin-top: 20px; font-size: 12px;">This is an automated confirmation email. Please do not reply.</p>
      </div>
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
        subject: `Order Confirmation - ${orderData.orderNumber} | Cosmi Beautii`,
        html: emailHtml,
      }),
    })

    if (response.ok) {
      console.log("[v0] Confirmation email sent to owner:", recipientEmail)
    }
  } catch (error) {
    // Silently fail - not critical since Google Apps Script handles notifications
  }
}
