"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  MessageSquare,
  Settings,
  Stethoscope,
  X,
  UserSquare,
  MessageCircle,
  UserPlus,
  Heart,
  Briefcase,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRole } from "@/lib/role-context"
import { hasPermission, ROLE_LABELS, type RolePermissions } from "@/lib/roles"
import { Badge } from "@/components/ui/badge"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  permission: keyof RolePermissions
  description?: string
}

const navItems: NavItem[] = [
  {
    title: "ダッシュボード",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "viewDashboard",
  },
  {
    title: "プロフィール登録",
    href: "/profile/register",
    icon: UserPlus,
    permission: "registerProfile",
  },
  {
    title: "人材マッチング",
    href: "/matching",
    icon: Users,
    permission: "viewJobs",
  },
  {
    title: "登録医師一覧",
    href: "/doctors",
    icon: UserSquare,
    permission: "viewDoctors",
  },
  {
    title: "教育コンテンツ",
    href: "/education",
    icon: GraduationCap,
    permission: "viewEducation",
  },
  {
    title: "症例データベース",
    href: "/cases",
    icon: FileText,
    permission: "viewCases",
  },
  {
    title: "掲示板・通知",
    href: "/board",
    icon: MessageSquare,
    permission: "viewBoard",
  },
  {
    title: "メッセージ",
    href: "/messages",
    icon: MessageCircle,
    permission: "viewMessages",
  },
  {
    title: "寄付・支援",
    href: "/donation",
    icon: Heart,
    permission: "viewDonation",
  },
]

interface SidebarNavProps {
  onClose?: () => void
}

export function SidebarNav({ onClose }: SidebarNavProps) {
  const pathname = usePathname()
  const { currentRole } = useRole()

  // 権限に基づいてナビゲーションアイテムをフィルタリング
  const visibleNavItems = navItems.filter((item) =>
    hasPermission(currentRole, item.permission),
  )

  return (
    <div className="flex flex-col h-full bg-sidebar/50 backdrop-blur-xl border-r border-border/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight tracking-tight text-foreground">医局<span className="text-primary">DX</span></h2>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Medical Network</p>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="bg-card/50 rounded-lg p-3 border border-border/50 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-medium">現在の権限</p>
              <p className="text-sm font-semibold truncate">{ROLE_LABELS[currentRole]}</p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto scrollbar-hide">
        <p className="px-2 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest">Menu</p>

        {visibleNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden",
                isActive
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full" />
              )}
              <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="flex-1">{item.title}</span>
              {isActive && <ChevronRight className="w-4 h-4 text-primary/40 animate-in fade-in slide-in-from-left-1" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border/40 space-y-2 bg-gradient-to-t from-background/80 to-transparent">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
          <Link href="/settings">
            <Settings className="w-4 h-4 mr-2" />
            設定
          </Link>
        </Button>
      </div>
    </div>
  )
}
