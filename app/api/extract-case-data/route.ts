import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const audio = formData.get("audio")

    // シミュレート遅延
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // デモデータ
    const mockData = {
      title: "妊娠高血圧症候群の管理症例",
      category: "周産期",
      patientAge: "32歳",
      diagnosis: "妊娠高血圧症候群（重症）",
      symptoms: "妊娠32週、頭痛と視覚障害を主訴に来院。血圧180/110mmHg、尿蛋白3+、浮腫著明。",
      treatment:
        "入院管理とし、降圧療法開始。硫酸マグネシウムによる痙攣予防。胎児モニタリング継続。妊娠34週で帝王切開による娩出。",
      outcome: "母体は術後経過良好、血圧は徐々に正常化。新生児は2200g、Apgar 8/9点で出生、NICUで管理後、順調に発育。",
      learnings: "早期発見と適切なタイミングでの娩出決定が重要。多職種連携により母児ともに良好な転帰を得られた。",
    }

    return NextResponse.json(mockData)
  } catch (error) {
    console.error("Error extracting case data:", error)
    return NextResponse.json({ error: "Failed to extract case data" }, { status: 500 })
  }
}
