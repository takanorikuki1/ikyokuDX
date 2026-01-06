import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // シミュレート遅延
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // デモデータ
    const mockData = {
      amount: "50000",
      project: "1",
      name: "山田太郎",
      email: "yamada@example.com",
      message: "地域医療の発展を応援しています",
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error extracting donation data:", error)
    return NextResponse.json({ error: "Failed to extract donation data" }, { status: 500 })
  }
}
