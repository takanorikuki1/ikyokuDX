"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { CreateCaseDialog } from "./create-case-dialog"

type CaseStudy = {
  id: string
  title: string
  diagnosis: string
  category: string
  tags: string[]
  views: number
  author: string
  date: string
}

export function CasesPageClient({ initialCases }: { initialCases: CaseStudy[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCases = useMemo(() => {
    return initialCases.filter((caseStudy) => {
      const matchesSearch =
        caseStudy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseStudy.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || caseStudy.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [initialCases, searchQuery, selectedCategory])

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">症例データベース</h1>
          <p className="text-muted-foreground mt-2">全国の医師による貴重な症例報告の共有</p>
        </div>
        <CreateCaseDialog />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="症例や診断名で検索..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCases.map((caseStudy) => (
          <Card key={caseStudy.id} className="glass-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Badge>{caseStudy.category}</Badge>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{caseStudy.views}</span>
                  </div>
                </div>
              </div>
              <CardTitle className="line-clamp-2 text-balance">
                <Link href={`/cases/${caseStudy.id}`} className="hover:text-primary transition-colors">
                  {caseStudy.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{caseStudy.diagnosis}</p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{caseStudy.author}</span>
                <span>{caseStudy.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">該当する症例が見つかりませんでした</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}
          >
            フィルターをクリア
          </Button>
        </Card>
      )}
    </div>
  )
}
