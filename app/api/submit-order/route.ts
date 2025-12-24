import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwzOj_NUTrWAL6o7ZlgEUdVdnYbFeXsRwErqWK3JnQFRzN86-FQa2zrMwDTneSx_Pdc/exec" // Updated to latest deployment URL

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    console.log("[v0] Sending order to Google Apps Script:", orderData)

    const appScriptData = {
      submittedAt: new Date().toISOString(), // Send ISO timestamp, Apps Script will format it
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
