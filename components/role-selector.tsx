"use client"

import { useRole } from "@/lib/role-context"
import { ROLE_LABELS, ROLE_DESCRIPTIONS, type UserRole } from "@/lib/roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"

export function RoleSelector() {
  const { currentRole, setRole } = useRole()

  const roles: UserRole[] = [
    "professor",
    "associate_professor",
    "lecturer",
    "assistant_professor",
    "staff_doctor",
    "clinic_doctor",
    "resident",
    "alumni",
    "admin",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          ロール設定
          <Badge variant="outline" className="text-xs">
            デモ用
          </Badge>
        </CardTitle>
        <CardDescription>
          あなたの役割を選択してください。選択したロールによって利用できる機能が変わります。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={currentRole} onValueChange={(value) => setRole(value as UserRole)}>
          <div className="space-y-3">
            {roles.map((role) => (
              <div key={role} className="flex items-start space-x-3">
                <RadioGroupItem value={role} id={role} className="mt-1" />
                <Label htmlFor={role} className="flex-1 cursor-pointer">
                  <div className="font-medium">{ROLE_LABELS[role]}</div>
                  <div className="text-sm text-muted-foreground flex items-start gap-1 mt-1">
                    <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    <span>{ROLE_DESCRIPTIONS[role]}</span>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-2">現在のロール</div>
          <div className="flex items-center gap-2">
            <Badge variant="default">{ROLE_LABELS[currentRole]}</Badge>
            <span className="text-sm text-muted-foreground">{ROLE_DESCRIPTIONS[currentRole]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
