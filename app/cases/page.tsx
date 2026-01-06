
import { CasesPageClient } from "@/components/cases/cases-page-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getCaseStudies } from "@/lib/db"

export default async function CasesPage() {
  const cases = await getCaseStudies()
  return (
    <DashboardLayout>
      <CasesPageClient initialCases={cases as any} />
    </DashboardLayout>
  )
}
