-- 掲示板投稿テーブル
create table if not exists public.board_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  content text not null,
  category text not null,
  tags text[] default '{}',
  views integer default 0,
  replies integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.board_posts enable row level security;

-- 認証済みユーザーは全投稿を閲覧可能
create policy "board_posts_select_auth"
  on public.board_posts for select
  using (auth.uid() is not null);

-- 認証済みユーザーは投稿を作成可能
create policy "board_posts_insert_auth"
  on public.board_posts for insert
  with check (auth.uid() = user_id);

-- 自分の投稿のみ更新可能
create policy "board_posts_update_own"
  on public.board_posts for update
  using (auth.uid() = user_id);

-- 自分の投稿のみ削除可能
create policy "board_posts_delete_own"
  on public.board_posts for delete
  using (auth.uid() = user_id);

create trigger board_posts_updated_at
  before update on public.board_posts
  for each row
  execute function public.handle_updated_at();
