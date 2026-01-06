import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Target, CheckCircle2, ArrowLeft } from "lucide-react"
import { MOCK_DONATION_PROJECTS, MOCK_RECENT_DONATIONS } from "@/lib/mock-data"
import { DonationForm } from "@/components/donation/donation-form"
import { SponsorAd } from "@/components/sponsor/sponsor-ad"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

export default async function DonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = MOCK_DONATION_PROJECTS.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const progress = (project.current / project.goal) * 100
  const projectDonations = MOCK_RECENT_DONATIONS.filter((d) => d.projectId === id)

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        {/* 戻るボタン */}
        <Link href="/donation">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            寄付ページに戻る
          </Button>
        </Link>

        {/* プロジェクトヘッダー */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge>{project.category}</Badge>
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.description}</p>
          </div>

          {/* プロジェクト画像 */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
          </div>

          {/* 進捗状況 */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-bold text-primary">{project.current.toLocaleString()}円</p>
                    <p className="text-sm text-muted-foreground">目標: {project.goal.toLocaleString()}円</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{Math.round(progress)}%</p>
                    <p className="text-sm text-muted-foreground">達成率</p>
                  </div>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{project.supporters}人の支援者</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {project.startDate} 〜 {project.endDate}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* プロジェクト詳細 */}
            <Card>
              <CardHeader>
                <CardTitle>プロジェクトについて</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground">{project.detailedDescription}</p>
                </div>
              </CardContent>
            </Card>

            {/* 期待される効果 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  期待される効果
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 活動報告 */}
            <Card>
              <CardHeader>
                <CardTitle>活動報告</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{update.date}</span>
                    </div>
                    <h4 className="font-semibold">{update.title}</h4>
                    <p className="text-sm text-muted-foreground">{update.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* このプロジェクトへの寄付 */}
            {projectDonations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>このプロジェクトへのご支援</CardTitle>
                  <CardDescription>{projectDonations.length}件のご支援をいただきました</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projectDonations.map((donation) => (
                    <div key={donation.id} className="space-y-1 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <span className="font-medium">{donation.name}</span>
                        <Badge variant="secondary">{donation.amount.toLocaleString()}円</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{donation.date}</p>
                      {donation.message && <p className="text-sm text-muted-foreground italic">{donation.message}</p>}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* 寄付フォーム */}
            <DonationForm projectId={project.id} projectTitle={project.title} />

            {/* スポンサー広告 */}
            <SponsorAd />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
