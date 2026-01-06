"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Building2 } from "lucide-react"
import { DoctorCard } from "@/components/matching/doctor-card"
import { JobCard } from "@/components/matching/job-card"
import { MOCK_SPONSOR_ADS } from "@/lib/mock-data"
import { SponsorSection } from "@/components/sponsor/sponsor-ad"
import { CreateJobDialog } from "./create-job-dialog"

interface MatchingPageClientProps {
  initialJobs: any[]
  initialDoctors: any[]
}

export function MatchingPageClient({ initialJobs, initialDoctors }: MatchingPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [regionFilter, setRegionFilter] = useState("all")

  const filteredJobs = initialJobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.facility?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRegion = regionFilter === "all" || job.location?.includes(regionFilter)

    return matchesSearch && matchesRegion
  })

  const filteredDoctors = initialDoctors.filter((doctor) => {
    const matchesSearch =
      searchQuery === "" ||
      doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.department?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRegion = regionFilter === "all" || doctor.location?.includes(regionFilter)

    return matchesSearch && matchesRegion
  })

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">人材マッチング</h1>
          <p className="text-muted-foreground">医師と医療機関をつなぐプラットフォーム</p>
        </div>
        <CreateJobDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">求人情報数</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialJobs.length}</div>
            <p className="text-xs text-muted-foreground">全国の医療機関</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="jobs" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="jobs">求人情報</TabsTrigger>
              <TabsTrigger value="doctors">医師検索</TabsTrigger>
            </TabsList>

            <Card>
              <CardHeader>
                <CardTitle>検索・フィルター</CardTitle>
                <CardDescription>条件を指定して検索してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="キーワードで検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={regionFilter} onValueChange={setRegionFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="地域を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべての地域</SelectItem>
                      <SelectItem value="東京">東京</SelectItem>
                      <SelectItem value="神奈川">神奈川</SelectItem>
                      <SelectItem value="千葉">千葉</SelectItem>
                      <SelectItem value="埼玉">埼玉</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <TabsContent value="jobs" className="space-y-4">
              {filteredJobs.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">該当する求人情報が見つかりませんでした</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setRegionFilter("all")
                    }}
                  >
                    フィルターをクリア
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="doctors" className="space-y-4">
              {filteredDoctors.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">該当する医師が見つかりませんでした</p>
                  <Button
                    variant="outline"
                    className="mt-4 bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setRegionFilter("all")
                    }}
                  >
                    フィルターをクリア
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <SponsorSection ads={MOCK_SPONSOR_ADS} maxAds={2} />
        </div>
      </div>
    </div>
  )
}
