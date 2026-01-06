
import { DonationPageClient } from "@/components/donation/donation-page-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getDonationProjects, getRecentDonations } from "@/lib/db"

export default async function DonationPage() {
  const projects = await getDonationProjects()
  const donations = await getRecentDonations()
  return (
    <DashboardLayout>
      <DonationPageClient projects={projects as any} recentDonations={donations as any} />
    </DashboardLayout>
  )
}
