
import { BoardPageClient } from "@/components/board/board-page-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getBoardPosts } from "@/lib/db"

export default async function BoardPage() {
  const posts = await getBoardPosts()
  return (
    <DashboardLayout>
      <BoardPageClient initialPosts={posts as any} />
    </DashboardLayout>
  )
}
