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
import { createCaseStudy } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"

export function CreateCaseDialog() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        const res = await createCaseStudy(formData)
        setIsSubmitting(false)

        if (res?.success) {
            setOpen(false)
            toast({
                title: "登録完了",
                description: "新しい症例が登録されました",
            })
        } else {
            toast({
                title: "エラー",
                description: "登録に失敗しました。もう一度お試しください。",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    症例登録
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>新規症例登録</DialogTitle>
                    <DialogDescription>
                        症例共有データベースに新しい症例を登録します。
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">タイトル</Label>
                            <Input id="title" name="title" placeholder="症例のタイトル" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">概要</Label>
                            <Textarea id="description" name="description" placeholder="症例の概要を入力..." rows={4} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "登録中..." : "登録する"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
