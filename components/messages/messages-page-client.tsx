"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus, Search, Send, User } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { createConversation } from "@/app/actions"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Conversation {
    id: string
    participant1: { id: string; name: string; specialty: string }
    participant2: { id: string; name: string; specialty: string }
    lastMessage: string
    lastMessageAt: string
}

interface Doctor {
    id: string
    name: string
    specialty?: string
}

interface MessagesPageClientProps {
    initialConversations: Conversation[]
    doctors: Doctor[]
}

export function MessagesPageClient({ initialConversations, doctors }: MessagesPageClientProps) {
    const [conversations] = useState<Conversation[]>(initialConversations)
    const [searchQuery, setSearchQuery] = useState("")
    const [isNewChatOpen, setIsNewChatOpen] = useState(false)
    const router = useRouter()

    const filteredConversations = conversations.filter(conv => {
        const name1 = conv.participant1?.name?.toLowerCase() || ''
        const name2 = conv.participant2?.name?.toLowerCase() || ''
        return name1.includes(searchQuery.toLowerCase()) ||
            name2.includes(searchQuery.toLowerCase())
    })

    const handleStartConversation = async (doctorId: string) => {
        const result = await createConversation(doctorId)
        if (result.conversationId) {
            setIsNewChatOpen(false)
            router.push(`/messages/${result.conversationId}`)
        }
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            return date.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })
        } else if (diffDays === 1) {
            return "昨日"
        } else if (diffDays < 7) {
            return `${diffDays}日前`
        } else {
            return date.toLocaleDateString("ja-JP", { month: "short", day: "numeric" })
        }
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">メッセージ</h1>
                    <p className="text-muted-foreground mt-1">医師同士のダイレクトメッセージ</p>
                </div>

                <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            新規メッセージ
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>新しい会話を開始</DialogTitle>
                            <DialogDescription>
                                メッセージを送信する医師を選択してください
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[300px] pr-4">
                            <div className="space-y-2">
                                {doctors.map((doctor) => (
                                    <button
                                        key={doctor.id}
                                        onClick={() => handleStartConversation(doctor.id)}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                                    >
                                        <Avatar>
                                            <AvatarFallback>
                                                {doctor.name?.charAt(0) || <User className="w-4 h-4" />}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-medium">{doctor.name || 'Unknown'}</p>
                                            <p className="text-sm text-muted-foreground">{doctor.specialty || '専門未設定'}</p>
                                        </div>
                                    </button>
                                ))}
                                {doctors.length === 0 && (
                                    <div className="text-center py-8 text-muted-foreground">
                                        登録されている医師がいません
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="会話を検索..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Card>
                <CardContent className="p-0">
                    {filteredConversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <MessageSquare className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">会話がありません</h3>
                            <p className="text-muted-foreground mb-4 max-w-md">
                                {searchQuery
                                    ? "検索条件に一致する会話が見つかりませんでした。"
                                    : "「新規メッセージ」ボタンから会話を始めましょう。"}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y">
                            {filteredConversations.map((conv) => {
                                const otherParticipant = conv.participant2
                                return (
                                    <Link
                                        key={conv.id}
                                        href={`/messages/${conv.id}`}
                                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                                    >
                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback>
                                                {otherParticipant?.name?.charAt(0) || <User className="w-5 h-5" />}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="font-medium truncate">
                                                    {otherParticipant?.name || 'Unknown'}
                                                </p>
                                                <span className="text-xs text-muted-foreground flex-shrink-0">
                                                    {formatTime(conv.lastMessageAt)}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {conv.lastMessage || 'メッセージはありません'}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
