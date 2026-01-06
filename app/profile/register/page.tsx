"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, Loader2, Sparkles, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfileRegisterPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    hospital: "",
    position: "",
    education: "",
    certifications: "",
    publications: "",
    languages: "",
    skills: "",
    bio: "",
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file)
    setIsUploading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsUploading(false)
    setIsAnalyzing(true)

    await analyzeDocument(file)
  }

  const analyzeDocument = async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const extractedData = {
      name: "田中 太郎",
      specialty: "周産期医療",
      experience: "15",
      hospital: "東京大学医学部附属病院",
      position: "准教授",
      education: "東京大学医学部卒業\n東京大学大学院医学系研究科修了（医学博士）",
      certifications: "日本産科婦人科学会専門医\n日本周産期・新生児医学会専門医（母体・胎児）\n臨床遺伝専門医",
      publications: "査読付き論文：45編\n国際学会発表：30回\n著書：「周産期医療の最前線」他3冊",
      languages: "日本語（ネイティブ）、英語（ビジネスレベル）",
      skills: "胎児超音波検査、ハイリスク妊娠管理、産科救急、胎児治療",
      bio: "周産期医療を専門とし、特に胎児診断と治療に関する研究を行っています。ハイリスク妊娠の管理に豊富な経験があり、多くの難症例を担当してきました。",
    }

    setFormData(extractedData)
    setIsAnalyzing(false)

    toast({
      title: "自動入力完了",
      description: "履歴書から情報を抽出してフォームに入力しました。",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      console.log("[v0] Profile data:", formData)

      toast({
        title: "登録完了",
        description: "プロフィールが登録されました（デモモード）",
      })

      setTimeout(() => {
        router.push("/doctors")
      }, 1500)
    } catch (error) {
      console.error("[v0] Error submitting profile:", error)
      toast({
        title: "エラー",
        description: "プロフィールの登録中にエラーが発生しました。",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-balance">医師プロフィール登録</h1>
            <p className="text-muted-foreground text-lg">
              履歴書や職務経歴書をアップロードすると、AIが自動的に情報を読み取ってフォームに入力します。
            </p>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Upload className="w-5 h-5" />
                書類アップロード
              </CardTitle>
              <CardDescription className="text-base">
                履歴書、職務経歴書、資格証明書などをアップロードしてください（PDF、画像形式対応）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                {uploadedFile ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                    {isAnalyzing && (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>AIが書類を解析中...</span>
                      </div>
                    )}
                    {!isAnalyzing && !isUploading && (
                      <div className="flex items-center justify-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>解析完了。フォームを確認してください。</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-base font-medium text-primary">ファイルを選択</span>
                          <span className="text-sm text-muted-foreground">またはドラッグ＆ドロップ</span>
                        </div>
                      </Label>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isUploading || isAnalyzing}
                      />
                    </div>
                  </div>
                )}
              </div>
              {uploadedFile && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadedFile(null)
                      setFormData({
                        name: "",
                        specialty: "",
                        experience: "",
                        hospital: "",
                        position: "",
                        education: "",
                        certifications: "",
                        publications: "",
                        languages: "",
                        skills: "",
                        bio: "",
                      })
                    }}
                  >
                    別のファイルをアップロード
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">基本情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">氏名 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="山田 太郎"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">専門分野 *</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="専門分野を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="一般産婦人科">一般産婦人科</SelectItem>
                        <SelectItem value="周産期医療">周産期医療</SelectItem>
                        <SelectItem value="生殖医療">生殖医療</SelectItem>
                        <SelectItem value="婦人科腫瘍">婦人科腫瘍</SelectItem>
                        <SelectItem value="女性医学">女性医学</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">経験年数</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">役職</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      placeholder="医長、部長、教授など"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hospital">所属医療機関</Label>
                  <Input
                    id="hospital"
                    value={formData.hospital}
                    onChange={(e) => handleInputChange("hospital", e.target.value)}
                    placeholder="○○大学病院"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">学歴・資格</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="education">学歴</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange("education", e.target.value)}
                    placeholder="大学名、大学院など（各行に1つずつ記入）"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certifications">資格・認定</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange("certifications", e.target.value)}
                    placeholder="専門医資格、認定資格など（各行に1つずつ記入）"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">研究・業績</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="publications">論文・著書・学会発表</Label>
                  <Textarea
                    id="publications"
                    value={formData.publications}
                    onChange={(e) => handleInputChange("publications", e.target.value)}
                    placeholder="主な論文、著書、学会発表など"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">スキル・専門性</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">専門スキル・得意分野</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    placeholder="例：腹腔鏡手術、超音波診断、遺伝カウンセリングなど"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">使用可能言語</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => handleInputChange("languages", e.target.value)}
                    placeholder="日本語、英語、中国語など"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">自己紹介</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="bio">プロフィール</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="ご自身の専門性、経験、診療方針などを自由にご記入ください"
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" size="lg" className="flex-1 h-12" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    登録中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    プロフィールを登録
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" size="lg" className="sm:w-[200px] h-12 bg-transparent">
                キャンセル
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
