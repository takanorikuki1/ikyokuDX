"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart } from "lucide-react"

const amountOptions = [3000, 5000, 10000, 30000, 50000, 100000]

interface DonationFormProps {
  projectId?: string
  projectTitle?: string
}

export function DonationForm({ projectId, projectTitle }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(10000)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [donorName, setDonorName] = useState<string>("")
  const [donorEmail, setDonorEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("credit")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const amount = customAmount ? Number.parseInt(customAmount) : selectedAmount

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          donorName: isAnonymous ? "匿名" : donorName,
          donorEmail,
          amount,
          message,
          isAnonymous,
          paymentMethod,
        }),
      })

      if (!response.ok) throw new Error("寄付の登録に失敗しました")

      alert(`${amount.toLocaleString()}円の寄付ありがとうございます`)

      // フォームをリセット
      setDonorName("")
      setDonorEmail("")
      setMessage("")
      setCustomAmount("")
      setSelectedAmount(10000)
    } catch (error) {
      console.error("寄付エラー:", error)
      alert("寄付の登録に失敗しました。もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>寄付のお申し込み</CardTitle>
        <CardDescription>
          {projectTitle ? `「${projectTitle}」へのご支援` : "ご支援いただける金額と情報をご入力ください"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 金額選択 */}
          <div className="space-y-3">
            <Label>寄付金額</Label>
            <div className="grid grid-cols-3 gap-3">
              {amountOptions.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
                  onClick={() => {
                    setSelectedAmount(amount)
                    setCustomAmount("")
                  }}
                >
                  {amount.toLocaleString()}円
                </Button>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="custom-amount">その他の金額（円）</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="金額を入力"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
              />
            </div>
          </div>

          {/* 寄付者情報 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor="anonymous" className="font-normal cursor-pointer">
                匿名で寄付する
              </Label>
            </div>

            {!isAnonymous && (
              <div className="space-y-2">
                <Label htmlFor="donor-name">お名前 *</Label>
                <Input id="donor-name" required value={donorName} onChange={(e) => setDonorName(e.target.value)} />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="donor-email">メールアドレス *</Label>
              <Input
                id="donor-email"
                type="email"
                required
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">応援メッセージ（任意）</Label>
              <Textarea
                id="message"
                placeholder="応援メッセージをお聞かせください"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* 支払い方法 */}
          <div className="space-y-2">
            <Label>支払い方法</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit" className="font-normal cursor-pointer">
                  クレジットカード
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="font-normal cursor-pointer">
                  銀行振込
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            <Heart className="w-5 h-5 mr-2" />
            {isSubmitting ? "処理中..." : "寄付を申し込む"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            寄付金は税制優遇の対象となる場合があります。詳しくはお問い合わせください。
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
