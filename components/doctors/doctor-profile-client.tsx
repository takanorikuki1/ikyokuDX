"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Mail, Phone, Building, Briefcase } from "lucide-react"
import Link from "next/link"
import type { DoctorProfile } from "@/lib/mock-data"

interface DoctorProfileClientProps {
    doctor: DoctorProfile
}

export function DoctorProfileClient({ doctor }: DoctorProfileClientProps) {
    return (
        <div className="container py-8 max-w-4xl">
            <Link
                href="/doctors"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                医師一覧に戻る
            </Link>

            <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <Avatar className="w-32 h-32 mx-auto mb-4">
                                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                                <AvatarFallback className="text-2xl">{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h1 className="text-2xl font-bold mb-1">{doctor.name}</h1>
                            <p className="text-muted-foreground mb-4">{doctor.specialty}</p>

                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                <Badge variant="secondary">{doctor.role}</Badge>
                                {doctor.department && <Badge variant="outline">{doctor.department}</Badge>}
                            </div>

                            <div className="space-y-3 text-left">
                                <div className="flex items-center text-sm">
                                    <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                                    <span>{doctor.department}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                    <span>{doctor.preferredRegions?.join(", ") || "未設定"}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                                    <span>{doctor.email}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>経歴・自己紹介</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-bold mb-2 flex items-center">
                                        <Briefcase className="w-4 h-4 mr-2" />
                                        経歴
                                    </h3>
                                    <p className="text-sm leading-relaxed">{doctor.bio || "登録されていません"}</p>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">専門分野・スキル</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.skills.map((skill) => (
                                            <Badge key={skill} variant="secondary">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold mb-2">所属学会・資格</h3>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {doctor.certifications.map((cert) => (
                                            <li key={cert}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
