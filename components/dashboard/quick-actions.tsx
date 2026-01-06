import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Upload, Search, Calendar } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>クイックアクション</CardTitle>
        <CardDescription>よく使う機能に素早くアクセス</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
            <Link href="/cases">
              <Plus className="w-5 h-5" />
              <span className="text-sm">症例登録</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
            <Link href="/education">
              <Upload className="w-5 h-5" />
              <span className="text-sm">教材投稿</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
            <Link href="/matching">
              <Search className="w-5 h-5" />
              <span className="text-sm">求人検索</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent" asChild>
            <Link href="/board">
              <Calendar className="w-5 h-5" />
              <span className="text-sm">イベント</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
