"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, Building2, GraduationCap, Stethoscope } from "lucide-react"
import Link from "next/link"
import { CreateDonationDialog } from "./create-donation-dialog"

const projectIcons: Record<string, typeof Heart> = {
  medical_network: Building2,
  education: GraduationCap,
  equipment: Stethoscope,
}

interface DonationPageClientProps {
  projects: any[]
  recentDonations: any[]
}

export function DonationPageClient({ projects, recentDonations }: DonationPageClientProps) {
  const totalAmount = projects.reduce((sum, p) => sum + (p.current_amount || 0), 0)
  const totalSupporters = projects.reduce((sum, p) => sum + (p.supporter_count || 0), 0)

  return (
    <div className="container max-w-7xl mx-auto p-6 md:p-8 space-y-8">
      {/* ヘッダーセクション */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="text-center sm:text-left space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100">
            <Heart className="w-6 h-6 text-rose-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">寄付・支援</h1>
          <p className="text-muted-foreground">地域医療の発展と医師のキャリア支援のためのプロジェクト</p>
        </div>
        <CreateDonationDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* プロジェクト一覧 */}
          <Card>
            <CardHeader>
              <CardTitle>支援プロジェクト</CardTitle>
              <CardDescription>ご支援いただきたいプロジェクトをお選びください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((project) => {
                const Icon = projectIcons[project.category] || Heart
                const progress = ((project.current_amount || 0) / (project.goal_amount || 1)) * 100
                return (
                  <Link key={project.id} href={`/donation/${project.id}`}>
                    <div className="p-4 border rounded-lg space-y-3 hover:border-primary transition-colors cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {(project.current_amount || 0).toLocaleString()}円 / {(project.goal_amount || 0).toLocaleString()}円
                              </span>
                              <span className="font-medium">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="w-4 h-4" />
                              <span>{project.supporter_count || 0}人の支援者</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 統計情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">支援の実績</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">総支援額</span>
                  <span className="font-semibold">{totalAmount.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">支援者数</span>
                  <span className="font-semibold">{totalSupporters}名</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">実行中プロジェクト</span>
                  <span className="font-semibold">{projects.length}件</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 最近の寄付 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">最近のご支援</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="space-y-1 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{donation.profiles?.full_name || donation.donor_name}</span>
                    <Badge variant="secondary">{(donation.amount || 0).toLocaleString()}円</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(donation.created_at).toLocaleDateString("ja-JP")}
                  </p>
                  {donation.message && <p className="text-sm text-muted-foreground italic">{donation.message}</p>}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
