"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, CheckCircle } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  facility: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  skills: string[]
}

export function ApplyForm({ job }: { job: Job }) {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    specialty: "",
    experience: "",
    motivation: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Application submitted:", { jobId: job.id, ...formData })
    setIsSubmitted(true)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">応募が完了しました</CardTitle>
          <CardDescription>担当者からの連絡をお待ちください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-left space-y-2">
            <p className="text-sm text-muted-foreground">応募した求人</p>
            <p className="font-semibold">{job.title}</p>
            <p className="text-sm text-muted-foreground">{job.facility}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/matching">求人一覧に戻る</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 bg-transparent">
              <Link href="/dashboard">ダッシュボードへ</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>応募者情報</CardTitle>
          <CardDescription>すべての項目を入力してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                氏名 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                required
                placeholder="山田太郎"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                メールアドレス <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="example@medical.jp"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                電話番号 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="090-1234-5678"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="license">
                医師免許番号 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="license"
                required
                placeholder="MD-2020-001"
                value={formData.licenseNumber}
                onChange={(e) => handleChange("licenseNumber", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">
                専門分野 <span className="text-destructive">*</span>
              </Label>
              <Select required value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="一般産婦人科">一般産婦人科</SelectItem>
                  <SelectItem value="周産期医療">周産期医療</SelectItem>
                  <SelectItem value="生殖医療">生殖医療</SelectItem>
                  <SelectItem value="腫瘍学">腫瘍学</SelectItem>
                  <SelectItem value="その他">その他</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">
                実務経験年数 <span className="text-destructive">*</span>
              </Label>
              <Select required value={formData.experience} onValueChange={(value) => handleChange("experience", value)}>
                <SelectTrigger id="experience">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1年未満">1年未満</SelectItem>
                  <SelectItem value="1-3年">1-3年</SelectItem>
                  <SelectItem value="3-5年">3-5年</SelectItem>
                  <SelectItem value="5-10年">5-10年</SelectItem>
                  <SelectItem value="10年以上">10年以上</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">
              志望動機 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="motivation"
              required
              placeholder="この求人に応募する理由や、あなたの強みについて記入してください"
              className="min-h-32 resize-none"
              value={formData.motivation}
              onChange={(e) => handleChange("motivation", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">200文字以上推奨</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">履歴書・職務経歴書（任意）</Label>
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">ファイルをドラッグ&ドロップまたはクリックして選択</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX (最大10MB)</p>
              <Input id="resume" type="file" className="hidden" accept=".pdf,.docx" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button type="submit" className="flex-1" size="lg">
          応募を送信する
        </Button>
        <Button type="button" variant="outline" className="flex-1 bg-transparent" size="lg" asChild>
          <Link href={`/matching/${job.id}`}>キャンセル</Link>
        </Button>
      </div>
    </form>
  )
}
