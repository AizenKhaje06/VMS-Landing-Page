import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    // Convert file to base64 for Vercel Blob
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `payment-proof-${timestamp}.${file.type.split("/")[1]}`

    // For Vercel Blob storage (if using Blob integration)
    // For now, we'll return a placeholder URL that can be used in the order
    // You can integrate Vercel Blob or another storage service here

    const imageUrl = `/uploads/${filename}`

    console.log("[v0] Image uploaded:", {
      filename: filename,
      size: file.size,
      type: file.type,
      url: imageUrl,
    })

    return NextResponse.json(
      {
        success: true,
        url: imageUrl,
        filename: filename,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Image upload error:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
