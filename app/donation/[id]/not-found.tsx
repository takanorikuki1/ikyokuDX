import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DonationNotFound() {
  return (
    <DashboardLayout>
      <div className="container max-w-2xl mx-auto p-6 md:p-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle>プロジェクトが見つかりません</CardTitle>
            <CardDescription>指定された寄付プロジェクトは存在しないか、削除された可能性があります。</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/donation">
              <Button>寄付ページに戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
