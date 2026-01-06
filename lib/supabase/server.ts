import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * サーバー側でSupabaseクライアントを作成
 * Fluid computeを使用する場合、グローバル変数にクライアントを保存しないこと
 * 常に各関数内で新しいクライアントを作成する
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Componentからの呼び出しの場合は無視
        }
      },
    },
  })
}
