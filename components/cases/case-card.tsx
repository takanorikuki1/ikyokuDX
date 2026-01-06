import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, MessageSquare, Calendar, User } from "lucide-react"
import Link from "next/link"
import type { CaseStudy } from "@/lib/mock-data"

interface CaseCardProps {
  caseStudy: CaseStudy
}

export function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 text-balance">{caseStudy.title}</CardTitle>
          <Badge>{caseStudy.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-4 h-4" />
          <span>{caseStudy.author}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(caseStudy.date).toLocaleDateString("ja-JP")}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{caseStudy.summary}</p>

        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-semibold">診断: </span>
            <span className="text-muted-foreground">{caseStudy.diagnosis}</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold">転帰: </span>
            <span className="text-muted-foreground line-clamp-1">{caseStudy.outcome}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {caseStudy.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{caseStudy.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{caseStudy.comments}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/cases/${caseStudy.id}`}>詳細を見る</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
