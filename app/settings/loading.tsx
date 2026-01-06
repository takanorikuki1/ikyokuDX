import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <DashboardLayout>
      <div className="container max-w-4xl mx-auto p-6 md:p-8 space-y-6">
        <div>
          <Skeleton className="h-10 w-32 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </DashboardLayout>
  )
}
