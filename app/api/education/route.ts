import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from("education_content")
      .insert({
        user_id: "00000000-0000-0000-0000-000000000000", // デモ用のダミーユーザーID
        title: body.title,
        content_type: body.contentType,
        description: body.description,
        instructor: body.instructor,
        duration: body.duration,
        category: body.category,
        difficulty: body.difficulty,
        tags: body.tags ? body.tags.split(",").map((tag: string) => tag.trim()) : [],
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating education content:", error)
    return NextResponse.json({ error: "Failed to create education content" }, { status: 500 })
  }
}
