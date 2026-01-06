import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Video, Briefcase, MessageSquare } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "case",
    title: "双胎妊娠における胎児発育不全の管理",
    user: "山田太郎",
    time: "2時間前",
    icon: FileText,
  },
  {
    id: "2",
    type: "education",
    title: "体外受精の最新技術",
    user: "佐藤花子",
    time: "5時間前",
    icon: Video,
  },
  {
    id: "3",
    type: "job",
    title: "産婦人科常勤医師募集",
    user: "横浜総合病院",
    time: "1日前",
    icon: Briefcase,
  },
  {
    id: "4",
    type: "board",
    title: "胎児心拍数モニタリングの判読について",
    user: "鈴木美咲",
    time: "1日前",
    icon: MessageSquare,
  },
]

const typeColors = {
  case: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  education: "bg-green-500/10 text-green-700 dark:text-green-400",
  job: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  board: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
}

const typeText = {
  case: "症例",
  education: "教育",
  job: "求人",
  board: "掲示板",
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近の活動</CardTitle>
        <CardDescription>ネットワーク全体の最新情報</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm line-clamp-1">{activity.title}</h4>
                    <Badge className={`${typeColors[activity.type as keyof typeof typeColors]} text-xs flex-shrink-0`}>
                      {typeText[activity.type as keyof typeof typeText]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
