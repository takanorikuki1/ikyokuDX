import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-7xl">
        <Card className="max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileQuestion className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle>投稿が見つかりません</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">指定された投稿は削除されたか、存在しません。</p>
            <Link href="/board">
              <Button>掲示板に戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
