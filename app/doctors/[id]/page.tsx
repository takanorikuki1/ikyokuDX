
import { DoctorProfileClient } from "@/components/doctors/doctor-profile-client"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { getDoctorById } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const doctor = await getDoctorById(id)

  if (!doctor) {
    notFound()
  }

  return (
    <DashboardLayout>
      <DoctorProfileClient doctor={doctor as any} />
    </DashboardLayout>
  )
}

