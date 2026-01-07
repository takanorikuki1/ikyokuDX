"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Send, User } from "lucide-react"
import { sendMessage } from "@/app/actions"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface Message {
    id: string
    senderId: string | null
    senderName: string
    content: string
    createdAt: string
    isRead: boolean
}

interface Conversation {
    id: string
    participant1: { id: string; name: string; specialty: string }
    participant2: { id: string; name: string; specialty: string }
}

interface ChatPageClientProps {
    conversation: Conversation
    initialMessages: Message[]
}

export function ChatPageClient({ conversation, initialMessages }: ChatPageClientProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [newMessage, setNewMessage] = useState("")
    const [isSending, setIsSending] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { toast } = useToast()

    const otherParticipant = conversation.participant2

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || isSending) return

        setIsSending(true)

        // Optimistically add message
        const tempMessage: Message = {
            id: `temp-${Date.now()}`,
            senderId: null,
            senderName: "あなた",
            content: newMessage,
            createdAt: new Date().toISOString(),
            isRead: false
        }
        setMessages(prev => [...prev, tempMessage])
        setNewMessage("")

        const result = await sendMessage(conversation.id, newMessage)

        if (result.error) {
            toast({
                title: "エラー",
                description: result.error,
                variant: "destructive"
            })
            // Remove temp message on error
            setMessages(prev => prev.filter(m => m.id !== tempMessage.id))
        } else {
            toast({
                title: "送信完了",
                description: "メッセージを送信しました"
            })
            router.refresh()
        }

        setIsSending(false)
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="border-b p-4 flex items-center gap-4 bg-background">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/messages">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </Button>
                <Avatar>
                    <AvatarFallback>
                        {otherParticipant?.name?.charAt(0) || <User className="w-4 h-4" />}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="font-semibold">{otherParticipant?.name || 'Unknown'}</h2>
                    <p className="text-sm text-muted-foreground">{otherParticipant?.specialty || '専門医'}</p>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4 max-w-2xl mx-auto">
                    {messages.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <p>まだメッセージはありません</p>
                            <p className="text-sm mt-2">最初のメッセージを送信しましょう</p>
                        </div>
                    ) : (
                        messages.map((message) => {
                            const isOwn = message.senderName === "あなた" || !message.senderId
                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${isOwn
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                            }`}
                                    >
                                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                                        <p className={`text-xs mt-1 ${isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                                            {formatTime(message.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4 bg-background">
                <form onSubmit={handleSend} className="flex gap-2 max-w-2xl mx-auto">
                    <Input
                        placeholder="メッセージを入力..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isSending}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isSending || !newMessage.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
