import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // デモ用: ファイルを読み込んで簡単な解析をシミュレート
    await file.text()

    // 遅延をシミュレートしてAI処理っぽく見せる
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // デモ用のサンプルデータを返す
    const mockData = {
      institution: "東京大学医学部附属病院",
      position: "産婦人科医師",
      location: "東京都文京区",
      employmentType: "常勤",
      salary: "年収1,200万円〜1,800万円（経験に応じて優遇）",
      description:
        "周産期医療を中心とした総合的な産婦人科診療を担当していただきます。最新の医療設備が整った環境で、チーム医療を実践しています。",
      requirements: "産婦人科専門医資格保有者、または取得見込みの方。周産期医療の経験がある方を歓迎します。",
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error processing file upload:", error)
    return NextResponse.json({ error: "Failed to extract job data" }, { status: 500 })
  }
}
