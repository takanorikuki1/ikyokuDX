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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileVideo, FileText, Presentation, File } from "lucide-react"
import { createEducationContent } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"

const contentTypes = [
    { value: "video", label: "動画", icon: FileVideo, accept: "video/*" },
    { value: "presentation", label: "プレゼンテーション (PowerPoint)", icon: Presentation, accept: ".ppt,.pptx,.key" },
    { value: "document", label: "ドキュメント (PDF/Word)", icon: FileText, accept: ".pdf,.doc,.docx" },
    { value: "other", label: "その他", icon: File, accept: "*" },
]

export function UploadContentDialog() {
    const [open, setOpen] = useState(false)
    const [contentType, setContentType] = useState("video")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const selectedType = contentTypes.find(t => t.value === contentType) || contentTypes[0]

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        formData.append("type", contentType)

        const res = await createEducationContent(formData)

        if (res?.success) {
            setOpen(false)
            toast({
                title: "アップロード完了",
                description: "コンテンツを投稿しました"
            })
        } else {
            toast({
                title: "エラー",
                description: res?.error || "アップロードに失敗しました",
                variant: "destructive"
            })
        }
        setIsSubmitting(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    コンテンツ投稿
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>教育コンテンツ投稿</DialogTitle>
                    <DialogDescription>
                        動画、プレゼンテーション、ドキュメントなどをアップロードします
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="contentType">コンテンツタイプ</Label>
                            <Select value={contentType} onValueChange={setContentType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="タイプを選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    {contentTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            <div className="flex items-center gap-2">
                                                <type.icon className="w-4 h-4" />
                                                {type.label}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">タイトル</Label>
                            <Input id="title" name="title" placeholder="コンテンツのタイトル" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">カテゴリ</Label>
                            <Select name="category" defaultValue="lecture">
                                <SelectTrigger>
                                    <SelectValue placeholder="カテゴリを選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lecture">講義</SelectItem>
                                    <SelectItem value="surgery">手術手技</SelectItem>
                                    <SelectItem value="case_study">症例検討</SelectItem>
                                    <SelectItem value="guideline">ガイドライン</SelectItem>
                                    <SelectItem value="research">研究発表</SelectItem>
                                    <SelectItem value="other">その他</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">説明</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="コンテンツの説明を入力..."
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="file" className="flex items-center gap-2">
                                <selectedType.icon className="w-4 h-4" />
                                ファイル
                            </Label>
                            <Input
                                id="file"
                                type="file"
                                accept={selectedType.accept}
                                disabled
                            />
                            <p className="text-xs text-muted-foreground">
                                ※ デモ環境のためファイルアップロードは無効化されています。
                                タイトルと説明のみが登録されます。
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            キャンセル
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "投稿中..." : "投稿する"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
