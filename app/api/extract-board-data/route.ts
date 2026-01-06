import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    // シミュレート遅延
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // デモデータ
    const mockData = {
      title: "地域医療連携カンファレンスのお知らせ",
      category: "event",
      content:
        "来月15日に地域の産婦人科医療機関による連携カンファレンスを開催します。周産期医療における地域連携体制の強化について議論します。多くの先生方のご参加をお待ちしております。日時：3月15日（金）19:00〜21:00、場所：医療センター3階会議室、参加費：無料",
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error extracting board data:", error)
    return NextResponse.json({ error: "Failed to extract board data" }, { status: 500 })
  }
}
