"use client"

import { useState } from "react"
import type { Message } from "@/lib/mock-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Smile } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface MessageThreadProps {
  messages: Message[]
  conversationName: string
  conversationType: "direct" | "group"
  currentUserId?: string
}

export function MessageThread({
  messages,
  conversationName,
  conversationType,
  currentUserId = "1",
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("[v0] Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = format(new Date(message.timestamp), "yyyy-MM-dd")
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
      return groups
    },
    {} as Record<string, Message[]>,
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">{conversationName}</h2>
        {conversationType === "group" && <p className="text-sm text-muted-foreground">グループチャット</p>}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="space-y-4">
            <div className="flex items-center justify-center">
              <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {format(new Date(date), "M月d日(E)", { locale: ja })}
              </span>
            </div>

            {msgs.map((message) => {
              const isCurrentUser = message.senderId === currentUserId
              return (
                <div key={message.id} className={cn("flex gap-3", isCurrentUser && "flex-row-reverse")}>
                  {!isCurrentUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className={cn("flex flex-col", isCurrentUser ? "items-end" : "items-start")}>
                    {!isCurrentUser && <span className="text-xs text-muted-foreground mb-1">{message.senderName}</span>}

                    <div
                      className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2",
                        isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    </div>

                    <span className="text-xs text-muted-foreground mt-1">
                      {format(new Date(message.timestamp), "HH:mm")}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Smile className="w-4 h-4" />
          </Button>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="メッセージを入力..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Enterで送信、Shift+Enterで改行</p>
      </div>
    </div>
  )
}
