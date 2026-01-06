"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Eye } from "lucide-react"
import Link from "next/link"
import type { CaseStudy } from "@/lib/mock-data"

interface CaseDetailClientProps {
    caseStudy: CaseStudy
}

export function CaseDetailClient({ caseStudy }: CaseDetailClientProps) {
    return (
        <div className="container py-8 max-w-4xl">
            <Link
                href="/cases"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                症例一覧に戻る
            </Link>

            <div className="space-y-6">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge>{caseStudy.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {caseStudy.date}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {caseStudy.views} views
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold mb-4">{caseStudy.title}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        <span>{caseStudy.author}</span>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b">概要</h2>
                            <p className="leading-relaxed">{caseStudy.summary}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b">診断</h2>
                            <p className="leading-relaxed">{caseStudy.diagnosis}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b">治療方針</h2>
                            <p className="leading-relaxed">{caseStudy.treatment}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-3 pb-2 border-b">転帰</h2>
                            <p className="leading-relaxed">{caseStudy.outcome}</p>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <div className="p-4 border rounded-lg bg-muted/50">
                            <h3 className="font-bold mb-2">タグ</h3>
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
