import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const audio = formData.get("audio") as File | null

    if (!audio) {
      return NextResponse.json({ error: "No audio provided" }, { status: 400 })
    }

    // デモ用: 音声ファイルを受け取ったことを確認
    await audio.arrayBuffer()

    // 遅延をシミュレートして音声認識・AI処理っぽく見せる
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // デモ用のサンプルデータを返す
    const mockData = {
      institution: "横浜市立大学附属市民総合医療センター",
      position: "産婦人科医師（周産期専門）",
      location: "神奈川県横浜市南区",
      employmentType: "常勤",
      salary: "年収1,100万円〜1,600万円",
      description:
        "ハイリスク妊娠を中心とした周産期医療に携わっていただきます。NICUとの連携も密接で、総合周産期母子医療センターとしての機能を果たしています。",
      requirements:
        "産婦人科専門医、周産期専門医（母体・胎児）資格保有者優遇。チーム医療に積極的に参加できる方を募集しています。",
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error processing audio upload:", error)
    return NextResponse.json({ error: "Failed to extract job data from audio" }, { status: 500 })
  }
}
