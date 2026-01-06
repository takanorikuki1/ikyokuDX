import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function ConversationLoading() {
  return (
    <DashboardLayout>
      <div className="h-full flex">
        <div className="w-80 border-r p-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 space-y-4">
          <Skeleton className="h-12 w-full" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}>
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-16 w-64 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
