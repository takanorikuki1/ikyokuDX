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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createDonationProject } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"

export function CreateDonationDialog() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        const res = await createDonationProject(formData)
        setIsSubmitting(false)

        if (res?.success) {
            setOpen(false)
            toast({
                title: "プロジェクト作成完了",
                description: "新しい寄付プロジェクトが作成されました",
            })
        } else {
            toast({
                title: "エラー",
                description: "プロジェクトの作成に失敗しました。もう一度お試しください。",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    新規プロジェクト
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>新規支援プロジェクト</DialogTitle>
                    <DialogDescription>
                        新しい寄付プロジェクトを作成します。
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">プロジェクト名</Label>
                            <Input id="title" name="title" placeholder="例: 地域医療連携強化プロジェクト" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">カテゴリ</Label>
                            <Select name="category" defaultValue="medical_network">
                                <SelectTrigger>
                                    <SelectValue placeholder="カテゴリを選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="medical_network">医療連携</SelectItem>
                                    <SelectItem value="education">教育支援</SelectItem>
                                    <SelectItem value="equipment">設備導入</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goal_amount">目標金額（円）</Label>
                            <Input id="goal_amount" name="goal_amount" type="number" placeholder="1000000" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">プロジェクト概要</Label>
                            <Textarea id="description" name="description" placeholder="プロジェクトの目的や使途を説明してください" rows={4} required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "作成中..." : "作成する"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
