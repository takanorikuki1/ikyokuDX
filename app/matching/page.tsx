
import { MatchingPageClient } from "@/components/matching/matching-page-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getJobPostings, getDoctors } from "@/lib/db"

export default async function MatchingPage() {
  const jobs = await getJobPostings()
  const doctors = await getDoctors()

  return (
    <DashboardLayout>
      <MatchingPageClient initialJobs={jobs as any} initialDoctors={doctors as any} />
    </DashboardLayout>
  )
}
