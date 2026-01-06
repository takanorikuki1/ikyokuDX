import { notFound } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Eye, Calendar, ArrowLeft, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SponsorAd } from "@/components/sponsor/sponsor-ad"
import { MOCK_BOARD_POSTS } from "@/lib/mock-data"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function BoardPostDetailPage({ params }: PageProps) {
  const { id } = await params

  const post = MOCK_BOARD_POSTS.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

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
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-7xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/board">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              掲示板に戻る
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader className="space-y-4">
                <div className="flex items-start gap-3">
                  {post.isPinned && (
                    <div className="flex-shrink-0 mt-1">
                      <Pin className="w-5 h-5 text-primary fill-current" />
                    </div>
                  )}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h1 className="text-3xl font-bold text-balance">{post.title}</h1>
                      <Badge className={categoryColors[post.category as keyof typeof categoryColors]}>
                        {categoryText[post.category as keyof typeof categoryText]}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="whitespace-pre-wrap text-pretty">{post.content}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold">コメント</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center py-8">コメント機能は準備中です</p>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <SponsorAd />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
