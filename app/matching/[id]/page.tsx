
import { JobDetailClient } from "@/components/matching/job-detail-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getJobPostingById } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const job = await getJobPostingById(id)

  if (!job) {
    notFound()
  }

  return (
    <DashboardLayout>
      <JobDetailClient job={job as any} />
    </DashboardLayout>
  )
}

