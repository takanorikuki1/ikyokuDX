import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConversationList } from "@/components/messages/conversation-list"
import { MessageThread } from "@/components/messages/message-thread"
import { MOCK_CONVERSATIONS, getMessagesByConversationId } from "@/lib/mock-data"

export default async function ConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id)

  if (!conversation) {
    notFound()
  }

  const messages = getMessagesByConversationId(id)

  return (
    <DashboardLayout>
      <div className="h-full flex">
        <div className="w-full md:w-80 border-r">
          <ConversationList conversations={MOCK_CONVERSATIONS} activeId={id} />
        </div>

        <div className="hidden md:flex flex-1">
          <MessageThread
            messages={messages}
            conversationName={conversation.name || conversation.participantNames.join(", ")}
            conversationType={conversation.type}
          />
        </div>

        <div className="md:hidden w-full">
          <MessageThread
            messages={messages}
            conversationName={conversation.name || conversation.participantNames.join(", ")}
            conversationType={conversation.type}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
