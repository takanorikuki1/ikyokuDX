
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
import { Upload } from "lucide-react"
import { createEducationContent } from "@/app/actions"

export function UploadContentDialog() {
    const [open, setOpen] = useState(false)

    async function handleSubmit(formData: FormData) {
        const res = await createEducationContent(formData)
        if (res?.success) {
            setOpen(false)
            alert("コンテンツをアップロードしました")
        } else {
            alert("アップロードに失敗しました")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    動画投稿
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>動画コンテンツ投稿</DialogTitle>
                    <DialogDescription>
                        教育用の動画や資料をアップロードします。
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                タイトル
                            </Label>
                            <Input id="title" name="title" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                カテゴリ
                            </Label>
                            <Input id="category" name="category" className="col-span-3" placeholder="例: 手術手技" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                説明
                            </Label>
                            <Textarea id="description" name="description" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="file" className="text-right">
                                動画ファイル
                            </Label>
                            <Input id="file" type="file" className="col-span-3" accept="video/*" disabled />
                            <p className="text-xs text-muted-foreground col-start-2 col-span-3">※デモ環境のためファイルアップロードは無効化されています</p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">投稿する</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
