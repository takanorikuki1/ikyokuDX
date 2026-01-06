"use server"

import { revalidatePath } from "next/cache"

export async function createJobPostingAction(formData: any) {
  console.log("[v0] 新規求人作成 (Server Action):", formData)

  // ここでデータベースへの保存などの処理を行う
  // 例: await db.jobPostings.create({ data: formData })

  revalidatePath("/matching") // ページのキャッシュを再検証して最新のデータを表示
}
