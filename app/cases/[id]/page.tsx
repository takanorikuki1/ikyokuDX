
import { CaseDetailClient } from "@/components/cases/case-detail-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getCaseStudyById } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const caseStudy = await getCaseStudyById(id)

  if (!caseStudy) {
    notFound()
  }

  return (
    <DashboardLayout>
      <CaseDetailClient caseStudy={caseStudy as any} />
    </DashboardLayout>
  )
}

