import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { MessageCircleOff } from "lucide-react"
import Link from "next/link"

export default function ConversationNotFound() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <MessageCircleOff className="w-20 h-20 text-muted-foreground" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">会話が見つかりません</h2>
          <p className="text-muted-foreground">指定された会話は存在しないか、削除された可能性があります。</p>
        </div>
        <Button asChild>
          <Link href="/messages">メッセージ一覧に戻る</Link>
        </Button>
      </div>
    </DashboardLayout>
  )
}
