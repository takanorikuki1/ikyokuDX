-- 会話テーブル
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  name text,
  is_group boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 会話参加者テーブル
create table if not exists public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  joined_at timestamptz default now(),
  unique(conversation_id, user_id)
);

-- メッセージテーブル
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamptz default now()
);

-- RLS設定
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;

-- 参加者のみ会話を閲覧可能
create policy "conversations_select_participants"
  on public.conversations for select
  using (
    exists (
      select 1 from public.conversation_participants
      where conversation_id = id and user_id = auth.uid()
    )
  );

-- 認証済みユーザーは会話を作成可能
create policy "conversations_insert_auth"
  on public.conversations for insert
  with check (auth.uid() is not null);

-- 参加者リストは参加者のみ閲覧可能
create policy "participants_select_own"
  on public.conversation_participants for select
  using (
    exists (
      select 1 from public.conversation_participants cp
      where cp.conversation_id = conversation_id and cp.user_id = auth.uid()
    )
  );

-- 認証済みユーザーは参加者を追加可能
create policy "participants_insert_auth"
  on public.conversation_participants for insert
  with check (auth.uid() is not null);

-- メッセージは参加者のみ閲覧可能
create policy "messages_select_participants"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversation_participants
      where conversation_id = messages.conversation_id and user_id = auth.uid()
    )
  );

-- 参加者のみメッセージを送信可能
create policy "messages_insert_participants"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversation_participants
      where conversation_id = messages.conversation_id and user_id = auth.uid()
    ) and auth.uid() = sender_id
  );
