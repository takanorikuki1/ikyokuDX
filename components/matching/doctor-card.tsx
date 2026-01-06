import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, MapPin, Award, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { DoctorProfile } from "@/lib/mock-data"
import Link from "next/link"

interface DoctorCardProps {
  doctor: DoctorProfile
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="glass-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <Avatar className="w-12 h-12">
                <AvatarImage src={doctor.avatar} alt={doctor.name} />
                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-bold text-lg">{doctor.name}</h3>
              <p className="text-sm text-muted-foreground">{doctor.role}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {doctor.bio && <p className="text-sm text-muted-foreground line-clamp-2">{doctor.bio}</p>}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Award className="w-4 h-4" />
          <span>{doctor.experience}年の経験</span>
        </div>

        {doctor.department && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{doctor.department}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {doctor.specialty}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {doctor.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={`/doctors/${doctor.id}`}>プロフィールを見る</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
