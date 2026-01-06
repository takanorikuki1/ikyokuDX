"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft, MapPin, Building, Calendar, DollarSign, Clock } from "lucide-react"
import Link from "next/link"
import type { JobPosting } from "@/lib/mock-data"

interface JobDetailClientProps {
    job: JobPosting
}

export function JobDetailClient({ job }: JobDetailClientProps) {
    return (
        <div className="container py-8 max-w-4xl">
            <Link
                href="/matching"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                求人一覧に戻る
            </Link>

            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge>{job.type}</Badge>
                            <span className="text-sm text-muted-foreground">掲載日: {job.postedDate}</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                                <Building className="w-4 h-4 mr-1" />
                                {job.facility}
                            </span>
                            <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {job.location}
                            </span>
                        </div>
                    </div>
                    <Button size="lg" asChild>
                        <Link href={`/matching/${job.id}/apply`}>応募する</Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
                    <Card>
                        <CardHeader>
                            <CardTitle>募集要項</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-bold mb-2">仕事内容</h3>
                                <p className="whitespace-pre-wrap leading-relaxed">{job.description}</p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                        <DollarSign className="w-4 h-4" />
                                        <span className="text-sm font-bold">給与</span>
                                    </div>
                                    <p className="font-bold">{job.salary}</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-sm font-bold">勤務時間</span>
                                    </div>
                                    <p className="font-bold">ご確認ください</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold mb-2">応募要件</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    {job.requirements.map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>施設情報</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                                    <Building className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="font-bold">{job.facility}</p>
                                    <p className="text-sm text-muted-foreground">{job.location}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
