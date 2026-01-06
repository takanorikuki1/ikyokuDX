import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { RoleSelector } from "@/components/role-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">設定</h1>
          <p className="text-muted-foreground">アカウントとシステムの設定を管理します</p>
        </div>

        <RoleSelector />

        <Card>
          <CardHeader>
            <CardTitle>アカウント情報</CardTitle>
            <CardDescription>基本的なアカウント情報の管理</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">アカウント設定機能は今後追加予定です</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>通知設定</CardTitle>
            <CardDescription>メールやプッシュ通知の設定</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">通知設定機能は今後追加予定です</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>プライバシー設定</CardTitle>
            <CardDescription>データとプライバシーの管理</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">プライバシー設定機能は今後追加予定です</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
