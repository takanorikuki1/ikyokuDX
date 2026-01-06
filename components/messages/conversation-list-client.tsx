"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"

interface ConversationListClientProps {
  conversations: any[]
  activeId?: string
}

export function ConversationListClient({ conversations, activeId }: ConversationListClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "direct" | "group">("all")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participants?.some((p: any) => p.user?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = filter === "all" || (filter === "group" ? conv.is_group : !conv.is_group)

    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">メッセージ</h2>
          <Button size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-1" />
            新規
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="会話を検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="flex-1"
          >
            すべて
          </Button>
          <Button
            size="sm"
            variant={filter === "direct" ? "default" : "outline"}
            onClick={() => setFilter("direct")}
            className="flex-1"
          >
            DM
          </Button>
          <Button
            size="sm"
            variant={filter === "group" ? "default" : "outline"}
            onClick={() => setFilter("group")}
            className="flex-1"
          >
            グループ
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>会話が見つかりません</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const isActive = conversation.id === activeId
            const displayName = conversation.is_group
              ? conversation.name || "グループチャット"
              : conversation.participants?.[0]?.user?.full_name || "不明"

            const lastMessage = conversation.last_message?.[0]

            return (
              <Link
                key={conversation.id}
                href={`/messages/${conversation.id}`}
                className={cn(
                  "flex items-start gap-3 p-4 border-b hover:bg-muted/50 transition-colors",
                  isActive && "bg-muted",
                )}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className={conversation.is_group ? "bg-primary" : "bg-secondary"}>
                      {conversation.is_group ? <Users className="w-4 h-4" /> : displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium truncate">{displayName}</h3>
                    {lastMessage && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(lastMessage.created_at), {
                          addSuffix: true,
                          locale: ja,
                        })}
                      </span>
                    )}
                  </div>

                  {conversation.is_group && (
                    <p className="text-xs text-muted-foreground mb-1">{conversation.participants?.length || 0}人</p>
                  )}

                  {lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">
                      {lastMessage.sender?.full_name}: {lastMessage.content}
                    </p>
                  )}
                </div>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
