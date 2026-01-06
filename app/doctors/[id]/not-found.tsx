import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserX } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
              <UserX className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">医師が見つかりません</h2>
              <p className="text-muted-foreground mt-2">
                指定された医師のプロフィールは存在しないか、削除されています。
              </p>
            </div>
            <Button asChild>
              <Link href="/doctors">登録医師一覧に戻る</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
