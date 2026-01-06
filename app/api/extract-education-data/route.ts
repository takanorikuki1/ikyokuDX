import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // ファイルまたは音声データを受け取る
    const formData = await request.formData()
    const file = formData.get("file")
    const audio = formData.get("audio")

    // デモ用: 実際のAI解析の代わりにモックデータを返す
    // 本番環境では、ここでAI SDKを使用してファイル/音声を解析

    // シミュレート遅延
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // デモデータ
    const mockData = {
      title: "妊娠高血圧症候群の最新治療",
      type: "video",
      category: "周産期",
      level: "intermediate",
      duration: "60分",
      instructor: "山田太郎",
      description: "妊娠高血圧症候群の病態生理から最新の治療戦略まで、エビデンスに基づいた実践的な内容をお伝えします。",
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error extracting education data:", error)
    return NextResponse.json({ error: "Failed to extract education data" }, { status: 500 })
  }
}
