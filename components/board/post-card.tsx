import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Eye, Calendar, Pin } from "lucide-react"
import type { BoardPost } from "@/lib/mock-data"
import Link from "next/link"

interface PostCardProps {
  post: BoardPost
}

export function PostCard({ post }: PostCardProps) {
  const categoryColors = {
    general: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    qa: "bg-green-500/10 text-green-700 dark:text-green-400",
    announcement: "bg-red-500/10 text-red-700 dark:text-red-400",
    event: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  }

  const categoryText = {
    general: "一般",
    qa: "質問",
    announcement: "お知らせ",
    event: "イベント",
  }

  return (
    <Link href={`/board/${post.id}`}>
      <Card className="glass-card hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start gap-3">
            {post.isPinned && (
              <div className="flex-shrink-0 mt-1">
                <Pin className="w-4 h-4 text-primary fill-current" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-lg line-clamp-2 text-balance">{post.title}</h3>
                <Badge className={categoryColors[post.category]}>{categoryText[post.category]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.replies}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">{post.author}</span>
                <Calendar className="w-3 h-3" />
                <span className="text-xs">{new Date(post.date).toLocaleDateString("ja-JP")}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
