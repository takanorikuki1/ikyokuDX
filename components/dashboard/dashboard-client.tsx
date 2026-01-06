
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, FileText, MessageSquare, TrendingUp, Clock } from "lucide-react"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { SponsorSection } from "@/components/sponsor/sponsor-ad"
import {
    MOCK_EDUCATION,
    MOCK_BOARD_POSTS,
    MOCK_SPONSOR_ADS
} from "@/lib/mock-data"

interface DashboardClientProps {
    initialDoctors: any[]
    initialJobs: any[]
    initialCases: any[]
}

export function DashboardClient({ initialDoctors, initialJobs, initialCases }: DashboardClientProps) {
    const stats = [
        {
            title: "登録医師数",
            value: initialDoctors.length,
            change: "+12%",
            icon: Users,
        },
        {
            title: "求人情報",
            value: initialJobs.filter((j) => j.status === "open").length,
            change: "+8%",
            icon: TrendingUp,
        },
        {
            title: "教育コンテンツ",
            value: MOCK_EDUCATION.length,
            change: "+15%",
            icon: GraduationCap,
        },
        {
            title: "共有症例数",
            value: initialCases.length,
            change: "+10%",
            icon: FileText,
        },
        {
            title: "掲示板投稿",
            value: MOCK_BOARD_POSTS.length,
            change: "+20%",
            icon: MessageSquare,
        },
        {
            title: "月間アクティブ",
            value: "89%",
            change: "+5%",
            icon: Clock,
        },
    ]

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-balance">ダッシュボード</h1>
                <p className="text-muted-foreground mt-2">医局ネットワークシステムの全体概要</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-green-600 dark:text-green-400 mt-1">前月比 {stat.change}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <ActivityChart />
                        </div>
                        <div>
                            <QuickActions />
                        </div>
                    </div>
                    <RecentActivity />
                </div>
                <div className="lg:col-span-1">
                    <SponsorSection ads={MOCK_SPONSOR_ADS} maxAds={3} />
                </div>
            </div>
        </div>
    )
}
