import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { MessagesPageClient } from "@/components/messages/messages-page-client"
import { getConversations } from "@/lib/db"
import { getDoctors } from "@/lib/db"

export default async function MessagesPage() {
  const conversations = await getConversations()
  const doctors = await getDoctors()

  return (
    <DashboardLayout>
      <MessagesPageClient
        initialConversations={conversations as any}
        doctors={doctors as any}
      />
    </DashboardLayout>
  )
}
