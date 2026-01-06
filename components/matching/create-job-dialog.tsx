
"use client"

import { useState, useRef } from "react"
import type React from "react"
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
import { Plus, Upload, FileText } from "lucide-react"
import { createJobPosting } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"

export function CreateJobDialog() {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const { toast } = useToast()

    const fileInputRef = useRef<HTMLInputElement>(null)

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        const res = await createJobPosting(formData)
        setIsSubmitting(false)

        if (res?.success) {
            setOpen(false)
            toast({
                title: "投稿完了",
                description: "求人が投稿されました",
            })
        } else {
            toast({
                title: "エラー",
                description: "求人の投稿に失敗しました。もう一度お試しください。",
                variant: "destructive",
            })
        }
    }

    // Placeholder for file/audio handlers if we want to keep the UI but not full logic yet
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) setUploadedFile(file)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    求人を投稿
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>新規求人投稿</DialogTitle>
                    <DialogDescription>
                        求人票をアップロードするか、手動で入力してください
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col sm:flex-row gap-3 pb-4 border-b">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isSubmitting}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        求人票をアップロード
                    </Button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    {/* Audio recording button removed for MVP simplicity in refactor, or kept as UI stub */}
                </div>

                {uploadedFile && (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{uploadedFile.name}</span>
                    </div>
                )}

                <form action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">求人タイトル</Label>
                        <Input id="title" name="title" placeholder="産婦人科医師募集" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="facility">医療機関名</Label>
                        <Input id="facility" name="facility" placeholder="○○医療センター" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">勤務地</Label>
                            <Input id="location" name="location" placeholder="東京都" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">診療科</Label>
                            <Input id="department" name="department" placeholder="産婦人科" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="employmentType">雇用形態</Label>
                            <Select name="type" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="選択してください" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full-time">常勤</SelectItem>
                                    <SelectItem value="Part-time">非常勤</SelectItem>
                                    <SelectItem value="Freelance">スポット</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">給与</Label>
                            <Input id="salary" name="salary" placeholder="年収1000万円〜" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">業務内容</Label>
                        <Textarea id="description" name="description" placeholder="業務内容を入力してください" rows={4} required />
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
