
import { DashboardClient } from "@/components/dashboard/dashboard-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getDoctors, getJobPostings, getCaseStudies } from "@/lib/db"

export default async function DashboardPage() {
  const doctors = await getDoctors()
  const jobs = await getJobPostings()
  const cases = await getCaseStudies()

  // Note: Notifications are not yet in DB, passing mock empty or handled in client 
  // until we add getNotifications to db.ts

  return (
    <DashboardLayout>
      <DashboardClient
        initialDoctors={doctors as any}
        initialJobs={jobs as any}
        initialCases={cases as any}
      />
    </DashboardLayout>
  )
}
