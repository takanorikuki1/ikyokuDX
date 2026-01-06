"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Conversation } from "@/lib/mock-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Users, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ja } from "date-fns/locale"

interface ConversationListProps {
  conversations: Conversation[]
  activeId?: string
}

export function ConversationList({ conversations, activeId }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "direct" | "group">("all")

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.participantNames.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesFilter = filter === "all" || conv.type === filter

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
            const displayName =
              (conversation.type === "group" ? conversation.name : conversation.participantNames.filter((name) => name !== "山田太郎")[0]) || "不明"

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
                    <AvatarFallback className={conversation.type === "group" ? "bg-primary" : "bg-secondary"}>
                      {conversation.type === "group" ? <Users className="w-4 h-4" /> : displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={cn("font-medium truncate", conversation.unreadCount > 0 && "font-bold")}>
                      {displayName}
                    </h3>
                    {conversation.lastMessage && (
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(conversation.lastMessage.timestamp), {
                          addSuffix: true,
                          locale: ja,
                        })}
                      </span>
                    )}
                  </div>

                  {conversation.type === "group" && (
                    <p className="text-xs text-muted-foreground mb-1">{conversation.participantNames.length}人</p>
                  )}

                  {conversation.lastMessage && (
                    <p
                      className={cn(
                        "text-sm text-muted-foreground truncate",
                        conversation.unreadCount > 0 && "font-medium text-foreground",
                      )}
                    >
                      {conversation.lastMessage.senderName}: {conversation.lastMessage.content}
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
