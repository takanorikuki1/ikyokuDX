import { DoctorsPageClient } from "@/components/doctors/doctors-page-client"
import { getDoctors } from "@/lib/db"

export default async function DoctorsPage() {
  const doctors = await getDoctors()
  return <DoctorsPageClient initialDoctors={doctors as any} />
}
