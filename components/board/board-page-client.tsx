"use client"

import { useState } from "react"
import { PostCard } from "./post-card"
import type { BoardPost } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { CreatePostDialog } from "./create-post-dialog"

interface BoardPageClientProps {
    initialPosts: BoardPost[]
}

export function BoardPageClient({ initialPosts }: BoardPageClientProps) {
    const [posts] = useState<BoardPost[]>(initialPosts)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredPosts = posts.filter(
        (post) =>
            post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.tags || []).some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    return (
        <div className="container mx-auto p-6 max-w-7xl space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">掲示板</h1>
                    <p className="text-muted-foreground mt-2">医師同士の意見交換や情報共有の場</p>
                </div>
                <CreatePostDialog />
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="キーワードで検索..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">投稿がありません</h3>
                        <p className="text-muted-foreground mb-4 max-w-md">
                            {searchQuery ? "検索条件に一致する投稿が見つかりませんでした。" : "最初の投稿を作成して、医師同士の意見交換を始めましょう。"}
                        </p>
                        {searchQuery && (
                            <Button variant="outline" onClick={() => setSearchQuery("")}>
                                検索をクリア
                            </Button>
                        )}
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </div>
        </div>
    )
}
