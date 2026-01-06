"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DoctorCard } from "@/components/matching/doctor-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { SponsorAd } from "@/components/sponsor/sponsor-ad"

interface DoctorsPageClientProps {
  initialDoctors: any[]
}

export function DoctorsPageClient({ initialDoctors }: DoctorsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredDoctors = initialDoctors.filter((doctor) => {
    // Safety check for properties
    const name = doctor.name || ""
    const specialty = doctor.specialty || ""
    const hospital = doctor.hospital || ""
    const skills = doctor.skills || []

    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty =
      specialtyFilter === "all" ||
      specialty.includes(specialtyFilter) ||
      skills.some((skill: string) => skill.toLowerCase().includes(specialtyFilter.toLowerCase()))

    const matchesRole = roleFilter === "all" || doctor.role === roleFilter

    return matchesSearch && matchesSpecialty && matchesRole
  })

  const totalDoctors = initialDoctors.length
  // Using loose check for availability or role based logic
  const availableDoctors = initialDoctors.filter(
    (d) => d.role === "開業医（診療所医局員）" || d.role === "医員（病院勤務）",
  ).length

  const handleBadgeClick = (filter: string) => {
    setSpecialtyFilter(filter)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSpecialtyFilter("all")
    setRoleFilter("all")
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-8 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">登録医師一覧</h1>
          <p className="text-muted-foreground text-lg">ネットワークに登録されている医師のプロフィールを閲覧できます</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <p className="text-sm text-muted-foreground">登録医師数</p>
            <p className="text-3xl font-bold mt-2">{totalDoctors}名</p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <p className="text-sm text-muted-foreground">募集中の医師</p>
            <p className="text-3xl font-bold mt-2 text-green-600">{availableDoctors}名</p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <p className="text-sm text-muted-foreground">検索結果</p>
            <p className="text-3xl font-bold mt-2">{filteredDoctors.length}名</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="医師名、専門分野で検索..."
              className="pl-10 h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-11">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="専門分野" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべての専門分野</SelectItem>
              <SelectItem value="周産期">周産期医療</SelectItem>
              <SelectItem value="生殖医療">生殖医療</SelectItem>
              <SelectItem value="腫瘍学">腫瘍学</SelectItem>
              <SelectItem value="一般">一般産婦人科</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-11">
              <SelectValue placeholder="役職" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="医局長（教授）">医局長（教授）</SelectItem>
              <SelectItem value="准教授">准教授</SelectItem>
              <SelectItem value="講師">講師</SelectItem>
              <SelectItem value="助教">助教</SelectItem>
              <SelectItem value="医員（病院勤務）">医員（病院勤務）</SelectItem>
              <SelectItem value="開業医（診療所医局員）">開業医</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={clearFilters} className="h-11 bg-transparent">
            クリア
          </Button>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">条件に一致する医師が見つかりませんでした</p>
            <Button variant="link" onClick={clearFilters} className="mt-4">
              フィルターをクリア
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>

      <SponsorAd />
    </DashboardLayout>
  )
}
