"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send } from "lucide-react"
import { useRouter } from "next/navigation"

interface Comment {
  id: string
  content: string
  created_at: string
  author: string
}

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setComments([])
  }, [postId])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)

    console.log("[v0] New comment:", newComment)
    setNewComment("")
    setIsSubmitting(false)

    alert("コメント機能は準備中です")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          コメント ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            placeholder="コメントを入力..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            disabled={isSubmitting}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={!newComment.trim() || isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "送信中..." : "コメントする"}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="text-center text-muted-foreground py-8">コメント機能は準備中です</div>
        </div>
      </CardContent>
    </Card>
  )
}
