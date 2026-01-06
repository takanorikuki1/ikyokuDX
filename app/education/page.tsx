
import { EducationPageClient } from "@/components/education/education-page-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getEducationContent } from "@/lib/db"

export default async function EducationPage() {
  const education = await getEducationContent()
  return (
    <DashboardLayout>
      <EducationPageClient initialContent={education as any} />
    </DashboardLayout>
  )
}
