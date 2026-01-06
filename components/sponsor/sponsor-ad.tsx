import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { SponsorAd as SponsorAdType } from "@/lib/mock-data"
import Image from "next/image"
import { MOCK_SPONSOR_ADS } from "@/lib/mock-data"

interface SponsorAdProps {
  ad: SponsorAdType
  className?: string
}

export function SponsorAdCard({ ad, className }: SponsorAdProps) {
  const CardWrapper = ad.link ? "a" : "div"
  const cardProps = ad.link
    ? {
        href: ad.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "block hover:shadow-lg transition-shadow",
      }
    : {}

  return (
    <CardWrapper {...cardProps}>
      <Card className={className}>
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              スポンサー
            </Badge>
            {ad.link && <ExternalLink className="w-4 h-4 text-muted-foreground" />}
          </div>
          <div className="flex items-center justify-center p-4 bg-muted/30 rounded-md">
            <Image
              src={ad.logo || "/placeholder.svg"}
              alt={ad.company}
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
          <CardTitle className="text-base">{ad.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">{ad.description}</CardDescription>
          <p className="text-xs text-muted-foreground mt-3">{ad.company}</p>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}

interface SponsorSectionProps {
  ads?: SponsorAdType[]
  maxAds?: number
  className?: string
}

export function SponsorSection({ ads, maxAds = 2, className }: SponsorSectionProps) {
  const displayAds = ads?.slice(0, maxAds) || []

  if (displayAds.length === 0) return null

  return (
    <div className={className}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">協賛企業</h3>
      <div className="space-y-4">
        {displayAds.map((ad) => (
          <SponsorAdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  )
}

export function SponsorAd({ maxAds = 2, className }: { maxAds?: number; className?: string }) {
  return <SponsorSection ads={MOCK_SPONSOR_ADS} maxAds={maxAds} className={className} />
}
