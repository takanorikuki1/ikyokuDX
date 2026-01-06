import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    const { data: profile } = await supabase.from("profiles").select("id").single()

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobData = {
      user_id: profile.id,
      title: body.title,
      hospital: body.hospital,
      location: body.location,
      department: body.department,
      employment_type: body.employmentType,
      salary_range: body.salary,
      description: body.description,
      requirements: body.requirements.split("\n").filter((r: string) => r.trim()),
      status: "active",
    }

    const { data, error } = await supabase.from("jobs").insert([jobData]).select().single()

    if (error) {
      console.error("Error creating job:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("Error creating job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
