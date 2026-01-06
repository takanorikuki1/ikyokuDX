
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { createBoardPost } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"

export function CreatePostDialog() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    async function handleSubmit(formData: FormData) {
        console.log("handleSubmit called")
        console.log("title:", formData.get('title'))
        console.log("content:", formData.get('content'))

        setIsSubmitting(true)
        try {
            const res = await createBoardPost(formData)
            console.log("createBoardPost response:", res)
            setIsSubmitting(false)

            if (res?.success) {
                setOpen(false)
                toast({
                    title: "投稿完了",
                    description: "新しい投稿が作成されました",
                })
            } else {
                toast({
                    title: "エラー",
                    description: res?.error || "投稿に失敗しました。もう一度お試しください。",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("handleSubmit error:", error)
            setIsSubmitting(false)
            toast({
                title: "エラー",
                description: "予期しないエラーが発生しました。",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規投稿
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>新規投稿を作成</DialogTitle>
                    <DialogDescription>
                        掲示板に新しいトピックを投稿します。
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">タイトル</Label>
                            <Input id="title" name="title" placeholder="投稿のタイトル" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">カテゴリ</Label>
                            <Input id="category" name="category" placeholder="例: 臨床, 研究" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">本文</Label>
                            <Textarea id="content" name="content" placeholder="投稿内容を入力..." rows={4} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "投稿中..." : "投稿する"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

