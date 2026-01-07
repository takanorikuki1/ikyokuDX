import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ChatPageClient } from "@/components/messages/chat-page-client"
import { getConversation, getMessages } from "@/lib/db"
import { notFound } from "next/navigation"

interface ChatPageProps {
  params: Promise<{ id: string }>
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params
  const conversation = await getConversation(id)

  if (!conversation) {
    notFound()
  }

  const messages = await getMessages(id)

  return (
    <DashboardLayout>
      <ChatPageClient
        conversation={conversation as any}
        initialMessages={messages as any}
      />
    </DashboardLayout>
  )
}
