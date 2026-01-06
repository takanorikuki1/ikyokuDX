"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, ExternalLink } from "lucide-react"
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data"
import { useState } from "react"

export function NotificationList() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const typeIcons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: XCircle,
  }

  const typeColors = {
    info: "text-blue-500",
    warning: "text-yellow-500",
    success: "text-green-500",
    error: "text-red-500",
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <h2 className="text-xl font-bold">通知</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            すべて既読にする
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => {
          const Icon = typeIcons[notification.type]
          return (
            <Card
              key={notification.id}
              className={`transition-all ${notification.read ? "opacity-60" : "border-primary/50"}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${typeColors[notification.type]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm">{notification.title}</h3>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.date).toLocaleDateString("ja-JP")}
                      </span>
                      {notification.link && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          詳細を見る
                        </Button>
                      )}
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          既読にする
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
