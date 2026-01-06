import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConversationListClient } from "@/components/messages/conversation-list-client"
import { MessageSquare } from "lucide-react"
import { MOCK_CONVERSATIONS } from "@/lib/mock-data"

export default function MessagesPage() {
  return (
    <DashboardLayout>
      <div className="h-full flex">
        <div className="w-full md:w-80 border-r">
          <ConversationListClient conversations={MOCK_CONVERSATIONS} />
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center bg-muted/20">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-xl mb-2">メッセージを選択</h2>
              <p className="text-muted-foreground">左側のリストから会話を選択してください</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
