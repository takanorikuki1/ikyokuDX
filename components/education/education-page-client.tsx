"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ContentCard } from "@/components/education/content-card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UploadContentDialog } from "./upload-content-dialog"

interface EducationPageClientProps {
  initialContent: any[]
}

export function EducationPageClient({ initialContent }: EducationPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [isCreateContentOpen, setIsCreateContentOpen] = useState(false)
  const [content, setContent] = useState(initialContent)

  const [isProcessing, setIsProcessing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const [formData, setFormData] = useState({
    title: "",
    contentType: "video",
    description: "",
    instructor: "",
    duration: "",
    category: "",
    difficulty: "初級",
    tags: "",
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => { }

  const toggleRecording = async () => { }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch("/api/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create education content")

      const newContent = await response.json()
      setContent([newContent, ...content])
      setIsCreateContentOpen(false)
      setFormData({
        title: "",
        contentType: "video",
        description: "",
        instructor: "",
        duration: "",
        category: "",
        difficulty: "初級",
        tags: "",
      })
    } catch (error) {
      console.error("Error creating education content:", error)
      alert("教育コンテンツの作成に失敗しました。")
    } finally {
      setIsProcessing(false)
    }
  }

  const filteredContent = content.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    const matchesLevel = levelFilter === "all" || item.difficulty === levelFilter

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">学びの広場</h1>
          <p className="text-muted-foreground mt-2">最新の医療技術や知識を動画で学ぶ</p>
        </div>
        <UploadContentDialog />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="コンテンツを検索..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => <ContentCard key={item.id} content={item} />)
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground mb-4">条件に一致する教育コンテンツが見つかりませんでした</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setCategoryFilter("all")
                setLevelFilter("all")
              }}
            >
              フィルターをクリア
            </Button>
          </div>
        )}
      </div>

      {/* ... existing dialog code ... */}
    </div>
  )
}
