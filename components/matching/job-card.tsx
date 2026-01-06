import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Calendar, Users } from "lucide-react"
import type { JobPosting } from "@/lib/mock-data"
import Link from "next/link"

interface JobCardProps {
  job: JobPosting
}

export function JobCard({ job }: JobCardProps) {
  const typeText = {
    "full-time": "常勤",
    "part-time": "非常勤",
    temporary: "期間限定",
  }

  return (
    <Card className="glass-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-balance">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{job.facility}</p>
          </div>
          <Badge variant={job.type === "full-time" ? "default" : "secondary"}>{typeText[job.type]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>

        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>応募締切: {new Date(job.deadline).toLocaleDateString("ja-JP")}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{job.applicants}名応募中</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.requirements?.slice(0, 2).map((req, index) => (
            <Badge key={index} variant="outline">
              {req}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={`/matching/${job.id}`}>詳細を見る</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1 bg-transparent">
          <Link href={`/matching/${job.id}/apply`}>応募する</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
