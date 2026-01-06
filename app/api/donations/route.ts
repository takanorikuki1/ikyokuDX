import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { projectId, donorName, donorEmail, amount, message, isAnonymous, paymentMethod } = body

    const { data, error } = await supabase
      .from("donations")
      .insert({
        project: projectId || "all",
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
        message,
        is_anonymous: isAnonymous,
        payment_method: paymentMethod,
        status: "completed",
      })
      .select()
      .single()

    if (error) throw error

    // プロジェクトの金額と支援者数を更新
    if (projectId && projectId !== "all") {
      const { data: project } = await supabase
        .from("donation_projects")
        .select("current_amount, supporter_count")
        .eq("id", projectId)
        .single()

      if (project) {
        await supabase
          .from("donation_projects")
          .update({
            current_amount: project.current_amount + amount,
            supporter_count: project.supporter_count + 1,
          })
          .eq("id", projectId)
      }
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("寄付登録エラー:", error)
    return NextResponse.json({ error: "寄付の登録に失敗しました" }, { status: 500 })
  }
}
