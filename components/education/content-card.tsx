import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlayCircle, FileText, Video, BookOpen, Eye, Star, Clock } from "lucide-react"
import type { EducationContent } from "@/lib/mock-data"

interface ContentCardProps {
  content: EducationContent
}

export function ContentCard({ content }: ContentCardProps) {
  const typeIcons = {
    video: PlayCircle,
    document: FileText,
    webinar: Video,
    course: BookOpen,
  }

  const typeText = {
    video: "動画",
    document: "資料",
    webinar: "ウェビナー",
    course: "コース",
  }

  const levelColors = {
    beginner: "bg-green-500/10 text-green-700 dark:text-green-400",
    intermediate: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    advanced: "bg-red-500/10 text-red-700 dark:text-red-400",
  }

  const levelText = {
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
  }

  const Icon = typeIcons[content.type]

  return (
    <Card className="glass-card hover:shadow-lg transition-shadow overflow-hidden">
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <Icon className="w-16 h-16 text-primary/50" />
      </div>
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2 text-balance">{content.title}</CardTitle>
          <Badge variant="outline">{typeText[content.type]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{content.instructor}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>

        <div className="flex flex-wrap gap-2 items-center">
          <Badge className={levelColors[content.level]}>{levelText[content.level]}</Badge>
          <Badge variant="secondary">{content.category}</Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {content.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{content.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{content.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            <span>{content.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {content.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Icon className="w-4 h-4 mr-2" />
          視聴する
        </Button>
      </CardFooter>
    </Card>
  )
}
