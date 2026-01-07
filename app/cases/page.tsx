"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Database, FileText, Search } from "lucide-react"
import Link from "next/link"

export default function CasesPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">症例データベース</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            産婦人科領域の症例検索・共有は外部の専門データベースをご利用ください
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* J-OSLER */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                J-OSLER
              </CardTitle>
              <CardDescription>
                日本専門医機構の症例登録システム
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                専門医研修に必要な症例の登録・管理ができます。
              </p>
              <Button asChild className="w-full">
                <a href="https://www.j-osler.jp/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  J-OSLERを開く
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* PubMed */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                PubMed
              </CardTitle>
              <CardDescription>
                医学文献データベース
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                産婦人科関連の症例報告・研究論文を検索できます。
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://pubmed.ncbi.nlm.nih.gov/?term=obstetrics+gynecology+case+report" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  PubMedで検索
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* 日本産科婦人科学会 */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                日本産科婦人科学会
              </CardTitle>
              <CardDescription>
                学会公式リソース
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                ガイドライン、症例検討会資料などを閲覧できます。
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://www.jsog.or.jp/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  学会サイトを開く
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* メディカルオンライン */}
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                メディカルオンライン
              </CardTitle>
              <CardDescription>
                日本語医学文献
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                国内の症例報告・学会抄録を検索できます。
              </p>
              <Button asChild variant="outline" className="w-full">
                <a href="https://www.medicalonline.jp/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  メディカルオンラインを開く
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>※ 各サイトのご利用には別途アカウント登録が必要な場合があります</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
