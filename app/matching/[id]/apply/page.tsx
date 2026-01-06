
import { ApplyForm } from "@/components/matching/apply-form"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getJobPostingById } from "@/lib/mock-data"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = getJobPostingById(id)

  if (!job) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-6 text-center">
          <p className="text-muted-foreground">求人情報が見つかりませんでした</p>
          <Button asChild className="mt-4">
            <Link href="/matching">一覧に戻る</Link>
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-3xl space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/matching/${job.id}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-balance">求人への応募</h1>
            <p className="text-muted-foreground mt-1">必要事項を入力してください</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>応募先情報</CardTitle>
            <CardDescription className="space-y-1">
              <p className="font-semibold text-foreground">{job.title}</p>
              <p>{job.facility}</p>
            </CardDescription>
          </CardHeader>
        </Card>

        <ApplyForm job={{ ...job, skills: [], salary: job.salary || "応相談" }} />
      </div>
    </DashboardLayout>
  )
}
