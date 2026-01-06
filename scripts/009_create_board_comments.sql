-- 掲示板コメントテーブル
create table if not exists public.board_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.board_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  parent_comment_id uuid references public.board_comments(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.board_comments enable row level security;

-- 認証済みユーザーは全コメントを閲覧可能
create policy "board_comments_select_auth"
  on public.board_comments for select
  using (auth.uid() is not null);

-- 認証済みユーザーはコメントを作成可能
create policy "board_comments_insert_auth"
  on public.board_comments for insert
  with check (auth.uid() = user_id);

-- 自分のコメントのみ更新可能
create policy "board_comments_update_own"
  on public.board_comments for update
  using (auth.uid() = user_id);

-- 自分のコメントのみ削除可能
create policy "board_comments_delete_own"
  on public.board_comments for delete
  using (auth.uid() = user_id);

create trigger board_comments_updated_at
  before update on public.board_comments
  for each row
  execute function public.handle_updated_at();

-- インデックス作成
create index if not exists board_comments_post_id_idx on public.board_comments(post_id);
create index if not exists board_comments_user_id_idx on public.board_comments(user_id);
create index if not exists board_comments_parent_comment_id_idx on public.board_comments(parent_comment_id);
