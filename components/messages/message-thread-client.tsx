"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface MessageThreadClientProps {
  messages: any[]
  conversationId: string
  conversationName: string
  isGroup: boolean
}

export function MessageThreadClient({
  messages: initialMessages,
  conversationId,
  conversationName,
  isGroup,
}: MessageThreadClientProps) {
  const router = useRouter()
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState(initialMessages)

  const handleSend = async () => {
    if (!newMessage.trim()) return

    console.log("[v0] Sending message:", newMessage)

    const mockMessage = {
      id: Date.now().toString(),
      content: newMessage,
      created_at: new Date().toISOString(),
      sender_id: "00000000-0000-0000-0000-000000000001",
      sender: { full_name: "あなた", id: "00000000-0000-0000-0000-000000000001" },
    }

    setMessages([...messages, mockMessage])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push("/messages")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <Avatar>
          <AvatarFallback className={isGroup ? "bg-primary" : "bg-secondary"}>
            {isGroup ? <Users className="w-4 h-4" /> : conversationName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h2 className="font-bold">{conversationName}</h2>
          {isGroup && <p className="text-xs text-muted-foreground">グループチャット</p>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.sender_id === "00000000-0000-0000-0000-000000000001"
          const showDateSeparator =
            index === 0 ||
            format(new Date(messages[index - 1].created_at), "yyyy-MM-dd") !==
              format(new Date(message.created_at), "yyyy-MM-dd")

          return (
            <div key={message.id}>
              {showDateSeparator && (
                <div className="flex items-center justify-center my-4">
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {format(new Date(message.created_at), "M月d日(E)", { locale: ja })}
                  </span>
                </div>
              )}

              <div className={cn("flex gap-3", isCurrentUser && "flex-row-reverse")}>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{message.sender?.full_name?.charAt(0) || "?"}</AvatarFallback>
                </Avatar>

                <div className={cn("flex flex-col gap-1", isCurrentUser && "items-end")}>
                  {!isCurrentUser && <span className="text-xs text-muted-foreground">{message.sender?.full_name}</span>}

                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2 max-w-md",
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>

                  <span className="text-xs text-muted-foreground">{format(new Date(message.created_at), "HH:mm")}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input placeholder="メッセージを入力..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
